import type { ChangeStep } from "@/src/types.ts";
import RouteSheet from "./RouteSheet.tsx";

const DESCRIPTION =
  "Three people and what each can change, drawn as three rows. A developer pushes a change to the repository. The pipeline builds an image, and holds no password or key for Google Cloud. A new image, the subject of the picture, is the only way code reaches the server, and nothing is changed in place. An editor signs in at a separate address. The edit screens have 125 fields, and none accepts free formatting. The editor changes content: words, images and lists, but not plugins, theme files or WordPress itself. A visitor opens the public address. The pages print every field escaped. The visitor changes nothing, because the theme reads nothing a visitor sends.";

const ROUTES: readonly (readonly ChangeStep[])[] = [
  [
    { lines: ["Pushes a change to", "the repository."], title: "Developer" },
    {
      lines: [
        "Builds an image. It holds no password",
        "or key for Google Cloud.",
      ],
      title: "The pipeline",
    },
    {
      lines: [
        "The only way code reaches the server.",
        "Nothing is changed in place.",
      ],
      title: "A new image",
      tone: "focal",
    },
  ],
  [
    { lines: ["Signs in at a separate", "address."], title: "Editor" },
    {
      lines: ["125 fields. None accepts free", "formatting."],
      title: "Edit screens",
    },
    {
      lines: [
        "Words, images and lists. Not plugins,",
        "theme files or WordPress itself.",
      ],
      title: "Content",
    },
  ],
  [
    { lines: ["Opens the public", "address."], title: "Visitor" },
    {
      lines: ["Every field is escaped as it", "is printed."],
      title: "The pages",
    },
    {
      lines: ["The theme reads nothing", "a visitor sends."],
      title: "Nothing",
      tone: "ghost",
    },
  ],
];

export default function ChangeRoutes() {
  return (
    <RouteSheet
      description={DESCRIPTION}
      routes={ROUTES}
      title="Who can change what on the Academy site"
    />
  );
}
