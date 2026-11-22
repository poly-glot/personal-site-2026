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
    "id": "academy",
    "name": "Academy",
    "tagline":
      "A 26-page brochure site its own staff can update without a developer.",
    "summary":
      "Academy is the website of an imaginary business-education body. I settled its content, components, accessibility and speed in plain HTML, then built it in WordPress.",
    "story": {
      "Audience": "Professionals and the organisations that train them.",
      "Outcome":
        "26 accessible, fast-loading pages built from 24 reusable components. Staff update the content themselves while the design stays consistent, and the site is deployed on secure infrastructure.",
    },
    "client": "Academy, an imaginary brand",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "WordPress",
      "PHP",
      "HTML5",
      "CSS",
      "Cloud Run",
      "Firebase",
    ],
    "domains": [
      "Education",
    ],
    "year": 2026,
    "url": "academy.junaid.guru",
    "href": "https://academy.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #0a5fa322, #ffffff05)",
    "cover": "/img/work/academy.webp",
    "source": "https://github.com/poly-glot/academy",
  },
  {
    "id": "airport-drupal",
    "name": "Meridian Airport",
    "tagline":
      "Airport pages that editors build in Drupal and travellers get from Next.js.",
    "summary":
      "The website for Meridian Airport, an imaginary two-terminal airport in Birmingham, written for travellers checking their trip before they leave the house. Editors build its 29 pages in Drupal from 48 components, and a separate Next.js app serves them to visitors. The decision worth reading is that split, and what an editor's save does to the cache.",
    "client": "Meridian Airport, an imaginary brand",
    "delivered":
      "29-page website, 48 React components, split-flap flight board, two Cloud Run services, publishing on save",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Drupal",
      "Next.js",
      "React",
      "Playwright",
      "Cloud Run",
    ],
    "domains": [
      "Travel",
      "CMS",
    ],
    "year": 2026,
    "url": "airport.junaid.guru",
    "href": "https://airport.junaid.guru/",
    "abstract": "PLANE",
    "tone": "linear-gradient(135deg, #14213d22, #ffffff05)",
    "cover": "/img/work/airport-drupal.webp",
    "source": "https://github.com/poly-glot/airport-drupal",
  },
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
    "id": "boxes",
    "name": "Boxes",
    "tagline":
      "A trade packaging shop where the price per pack drops as you order more.",
    "summary":
      "Boxes is the online shop of an imaginary packaging supplier, where small businesses buy boxes, mailers, bags and tape in packs and pay less per pack as they order more. I built it on WordPress with no shop plugin. The basket lives in the browser, and the server works out every price again before it stores an order request.",
    "client": "Boxes, an imaginary brand",
    "delivered":
      "Static prototype, WordPress theme and content model, browser basket, trade order form, content seed, Cloud Run deployment",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "WordPress",
      "PHP",
      "JavaScript",
      "Node.js",
      "Cloud Run",
    ],
    "domains": [
      "E-commerce",
    ],
    "year": 2026,
    "url": "boxes.junaid.guru",
    "href": "https://boxes.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #2d1b8022, #ffffff05)",
    "cover": "/img/work/boxes.webp",
    "source": "https://github.com/poly-glot/boxes",
  },
  {
    "id": "cabinet",
    "name": "Cabinet",
    "tagline":
      "One content system for many shops, with each shop's content kept to itself.",
    "summary":
      "Cabinet is a content management system for small shops and studios. Each workspace gets its own public site, admin area and GraphQL API, and every workspace shares one database. I wrote the rule that keeps one shop's content out of another's once, in the code every database read and save goes through, and it refuses to run when no workspace is set.",
    "client": "My own product, open source",
    "delivered":
      "Multi-workspace CMS, Page and post editor, Reusable blocks, GraphQL API, Content as code, Cloud Run deployment",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "CakePHP",
      "PHP",
      "MySQL",
      "GraphQL",
      "TipTap",
      "Cloud Run",
    ],
    "domains": [
      "CMS",
    ],
    "year": 2026,
    "url": "cms.junaid.guru",
    "href": "https://cms.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #4a6fa522, #ffffff05)",
    "cover": "/img/work/cabinet.webp",
    "source": "https://github.com/poly-glot/cms",
    "video": {
      "src": "/video/cabinet.mp4",
      "poster": "/video/cabinet.webp",
      "captions": "/video/cabinet.vtt",
    },
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
    "id": "donation",
    "name": "Charity Raffle",
    "tagline":
      "A charity raffle where every ticket number is accounted for, even under a rush.",
    "summary":
      "A raffle site for an imaginary UK charity, running in Stripe's test mode. Supporters pick £1 tickets, can add a donation with Gift Aid and pay by debit card, and the charity's staff run a recorded draw from a signed-in console. The decision worth reading is how it hands out each ticket number once, with no gaps, when payments arrive together.",
    "client": "An imaginary charity",
    "delivered":
      "Supporter checkout, ticket ledger, recorded draw, admin console, scheduled checks, stress test",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Rust",
      "AWS Lambda",
      "DynamoDB",
      "Stripe",
      "Terraform",
      "Cognito",
    ],
    "domains": [
      "Charity",
    ],
    "year": 2026,
    "url": "donation.junaid.guru",
    "href": "https://donation.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #1c90e322, #ffffff05)",
    "cover": "/img/work/donation.webp",
    "source": "https://github.com/poly-glot/donation",
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
    "url": "ech.junaid.guru",
    "href": "https://ech.junaid.guru/",
    "abstract": "GRID",
    "tone": "linear-gradient(135deg, #00a3e022, #ffffff05)",
    "cover": "/img/work/ech-uk.webp",
  },
  {
    "id": "flyvipcms",
    "name": "FlyVIP",
    "tagline":
      "A private-jet club's points and bookings, written once in PHP and again in .NET.",
    "summary":
      "A membership system for a private-jet club. Members turn their fees into points and spend them on seats or whole aircraft, and staff run the club from a back office. I rebuilt a 2015 app in PHP, then wrote it again in .NET with the same pages, and kept the points and refund rules identical in both.",
    "client": "My own product",
    "delivered":
      "Member portal, admin back office, points ledger, shared-flight booking, PHP and .NET builds, Cloud Run pipelines",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "PHP",
      "CodeIgniter",
      "ASP.NET Core",
      "MySQL",
      "Playwright",
      "Cloud Run",
    ],
    "domains": [
      "CMS",
      "Travel",
    ],
    "year": 2026,
    "url": "flyvipcms.junaid.guru",
    "href": "https://flyvipcms.junaid.guru/",
    "abstract": "PLANE",
    "tone": "linear-gradient(135deg, #3a3dcb22, #ffffff05)",
    "cover": "/img/work/flyvipcms.webp",
    "source": "https://github.com/poly-glot/flyvipcms",
    "video": {
      "src": "/video/flyvipcms.mp4",
      "poster": "/video/flyvipcms.webp",
      "captions": "/video/flyvipcms.vtt",
    },
  },
  {
    "id": "halveron",
    "name": "Halveron",
    "tagline":
      "A consultancy's 57-page site for four kinds of visitor, where every sector page shows who to contact.",
    "summary":
      "Halveron is the website of an imaginary operations and customer-experience consultancy, for the operations leaders it helps, people choosing a course, members of its forum and job seekers. I settled its content, components and accessibility in plain HTML, then built it in WordPress.",
    "story": {
      "Audience":
        "Operations leaders in UK service organisations, people choosing a course, members of a peer forum, and job seekers.",
      "Outcome":
        "57 pages that work on a phone and from a keyboard, built from 39 reusable components, with a section for each of the four kinds of visitor. Staff update the content themselves and enter each person once, so every page that names them agrees. The site is deployed on secure infrastructure.",
    },
    "client": "Halveron Consulting, an imaginary brand",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "WordPress",
      "PHP",
      "CSS",
      "Cloud Run",
      "Firebase",
    ],
    "domains": [
      "Professional Services",
    ],
    "year": 2026,
    "url": "halveron.junaid.guru",
    "href": "https://halveron.junaid.guru/",
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #39207c22, #ffffff05)",
    "cover": "/img/work/halveron.webp",
    "source": "https://github.com/poly-glot/halveron",
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
    "id": "legal",
    "name": "Ferrow & Lisle",
    "tagline":
      "A website for an imaginary disputes firm in London and New York.",
    "summary":
      "Ferrow & Lisle is an imaginary disputes firm in London and New York, and this is its WordPress website for companies looking for counsel. The layout follows an existing design, and a written contract replaced the brand, the words and the images. The decision worth reading is the world map, where each pin is two numbers an editor types in.",
    "client": "Ferrow & Lisle, an imaginary brand",
    "delivered":
      "WordPress theme, brand and icon set, dotted world map, repeatable content seed, enquiry form, Cloud Run deployment",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "WordPress",
      "PHP",
      "Docker",
      "Cloud Run",
      "Firebase",
    ],
    "domains": [
      "Professional Services",
    ],
    "year": 2026,
    "url": "legal.junaid.guru",
    "href": "https://legal.junaid.guru/",
    "abstract": "MAP",
    "tone": "linear-gradient(135deg, #00145e22, #ffffff05)",
    "cover": "/img/work/legal.webp",
    "source": "https://github.com/poly-glot/legal",
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
  {
    "id": "outrun",
    "name": "Outrun Extinction",
    "tagline":
      "An imaginary charity run page that asks five questions, then shows your way in.",
    "summary":
      "Outrun Extinction 2027 is an imaginary charity run, 12 Sunday mornings across the UK to raise money for cheetahs. Its page asks five questions and rearranges itself around the answer, in the browser with no server behind it. The same build now hosts a second campaign, and automated accessibility checks have to pass before each deploy.",
    "client": "Outrun Extinction, an imaginary brand",
    "delivered":
      "Campaign site in English and German, five-question quiz, second campaign on the same build, accessibility checks in CI",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Next.js",
      "React",
      "TypeScript",
      "MDX",
      "Framer Motion",
      "Firebase",
    ],
    "domains": [
      "Charity",
      "High End Campaigns",
    ],
    "year": 2026,
    "url": "outrun.junaid.guru",
    "href": "https://outrun.junaid.guru/outrun/en",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #ffcd1122, #ffffff05)",
    "cover": "/img/work/outrun.webp",
    "source": "https://github.com/poly-glot/outrun",
  },
  {
    "id": "parley",
    "name": "Parley",
    "tagline":
      "A communications agency's website that shows its work by region.",
    "summary":
      "Parley is the website of an imaginary London communications agency for clients caught up in complex international issues. It shows the agency's work by region, with coordinates and results, and takes a confidential first message. I built it as a WordPress theme with one stylesheet and 2,499 bytes of JavaScript, and the menu and carousels work without the script.",
    "client": "Parley, an imaginary brand",
    "delivered":
      "WordPress theme, YAML content model, rerunnable content seed, enquiry form, Cloud Run deploy pipeline",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "WordPress",
      "PHP",
      "CSS",
      "Cloud Run",
      "Firebase",
    ],
    "domains": [
      "Professional Services",
    ],
    "year": 2026,
    "url": "parley.junaid.guru",
    "href": "https://parley.junaid.guru/",
    "abstract": "MAP",
    "tone": "linear-gradient(135deg, #16299c22, #ffffff05)",
    "cover": "/img/work/parley.webp",
    "source": "https://github.com/poly-glot/parley",
  },
  {
    "id": "shorten",
    "name": "shorten",
    "tagline":
      "A link shortener that routes each visitor by country and device, with no accounts.",
    "summary":
      "A link shortener anyone can use without signing up. One short link sends visitors to different places by country, region, platform and device, and a secret shown once is the only key to change it. The decision worth reading about is the redirect, which costs one database read at most and none when CloudFront has the answer cached.",
    "client": "My own product",
    "delivered":
      "Web app, Rust Lambda functions, CloudFront edge function, nightly click count, CI and deploy workflows",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Rust",
      "AWS Lambda",
      "CloudFront",
      "DynamoDB",
      "Athena",
      "JavaScript",
    ],
    "domains": [
      "Developer Tools",
    ],
    "year": 2026,
    "url": "shorten.junaid.guru",
    "href": "https://shorten.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #1c90e322, #ffffff05)",
    "cover": "/img/work/shorten.webp",
    "source": "https://github.com/poly-glot/shorten",
    "video": {
      "src": "/video/shorten.mp4",
      "poster": "/video/shorten.webp",
      "captions": "/video/shorten.vtt",
    },
  },
  {
    "id": "txtlocal",
    "name": "txtlocal",
    "tagline":
      "Business texting on AWS Lambda, with a fake carrier so the demo costs nothing.",
    "summary":
      "A business texting platform for a small team that sends texts to its customers and pays for each one in pounds. It has a console, a developer API and Stripe billing, and every message passes one send policy and one gateway, which runs a fake carrier on the live site. The worker claims each text before it calls AWS, so a retried job never sends it twice.",
    "client": "My own product",
    "delivered":
      "Web console, developer API, signed webhooks, Stripe billing, four SMS modes, landing page",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Python",
      "FastAPI",
      "AWS Lambda",
      "DynamoDB",
      "React",
      "Stripe",
    ],
    "domains": [
      "Messaging",
    ],
    "year": 2026,
    "url": "txtlocal.junaid.guru",
    "href": "https://txtlocal.junaid.guru/",
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #2657c422, #ffffff05)",
    "cover": "/img/work/txtlocal.webp",
    "source": "https://github.com/poly-glot/txtlocal",
    "video": {
      "src": "/video/txtlocal.mp4",
      "poster": "/video/txtlocal.webp",
      "captions": "/video/txtlocal.vtt",
    },
  },
  {
    "id": "wealth",
    "name": "Wealth",
    "tagline":
      "An investment manager's 26-page site where every strategy leads to the people who run it.",
    "summary":
      "Wealth is the website of an imaginary investment manager in London, written for professional investors. I settled its content, components and accessibility in plain HTML, then built it in WordPress.",
    "story": {
      "Audience":
        "Professional investors, such as pension schemes, insurers, charities and family offices, and the advisers who work with them.",
      "Outcome":
        "26 pages built from 20 reusable components, and each strategy names the people who manage it. Staff update the content themselves and enter each strategy's managers just once, so every page agrees. The site is deployed on secure infrastructure.",
    },
    "client": "Wealth Asset Management, an imaginary brand",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "WordPress",
      "PHP",
      "Docker",
      "Cloud Run",
      "Firebase",
    ],
    "domains": [
      "Professional Services",
    ],
    "year": 2026,
    "url": "wealth.junaid.guru",
    "href": "https://wealth.junaid.guru/",
    "abstract": "DOTS",
    "tone": "linear-gradient(135deg, #58727922, #ffffff05)",
    "cover": "/img/work/wealth.webp",
    "source": "https://github.com/poly-glot/wealth",
  },
  {
    "id": "zig-directory",
    "name": "DMOZSTYLE",
    "tagline":
      "A three-million-link web directory on a database I built in Zig.",
    "summary":
      "DMOZSTYLE is a web directory of 3,042,240 links in the style of DMOZ, the old Open Directory Project. People browse it by topic or describe the site they want, and AI assistants ask it the same questions through MCP. Underneath is dmozdb, a database server I built in Zig that confirms a write only once it is on disk.",
    "client": "My own product",
    "delivered":
      "Database server in Zig, directory website, hybrid search, MCP server and JSON API, benchmarks and evaluation harness",
    "role": "System author",
    "kind": "study",
    "layout": "chapters",
    "stack": [
      "Zig",
      "Deno",
      "Fresh",
      "Preact",
      "Python",
      "Kubernetes",
    ],
    "domains": [
      "Directory",
    ],
    "year": 2026,
    "url": "directory.junaid.guru",
    "href": "https://directory.junaid.guru/",
    "abstract": "BLOCKS",
    "tone": "linear-gradient(135deg, #0a0a0a22, #ffffff05)",
    "cover": "/img/work/zig-directory.webp",
    "source": "https://github.com/poly-glot/zig-directory",
  },
];
