import {
  Canvas,
  Label,
  Line,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  type Tone,
  Wire,
} from "./parts.tsx";

interface Entity {
  caption: string;
  lines: readonly string[];
  shown: string;
  title: string;
  tone?: Tone;
  x: number;
}

const DESCRIPTION =
  "The content model as five kinds of record, with 125 fields between them. Certificate: 5 records of 16 fields, such as course code, level, category, duration, assessment and price. Person: 10 records of 3 fields: role, group and bio. News article: 6 records of 4 fields: standfirst, subjects, hero image and author. Site settings: 1 screen of 24 fields for the header, the footer, the company address and the news and certification text. An arrow labelled Author runs from News article to Person, which is marked as the subject: a person is entered once and named as the author of an article. All four feed one line into Pages: 13 pages of 78 fields, a hero on every page and then fields for that page's own sections. Certificates are listed on Certification, people are shown on About, the latest three articles are on Home and About, and the settings are on every page.";

const SHEET_W = 1600;
const ENTITY_W = 340;
const AUTHOR_GAP = S5 + S4;
const ROW_W = 4 * ENTITY_W + 2 * S4 + AUTHOR_GAP;
const LEFT = (SHEET_W - ROW_W) / 2;

const CERTIFICATE_X = LEFT;
const PERSON_X = CERTIFICATE_X + ENTITY_W + S4;
const ARTICLE_X = PERSON_X + ENTITY_W + AUTHOR_GAP;
const SETTINGS_X = ARTICLE_X + ENTITY_W + S4;

const ENTITIES: readonly Entity[] = [
  {
    caption: "5 certificates · 16 fields",
    lines: [
      "Course code, level, category,",
      "duration, assessment, price",
      "and ten more.",
    ],
    shown: "Listed on Certification",
    title: "Certificate",
    x: CERTIFICATE_X,
  },
  {
    caption: "10 people · 3 fields",
    lines: ["Role", "Group: founding or staff", "Bio of about 40 words"],
    shown: "Shown on About",
    title: "Person",
    tone: "focal",
    x: PERSON_X,
  },
  {
    caption: "6 articles · 4 fields",
    lines: ["Standfirst and subjects", "Hero image", "Author"],
    shown: "Latest three on Home and About",
    title: "News article",
    x: ARTICLE_X,
  },
  {
    caption: "1 screen · 24 fields",
    lines: [
      "Header and footer",
      "Company address",
      "News and certification text",
    ],
    shown: "On every page",
    title: "Site settings",
    x: SETTINGS_X,
  },
];

const PAGE_LINES = [
  "A hero on every page, then fields",
  "for that page's own sections.",
];
const PAGE_W = 520;
const PAGE_X = (SHEET_W - PAGE_W) / 2;
const CENTRE = SHEET_W / 2;

const CAPTION_Y = S4;
const ENTITY_Y = CAPTION_Y + S2;
const ENTITY_H = sheetNodeHeight(ENTITIES[0].lines);
const ENTITY_BOTTOM = ENTITY_Y + ENTITY_H;
const ENTITY_MIDDLE = ENTITY_Y + ENTITY_H / 2;
const BUS_Y = ENTITY_BOTTOM + S5 + S4;
const SHOWN_Y = BUS_Y - S3;
const PAGE_Y = BUS_Y + S5 + S4;
const HEIGHT = PAGE_Y + sheetNodeHeight(PAGE_LINES) + S3;

function centre(entity: Entity): number {
  return entity.x + ENTITY_W / 2;
}

const BUS = [
  ...ENTITIES.map((entity) =>
    `M${centre(entity)} ${ENTITY_BOTTOM} L${centre(entity)} ${BUS_Y}`
  ),
  `M${centre(ENTITIES[0])} ${BUS_Y} L${
    centre(ENTITIES[ENTITIES.length - 1])
  } ${BUS_Y}`,
].join(" ");

export default function ContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Academy's content model: five kinds of record and where each appears"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Line d={BUS} />
      <Wire d={`M${CENTRE} ${BUS_Y} L${CENTRE} ${PAGE_Y - 2}`} />
      <Wire
        d={`M${ARTICLE_X} ${ENTITY_MIDDLE} L${
          PERSON_X + ENTITY_W + 2
        } ${ENTITY_MIDDLE}`}
      />
      <Label
        anchor="middle"
        text="Author"
        x={(PERSON_X + ENTITY_W + ARTICLE_X) / 2}
        y={ENTITY_MIDDLE - S2}
      />

      {ENTITIES.map((entity) => (
        <g key={entity.title}>
          <Label
            kind="caption"
            text={entity.caption}
            x={entity.x}
            y={CAPTION_Y}
          />
          <Node
            lines={entity.lines}
            title={entity.title}
            tone={entity.tone}
            w={ENTITY_W}
            x={entity.x}
            y={ENTITY_Y}
          />
          <Label
            text={entity.shown}
            x={centre(entity) + S2}
            y={SHOWN_Y}
          />
        </g>
      ))}

      <Label
        kind="caption"
        text="13 pages · 78 fields"
        x={PAGE_X}
        y={PAGE_Y - S2}
      />
      <Node
        lines={PAGE_LINES}
        title="Pages"
        w={PAGE_W}
        x={PAGE_X}
        y={PAGE_Y}
      />
    </Canvas>
  );
}
