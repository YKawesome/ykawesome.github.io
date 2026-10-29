import antlogicImage from "../assets/projects/antlogic.webp";
import grouperImage from "../assets/projects/grouper.webp";
import icsyakImage from "../assets/projects/icsyak.webp";
import { reactions } from "./reactions";

export const projects = [
  {
    id: "grouper",
    reaction: reactions.hearts,
    name: "Grouper",
    kind: "Group coordination",
    featured: true,
    image: grouperImage,
    summary: "Plans, rides, and shared expenses. All in one place.",
    description: "A group coordination app for expense splitting, ride sharing, and itinerary planning. Shipped to production, with a shared ledger tracking $7,500+ across 100+ users.",
    detail: "Optimistic updates and Supabase realtime keep everyone in sync. Atomic writes and server-side validation keep the expense ledger consistent.",
    stack: "React · TypeScript · Supabase · PostgreSQL",
    links: [{ label: "Visit Grouper", href: "https://grouper.design" }],
  },
  // {
  //   id: "smart401k",
  //   reaction: reactions.nerd,
  //   name: "Smart401K",
  //   kind: "Retirement planning",
  //   summary: "Making sense of the funds in a 401(k) plan.",
  //   description: "An interactive 401(k) planning tool built with a financial expert from Intuit. Gemini parses plan documents and organizes funds into asset categories.",
  //   detail: "Investor profiles drive allocation recommendations, with MUI charts to explore them.",
  //   stack: "React · Vite · Tailwind CSS · MUI · Gemini",
  //   links: [],
  // },
  {
    id: "icsyak",
    reaction: reactions.teehee,
    name: "ICSYAK",
    kind: "Discord bot",
    image: icsyakImage,
    summary: "Class forums, right in your Discord server.",
    description: "A Discord bot bringing Ed Discussion and Piazza to 1,000+ ICS students across 8 courses. Look up threads by ID, class, or time without leaving the server.",
    detail: "Also contributed to a Python package that pulls Gradescope template PDFs into Discord.",
    stack: "Python · discord.py · Flask · Oracle Cloud · Slurm",
    links: [{ label: "GitHub", href: "https://github.com/YKawesome/ICSYAK" }],
  },
  {
    id: "antlogic",
    reaction: reactions.smile,
    name: "AntLogic",
    kind: "IrvineHacks 2024",
    image: antlogicImage,
    summary: "An interactive playground for logic gates.",
    description: "A logic gate simulator for education, built at IrvineHacks 2024 with Benjamin Cates and Jackson Podgorski.",
    detail: "Connect gates and experiment with digital logic in the browser.",
    stack: "Web · Education · Hackathon",
    links: [
      { label: "Try it", href: "https://ant-logic.thebenjicat.dev/" },
      { label: "GitHub", href: "https://github.com/benjamin-cates/ant_logic" },
      { label: "Devpost", href: "https://devpost.com/software/antlogic" },
    ],
  },
];
