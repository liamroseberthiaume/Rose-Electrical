# Workout Tracker

A workout tracker backend in FastAPI: JWT auth with refresh-token rotation, a
seeded exercise catalogue, workout plans with scheduling, and progress reports.
Ships with a single-file HTML frontend served from the same origin.

---

## Quick start

```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env          # then set JWT_SECRET
alembic upgrade head          # create the tables
python -m app.seed            # load the exercise catalogue (optional — runs on first boot too)

uvicorn app.main:app --reload
```

| URL | What's there |
| --- | --- |
| <http://127.0.0.1:8000> | The frontend |
| <http://127.0.0.1:8000/docs> | Swagger UI — every endpoint, try-it-out included |
| <http://127.0.0.1:8000/redoc> | ReDoc reference |

Verify the whole thing end to end with the server running:

```bash
RATE_LIMIT_ENABLED=false uvicorn app.main:app &
python smoke_test.py          # 50 assertions across auth, CRUD, isolation, reports
```

The suite logs in far more often than a person would, so run the server with the
auth throttle off or expect 429s near the end.

Putting it on the internet is a separate document: **[DEPLOY.md](DEPLOY.md)**.

---

## Database schema

```
users ─┬─< workouts ──< workout_exercises >── exercises
       ├─< refresh_tokens
       └─< revoked_access_tokens
```

| Table | Purpose |
| --- | --- |
| `users` | email, username, bcrypt hash |
| `exercises` | shared catalogue: name, description, category, muscle group |
| `workouts` | a plan owned by one user: name, comment, `scheduled_at`, status, `completed_at` |
| `workout_exercises` | join row carrying the prescription: sets, reps, weight, position, notes |
| `refresh_tokens` | issued refresh tokens, so they can be rotated and revoked |
| `revoked_access_tokens` | denylist for access tokens killed by logout before expiry |

Two decisions worth understanding:

**Why a separate `workout_exercises` table** rather than storing exercises as
JSON on the workout. The prescription (4 x 8 @ 60 kg) belongs to *this user's
workout*, but the exercise itself (Barbell Bench Press, chest, strength) is
shared and immutable. Splitting them keeps the catalogue normalised and lets
reports aggregate in SQL — `GROUP BY exercise.muscle_group` is one query instead
of parsing JSON in Python.

**Why timestamps go through a custom `UTCDateTime` type** (see `app/database.py`).
SQLite has no real datetime type and silently drops timezone info, so a workout
scheduled for 18:00 in Halifax comes back as a naive `18:00` and the browser
renders it three hours off. The type coerces to UTC on write and re-attaches UTC
on read, so the API always speaks unambiguous ISO-8601.

---

## Auth model

Two token types, both signed with the same secret but carrying a `type` claim so
a refresh token can never be replayed as an access token:

- **Access token** — 15 minutes, sent as `Authorization: Bearer <token>` on every
  request. Stateless, so verifying it costs no database round trip.
- **Refresh token** — 7 days, stored in `refresh_tokens`, **single use**. Calling
  `/auth/refresh` revokes the one you presented and issues a fresh pair.

Rotation is what makes the long-lived token safe. If a revoked refresh token is
presented again, that means two parties hold the same token — one of them stole
it — so the server revokes *every* refresh token for that user and forces a real
login. Logout adds the current access token's `jti` to the denylist so it stops
working immediately rather than lingering for its remaining minutes.

Passwords are hashed with bcrypt and capped at 72 bytes (bcrypt ignores anything
past that, and modern versions raise instead of truncating silently).

`/auth/login` and `/auth/signup` are throttled per IP (8/minute and 5/hour) by
`app/ratelimit.py`. A login endpoint on the public internet is a password-guessing
oracle; without a cap, bcrypt's deliberate slowness is a denial-of-service vector
rather than a defence. The counter is in-process, which is fine for one instance —
scale past that and it belongs in Redis.

---

## API

All routes are under `/api`. Everything except signup, login and refresh needs a
bearer token.

### Auth

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/auth/signup` | `{email, username, password}` → 201 with the user |
| `POST` | `/auth/login` | `{identifier, password}` — identifier is email *or* username → token pair |
| `POST` | `/auth/refresh` | `{refresh_token}` → new pair, old one revoked |
| `POST` | `/auth/logout` | `{refresh_token}` optional; denylists the access token → 204 |
| `GET` | `/auth/me` | Current user |

### Exercises (read-only, shared)

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/exercises` | Filters: `category`, `muscle_group`, `search` |
| `GET` | `/exercises/{id}` | One exercise |

### Workouts

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/workouts` | Create with a list of exercises |
| `GET` | `/workouts` | `status`, `upcoming`, `date_from`, `date_to`, `order`, `limit`, `offset` |
| `GET` | `/workouts/{id}` | One workout with its exercises |
| `PATCH` | `/workouts/{id}` | Partial update; sending `exercises` replaces the whole list |
| `POST` | `/workouts/{id}/complete` | Mark done — this is what feeds reports |
| `DELETE` | `/workouts/{id}` | Cascades to its exercise rows |

`GET /workouts?upcoming=true` is the "what's next" view: pending workouts with a
schedule in the future, earliest first.

### Reports

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/reports/summary` | `days=30`, or explicit `start`/`end`; omit both for all time |
| `GET` | `/reports/history` | Completed workouts, most recent first |

Summary returns counts by status, total sets/reps/volume, distinct exercises
used, and the same totals broken down by category and by muscle group. Volume is
`sets x reps x weight`, computed in SQL.

### Example

```bash
TOKEN=$(curl -s -X POST localhost:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"you@example.com","password":"your-password"}' | jq -r .access_token)

curl -s -X POST localhost:8000/api/workouts \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{
        "name": "Push day A",
        "scheduled_at": "2026-08-14T18:00:00Z",
        "exercises": [
          {"exercise_id": 1, "sets": 4, "reps": 8, "weight": 60},
          {"exercise_id": 8, "sets": 3, "reps": 10, "weight": 40}
        ]
      }' | jq
```

---

## Authorization

There is no permission system, because a workout tracker does not need one. Every
query is filtered by `Workout.user_id == current_user.id`, which means another
user's workout is not *forbidden* — it does not exist. The handlers return **404,
not 403**, deliberately: a 403 would confirm the row exists and leak the fact that
someone else owns workout #17.

`smoke_test.py` asserts this directly — a second user gets 404 on read, patch and
delete of the first user's workout, and an empty list and zeroed report.

---

## Project layout

```
app/
  main.py          FastAPI app, startup seeding, static mount
  config.py        environment-driven settings
  database.py      engine, session, Base, UTCDateTime type
  models.py        SQLAlchemy tables
  schemas.py       Pydantic request/response models (the API contract)
  security.py      bcrypt hashing + JWT encode/decode
  deps.py          get_current_user dependency (checks the denylist)
  seed.py          50-exercise catalogue seeder, idempotent
  ratelimit.py     per-IP throttle for the public auth endpoints
  routers/         auth, exercises, workouts, reports
alembic/           migrations
static/index.html  the frontend, one self-contained file
smoke_test.py      end-to-end assertions against a running server
DEPLOY.md          putting it on the internet
```

---

## Frontend notes

`static/index.html` is one file — no build step, no dependencies. It handles
signup/login, the workout builder, the upcoming and all-workouts views, and the
reports dashboard, and it transparently refreshes an expired access token and
replays the failed request.

Tokens are held in **memory only**, so refreshing the page logs you out. That is
intentional: `localStorage` is readable by any injected script, which makes it a
poor place for a JWT. A production app would put the refresh token in an
`HttpOnly; Secure; SameSite=Strict` cookie and keep the access token in a
variable exactly like this one does.

---

## Where to take it next

- **Tests** — `smoke_test.py` needs a live server; port it to `pytest` +
  `TestClient` with a throwaway SQLite file so it runs in CI.
- **Per-set logging** — right now a workout stores the *prescription*. Adding a
  `set_logs` table (one row per set actually performed) is what unlocks 1RM
  estimates and per-exercise progression curves.
- **Postgres** — change `DATABASE_URL`; the migrations already run there, and it
  would have handled the timezone problem above without the custom type.
- **A real session store** — the refresh-token table works, but an `HttpOnly`
  cookie would keep the token out of JavaScript's reach entirely.
