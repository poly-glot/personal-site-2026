import type { ChangeStep } from "@/src/types.ts";
import RouteSheet from "./RouteSheet.tsx";

const DESCRIPTION =
  "Three people and what each can change, drawn as three rows. A developer pushes a change to the main branch. The pipeline builds an image tagged with that commit, and holds no password or key for Google Cloud. A new image, the subject of the picture, is the only way code reaches the server, because file changes are disabled there, and nothing is changed in place. Staff sign in to WordPress at a separate address from the public site. The edit screens have 65 fields in 12 edit boxes, and five of those fields take formatted text, which WordPress filters when the page is shown. Staff change content: words, pictures, files and lists, but not plugins or theme files. A visitor opens the public site and can send an enquiry. The enquiry form checks a security token, a hidden trap field and the required boxes. A good enquiry is saved as a private record that only signed-in staff can read, and nothing is shown on the public site.";

const ROUTES: readonly (readonly ChangeStep[])[] = [
  [
    { lines: ["Pushes a change to", "the main branch."], title: "Developer" },
    {
      lines: [
        "Builds an image for that commit.",
        "It holds no Google Cloud key.",
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
    {
      lines: ["Signs in at a separate address", "from the public site."],
      title: "Staff",
    },
    {
      lines: [
        "65 fields in 12 edit boxes. Five take",
        "formatted text, filtered when shown.",
      ],
      title: "Edit screens",
    },
    {
      lines: [
        "Words, pictures, files and lists.",
        "Not plugins or theme files.",
      ],
      title: "Content",
    },
  ],
  [
    {
      lines: ["Opens the public site", "and can send an enquiry."],
      title: "Visitor",
    },
    {
      lines: [
        "Checks a security token, a hidden",
        "trap field and the required boxes.",
      ],
      title: "The enquiry form",
    },
    {
      lines: [
        "Saved as a record only staff can",
        "read. It is not shown on the site.",
      ],
      title: "A private record",
    },
  ],
];

export default function WealthChangeRoutes() {
  return (
    <RouteSheet
      description={DESCRIPTION}
      routes={ROUTES}
      title="Who can change what on the Wealth site"
    />
  );
}
