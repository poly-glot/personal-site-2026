export interface NavLink {
  id: string;
  label: string;
  href: string;
  num: string;
  stub?: boolean;
  ready?: boolean;
}

export const CONTACT_EMAIL = "me@junaid.guru";

export const NAV_LINKS: readonly NavLink[] = [
  {
    id: "work",
    label: "Selected Work",
    href: "/work/",
    num: "01",
    ready: false,
  },
  { id: "about", label: "About", href: "/about", num: "02", ready: false },
  { id: "blog", label: "Blog", href: "/blog/", num: "03", ready: false },
  {
    id: "contact",
    label: "Contact",
    href: `mailto:${CONTACT_EMAIL}`,
    num: "04",
    stub: true,
    ready: false,
  },
];

export const VISIBLE_NAV_LINKS: readonly NavLink[] = NAV_LINKS.filter(
  (l) => l.ready === true,
);
