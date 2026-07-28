// The BuildAlly team, rendered by <TeamSection />.
//
// Every field except `name` and `role` is optional — the card only renders what
// is present, so new people, advisors or investors can be appended without any
// layout change.
//
//   name        required
//   role        required
//   bio         2–3 lines; keep it short so the cards stay level
//   department  optional label shown above the name (e.g. "Engineering")
//   image       path under /public (e.g. "/team/hardik-tiwari.jpg").
//               While it is null the card shows a branded initials tile at the
//               exact same size, so dropping a headshot in never shifts layout.
//               Use a square source image — 512×512 or larger.
//   linkedin    full profile URL; the icon only appears when set
//   email       plain address; the icon only appears when set

export const TEAM = [
  {
    name: "Hardik Tiwari",
    role: "Founder",
    bio: "Founded BuildAlly to simplify construction management through technology — so builders, contractors and interior firms can run projects, teams, finances and site operations from one platform.",
    image: null,
    linkedin: "https://www.linkedin.com/in/hardik-tiwari-a785262a1/",
    email: null,
  },
  {
    name: "Shobhit Shrivastava",
    role: "Co-Founder",
    bio: "Works alongside the founding team to shape BuildAlly's growth, product strategy and customer experience.",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    name: "Pranjal Shukla",
    role: "Co-Founder",
    bio: "Focused on building scalable solutions and the continuous development of the BuildAlly platform.",
    image: null,
    linkedin: null,
    email: null,
  },
  {
    name: "Ashutosh",
    role: "Co-Founder",
    bio: "Supports the company's mission of delivering a modern, reliable and scalable construction management platform.",
    image: null,
    linkedin: null,
    email: null,
  },
];

// "Hardik Tiwari" -> "HT", "Ashutosh" -> "A". Used for the placeholder tile.
export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
