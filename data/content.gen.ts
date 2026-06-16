import type { PostWithBody, ProjectWithBody } from "@/src/types.ts";

export const POSTS: PostWithBody[] = [
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "Most architectural decision records read like wishes. Someone writes a markdown file, the team nods in a review, the file goes into a /docs folder, and within a quarter the codebase is ignoring it. The rule still exists in the wiki. The build doesn't care.",
      },
      {
        "kind": "p",
        "text":
          "The fix is not better writing. The fix is a build that refuses to merge code that violates the decision.",
      },
      {
        "kind": "pull",
        "text": "An ADR you can't enforce is a feeling, not an architecture.",
      },
      {
        "kind": "h2",
        "id": "why-adrs-rot",
        "text": "Why ADRs rot",
      },
      {
        "kind": "p",
        "text":
          "There is a predictable arc. Quarter one: the team writes an ADR, everyone agrees, the rule is fresh in everyone's head. Quarter two: a new contributor onboards, doesn't read /docs, makes a small violation in a feature PR. The reviewer is busy and the diff is small. The rule erodes by 1%.",
      },
      {
        "kind": "p",
        "text":
          "Quarter three: another small erosion. By quarter four, half the team can't tell you what the original ADR said, and the codebase contains three counter-examples. The rule is dead. It died in code review, one tired Tuesday at a time.",
      },
      {
        "kind": "p",
        "text":
          "This is not a discipline problem. This is a system problem. Discipline is what you fall back on when the system isn't doing its job.",
      },
      {
        "kind": "h2",
        "id": "three-questions",
        "text": "Three questions during review",
      },
      {
        "kind": "p",
        "text":
          "For every ADR we write, we now ask three questions before merging the prose:",
      },
      {
        "kind": "list",
        "items": [
          "What is the rule, expressed as a check a CI job can run?",
          "What is the failure message that explains the why, not just the what?",
          "What is the escape hatch, and who approves its use?",
        ],
      },
      {
        "kind": "p",
        "text":
          "If we can't answer all three, the ADR is not ready. We don't merge the prose until we can also merge the gate. They ship together or not at all.",
      },
      {
        "kind": "p",
        "text":
          "This sounds heavy. In practice it adds maybe an hour to the ADR. The hour pays itself back the first time someone reaches for the pattern in a stale codebase eighteen months later.",
      },
      {
        "kind": "h2",
        "id": "worked-example",
        "text": "A worked example: ADR-027",
      },
      {
        "kind": "p",
        "text":
          'Take ADR-027: "Luma never persists tenant credentials." The prose is clear, but on its own it relies on every engineer reading it. The build-time gate looks like this:',
      },
      {
        "kind": "code",
        "lang": "bash",
        "text":
          "# fail the pipeline if a tenant-credential\n# field appears anywhere outside the signposting module\nrg --type java -e 'TenantCredential' \\\n   --glob '!**/signposting/**' \\\n   --glob '!**/test/**' && exit 1 || exit 0",
      },
      {
        "kind": "p",
        "text":
          'Crude — but it has stopped two regressions in the last six months. Both PRs failed loudly, with a link back to the ADR. The conversation moved from "is this OK?" to "do we want to amend the decision?" That is the conversation worth having.',
      },
      {
        "kind": "h3",
        "id": "the-failure-message-matters-more-than-the-rule",
        "text": "The failure message matters more than the rule",
      },
      {
        "kind": "p",
        "text":
          'When the gate fails, it doesn\'t print "violation in line 42." It prints two paragraphs explaining the architectural reason — borrowed credentials, short-lived tokens, audit-log integrity — and links to the ADR. The author of the failing PR knows, within thirty seconds, why the build is angry. They almost always agree with the rule by the time they finish reading. That is the goal.',
      },
      {
        "kind": "h2",
        "id": "escape-hatches",
        "text": "Escape hatches, on purpose",
      },
      {
        "kind": "p",
        "text":
          "Every gate has an escape hatch — a magic comment, a flag in a per-repo allowlist, an explicit override that requires two reviews from the ADR's authors. We don't pretend rules are absolute. We make exceptions visible.",
      },
      {
        "kind": "p",
        "text":
          "The escape hatch matters for two reasons. First, it acknowledges that real engineering involves trade-offs the rule didn't anticipate. Second, it gives us a queryable list of every place we deliberately violated our own design — material for the next ADR.",
      },
      {
        "kind": "callout",
        "title": "Rule of thumb",
        "text":
          "If the only thing keeping a decision alive is institutional memory, the decision is already on borrowed time. Pin it into the pipeline.",
      },
      {
        "kind": "h2",
        "id": "what-changes-culturally",
        "text": "What this changes culturally",
      },
      {
        "kind": "p",
        "text":
          'The first three gates we shipped felt heavy. By the tenth, the team was proposing them in design reviews — not as bureaucracy, but as a way of saying "I want this to still be true in eighteen months." That is when you know the practice has taken root.',
      },
      {
        "kind": "p",
        "text":
          "The other shift is conversational. ADR debates used to be performative — someone would argue against the rule in the abstract, win the meeting, and move on. Now those debates have weight, because the next step is a CI gate that you and everyone else has to live with. People bring sharper objections. They also concede faster, because the cost of being wrong is concrete.",
      },
      {
        "kind": "h2",
        "id": "what-not-to-gate",
        "text": "What not to gate",
      },
      {
        "kind": "p",
        "text":
          'Not every ADR deserves a build-time gate. Some decisions are advisory — "prefer composition over inheritance" — and trying to encode them in CI produces brittle, lint-flavoured noise. The test we use:',
      },
      {
        "kind": "list",
        "items": [
          "Can a junior engineer reasonably violate this without realising?",
          "Would a violation be expensive to unwind later?",
          "Is the rule enforceable with a check that won't drown the team in false positives?",
        ],
      },
      {
        "kind": "p",
        "text":
          "Three yeses: gate it. Two or fewer: write the ADR, document the rationale, accept that this one travels by oral tradition. Pick your battles. The gates that matter are the ones that pay rent every week.",
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "An architecture is what your build allows, not what your wiki claims. Treat your CI as a colleague who never gets tired, never has a bad week, and never forgets why a rule exists. Hand it the decisions you can't afford to lose.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "A design system is not a fontconfig with extra steps. It is a rhythm — bands, numbers, pauses, italics — that makes a product feel intentional. Tokens are necessary but not sufficient.",
      },
      {
        "kind": "pull",
        "text": "A design system without a rhythm is a fontconfig.",
      },
      {
        "kind": "h2",
        "id": "what-tokens-miss",
        "text": "What tokens miss",
      },
      {
        "kind": "p",
        "text":
          "Tokens describe atoms. They do not describe the cadence between atoms. They cannot tell you when to break the rules, when to leave space, when to let a number breathe across a column. A page with perfect tokens and no rhythm is what most enterprise software looks like. Functional, dead.",
      },
      {
        "kind": "p",
        "text":
          "The rhythm is editorial. It comes from print, not from web design. Magazines have known this for a century. Software is just catching up.",
      },
      {
        "kind": "h2",
        "id": "the-rhythm-we-use",
        "text": "The rhythm we use",
      },
      {
        "kind": "list",
        "items": [
          "Numbered eyebrows on every section, two-digit, monospace.",
          "Alternating bands between rows for editorial pace, not decoration.",
          "Italic emphasis only on the one phrase per page that earns it.",
          "Black solid CTAs, never tinted accent — the accent is for content, not chrome.",
          "Full-bleed rules between sections, never card-bordered groupings.",
        ],
      },
      {
        "kind": "p",
        "text":
          "Each of these is a small constraint. None of them are radical. The combination is what makes the page feel composed instead of arranged.",
      },
      {
        "kind": "h2",
        "id": "why-numbered-eyebrows",
        "text": "Why numbered eyebrows",
      },
      {
        "kind": "p",
        "text":
          "Section numbers tell you where you are. They also tell the designer where they are. Numbered eyebrows force you to count sections, which forces you to ask whether each section deserves a number — which is a useful editing pressure. By the time we ship a page, every numbered section justifies the count. The ones that didn't were cut.",
      },
      {
        "kind": "h2",
        "id": "italic-restraint",
        "text": "Italic restraint",
      },
      {
        "kind": "p",
        "text":
          "One italic phrase per page. That's the rule. The italic carries the emphasis you cannot delegate to colour or weight, because the reader will not believe colour or weight after the third paragraph. The italic still works in paragraph fifteen. Save it for then.",
      },
      {
        "kind": "callout",
        "title": "Test",
        "text":
          "Take a screenshot of any page. Cover the type. If you can still feel the rhythm of the page from the bands and the numbers alone, the system is working.",
      },
      {
        "kind": "h2",
        "id": "accent-discipline",
        "text": "Accent as content, not chrome",
      },
      {
        "kind": "p",
        "text":
          "The accent colour belongs to content — italic emphasis, the active section number, a single highlight on the one CTA that matters this page. It does not belong to chrome. Buttons, borders, header backgrounds: those stay black, white, neutral. The accent is precious because we use it sparingly. The moment it becomes decoration, it stops being a signal.",
      },
      {
        "kind": "h2",
        "id": "what-this-costs",
        "text": "What this costs",
      },
      {
        "kind": "p",
        "text":
          "Editorial systems are slower to ship. They require an editor — usually you, often the same person designing the page — to make calls about what gets the italic, what earns the band, which section to cut. They reward restraint and punish copy-paste. They are also harder to teach to a new designer, because the rules feel arbitrary until you've sat with them.",
      },
      {
        "kind": "p",
        "text":
          "The trade is that the resulting product feels like someone made it. Not a committee. Not a Figma library. A person, with taste and constraints. That is what users register, even when they can't name it.",
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "Build the tokens. Build them well. Then build the rhythm on top, and let the rhythm be the part new designers learn last. That is how a system stays a system, instead of decaying into a fontconfig.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "The best Principal Engineers I've worked with were not the smartest people in the room. They were the people who made the room smarter.",
      },
      {
        "kind": "p",
        "text":
          "This is the lens I use when I interview. It is also why I no longer ask system-design improv questions.",
      },
      {
        "kind": "pull",
        "text":
          "You are not hired to be the smartest person in the room. You are hired to make the room smarter.",
      },
      {
        "kind": "h2",
        "id": "thermostats",
        "text": "Thermostats, not heroes",
      },
      {
        "kind": "p",
        "text":
          "A heroic engineer fixes the outage at 3am. A Principal designs the system so the outage doesn't happen — and if it does, three other engineers can fix it without paging anyone. The job is to set the temperature of the room, not to be the warmest body in it.",
      },
      {
        "kind": "p",
        "text":
          "Heroism scales linearly with the hero. Thermostats scale with the team. One of those is a sustainable career; the other is a path to burnout that the org will applaud right up until you leave.",
      },
      {
        "kind": "h2",
        "id": "what-i-ask",
        "text": "What I actually ask",
      },
      {
        "kind": "p",
        "text": "Three questions, in roughly this order:",
      },
      {
        "kind": "list",
        "items": [
          "Tell me about a decision your team made that you disagreed with — and lost. What did you do next?",
          "Walk me through an ADR you wrote that changed your team's behaviour six months later.",
          "Where does your influence stop, and how do you know?",
        ],
      },
      {
        "kind": "p",
        "text":
          "Each one is designed to surface a specific quality. Question one separates engineers who can disagree-and-commit from those who carry resentment into execution. Question two separates writers from talkers. Question three separates self-aware seniors from people who think their reach is unlimited.",
      },
      {
        "kind": "h2",
        "id": "what-i-avoid",
        "text": "What I avoid",
      },
      {
        "kind": "p",
        "text":
          'I no longer ask whiteboard system-design questions. They reward fluency in performance theatre — the candidate who has memorised "throw a queue at it" and "shard by user_id" wins, regardless of whether they can navigate the actual mess of a real system.',
      },
      {
        "kind": "p",
        "text":
          'Instead I bring real artefacts to the interview. A messy ADR I wrote three years ago, with the wrong call in section 4. "Tell me what you\'d push back on." The artefact does the screening for me. People who can read it well — who find the soft spot in a real document — are the people I want to work with.',
      },
      {
        "kind": "callout",
        "title": "What I avoid",
        "text":
          "Trivia. System design improv-theatre. Anything that selects for talkers instead of thinkers.",
      },
      {
        "kind": "h2",
        "id": "signals-i-watch",
        "text": "Signals I watch for",
      },
      {
        "kind": "list",
        "items": [
          'Names other engineers without prompting. The ones who say "my colleague Jane figured this out" are the ones who\'ll grow other people on your team.',
          "Disagrees with their past self in the interview. Self-revision is a strong indicator of intellectual honesty.",
          'Asks about constraints, not just goals. "What\'s the hardest part of your platform right now?" beats "What does success look like?" every time.',
        ],
      },
      {
        "kind": "h2",
        "id": "the-anti-signals",
        "text": "Anti-signals",
      },
      {
        "kind": "p",
        "text":
          'Talks only in first person plural about successes ("we shipped") and first person singular about failures ("I was in a tough spot"). Treats every story as a victory. Cannot give a straight answer to "what\'s a system you wish you hadn\'t built." These aren\'t dealbreakers, but they\'re cumulative — three or four of them and I know what kind of teammate I\'m hiring.',
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "Hire the thermostat. The hero will arrive eventually anyway, and the room will already be the right temperature when they do.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "OpenGuessr has had two years of maintainer life. Roughly 1,200 issues, 600 PRs, eleven contributors who stayed past their first patch. I'm still here. Most maintainers I started with aren't.",
      },
      {
        "kind": "p",
        "text":
          "This is what kept me going. None of it is clever. All of it is hard.",
      },
      {
        "kind": "pull",
        "text": "The PRs you don't merge matter most.",
      },
      {
        "kind": "h2",
        "id": "saying-no",
        "text": "Saying no, with a CONTRIBUTING file",
      },
      {
        "kind": "p",
        "text":
          "Saying no with grace is the first skill. Saying no with a CONTRIBUTING.md that explains why is the second. The document does the emotional labour you'd otherwise repeat in twenty PR threads. Update it whenever you find yourself typing the same paragraph for the third time.",
      },
      {
        "kind": "p",
        "text":
          "Our CONTRIBUTING.md has grown to twelve sections. Each one was added the third time I had the same conversation. Every section saves me a future conversation, which means it saves me a future small resentment, which means it saves me from quitting in eighteen months.",
      },
      {
        "kind": "h2",
        "id": "cadence",
        "text": "Cadence over heroism",
      },
      {
        "kind": "p",
        "text":
          'I work on OpenGuessr for two evenings a week. That\'s it. The cadence is sacred. When I tried to "catch up" on a quiet weekend, I burned out within a month. Slow and steady ships the same software in the same year.',
      },
      {
        "kind": "p",
        "text":
          "The cadence is also what calibrates the community. When contributors see consistent merging, consistent triage, consistent silence on certain days — they adapt. Inconsistent maintainers create anxious communities.",
      },
      {
        "kind": "h2",
        "id": "triage-rules",
        "text": "Triage rules I borrowed and never gave back",
      },
      {
        "kind": "list",
        "items": [
          'Every issue gets an acknowledgement within seven days, or it gets closed with a "thanks, won\'t pursue" and a reason. Silence is rude.',
          "PRs without tests get a single comment asking for tests. If they don't come within two weeks, the PR is closed politely. The author can reopen.",
          "Architecture changes need a mini-ADR in the PR description, not just code. Even five lines of rationale is enough.",
        ],
      },
      {
        "kind": "p",
        "text":
          "None of these are unique to me. All of them I learned by watching other maintainers — Caolan, Sindre, the React team — and copying. Open source is a craft you steal from people more disciplined than you.",
      },
      {
        "kind": "h2",
        "id": "the-hard-conversations",
        "text": "The hard conversations",
      },
      {
        "kind": "p",
        "text":
          "Twice a year, someone has a public meltdown about a closed PR. It happens. The temptation is to argue. The discipline is to point them at the CONTRIBUTING file, restate the reason once, and stop. Most of the time the contributor returns three weeks later, having calmed down, and writes something useful. A small number do not. That is fine. The community is bigger than any one person, including me.",
      },
      {
        "kind": "p",
        "text":
          ":::callout[What I tell new maintainers] Pick the cadence you can sustain in your worst week, not your best. The community calibrates to whatever you do, so pick the rhythm you actually want. :::",
      },
      {
        "kind": "h2",
        "id": "sponsorship",
        "text": "On sponsorship",
      },
      {
        "kind": "p",
        "text":
          'GitHub Sponsors covers about a quarter of my coffee budget. It is meaningful, not as income, but as social proof — it\'s the sentence "someone valued this enough to send me $5" repeated forty times. On the bad weeks, that sentence is the difference between continuing and quitting.',
      },
      {
        "kind": "p",
        "text":
          "If you can sponsor a maintainer whose work you use, sponsor them. The amount matters less than the fact of it.",
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "You don't owe the open-source world a project. If you have one, you don't owe it everything you have. Pick the cadence you can keep. Write the docs that save you arguments. Sponsor the maintainers you depend on. And when you say no, mean it kindly — but mean it.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "The most important sentence in our team handbook fits on one line: a platform team's outcomes are its consumers' outcomes.",
      },
      {
        "kind": "p",
        "text":
          "This is not a slogan. It is the rule we use to decide what to build, what to ignore, and how to celebrate.",
      },
      {
        "kind": "pull",
        "text":
          "You don't get credit for shipping internal tools. You get credit for what your tenants ship.",
      },
      {
        "kind": "h2",
        "id": "the-trap",
        "text": "The trap",
      },
      {
        "kind": "p",
        "text":
          "Platform teams are easy to grade by their internal artefacts: services shipped, libraries published, dashboards built. None of those are outcomes. They are receipts. The outcomes belong to the tenants — the product teams whose features ship faster, or don't, because of the platform.",
      },
      {
        "kind": "p",
        "text":
          'The trap is seductive because the receipts are easy to count. "We shipped six new APIs this quarter" sounds like progress. It also tells you nothing about whether anything got better for anyone outside the platform team.',
      },
      {
        "kind": "h2",
        "id": "what-we-measure",
        "text": "What we measure instead",
      },
      {
        "kind": "p",
        "text":
          "We picked three metrics, all of them about the experience of being a tenant:",
      },
      {
        "kind": "list",
        "items": [
          "Time from a tenant filing a request to that request being live for their users.",
          "Number of tenants who shipped at least one feature this quarter without our help.",
          "Number of tenants who escalated a platform issue and got a same-day fix.",
        ],
      },
      {
        "kind": "p",
        "text":
          "None of those describe a platform artefact. They describe what it feels like to be the next team over. That is the experience the platform exists to improve.",
      },
      {
        "kind": "h2",
        "id": "office-hours",
        "text": "Office hours, on purpose",
      },
      {
        "kind": "p",
        "text":
          "We hold weekly office hours where any tenant can drop in and complain. The bar to attend is intentionally low. The result is a steady stream of small grievances — a config that's confusing, a doc page that's stale, an error message that doesn't say what to do next — that we wouldn't otherwise hear about.",
      },
      {
        "kind": "p",
        "text":
          "The platform team's worst failure mode is a feedback loop that only reports successes. Office hours are how we keep the loop honest.",
      },
      {
        "kind": "h2",
        "id": "saying-no",
        "text": "Saying no, in a way that helps",
      },
      {
        "kind": "p",
        "text":
          "Tenants ask for things. Some of them are platform-shaped. Some of them are bespoke favours dressed up in platform language. Saying no is part of the job. Saying no badly is how a platform team becomes the bottleneck everyone hates.",
      },
      {
        "kind": "p",
        "text":
          "Our rule: when we say no, we say no with a reason and an alternative. \"We won't build a custom CSV exporter for your tenant, but here's the export API and a 20-line example that does what you asked, and we'll review the PR.\" The no is the same. The relationship is different.",
      },
      {
        "kind": "h2",
        "id": "celebrate-tenants",
        "text": "Celebrate the tenants, not yourselves",
      },
      {
        "kind": "p",
        "text":
          'In all-hands updates, we lead with what the tenants shipped, not what we shipped. "Team A launched their feature in three days because we removed the auth onboarding step." That sentence has a subject (Team A), a verb (launched), and a co-conspirator (us). It is the platform team\'s most flattering possible sentence.',
      },
      {
        "kind": "callout",
        "title": "A test",
        "text":
          "At your next planning session, list every initiative. Strike out anything whose only success metric is internal. What remains is the work that actually matters.",
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "You can run a platform team like a vendor — shipping artefacts, billing time, treating tenants as customers to be managed. You can also run it like a colleague who happens to specialise in shared problems. The second one produces better software and quieter weekends. We have tried both. The second one wins.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "600 cards on a single dashboard. Each card opens a websocket on mount to listen for updates. The 601st card is the one that takes you out.",
      },
      {
        "kind": "p",
        "text":
          "This is the story of how we accidentally built a fork bomb out of a useEffect, and the small change that fixed it.",
      },
      {
        "kind": "pull",
        "text": "Treat hooks like budgets, not utilities.",
      },
      {
        "kind": "h2",
        "id": "the-symptom",
        "text": "The symptom",
      },
      {
        "kind": "p",
        "text":
          'It started with a complaint from QA: the asset dashboard "feels heavy" on tenants with large catalogues. "Heavy" turned out to be 30-second initial loads, fan-fading network panels, and the occasional browser tab crash on Chrome. None of which appeared on our smaller test tenants. It only showed up at the top of the customer list.',
      },
      {
        "kind": "h2",
        "id": "the-diagnosis",
        "text": "The diagnosis",
      },
      {
        "kind": "p",
        "text":
          "Each card on the dashboard had a useEffect that opened a websocket connection on mount, listened for updates to that asset, and closed on unmount. Clean. Idiomatic. Wrong.",
      },
      {
        "kind": "p",
        "text":
          "With 600 cards mounted at once, we were opening 600 websocket connections in the first second of page load. The browser had a connection ceiling we were tripping. The server was happy to accept. The browser was not happy to send.",
      },
      {
        "kind": "callout",
        "title": "Lesson",
        "text":
          "Before optimising a hook, ask if you should be calling it 600 times in the first place.",
      },
      {
        "kind": "h2",
        "id": "the-wrong-fix",
        "text": "The wrong fix",
      },
      {
        "kind": "p",
        "text":
          "Our first instinct was to throttle. Stagger the connections. We wrote a useThrottle hook that opened a fraction of the connections per frame. The page loaded faster. Updates lagged. CPU usage was worse, because we were now also burning cycles on a backoff scheduler. We had built a more efficient version of the wrong thing.",
      },
      {
        "kind": "pull",
        "text": "You can throttle a fork bomb. It's still a fork bomb.",
      },
      {
        "kind": "h2",
        "id": "the-right-fix",
        "text": "The right fix",
      },
      {
        "kind": "p",
        "text":
          "The fix wasn't throttling. The fix was hoisting the subscription up to the dashboard level and pushing updates down via context. One websocket, 600 listeners. The hook we ended up writing — useResource — is six lines of code; the architectural shift behind it is what mattered.",
      },
      {
        "kind": "code",
        "lang": "jsx",
        "text":
          "function useResource(id) {\n  const subs = useContext(SubsCtx);\n  const [v, setV] = useState(subs.get(id));\n  useEffect(() => subs.subscribe(id, setV), [id]);\n  return v;\n}",
      },
      {
        "kind": "p",
        "text":
          "Six lines. The dashboard now opens one websocket and routes updates through a single subscription registry. CPU is low. Network panel is quiet. Tab crashes are gone. The 601st card no longer matters because connecting is no longer per-card.",
      },
      {
        "kind": "h2",
        "id": "hook-budgets",
        "text": "Hook budgets",
      },
      {
        "kind": "p",
        "text":
          "It's tempting to think of hooks as primitives. They aren't. They are budgets — every subscription, every interval, every effect costs something. When you're rendering 600 of anything, those costs compound silently until the page falls over.",
      },
      {
        "kind": "p",
        "text":
          'Now we ask, in code review: "how many of these will exist on the page at peak?" If the answer is more than 50, we don\'t put expensive setup inside the per-instance hook. We hoist.',
      },
      {
        "kind": "h2",
        "id": "what-i-tell-juniors",
        "text": "What I tell juniors",
      },
      {
        "kind": "list",
        "items": [
          "useEffect is not a place to do work. It's a place to subscribe to work being done elsewhere.",
          "If your hook opens a connection, ask who else might also open one.",
          "If you're staggering, you're already losing. Hoist instead.",
        ],
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "Hooks make local reasoning cheap. They also make global cost invisible. The 601st card is always coming. Plan for it.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "Luma talks to dozens of tenant systems — DAMs, CMSes, billing, identity. Luma owns zero of their credentials. Not one. This is not laziness. It is a deliberate stance we call signposting, and it makes integrations a redirect away instead of a security incident waiting to happen.",
      },
      {
        "kind": "pull",
        "text": "State is a liability. Borrow it; do not warehouse it.",
      },
      {
        "kind": "h2",
        "id": "the-stance",
        "text": "The stance",
      },
      {
        "kind": "p",
        "text":
          "Every credential we store is a credential we have to rotate, audit, encrypt, and breach-respond when something goes wrong. Multiply that by 200 tenants, three identity providers each, and a handful of system integrations, and the math gets ugly fast. The signposting module never stores. It signs a redirect, hands the user to the tenant's IdP, and walks away with a short-lived token scoped to one operation.",
      },
      {
        "kind": "h2",
        "id": "how-it-works",
        "text": "How it works in practice",
      },
      {
        "kind": "list",
        "items": [
          "Every integration is a flow, not a credential record.",
          "Every token is short-lived (default: 5 minutes) and scoped to one operation.",
          "Every audit log shows who initiated, who consented, and what was returned — never the secret itself.",
        ],
      },
      {
        "kind": "p",
        "text":
          "The flow is OAuth-shaped, but the discipline is what matters. The tenant's IdP is the source of truth. We are guests in their identity system, for the duration of one operation. Then we go.",
      },
      {
        "kind": "h2",
        "id": "hard-cases",
        "text": "The hard cases",
      },
      {
        "kind": "p",
        "text":
          "Two cases tested this stance hard. Background jobs — where there is no user to consent — and tenant-initiated webhooks, which want to authenticate without a redirect. Both were tempting reasons to introduce stored credentials. Both turned out to be solvable without breaking the rule.",
      },
      {
        "kind": "h3",
        "id": "background-jobs",
        "text": "Background jobs",
      },
      {
        "kind": "p",
        "text":
          "For background jobs, we use a service principal scoped to the tenant — issued by their IdP, rotated by them, never stored by us. The job authenticates using that principal at run-time. If the principal is revoked, the job fails fast and surfaces a clear error to the tenant admin. The tenant always has the kill switch, by design.",
      },
      {
        "kind": "h3",
        "id": "webhooks",
        "text": "Webhooks",
      },
      {
        "kind": "p",
        "text":
          "For inbound webhooks, we use signed payloads with a per-tenant secret stored in the tenant's IdP, not ours. Verification happens at the edge by fetching the public key. The secret never touches our database.",
      },
      {
        "kind": "h2",
        "id": "compliance-side",
        "text": "The compliance side-effect",
      },
      {
        "kind": "p",
        "text":
          "Three of our largest tenants asked, in different reviews, where we store their API keys. The answer — \"we don't\" — has shortened more security questionnaires than any feature we've shipped. SOC 2 reviews go faster. Pen-test scopes shrink. We are no longer in the business of being a high-value target for credential theft, because there is nothing to steal.",
      },
      {
        "kind": "callout",
        "title": "Compliance side-effect",
        "text": "The cheapest credential to protect is the one you never had.",
      },
      {
        "kind": "h2",
        "id": "what-this-cost",
        "text": "What this cost us",
      },
      {
        "kind": "p",
        "text":
          "Signposting is not free. The first few integrations took longer to build because we had to invent the flow rather than reach for a credential record. Some integrations we wanted got delayed because the tenant's IdP didn't support the right grant type, and we had to negotiate with their team. The diagram is more complicated. The trade is that the diagram is also accurate, six years later, with no patches and no known credential-loss incidents.",
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "The cheapest credential to protect is the one you never had. The cheapest secret to rotate is the one that lives somewhere else. Borrow, don't warehouse. The rest of the design follows from there.",
      },
    ],
  },
  {
    "post": {
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
    },
    "body": [
      {
        "kind": "p",
        "text":
          "Project Boston was supposed to be a six-week extraction. It took six months. The pattern is well known — strangler fig, queue between old and new, dual-write — and yet every team that runs it learns something they couldn't read in a blog post.",
      },
      {
        "kind": "p",
        "text": "This is what we learned, in roughly the order it hurt.",
      },
      {
        "kind": "pull",
        "text":
          "The queue is not a buffer. It is a stress test you ship to production.",
      },
      {
        "kind": "h2",
        "id": "the-shape",
        "text": "The shape of the migration",
      },
      {
        "kind": "p",
        "text":
          "Smart Tagging was buried inside Luma. Every tag write went through the main app's transactional path, which meant every spike in tagging traffic also slowed the rest of the platform. We needed to pull tagging out into its own service — Boston — without ever taking Luma offline, and without missing a single write.",
      },
      {
        "kind": "p",
        "text":
          "The plan looked like every strangler-fig diagram on the internet: dual-write old and new, queue between them, cut over reads, decommission the old path. The plan looked simple. The plan was simple. The execution was where the lessons lived.",
      },
      {
        "kind": "h2",
        "id": "day-one",
        "text": "Day one is easy",
      },
      {
        "kind": "p",
        "text":
          "Putting Redis between Luma and Boston was a Tuesday. We added a producer to Luma's tag-write path, set up a Redis stream, wrote a Boston worker that consumed it. Local tests green. Staging green. Production: green for forty-eight hours.",
      },
      {
        "kind": "p",
        "text": "We celebrated. We were wrong to celebrate.",
      },
      {
        "kind": "h2",
        "id": "day-three",
        "text": "Day three is the test",
      },
      {
        "kind": "p",
        "text":
          "On Friday afternoon, a tenant ran a bulk re-tag operation on 200,000 assets. The Redis stream went from a few hundred messages to 80,000 in twenty minutes. Boston Leader was processing one batch every 400ms instead of one every 80ms. The queue depth climbed and didn't stop.",
      },
      {
        "kind": "p",
        "text":
          "We had two problems. The first was throughput — Boston Leader's batching window was too generous. The second was visibility — we didn't have a dashboard for queue depth, so we found out about the backlog from a customer ticket, not from our own metrics.",
      },
      {
        "kind": "p",
        "text":
          "We fixed throughput in an hour. We fixed observability over the weekend. The thing that should have shipped on day one was the dashboard, not the service.",
      },
      {
        "kind": "callout",
        "title": "What I'd do differently",
        "text":
          "Instrument queue depth and leader-lag metrics before the cut-over, not after. We were flying blind for the first 48 hours and it cost us a Sunday.",
      },
      {
        "kind": "h2",
        "id": "single-leader",
        "text": "Single leader, on purpose",
      },
      {
        "kind": "p",
        "text":
          'We resisted the urge to make Boston a horizontally scaled service. Smart Tagging writes are sequential by tenant — a tag-add followed immediately by a tag-remove must apply in order, or the user sees flicker. The simplicity of "one leader, leader-election via Redis lock" beat any cleverness we tried with sharding.',
      },
      {
        "kind": "p",
        "text":
          "When the leader dies, another instance picks up within four seconds. Good enough. Sharding by tenant would have given us better theoretical throughput; it would also have given us a coordination problem on every tenant rebalance. We chose the boring option, on purpose, and have not regretted it.",
      },
      {
        "kind": "h2",
        "id": "dual-write-window",
        "text": "The dual-write window",
      },
      {
        "kind": "p",
        "text":
          "For ten weeks we wrote to both the old path and the new. This was not a hot-cutover. We wanted overlap — a window where we could verify Boston produced identical results to Luma, before pointing reads at it.",
      },
      {
        "kind": "p",
        "text":
          "During that window we ran a daily diff job: pick 1,000 tenants at random, query both systems for tag state, count mismatches. The first run had 47 mismatches. The last run before cutover had zero. Zero is the only acceptable answer for read-cutover.",
      },
      {
        "kind": "p",
        "text":
          "This sounds obvious. It cost us three weeks. Some of those mismatches were real bugs in Boston; others were race conditions in Luma we had inherited and didn't know about. The diff job paid for itself many times over.",
      },
      {
        "kind": "h2",
        "id": "decom-trap",
        "text": "The decommissioning trap",
      },
      {
        "kind": "p",
        "text":
          "Decommissioning the old path is harder than building the new one. We carried both for ten weeks longer than planned because three internal tools were still poking at the legacy endpoint — a reporting script, a CSAT dashboard, and an admin console nobody had touched in two years.",
      },
      {
        "kind": "p",
        "text":
          'Each one needed an owner, a migration plan, and a deadline. We had none of that documented at the start of the project. The lesson: budget the decom into the project from day zero, with names attached. Otherwise the migration is never "done," just "done-ish, with two paths kept alive for safety," and you\'ve doubled your operational surface area without realising.',
      },
      {
        "kind": "h2",
        "id": "reusable-pattern",
        "text": "What we reused",
      },
      {
        "kind": "p",
        "text":
          "By the time Boston was decommissioning the old path, we had a pattern we could re-use for any agent extraction:",
      },
      {
        "kind": "list",
        "items": [
          "Producer-side queue with structured events, versioned from day one.",
          "Consumer-side single-leader pattern, leader election via Redis lock.",
          "Dual-write window with daily diff job until zero mismatches for seven consecutive days.",
          "Named owners for every legacy consumer, with deadlines, before cutover.",
          "Explicit decom checklist as the final ticket — not an afterthought.",
        ],
      },
      {
        "kind": "p",
        "text":
          "We have run this pattern twice more since Boston. The second one took three months. The third one took six weeks. Patterns compound, if you write them down.",
      },
      {
        "kind": "h2",
        "id": "closing",
        "text": "Closing thought",
      },
      {
        "kind": "p",
        "text":
          "Strangler-fig migrations are taught as a pattern. They are really a practice — a sequence of dull, careful, instrumented moves. The pattern is the easy part. The practice is what keeps you on the right side of a customer ticket.",
      },
    ],
  },
];

export const PROJECTS: ProjectWithBody[] = [
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Reusable landing-page patterns — heroes, testimonials, pricing, CTAs — that compose into something honest. Built to survive copy-pasting into client work without falling apart.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Production planning, asset routing, and reporting for high-volume automotive content. Tight integration with global creative ops. Built once, runs across markets.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Single-page narrative landing page. Editorial type, sequenced motion, no framework overhead. Made to feel like a printed broadsheet that breathes.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Live commercial product. Search, itineraries, payments. Built with the trade-offs that real customers — not portfolios — expose.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Pulled Smart Tagging out of Luma. Updates queue into Redis, picked up by a single Boston Leader instance that throttles writes into MySQL. Established a reusable pattern for any agent that needs to scale.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Studio identity rendered in motion. Showcase grid that earns attention through restraint — heavy when it needs to be, quiet when it doesn't.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Real members, real auth, real data. Roles, gated content, and a working admin surface. Sized for a community, not a demo.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "A practical lab for sharing hook patterns — useThrottle, useIdle, useResource — with real demos. Built to teach a single concept per page, then get out of the way.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "Multi-tenant DAM serving hundreds of brands. Strict architectural principles: no state in Luma, file ops to Morpheus, integrations via signposting. The platform team's outcomes are its consumers' outcomes.",
      },
    ],
  },
  {
    "project": {
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
    "body": [
      {
        "kind": "p",
        "text":
          "An open, community-driven take on the location-guessing genre. Streetscape rendering, scoring rounds, multiplayer-ready architecture. Treated like a real platform — not a weekend hack.",
      },
    ],
  },
];
