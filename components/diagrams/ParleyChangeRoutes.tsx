import type { ChangeStep } from "@/src/types.ts";
import RouteSheet from "./RouteSheet.tsx";

const DESCRIPTION =
  "Three people and what each can change, drawn as three rows. A developer pushes a change to the main branch. The pipeline builds an image for that commit, and holds no password or key for Google Cloud. A new image is the only way code reaches the server, because file changes are disabled there, and nothing is changed in place. Staff sign in to WordPress. The edit screens have 11 edit boxes, and seven of their fields take formatted text, which WordPress filters when the page is shown. Staff change content: words, pictures and lists, but not plugins or theme files. A visitor opens the Contact page and can send an enquiry. The one enquiry form posts to one handler inside Parley's own WordPress, which checks a security token, a hidden trap field and that the name, email and message are filled in. A good enquiry is saved as a private record, kept inside Parley's own WordPress, that only signed-in staff can read. It is the point of the picture, because Parley's Contact page promises that every conversation with it is confidential, and no outside form service sees the message.";

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
        "11 edit boxes. Seven of the fields take",
        "formatted text, filtered when shown.",
      ],
      title: "Edit screens",
    },
    {
      lines: [
        "Words, pictures and lists.",
        "Not plugins or theme files.",
      ],
      title: "Content",
    },
  ],
  [
    {
      lines: ["Opens the Contact page", "and can send an enquiry."],
      title: "Visitor",
    },
    {
      lines: [
        "One form, one handler. It checks a security",
        "token, a trap field and the required boxes.",
      ],
      title: "The enquiry form",
    },
    {
      lines: [
        "Kept inside Parley's own WordPress.",
        "Only signed-in staff can read it.",
      ],
      title: "A private record",
      tone: "focal",
    },
  ],
];

export default function ParleyChangeRoutes() {
  return (
    <RouteSheet
      description={DESCRIPTION}
      routes={ROUTES}
      title="Who can change what on the Parley site"
    />
  );
}
