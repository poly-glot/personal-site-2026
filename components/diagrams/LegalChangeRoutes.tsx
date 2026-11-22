import type { ChangeStep } from "@/src/types.ts";
import RouteSheet from "./RouteSheet.tsx";

const DESCRIPTION =
  "Three people and what each can change, drawn as three rows. A developer pushes a change to the main branch. The pipeline builds an image for that commit, and holds no Google Cloud key. A new image is the only way code reaches the server, and nothing is changed in place. Staff sign in to WordPress to change the site. The edit screens have 11 edit boxes, and four of their fields take formatted text, which WordPress filters when it is shown. Staff change content: words, pictures, files and lists, but not plugins or theme files. A visitor opens the home page or the Contact page and can send an enquiry. The form is in those two places and posts to one handler, which checks a security token and a hidden trap field. It does not check that anything was filled in. The handler saves the enquiry as a private record that holds a name, an email address, a subject and a message. The record is kept inside Ferrow & Lisle's own WordPress, and only signed-in staff can read it. It is the point of the picture.";

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
    { lines: ["Signs in to WordPress", "to change the site."], title: "Staff" },
    {
      lines: [
        "11 edit boxes. Four of the fields take",
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
      lines: ["Opens the home page or Contact", "and can send an enquiry."],
      title: "Visitor",
    },
    {
      lines: [
        "Two places, one handler. It checks",
        "a security token and a trap field.",
      ],
      title: "The enquiry form",
    },
    {
      lines: [
        "Kept inside the firm's own WordPress.",
        "Only signed-in staff can read it.",
      ],
      title: "A private record",
      tone: "focal",
    },
  ],
];

export default function LegalChangeRoutes() {
  return (
    <RouteSheet
      description={DESCRIPTION}
      routes={ROUTES}
      title="Who can change what on the Ferrow & Lisle site"
    />
  );
}
