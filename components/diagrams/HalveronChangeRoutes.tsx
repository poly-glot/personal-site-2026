import type { ChangeStep } from "@/src/types.ts";
import RouteSheet from "./RouteSheet.tsx";

const DESCRIPTION =
  "Three people and what each can change, drawn as three rows. A developer pushes a change to the main branch. The pipeline builds an image for that commit, and holds no password or key for Google Cloud. A new image is the only way code reaches the server, because file changes are disabled there, and nothing is changed in place. Staff sign in to WordPress at a separate address from the public site. The edit screens have 30 edit boxes, and 20 of their fields take formatted text, which WordPress filters when the page is shown. Staff change content: words, pictures, files and lists, but not plugins or theme files. A visitor opens the public site and can send an enquiry. Three kinds of enquiry form, on the contact page, the sector pages and the white papers, post to one handler, which checks a security token, a hidden trap field and the required boxes. A good enquiry is saved as a private record that says which page it was sent from, and only signed-in staff can read it.";

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
    },
  ],
  [
    {
      lines: ["Signs in at a separate address", "from the public site."],
      title: "Staff",
    },
    {
      lines: [
        "30 edit boxes. 20 of the fields take",
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
        "Three kinds of form, one handler. It checks a",
        "security token, a trap field and required boxes.",
      ],
      title: "The enquiry handler",
    },
    {
      lines: [
        "Saved with the page it came from.",
        "Only signed-in staff can read it.",
      ],
      title: "A private record",
      tone: "focal",
    },
  ],
];

export default function HalveronChangeRoutes() {
  return (
    <RouteSheet
      description={DESCRIPTION}
      routes={ROUTES}
      title="Who can change what on the Halveron site"
    />
  );
}
