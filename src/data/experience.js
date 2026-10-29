import ctcLogo from "../assets/logos/ctc.webp";
import hackLogo from "../assets/logos/hack.webp";
import icsLogo from "../assets/logos/ics.webp";
import jplLogo from "../assets/logos/jpl.png";
import yssLogo from "../assets/logos/yss.webp";
import { reactions } from "./reactions";

// Months are "YYYY-MM" and inclusive; a missing end means ongoing.
// **Double asterisks** mark the phrase the highlighter swipes across.
export const experience = [
  {
    id: "jpl",
    organization: "NASA Jet Propulsion Laboratory",
    short: "JPL",
    logo: jplLogo,
    reaction: reactions.happycry,
    role: "Software Engineering Intern",
    start: "2026-06",
    end: "2026-09",
    description: "Built telemetry tools for Hermes: a **Grafana datasource plugin**, TimescaleDB and OpenTelemetry providers, and VS Code extension optimizations. Still here :D",
    tagline: ["DARE", "MIGHTY", "THINGS."],
    href: "https://www.jpl.nasa.gov/",
    links: [
      { label: "Hermes repository", href: "https://github.com/nasa/hermes" },
      { label: "Final presentation", href: "https://drive.google.com/file/d/1heZtwuvexGAHG2ZJdmEuJg9HD63b7pQe/view?usp=drive_link" },
      { label: "Final report", href: "https://drive.google.com/file/d/1EZ62fXrMKz7oJEecJKWR4Y7jNHJvn8s6/view?usp=drive_link" },
    ],
  },
  {
    id: "ctc",
    organization: "Commit the Change",
    short: "CTC",
    logo: ctcLogo,
    reaction: reactions.hearts,
    role: "Tech Lead",
    start: "2025-10",
    description: "Helping lead **12 developers and 8 designers** building for The Hub OC (resources for the homeless), previously working with ELDR/CC (elder law clinic).",
    tagline: ["creating tech", "for social good."],
    href: "https://ctc-uci.com/",
    links: [
      { label: "ELDR repository", href: "https://github.com/ctc-uci/eldr" },
      { label: "ELDR Demo Video", href: "https://www.youtube.com/watch?v=KmCgWAyic48" },
    ],
  },
  {
    id: "hack",
    organization: "Hack at UCI",
    short: "Hack at UCI",
    logo: hackLogo,
    logoVariant: "dark",
    reaction: reactions.sweat,
    role: "Logistics Director",
    start: "2024-04",
    description: "Logistics for IrvineHacks (**500+ attendees**) and directing ZotHacks. Built the virtual queue that handled **400+ day-of check-ins**, and currently expanding IrvineHacks to involve 50% more hackers.",
    tagline: ["develop the", "technology", "of the future."],
    href: "https://hack.ics.uci.edu/",
    links: [
      { label: "IrvineHacks repository", href: "https://github.com/HackAtUCI/irvinehacks-site" },
    ],
  },
  {
    id: "ics",
    organization: "UCI ICS",
    short: "ICS TA",
    logo: icsLogo,
    logoVariant: "full",
    reaction: reactions.tired,
    role: "Teaching Assistant · ICS 6B / 6D",
    start: "2024-03",
    end: "2026-04",
    tagline: ["Innovate.", "Collaborate.", "Stimulate."],
    description: "Led exam review, grading quality control, and disputes for **600+ students**. Helped bring Pensieve (an AI-powered grading platform) into the grading workflow.",
  },
  {
    id: "yss",
    organization: "Youth Spiritual Summit",
    short: "YSS",
    logo: yssLogo,
    logoVariant: "full",
    reaction: reactions.relieved,
    role: "Technical Director",
    start: "2022-12",
    tagline: ["Learn,", "Connect,", "and Reflect."],
    description: "Revamped administrative portal, rebuilt checkout with Stripe (from PayPal), fixed server-side validation, and atomic Prisma transactions to **prevent duplicate charges**.",
  },
];
