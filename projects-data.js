// =====================================================================
// SHARED PROJECT DATA
// Both index.html (home page gallery) and every category page
// (e.g. category-power-electronics.html) load this one file.
// Add a project here ONCE and it shows up everywhere it belongs.
//
// description: a string, or an array of strings when the card needs more than
//            one paragraph. Each entry renders as its own <p>.
// image:     path to a photo/screenshot in images/projects/ (cropped to 4:3)
// visual:    optional key into `visuals` below for an inline SVG diagram
//            instead of a photo (used for the power flow project)
// visualLegend: optional array of { label, cls } shown beside visualCaption.
//            cls is "" for the filled swatch or "load" for the outlined one.
// featured:  true makes the card span 2 columns on the home page
// stats:     optional array of { value, label } result chips
// resources: optional array of { label, desc, href, icon }
//            icon is one of: "pdf", "code", "app"
//            Each renders as a clickable row that opens in a new tab.
//
// Leave the array empty ( [] ) and the "coming soon" empty state shows
// automatically on both the home page and any category page.
// =====================================================================
const projects = [
  {
    title: "Solving the AC Power Flow Problem with Newton-Raphson",
    category: "Power Electronics",
    date: "July 2026",
    featured: true,
    description: "A from-scratch Newton-Raphson power flow solver, derived from first principles and tested on a 7-bus system: base-case solution, N-1 contingency screening, and a voltage-collapse study that traces the Jacobian to singularity.",
    visual: "sevenBus",
    visualCaption: "7-bus test system",
    visualLegend: [
      { label: "gen", cls: "" },
      { label: "load", cls: "load" }
    ],
    stats: [
      { value: "3", label: "iterations" },
      { value: "10⁻⁸", label: "tolerance p.u." },
      { value: "λ* = 5.151", label: "collapse point" }
    ],
    resources: [
      {
        label: "Read the paper",
        desc: "Full derivation, the 7-bus test system, and the empirical sensitivity study (PDF).",
        href: "projects/power-flow/Solving_the_AC_Power_Flow_Problem_with_Newton-Raphson.pdf",
        icon: "pdf"
      },
      {
        label: "View the code",
        desc: "The Jupyter notebook with the solver and every figure in the paper, self-contained and runnable.",
        href: "projects/power-flow/power_flow_experiments.ipynb",
        icon: "code"
      },
      {
        label: "Open the workbench",
        desc: "An interactive control-room-styled tool for running the solver on real what-if scenarios.",
        href: "projects/power-flow/powerflow_workbench.html",
        icon: "app"
      }
    ]
  },
  {
    title: "Workout Tracker API",
    category: "Software & Tooling",
    date: "August 2026",
    description: "A REST backend for planning, scheduling and reviewing training sessions. JWT authentication with single-use refresh tokens, a normalised exercise catalogue, and progress reports aggregated in SQL rather than in Python, with a browser sandbox so the API can be driven without deploying anything.",
    visual: "workoutSchema",
    visualCaption: "Database schema",
    visualLegend: [
      { label: "user-scoped", cls: "" },
      { label: "shared", cls: "load" }
    ],
    stats: [
      { value: "16", label: "endpoints" },
      { value: "6", label: "tables" },
      { value: "50", label: "assertions passing" }
    ],
    resources: [
      {
        label: "Open the demo",
        desc: "The real interface, running against an in-browser stand-in for the Python service. Pre-loaded with eight weeks of training.",
        href: "projects/workout-tracker/workout_tracker_demo.html",
        icon: "app"
      },
      {
        label: "Read the write-up",
        desc: "Schema decisions, the token-rotation model, and why cross-user access returns 404 instead of 403.",
        href: "projects/workout-tracker/README.md",
        icon: "pdf"
      },
      {
        label: "Download the source",
        desc: "The full FastAPI project: models, routers, Alembic migrations, seeder, and the end-to-end test suite.",
        href: "projects/workout-tracker/workout-tracker-source.zip",
        icon: "code"
      }
    ]
  }
];

// =====================================================================
// PROJECTS FOR FUN
// Deliberately a separate array from `projects` above: these are not EE
// work, they never belong to a category, and they must not turn up when
// the gallery is filtered. index.html renders them into #funGrid with the
// same renderProjectCards() used everywhere else, so the card markup,
// stat chips and resource rows all stay in one place.
// =====================================================================
const funProjects = [
  {
    title: "Elite Four Battle Simulator",
    category: "Monte Carlo Simulation",
    date: "August 2026",
    description: [
      "Pick any Elite Four or Champion fight from Pok&eacute;mon Generations I&ndash;V, build a team, and find out what your odds actually are. A Monte&nbsp;Carlo loop plays the fight up to 4,000 times and the whole report is read back out of those battles rather than estimated.",
      "Pok&eacute;mon has been a game I&rsquo;ve loved since I was 5 years old playing HeartGold on my Nintendo DS, but I always found the game to be &lsquo;unfair&rsquo; at times, with there being many matches against NPCs that I thought I had a sure win going poorly. So over 15 years later I created a battle simulation so it does not happen again.",
      "Each of your six is measured on what it actually does across those runs rather than on its stat line. Every slot leads an equal share of the battles, so the win rate behind each lead is counted rather than guessed. The matchup grid scores every pairing by expected damage times accuracy as a share of the target&rsquo;s health, and flags where you lose the speed tie. The threat list counts knockouts scored against you per battle and names which of your team each opposing Pok&eacute;mon beats. Swap suggestions are ranked on incoming power and type coverage first, then re-simulated, so the change in win rate is measured instead of asserted.",
      "The rosters are the real ones, with levels, items, abilities and movesets lifted from the games&rsquo; own data and baked into the page as JSON. A damage engine reimplements each generation&rsquo;s rules separately, so a Generation&nbsp;I fight uses the Generation&nbsp;I type chart, its single Special stat and its critical hit rates, and the trainer plays with a scored AI while you play at whichever skill level you set."
    ],
    visual: "matchupGrid",
    visualCaption: "Matchup grid",
    visualLegend: [
      { label: "chip damage", cls: "load" },
      { label: "one-shot", cls: "" }
    ],
    stats: [
      { value: "84", label: "battles modelled" },
      { value: "495", label: "enemy Pokémon" },
      { value: "4,000", label: "runs per sim" }
    ],
    resources: [
      {
        label: "Open the simulator",
        desc: "The full tool: pick a battle, build a team, run the simulation. Single file, no install.",
        href: "projects/elite-four/elite_four_simulator.html",
        icon: "app"
      }
    ]
  },
  {
    title: "Canada U18 Scouting Board",
    category: "Sports Analytics",
    date: "August 2026",
    description: [
      "Three rankings of the same 22 players from Canada&rsquo;s 2026 Hlinka Gretzky Cup roster: how the scouting consensus sees them, where the draft research says they should sit, and the order I&rsquo;d actually pick in.",
      "My brother is an elite 16 year old goalie who recently had the opportunity to represent Team Canada at the U18 Hlinka Gretzky Cup. Standing at 6&rsquo;5&rdquo; with great athleticism and a strong mind for the game (and being biased as his older brother) I think it would be any NHL team&rsquo;s dream to have Sam on their roster, but how does he stack up against the other elite players on his roster?",
      "Every player carries three ratings on a 0 to 99 scale anchored to this roster alone, so the best player here is a 99 and every other number is his distance from that, plus five projected tool grades on a 1 to 10 scale where 5 is NHL average. Skaters and goaltenders are ranked together, with no scarcity premium for centres and no automatic discount for the crease. The consensus board is built from the published 2027 and 2028 draft rankings, adjusted for what happened in Edmonton. The ceiling board re-sorts the same players on two findings from the research: age-adjusted production, which weights points per game by exact birthdate and league, and physical maturity headroom, which asks how much strength a frame still has left to gain. My board runs that same evidence through a risk rule rather than a pure upside sort.",
      "Every player is one object in a JavaScript array holding the bio, the season-by-season stat lines, the tool grades, and the argument behind each of the three ratings. Switching boards re-sorts that one dataset instead of loading another, so the movement between them is computed rather than typed, which is the point: the gap between consensus and evidence is the output."
    ],
    visual: "boardShift",
    visualCaption: "Rank movement across boards",
    visualLegend: [
      { label: "rises", cls: "" },
      { label: "falls", cls: "load" }
    ],
    stats: [
      { value: "22", label: "players ranked" },
      { value: "3", label: "boards, one array" },
      { value: "93", label: "season stat lines" }
    ],
    resources: [
      {
        label: "Open the board",
        desc: "All three rankings, with a full report card behind every row.",
        href: "projects/scouting-board/canada_u18_scouting_board.html",
        icon: "app"
      }
    ]
  }
];

const resourceIcons = {
  pdf: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>',
  code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6L3 12l5 6M16 6l5 6-5 6"/></svg>',
  app: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'
};
const externalIcon = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>';

// Inline SVG one-line diagram of the 7-bus test system.
// Generators (slack/PV) are squares, loads (PQ) are circles - matching the
// convention used in the paper's figures.
const visuals = {
  sevenBus: `
    <svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One-line diagram of the 7-bus test system">
      <g stroke="#7C93AD" stroke-width="1.6" opacity="0.55">
        <line x1="62" y1="148" x2="152" y2="58"/>
        <line x1="152" y1="58" x2="330" y2="58"/>
        <line x1="62" y1="148" x2="205" y2="148"/>
        <line x1="330" y1="58" x2="205" y2="148"/>
        <line x1="205" y1="148" x2="330" y2="240"/>
        <line x1="62" y1="148" x2="62" y2="240"/>
        <line x1="62" y1="240" x2="205" y2="240"/>
        <line x1="205" y1="240" x2="330" y2="240"/>
      </g>
      <g fill="#C41E3A" class="flow-dot">
        <circle cx="133" cy="148" r="3.5"/>
      </g>
      <g fill="#F5B700" class="flow-dot f2">
        <circle cx="241" cy="58" r="3"/>
      </g>
      <g fill="#F5B700" class="flow-dot f3">
        <circle cx="133" cy="240" r="3"/>
      </g>

      <!-- generator buses: squares -->
      <g>
        <rect x="50" y="136" width="24" height="24" rx="3" fill="#C41E3A"/>
        <text x="62" y="176" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 1</text>
        <text x="62" y="188" fill="#7C93AD" font-family="monospace" font-size="9" text-anchor="middle">slack</text>
      </g>
      <g>
        <rect x="141" y="47" width="22" height="22" rx="3" fill="#F5B700"/>
        <text x="152" y="38" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 2</text>
      </g>
      <g>
        <rect x="51" y="229" width="22" height="22" rx="3" fill="#F5B700"/>
        <text x="62" y="270" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 6</text>
      </g>

      <!-- load buses: circles -->
      <g>
        <circle cx="330" cy="58" r="11" fill="#2A3550" stroke="#8FA6C4" stroke-width="1.8"/>
        <text x="330" y="38" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 3</text>
      </g>
      <g>
        <circle cx="205" cy="148" r="11" fill="#2A3550" stroke="#8FA6C4" stroke-width="1.8"/>
        <text x="205" y="176" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 4</text>
      </g>
      <g>
        <circle cx="330" cy="240" r="11" fill="#2A3550" stroke="#8FA6C4" stroke-width="1.8"/>
        <text x="330" y="270" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 5</text>
      </g>
      <g>
        <circle cx="205" cy="240" r="11" fill="#2A3550" stroke="#8FA6C4" stroke-width="1.8"/>
        <text x="205" y="270" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">Bus 7</text>
      </g>
    </svg>`,

  // Entity-relationship sketch of the workout tracker schema. Filled crimson
  // boxes are user-scoped tables (every query filters on user_id); outlined
  // boxes are the shared, read-only catalogue - the same fill/outline
  // convention the one-line diagram above uses for generators vs loads.
  workoutSchema: `
    <svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Entity relationship diagram: users to workouts to workout_exercises to exercises">
      <defs>
        <g id="crow">
          <path d="M0 0 L7 -5 M0 0 L7 0 M0 0 L7 5" stroke="#7C93AD" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        </g>
      </defs>

      <g stroke="#7C93AD" stroke-width="1.5" opacity="0.6">
        <line x1="88" y1="72"  x2="88"  y2="103"/>
        <line x1="88" y1="146" x2="88"  y2="177"/>
        <line x1="157" y1="202" x2="244" y2="202"/>
        <line x1="150" y1="54"  x2="237" y2="54"/>
      </g>
      <!-- Crow's feet sit on the MANY side, toes touching the entity box. -->
      <use href="#crow" x="88" y="103" transform="rotate(90 88 103)"/>
      <use href="#crow" x="88" y="177" transform="rotate(90 88 177)"/>
      <use href="#crow" x="157" y="202" transform="rotate(180 157 202)"/>
      <use href="#crow" x="237" y="54"/>

      <!-- user-scoped tables: filled -->
      <g>
        <rect x="26" y="36" width="124" height="36" rx="3" fill="#C41E3A"/>
        <text x="88" y="59" fill="#fff" font-family="monospace" font-size="11.5" text-anchor="middle">users</text>
      </g>
      <g>
        <rect x="26" y="110" width="124" height="36" rx="3" fill="#C41E3A"/>
        <text x="88" y="133" fill="#fff" font-family="monospace" font-size="11.5" text-anchor="middle">workouts</text>
      </g>
      <g>
        <rect x="26" y="184" width="124" height="36" rx="3" fill="#C41E3A"/>
        <text x="88" y="203" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">workout_</text>
        <text x="88" y="214" fill="#fff" font-family="monospace" font-size="10" text-anchor="middle">exercises</text>
      </g>

      <!-- shared / token tables: outlined -->
      <g>
        <rect x="244" y="184" width="130" height="36" rx="3" fill="#2A3550" stroke="#8FA6C4" stroke-width="1.6"/>
        <text x="309" y="200" fill="#DCE4EE" font-family="monospace" font-size="11.5" text-anchor="middle">exercises</text>
        <text x="309" y="212" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="middle">50 seeded</text>
      </g>
      <g>
        <rect x="244" y="36" width="130" height="36" rx="3" fill="#2A3550" stroke="#8FA6C4" stroke-width="1.6"/>
        <text x="309" y="52" fill="#DCE4EE" font-family="monospace" font-size="10.5" text-anchor="middle">refresh_tokens</text>
        <text x="309" y="64" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="middle">rotated, revocable</text>
      </g>

      <text x="200" y="256" fill="#7C93AD" font-family="monospace" font-size="9.5" text-anchor="middle">sets &#215; reps &#215; weight lives on the join row</text>
      <text x="200" y="270" fill="#7C93AD" font-family="monospace" font-size="9.5" text-anchor="middle">so reports GROUP BY in SQL</text>
    </svg>`,

  // Elite Four simulator: the report's matchup grid, six of your Pokemon
  // against the trainer's six. Opacity is the best single hit as a share of
  // the target's HP - faint means chip damage, solid means a one-shot. Same
  // single-hue ramp the legend describes, so it reads without colour vision.
  matchupGrid: `
    <svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six by six matchup grid: each cell shades brighter as your Pokemon's best hit takes a larger share of the opposing Pokemon's health">
      <rect x="60" y="50" width="335" height="227" rx="3" fill="#2A3550" opacity="0.45"/>
      <text x="64" y="42" fill="#7C93AD" font-family="monospace" font-size="9" letter-spacing="1">opposing party &#8594;</text>
      <text x="50" y="273" fill="#7C93AD" font-family="monospace" font-size="9" letter-spacing="1" transform="rotate(-90 50 273)">your team</text>
      <rect x="64" y="54" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.95"/><rect x="119" y="54" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.72"/><rect x="174" y="54" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.58"/><rect x="229" y="54" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.85"/><rect x="284" y="54" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.40"/><rect x="339" y="54" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.66"/>
      <rect x="64" y="91" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.34"/><rect x="119" y="91" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.88"/><rect x="174" y="91" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.45"/><rect x="229" y="91" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.30"/><rect x="284" y="91" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.62"/><rect x="339" y="91" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.28"/>
      <rect x="64" y="128" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.55"/><rect x="119" y="128" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.41"/><rect x="174" y="128" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.92"/><rect x="229" y="128" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.48"/><rect x="284" y="128" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.35"/><rect x="339" y="128" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.70"/>
      <rect x="64" y="165" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.22"/><rect x="119" y="165" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.30"/><rect x="174" y="165" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.26"/><rect x="229" y="165" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.58"/><rect x="284" y="165" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.20"/><rect x="339" y="165" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.33"/>
      <rect x="64" y="202" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.68"/><rect x="119" y="202" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.50"/><rect x="174" y="202" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.37"/><rect x="229" y="202" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.74"/><rect x="284" y="202" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.90"/><rect x="339" y="202" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.44"/>
      <rect x="64" y="239" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.40"/><rect x="119" y="239" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.63"/><rect x="174" y="239" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.55"/><rect x="229" y="239" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.38"/><rect x="284" y="239" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.47"/><rect x="339" y="239" width="52" height="34" rx="2" fill="#F5B700" fill-opacity="0.80"/>
      <rect x="64" y="165" width="327" height="34" rx="2" fill="none" stroke="#C41E3A" stroke-width="1.4" opacity="0.85"/>
      <text x="64" y="286" fill="#C41E3A" font-family="monospace" font-size="8.5">&#9633; weakest slot &#8212; swap this one</text>
    </svg>`,

  // Scouting board: the same 22 players sorted three ways, so a player is a
  // line rather than a row. Faint dots are the rest of the roster; the three
  // traced lines are the cases the board exists to argue about.
  boardShift: `
    <svg viewBox="0 0 400 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Slope chart: player ranks on the consensus board, the ceiling board and the GM board, with one player holding first, one rising and one falling">
      <text x="72" y="30" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="middle" letter-spacing="1">CONSENSUS</text>
      <text x="190" y="30" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="middle" letter-spacing="1">CEILING</text>
      <text x="308" y="30" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="middle" letter-spacing="1">MY BOARD</text>
      <g stroke="#7C93AD" stroke-width="1" opacity="0.18">
        <line x1="72" y1="44" x2="72" y2="276"/>
        <line x1="190" y1="44" x2="190" y2="276"/>
        <line x1="308" y1="44" x2="308" y2="276"/>
      </g>
      <text x="42" y="58" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="end">1</text>
      <text x="42" y="271" fill="#7C93AD" font-family="monospace" font-size="8.5" text-anchor="end">12</text>
      <g fill="#7C93AD" opacity="0.3">
        <circle cx="72" cy="54" r="2.5"/><circle cx="72" cy="73" r="2.5"/><circle cx="72" cy="93" r="2.5"/><circle cx="72" cy="112" r="2.5"/><circle cx="72" cy="132" r="2.5"/><circle cx="72" cy="151" r="2.5"/><circle cx="72" cy="170" r="2.5"/><circle cx="72" cy="190" r="2.5"/><circle cx="72" cy="209" r="2.5"/><circle cx="72" cy="228" r="2.5"/><circle cx="72" cy="248" r="2.5"/><circle cx="72" cy="267" r="2.5"/>
        <circle cx="190" cy="54" r="2.5"/><circle cx="190" cy="73" r="2.5"/><circle cx="190" cy="93" r="2.5"/><circle cx="190" cy="112" r="2.5"/><circle cx="190" cy="132" r="2.5"/><circle cx="190" cy="151" r="2.5"/><circle cx="190" cy="170" r="2.5"/><circle cx="190" cy="190" r="2.5"/><circle cx="190" cy="209" r="2.5"/><circle cx="190" cy="228" r="2.5"/><circle cx="190" cy="248" r="2.5"/><circle cx="190" cy="267" r="2.5"/>
        <circle cx="308" cy="54" r="2.5"/><circle cx="308" cy="73" r="2.5"/><circle cx="308" cy="93" r="2.5"/><circle cx="308" cy="112" r="2.5"/><circle cx="308" cy="132" r="2.5"/><circle cx="308" cy="151" r="2.5"/><circle cx="308" cy="170" r="2.5"/><circle cx="308" cy="190" r="2.5"/><circle cx="308" cy="209" r="2.5"/><circle cx="308" cy="228" r="2.5"/><circle cx="308" cy="248" r="2.5"/><circle cx="308" cy="267" r="2.5"/>
      </g>

      <polyline points="72,54 190,54 308,54" fill="none" stroke="#C41E3A" stroke-width="2.2" stroke-linecap="round"/>
      <g fill="#C41E3A"><circle cx="72" cy="54" r="4"/><circle cx="190" cy="54" r="4"/><circle cx="308" cy="54" r="4"/></g>
      <text x="320" y="51" fill="#C41E3A" font-family="monospace" font-size="8.5">holds #1</text>

      <polyline points="72,151 190,112 308,132" fill="none" stroke="#F5B700" stroke-width="2.2" stroke-linecap="round"/>
      <g fill="#F5B700"><circle cx="72" cy="151" r="4"/><circle cx="190" cy="112" r="4"/><circle cx="308" cy="132" r="4"/></g>
      <text x="320" y="135" fill="#F5B700" font-family="monospace" font-size="8.5">6 &#8594; 5</text>

      <polyline points="72,132 190,209 308,209" fill="none" stroke="#8FA6C4" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="5 3"/>
      <g fill="none" stroke="#8FA6C4" stroke-width="1.8"><circle cx="72" cy="132" r="3.5"/><circle cx="190" cy="209" r="3.5"/><circle cx="308" cy="209" r="3.5"/></g>
      <text x="320" y="212" fill="#8FA6C4" font-family="monospace" font-size="8.5">5 &#8594; 9</text>
    </svg>`
};

// Renders a list of project objects into a target grid element.
// Used by both index.html (all/featured projects) and category pages
// (pre-filtered to one category).
function renderProjectCards(gridEl, list, emptyMessage){
  if (list.length === 0){
    gridEl.innerHTML = `
      <div class="empty-gallery">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F5B700" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>
        <h3>Projects coming soon</h3>
        <p>${emptyMessage || "I'm just getting started &mdash; as builds wrap up, write-ups and photos will show up right here."}</p>
        <div class="status-line"><span class="led"></span> status: building</div>
      </div>`;
    return;
  }
  gridEl.className = 'projects-grid';
  gridEl.innerHTML = list.map(p => `
    <div class="project-card${p.featured ? ' featured' : ''}">
      ${p.visual ? `
        <div class="project-visual">
          ${visuals[p.visual] || ''}
          <div class="visual-caption">
            <span>${p.visualCaption || ''}</span>
            ${p.visualLegend ? `
            <span class="visual-legend">
              ${p.visualLegend.map(l => `<span><i class="lg-dot ${l.cls}"></i>${l.label}</span>`).join('')}
            </span>` : ''}
          </div>
        </div>`
      : `<img class="thumb" src="${p.image}" alt="${p.title}" loading="lazy">`}
      <div class="body">
        <span class="project-tag">${p.category}</span>
        <h3>${p.title}</h3>
        ${Array.isArray(p.description)
          ? p.description.map(d => `<p>${d}</p>`).join('')
          : `<p>${p.description}</p>`}
        ${p.stats ? `
        <div class="project-stats">
          ${p.stats.map(s => `<div class="stat-chip"><b>${s.value}</b><span>${s.label}</span></div>`).join('')}
        </div>` : ''}
        <div class="project-meta">
          <span class="project-date">Built ${p.date}</span>
          ${(!p.resources && p.link) ? `<a class="project-link" href="${p.link}" target="_blank">View project &rarr;</a>` : ''}
        </div>
        ${p.resources ? `
        <div class="project-resources">
          <div class="resources-label">Project files</div>
          ${p.resources.map(r => `
            <a class="resource-link" href="${r.href}" target="_blank" rel="noopener">
              <span class="resource-icon">${resourceIcons[r.icon] || resourceIcons.code}</span>
              <span class="resource-text">
                <span class="resource-name">${r.label}${externalIcon}</span>
                <span class="resource-desc">${r.desc}</span>
              </span>
            </a>
          `).join('')}
        </div>` : ''}
      </div>
    </div>
  `).join('');
}
