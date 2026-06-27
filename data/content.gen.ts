import type { BlogPost, WorkProject } from "@/src/types.ts";

export const POSTS: BlogPost[] = [
  {
    "id": "adr-as-build-gates",
    "title": "Turning ADRs into build-time gates",
    "deck":
      "Stop writing decisions you can't enforce. Pin the rule into the pipeline.",
    "date": "2026-04-12",
    "year": 2026,
    "topics": [
      "Architecture",
      "Process",
    ],
    "readMin": 11,
    "abstract": "GATE",
    "tone": "linear-gradient(135deg, #f8a41d22, #02292008)",
    "teaser":
      "Most ADRs read like wishes. The ones that survive are the ones the build refuses to merge without.",
    "toc": [
      {
        "id": "why-adrs-rot",
        "text": "Why ADRs rot",
      },
      {
        "id": "three-questions",
        "text": "Three questions during review",
      },
      {
        "id": "worked-example",
        "text": "A worked example: ADR-027",
      },
      {
        "id": "escape-hatches",
        "text": "Escape hatches, on purpose",
      },
      {
        "id": "what-changes-culturally",
        "text": "What this changes culturally",
      },
      {
        "id": "what-not-to-gate",
        "text": "What not to gate",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "editorial-design-systems",
    "title": "Editorial design systems for engineers",
    "deck":
      "Tokens are not enough. The system is the rhythm — bands, numbers, pauses, italics.",
    "date": "2025-02-08",
    "year": 2025,
    "topics": [
      "DevEx",
      "Process",
    ],
    "readMin": 12,
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #f8a41d22, #ffffff05)",
    "teaser":
      "A design system without a rhythm is a fontconfig. The rhythm is what makes a page feel intentional.",
    "toc": [
      {
        "id": "what-tokens-miss",
        "text": "What tokens miss",
      },
      {
        "id": "the-rhythm-we-use",
        "text": "The rhythm we use",
      },
      {
        "id": "why-numbered-eyebrows",
        "text": "Why numbered eyebrows",
      },
      {
        "id": "italic-restraint",
        "text": "Italic restraint",
      },
      {
        "id": "accent-discipline",
        "text": "Accent as content, not chrome",
      },
      {
        "id": "what-this-costs",
        "text": "What this costs",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "hiring-principal-engineers",
    "title": "What I look for in a Principal Engineer",
    "deck":
      "Less heroics, more thermostats. The job is to set the temperature of the room.",
    "date": "2025-07-30",
    "year": 2025,
    "topics": [
      "Career",
      "Engineering Culture",
    ],
    "readMin": 10,
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #f8a41d22, #65656511)",
    "teaser":
      "You are not hired to be the smartest person in the room. You are hired to make the room smarter.",
    "toc": [
      {
        "id": "thermostats",
        "text": "Thermostats, not heroes",
      },
      {
        "id": "what-i-ask",
        "text": "What I actually ask",
      },
      {
        "id": "what-i-avoid",
        "text": "What I avoid",
      },
      {
        "id": "signals-i-watch",
        "text": "Signals I watch for",
      },
      {
        "id": "the-anti-signals",
        "text": "Anti-signals",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "open-source-without-burnout",
    "title": "Running OpenGuessr without burning out",
    "deck":
      "Notes from two years of maintainer life. The PRs you don't merge matter most.",
    "date": "2025-05-14",
    "year": 2025,
    "topics": [
      "Open Source",
      "Process",
      "Career",
    ],
    "readMin": 11,
    "abstract": "MAP",
    "tone": "linear-gradient(135deg, #f8a41d22, #f8a41d05)",
    "teaser":
      "Saying no with grace is the first skill. Saying no with a CONTRIBUTING.md that explains why is the second.",
    "toc": [
      {
        "id": "saying-no",
        "text": "Saying no, with a CONTRIBUTING file",
      },
      {
        "id": "cadence",
        "text": "Cadence over heroism",
      },
      {
        "id": "triage-rules",
        "text": "Triage rules I borrowed and never gave back",
      },
      {
        "id": "the-hard-conversations",
        "text": "The hard conversations",
      },
      {
        "id": "sponsorship",
        "text": "On sponsorship",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "platform-team-outcomes",
    "title": "A platform team's outcomes are its consumers' outcomes",
    "deck":
      "You don't get credit for shipping internal tools. You get credit for what your tenants ship.",
    "date": "2026-01-22",
    "year": 2026,
    "topics": [
      "Engineering Culture",
      "Platform",
    ],
    "readMin": 9,
    "abstract": "GRID",
    "tone": "linear-gradient(135deg, #f8a41d22, #65656520)",
    "teaser":
      "This is the most important sentence in our team handbook. The second-most is also about consumers.",
    "toc": [
      {
        "id": "the-trap",
        "text": "The trap",
      },
      {
        "id": "what-we-measure",
        "text": "What we measure instead",
      },
      {
        "id": "office-hours",
        "text": "Office hours, on purpose",
      },
      {
        "id": "saying-no",
        "text": "Saying no, in a way that helps",
      },
      {
        "id": "celebrate-tenants",
        "text": "Celebrate the tenants, not yourselves",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "react-hook-budgets",
    "title": "Hook budgets: a useThrottle story",
    "deck":
      "What happens when 600 cards each open a websocket. (Nothing good. Then we fixed it.)",
    "date": "2025-09-18",
    "year": 2025,
    "topics": [
      "Performance",
      "DevEx",
      "Engineering Culture",
    ],
    "readMin": 8,
    "abstract": "HOOK",
    "tone": "linear-gradient(135deg, #f8a41d22, #01010108)",
    "teaser":
      "Treat hooks like budgets, not utilities. The 601st card is the one that takes you out.",
    "toc": [
      {
        "id": "the-symptom",
        "text": "The symptom",
      },
      {
        "id": "the-diagnosis",
        "text": "The diagnosis",
      },
      {
        "id": "the-wrong-fix",
        "text": "The wrong fix",
      },
      {
        "id": "the-right-fix",
        "text": "The right fix",
      },
      {
        "id": "hook-budgets",
        "text": "Hook budgets",
      },
      {
        "id": "what-i-tell-juniors",
        "text": "What I tell juniors",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "signposting-integrations",
    "title": "Signposting: integrations without owning state",
    "deck":
      "Why Luma never holds tenant credentials, and why every integration is one redirect away.",
    "date": "2025-11-04",
    "year": 2025,
    "topics": [
      "Architecture",
      "Platform",
    ],
    "readMin": 12,
    "abstract": "SIGN",
    "tone": "linear-gradient(135deg, #f8a41d22, #02292011)",
    "teaser":
      "State is a liability. Borrow it; do not warehouse it. The rest of the design follows from there.",
    "toc": [
      {
        "id": "the-stance",
        "text": "The stance",
      },
      {
        "id": "how-it-works",
        "text": "How it works in practice",
      },
      {
        "id": "hard-cases",
        "text": "The hard cases",
      },
      {
        "id": "compliance-side",
        "text": "The compliance side-effect",
      },
      {
        "id": "what-this-cost",
        "text": "What this cost us",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
  {
    "id": "strangler-without-pain",
    "title": "A strangler-fig migration without the pain",
    "deck":
      "How Project Boston pulled Smart Tagging out of Luma — Redis queue, single leader, no downtime.",
    "date": "2026-03-02",
    "year": 2026,
    "topics": [
      "Architecture",
      "Platform",
    ],
    "readMin": 16,
    "abstract": "FIG",
    "tone": "linear-gradient(135deg, #f8a41d22, #1a1a1a11)",
    "teaser":
      "The trick is not the pattern. The trick is what you do with the queue depth on day three.",
    "toc": [
      {
        "id": "the-shape",
        "text": "The shape of the migration",
      },
      {
        "id": "day-one",
        "text": "Day one is easy",
      },
      {
        "id": "day-three",
        "text": "Day three is the test",
      },
      {
        "id": "single-leader",
        "text": "Single leader, on purpose",
      },
      {
        "id": "dual-write-window",
        "text": "The dual-write window",
      },
      {
        "id": "decom-trap",
        "text": "The decommissioning trap",
      },
      {
        "id": "reusable-pattern",
        "text": "What we reused",
      },
      {
        "id": "closing",
        "text": "Closing thought",
      },
    ],
  },
];

export const PROJECTS: WorkProject[] = [
  {
    "id": "amazing-landing",
    "name": "Amazing Landing",
    "tagline": "A pattern library for high-conversion pages.",
    "summary":
      "Reusable landing-page patterns — heroes, testimonials, pricing, CTAs — that compose into something honest. Built to survive copy-pasting into client work without falling apart.",
    "role": "System author",
    "stack": [
      "HTML",
      "CSS",
      "Tokens",
    ],
    "domains": [
      "CMS",
      "High End Campaigns",
    ],
    "year": 2022,
    "url": "amazing-landing.junaid.guru",
    "href": "https://amazing-landing.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #f8a41d22, #ffffff05)",
  },
  {
    "id": "automotive-planner",
    "name": "Automotive Planner",
    "tagline": "Production planning for OEM campaigns.",
    "summary":
      "Production planning, asset routing, and reporting for high-volume automotive content. Tight integration with global creative ops. Built once, runs across markets.",
    "role": "Tech Lead",
    "stack": [
      "C#",
      ".NET",
      "Azure",
      "React",
    ],
    "domains": [
      "Automotive",
      "Reporting",
    ],
    "year": 2022,
    "url": "internal · case study on request",
    "href": "#",
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #f8a41d22, #65656511)",
  },
  {
    "id": "azadi-go",
    "name": "Azadi Go",
    "tagline": "A landing experience celebrating freedom.",
    "summary":
      "Single-page narrative landing page. Editorial type, sequenced motion, no framework overhead. Made to feel like a printed broadsheet that breathes.",
    "role": "Solo build",
    "stack": [
      "HTML",
      "CSS",
      "Motion",
    ],
    "domains": [
      "High End Campaigns",
    ],
    "year": 2023,
    "url": "azadi-go.junaid.guru",
    "href": "https://azadi-go.junaid.guru/",
    "abstract": "FLAG",
    "tone": "linear-gradient(135deg, #02292022, #03222808)",
  },
  {
    "id": "bhx-travel",
    "name": "BHX Travel",
    "tagline": "Travel-booking product, live in market.",
    "summary":
      "Live commercial product. Search, itineraries, payments. Built with the trade-offs that real customers — not portfolios — expose.",
    "role": "Engineering",
    "stack": [
      "Java",
      "React",
      "SQL",
    ],
    "domains": [
      "E-commerce",
    ],
    "year": 2019,
    "url": "bhxtravel.com",
    "href": "https://bhxtravel.com/",
    "abstract": "PLANE",
    "tone": "linear-gradient(135deg, #f8a41d22, #022B3308)",
  },
  {
    "id": "boston",
    "name": "Project Boston",
    "tagline": "Strangler-fig migration vehicle.",
    "summary":
      "Pulled Smart Tagging out of Luma. Updates queue into Redis, picked up by a single Boston Leader instance that throttles writes into MySQL. Established a reusable pattern for any agent that needs to scale.",
    "role": "Principal Engineer",
    "stack": [
      "Java",
      "Redis",
      "Liquibase",
      "Spring",
    ],
    "domains": [
      "DAM",
      "Proxy",
    ],
    "year": 2024,
    "url": "internal · architecture note",
    "href": "#",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #f8a41d22, #1a1a1a11)",
  },
  {
    "id": "crea8ive",
    "name": "Crea8ive Design",
    "tagline": "Studio site for a creative agency.",
    "summary":
      "Studio identity rendered in motion. Showcase grid that earns attention through restraint — heavy when it needs to be, quiet when it doesn't.",
    "role": "Lead developer",
    "stack": [
      "React",
      "Animation",
    ],
    "domains": [
      "High End Campaigns",
      "CMS",
    ],
    "year": 2021,
    "url": "crea8ivedesign.junaid.guru",
    "href": "https://crea8ivedesign.junaid.guru/",
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #f8a41d22, #65656520)",
  },
  {
    "id": "ech-uk",
    "name": "ECH UK",
    "tagline": "Membership platform for a UK community.",
    "summary":
      "Real members, real auth, real data. Roles, gated content, and a working admin surface. Sized for a community, not a demo.",
    "role": "Tech Lead · Firebase",
    "stack": [
      "Firebase",
      "Auth",
      "Firestore",
    ],
    "domains": [
      "Directory",
      "CMS",
    ],
    "year": 2020,
    "url": "ech-uk.web.app",
    "href": "https://ech-uk.web.app/",
    "abstract": "GRID",
    "tone": "linear-gradient(135deg, #65656520, #ffffff05)",
  },
  {
    "id": "hooklab",
    "name": "HookLab",
    "tagline": "Playground for React hooks.",
    "summary":
      "A practical lab for sharing hook patterns — useThrottle, useIdle, useResource — with real demos. Built to teach a single concept per page, then get out of the way.",
    "role": "Author",
    "stack": [
      "React",
      "Vite",
      "MDX",
    ],
    "domains": [
      "Reporting",
    ],
    "year": 2023,
    "url": "hooklab.junaid.guru",
    "href": "https://hooklab.junaid.guru/",
    "abstract": "HOOK",
    "tone": "linear-gradient(135deg, #f8a41d22, #01010108)",
  },
  {
    "id": "luma-dam",
    "name": "Luma DAM",
    "tagline": "Digital asset platform at enterprise scale.",
    "summary":
      "Multi-tenant DAM serving hundreds of brands. Strict architectural principles: no state in Luma, file ops to Morpheus, integrations via signposting. The platform team's outcomes are its consumers' outcomes.",
    "role": "Lead Architect",
    "stack": [
      "Java",
      "Spring",
      "MySQL",
      "React",
    ],
    "domains": [
      "DAM",
      "CMS",
    ],
    "year": 2025,
    "url": "internal · case study on request",
    "href": "#",
    "abstract": "GRID",
    "tone": "linear-gradient(135deg, #f8a41d22, #02292011)",
  },
  {
    "id": "openguessr",
    "name": "OpenGuessr",
    "tagline": "Guess the place. Open-source GeoGuessr.",
    "summary":
      "An open, community-driven take on the location-guessing genre. Streetscape rendering, scoring rounds, multiplayer-ready architecture. Treated like a real platform — not a weekend hack.",
    "role": "Lead Engineer · Open Source",
    "stack": [
      "React",
      "Node",
      "Firebase",
    ],
    "domains": [
      "Mobile",
      "Directory",
    ],
    "year": 2024,
    "url": "openguessr.junaid.guru",
    "href": "https://openguessr.junaid.guru/",
    "abstract": "MAP",
    "tone": "linear-gradient(135deg, #f8a41d22, #f8a41d05)",
  },
];
