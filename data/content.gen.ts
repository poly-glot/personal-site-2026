import type { BlogPost, WorkProject } from "@/src/types.ts";

export const POSTS: BlogPost[] = [
  {
    "id": "adr-as-build-gates",
    "title":
      "What HookLab's out-of-date README taught me about written decisions",
    "deck":
      "I write my decisions down in READMEs and rules files. The ones something checked were still true.",
    "date": "2026-11-15",
    "year": 2026,
    "topics": [
      "Architecture",
      "Process",
    ],
    "readMin": 7,
    "abstract": "GATE",
    "tone": "linear-gradient(135deg, #f8a41d22, #02292008)",
    "teaser":
      "I went back through four of my projects to see which written decisions were still true.",
    "toc": [
      {
        "id": "which-stayed-true",
        "text": "Which of my decisions stayed true",
      },
      {
        "id": "four-places",
        "text": "The guest limit, written in four places",
      },
      {
        "id": "two-small-checks",
        "text": "Two small checks",
      },
      {
        "id": "not-everything",
        "text": "Decisions I would not check",
      },
      {
        "id": "closing",
        "text": "Try it on one decision",
      },
    ],
  },
  {
    "id": "hiring-principal-engineers",
    "title": "What I look for in a Principal Engineer",
    "deck":
      "I used to be proud of being needed for everything. Now I look for a Principal Engineer whose team runs well on a day they're not there.",
    "date": "2026-11-15",
    "year": 2026,
    "topics": [
      "Career",
      "Engineering Culture",
      "Checklist",
    ],
    "readMin": 9,
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #f8a41d22, #65656511)",
    "teaser":
      "I explain how I'd interview a Principal Engineer, and what being always on taught me.",
    "toc": [
      {
        "id": "guardrails",
        "text": "From always on to guardrails",
      },
      {
        "id": "the-role",
        "text": "The other half of the job",
      },
      {
        "id": "what-i-ask",
        "text": "Four questions I'd ask",
      },
      {
        "id": "a-real-document",
        "text": "A real document instead of a whiteboard",
      },
      {
        "id": "signals",
        "text": "Signals I look for",
      },
      {
        "id": "closing",
        "text": "The same test for me",
      },
    ],
  },
  {
    "id": "openguessr-fair-play",
    "title": "What building OpenGuessr taught me about security",
    "deck":
      "OpenGuessr is a geography game that friends play from one link. The server works out every score. It also sends every player's browser the answers to all five rounds, and so far the fix is only a plan.",
    "date": "2026-05-04",
    "year": 2026,
    "topics": [
      "Architecture",
      "Open Source",
      "Checklist",
    ],
    "readMin": 12,
    "abstract": "MAP",
    "tone": "linear-gradient(135deg, #f8a41d22, #f8a41d05)",
    "teaser": "Anything a game sends to the browser, the player can read.",
    "toc": [
      {
        "id": "the-browser",
        "text": "Why a browser game is hard to keep fair",
      },
      {
        "id": "the-score",
        "text": "The server works out the score",
      },
      {
        "id": "the-distance",
        "text": "Measuring how far off a pin is",
      },
      {
        "id": "the-rules",
        "text": "The database checks every read and write",
      },
      {
        "id": "the-leak",
        "text": "Every player can read the answers",
      },
      {
        "id": "the-fix",
        "text": "The fix so far is only a plan",
      },
      {
        "id": "the-audit",
        "text": "Four holes I closed on 7 April",
      },
      {
        "id": "smaller-gaps",
        "text": "Three smaller holes, still open",
      },
      {
        "id": "checklist",
        "text": "A checklist for small multiplayer games",
      },
      {
        "id": "closing",
        "text": "In short",
      },
    ],
  },
  {
    "id": "platform-team-outcomes",
    "title": "What 29 apps taught me about measuring a platform",
    "deck":
      "I run a small platform for my own apps. Counting what it holds told me little, so I counted how often each new app needed me to change something in its first week.",
    "date": "2026-11-15",
    "year": 2026,
    "topics": [
      "Engineering Culture",
      "Platform",
    ],
    "readMin": 5,
    "abstract": "GRID",
    "tone": "linear-gradient(135deg, #f8a41d22, #65656520)",
    "teaser":
      "My first WordPress site needed five changes to its setup on my platform in its first week. The six I built after it needed one between them, plus three changes to the module they share.",
    "toc": [
      {
        "id": "receipts",
        "text": "Counting what the platform holds",
      },
      {
        "id": "first-week",
        "text": "Counting each app's first week",
      },
      {
        "id": "wordpress",
        "text": "The six WordPress sites",
      },
      {
        "id": "limits",
        "text": "Where the counts fall short",
      },
      {
        "id": "closing",
        "text": "Try it on your own platform",
      },
    ],
  },
  {
    "id": "react-hook-budgets",
    "title": "One websocket, not 600: fixing a slow React dashboard",
    "deck":
      "Every card on our asset dashboard opened its own websocket. Throttling them didn't help. Sharing one did.",
    "date": "2025-09-18",
    "year": 2025,
    "topics": [
      "Performance",
      "DevEx",
      "Engineering Culture",
      "Checklist",
    ],
    "readMin": 7,
    "abstract": "HOOK",
    "tone": "linear-gradient(135deg, #f8a41d22, #01010108)",
    "teaser":
      "Before you put setup inside a hook, ask how many copies of it will be on the page.",
    "toc": [
      {
        "id": "the-symptom",
        "text": "The problem",
      },
      {
        "id": "the-diagnosis",
        "text": "The cause",
      },
      {
        "id": "the-wrong-fix",
        "text": "What didn't work: throttling",
      },
      {
        "id": "the-right-fix",
        "text": "What worked: one shared connection",
      },
      {
        "id": "hook-budgets",
        "text": "The rule we use now",
      },
      {
        "id": "what-i-tell-juniors",
        "text": "A checklist for hooks",
      },
      {
        "id": "closing",
        "text": "In short",
      },
    ],
  },
];

export const PROJECTS: WorkProject[] = [
  {
    "id": "amazing-landing",
    "name": "Amazing Landing",
    "tagline": "Three questions. One product. One boutique.",
    "summary":
      "A skincare quiz for in-store promotions. A customer answers three questions, gets one recommended product and a voucher to collect a free trial of it, and is pointed to the nearest boutique. First shipped in 2015, rebuilt in 2026 beside the original.",
    "client": "Azadi Cosmetics, an imaginary brand",
    "delivered": "Desktop and mobile quiz, voucher email, admin, API",
    "role": "System author",
    "layout": "chapters",
    "stack": [
      "Vite",
      "Web Animations API",
      "Go",
      "Firestore",
      "Cloud Run",
    ],
    "domains": [
      "CMS",
      "High End Campaigns",
    ],
    "year": 2015,
    "period": "2015 → 2026",
    "url": "amazing-landing.junaid.guru",
    "href": "https://amazing-landing.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #c2185b1f, #f8a41d0a)",
    "cover": "/img/work/amazing-landing.webp",
    "source": "https://github.com/poly-glot/amazing-landing",
    "video": {
      "src": "/video/amazing-landing.mp4",
      "poster": "/video/amazing-landing.webp",
      "captions": "/video/amazing-landing.vtt",
    },
  },
  {
    "id": "azadi-go",
    "name": "Azadi",
    "tagline": "One finance portal, built on three runtimes.",
    "summary":
      "The customer portal for Azadi Financial Services, the finance arm of an imaginary luxury car maker. Customers sign in with their agreement details, pay by card, settle early and keep their bank details up to date. I built it three times, in Spring Boot, Helidon and Go, to measure what the runtime costs on Cloud Run.",
    "client": "Azadi Financial Services, an imaginary brand",
    "delivered": "Customer portal, card payments, three backends, Terraform",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Java",
      "Spring",
      "Helidon",
      "Go",
      "Firestore",
      "Stripe",
      "Cloud Run",
    ],
    "domains": [
      "Automotive",
    ],
    "year": 2026,
    "url": "azadi-go.junaid.guru",
    "href": "https://azadi-go.junaid.guru/",
    "abstract": "FLAG",
    "tone": "linear-gradient(135deg, #02292022, #03222808)",
    "cover": "/img/work/azadi-go.webp",
    "source": "https://github.com/poly-glot/azadi-go",
    "video": {
      "src": "/video/azadi-go.mp4",
      "poster": "/video/azadi-go.webp",
      "captions": "/video/azadi-go.vtt",
    },
  },
  {
    "id": "bhx-travel",
    "name": "BHX Travel",
    "tagline":
      "A minibus hire website the owners edit themselves, built to bring in quotes.",
    "summary":
      "BHX Travel hires out minibuses and coaches with drivers from Birmingham. Every job is priced by hand, so the website had one real job, to get a group to ask for a quote. The owners also wanted to change their own pages without calling a developer. The site is built in Next.js on Vercel, edited visually in Builder.io, and sends every quote request straight to the owners' inbox.",
    "client": "BHX Travel",
    "delivered":
      "Website, visual page editor, quote form and enquiry email, weekly content backup",
    "role": "Lead developer",
    "layout": "chapters",
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "Builder.io",
      "Vercel",
      "Resend",
    ],
    "domains": [
      "Travel",
    ],
    "year": 2022,
    "url": "bhxtravel.com",
    "href": "https://bhxtravel.com/",
    "abstract": "PLANE",
    "tone": "linear-gradient(135deg, #e5262620, #1a1a1a08)",
    "cover": "/img/work/bhx-travel.webp",
    "source": "https://github.com/poly-glot/bhxtravel",
  },
  {
    "id": "crea8ive",
    "name": "Crea8ive Design",
    "tagline":
      "A logo studio's website from 2007, built to sell and to be found.",
    "summary":
      "Crea8ive Design sold custom logos, websites and stationery online from 2007, with packages from $99. The site had to do the selling on its own. It showed the work, made the prices clear, explained the process, and ranked for the phrases customers typed into search. It used the best web techniques of its day, and it is still online, exactly as it was.",
    "client": "Crea8ive Design",
    "delivered":
      "Studio website, packages and portfolio, 23 search landing pages, archive",
    "role": "Lead developer",
    "layout": "chapters",
    "stack": [
      "PHP",
      "jQuery",
      "XHTML",
      "CSS",
      "Firebase",
    ],
    "domains": [
      "E-commerce",
    ],
    "year": 2007,
    "period": "2007 → 2026",
    "url": "crea8ivedesign.junaid.guru",
    "href": "https://crea8ivedesign.junaid.guru/",
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #1565c020, #f8a41d0a)",
    "cover": "/img/work/crea8ive.webp",
    "source": "https://github.com/poly-glot/crea8ivedesign",
  },
  {
    "id": "ech-uk",
    "name": "Elite Care Homes",
    "tagline":
      "A care home's website for families choosing care, built for phones in 2014.",
    "summary":
      "Elite Care Homes runs residential care in Birmingham for adults aged 18 to 64 with autism, Asperger's syndrome and learning disabilities. Its website was for families making one of the hardest decisions they face. It explained the care in plain words, showed the home, turned the company's values into its colours, and worked on any screen when responsive design was still new.",
    "client": "Elite Care Homes Ltd",
    "delivered": "Website, 13 pages, responsive layout, cookie policy",
    "role": "Lead developer",
    "layout": "chapters",
    "stack": [
      "HTML5",
      "CSS",
      "JavaScript",
      "Firebase",
    ],
    "domains": [
      "Healthcare",
    ],
    "year": 2014,
    "url": "ech-uk.web.app",
    "href": "https://ech-uk.web.app/",
    "abstract": "GRID",
    "tone": "linear-gradient(135deg, #00a3e022, #ffffff05)",
    "cover": "/img/work/ech-uk.webp",
  },
  {
    "id": "hooklab",
    "name": "HookLab",
    "tagline": "How do you let strangers run code on your server?",
    "summary":
      "A webhook tool for developers. Create an endpoint in seconds, see every request that arrives, and script the reply in JavaScript. Every script is written by a stranger and runs on my server, so I designed for that person first.",
    "client": "My own product",
    "delivered":
      "Web app, webhook receiver, script sandbox, reporting chat, Terraform",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Deno",
      "React",
      "Firestore",
      "Cloud Run",
      "Terraform",
    ],
    "domains": [
      "Reporting",
    ],
    "year": 2026,
    "url": "hooklab.junaid.guru",
    "href": "https://hooklab.junaid.guru/",
    "abstract": "HOOK",
    "tone": "linear-gradient(135deg, #f8a41d22, #01010108)",
    "cover": "/img/work/hooklab.webp",
    "source": "https://github.com/poly-glot/hooklab",
    "video": {
      "src": "/video/hooklab.mp4",
      "poster": "/video/hooklab.webp",
      "captions": "/video/hooklab.vtt",
    },
  },
  {
    "id": "openguessr",
    "name": "OpenGuessr",
    "tagline": "A geography game for friends, played from one link.",
    "summary":
      "A free, open-source game for a group of friends. Everyone sees the same Street View panorama, drops a pin where they think it is, and scores by how close they get. The places come from a daily pipeline. Gemini suggests ordinary streets, and Google's Street View data confirms each one is real.",
    "client": "My own product, open source",
    "delivered":
      "Multiplayer game, location pipeline, Cloud Functions, Playwright suite",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "JavaScript",
      "Lit",
      "Firebase",
      "Gemini",
      "Leaflet",
      "Google Maps",
    ],
    "domains": [
      "Games",
    ],
    "year": 2026,
    "url": "openguessr.junaid.guru",
    "href": "https://openguessr.junaid.guru/",
    "abstract": "MAP",
    "tone": "linear-gradient(135deg, #2e7d3220, #01010808)",
    "cover": "/img/work/openguessr.webp",
    "source": "https://github.com/poly-glot/openguessr",
    "video": {
      "src": "/video/openguessr.mp4",
      "poster": "/video/openguessr.webp",
      "captions": "/video/openguessr.vtt",
    },
  },
];
