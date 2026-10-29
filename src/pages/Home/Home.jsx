import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import ProjectsCarousel from "../../components/ProjectsCarousel";
import AboutPhoto from "../../components/AboutPhoto";

const experience = [
  {
    organization: "NASA Jet Propulsion Laboratory",
    logo: "/logos/jpl.png",
    role: "Software Engineering Intern",
    date: "Jun – Sep 2026",
    description: "Built telemetry tools for Hermes: a Grafana datasource plugin, TimescaleDB and OpenTelemetry providers, and a VS Code remote-host flow.",
    href: "https://github.com/nasa/hermes",
    links: [
      { label: "Final presentation", href: "https://drive.google.com/file/d/1heZtwuvexGAHG2ZJdmEuJg9HD63b7pQe/view?usp=drive_link" },
      { label: "Final report", href: "https://drive.google.com/file/d/1EZ62fXrMKz7oJEecJKWR4Y7jNHJvn8s6/view?usp=drive_link" },
    ],
  },
  {
    organization: "Commit the Change",
    logo: "/logos/ctc.png",
    role: "Tech Lead",
    date: "Oct 2025 – present",
    description: "Helping lead 12 developers and 8 designers building for nonprofits. Working on PostgreSQL schemas, REST APIs, and Google/Microsoft sign-in.",
    href: "https://github.com/ctc-uci/eldr",
    links: [
      { label: "ELDR Demo Video", href: "https://www.youtube.com/watch?v=KmCgWAyic48" },
    ],
  },
  {
    organization: "Hack at UCI",
    logo: "/logos/hack.png",
    logoVariant: "dark",
    role: "Logistics Director",
    date: "May 2023 – present",
    description: "Logistics for IrvineHacks (500+ attendees) and directing ZotHacks. Built the virtual queue that handled 400+ day-of check-ins.",
    href: "https://github.com/HackAtUCI/irvinehacks-site",
  },
  {
    organization: "UCI ICS",
    logo: "/logos/ics.png",
    logoVariant: "full",
    role: "Teaching Assistant · ICS 6B / 6D",
    date: "Mar 2024 – Apr 2026",
    description: "Exam review, grading quality control, and disputes for 600+ students. Helped bring Pensieve into the grading workflow.",
  },
  {
    organization: "Youth Spiritual Summit",
    logo: "/logos/yss.jpg",
    logoVariant: "full",
    role: "Technical Director",
    date: "Dec 2022 – present",
    description: "Rebuilt checkout with Stripe, server-side validation, and atomic Prisma transactions to prevent duplicate charges.",
  },
];

function Home() {
  const contentRef = useRef(null);

  useEffect(() => {
    const sections = contentRef.current.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.05 });
    sections.forEach((section) => {
      section.classList.add("reveal-ready");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <div className="home-content" ref={contentRef}>
        <section id="experience" className="experience-section section-shell fade-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">work & experience.</h2>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row" key={item.organization}>
                <span className={`experience-logo experience-logo--${item.logoVariant ?? "light"}`} aria-hidden="true">
                  <img src={item.logo} alt="" width="160" height="160" loading="lazy" decoding="async" />
                </span>
                <div className="experience-meta"><h3>{item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.organization} <span aria-hidden="true">↗</span></a> : item.organization}</h3><p>{item.role}</p><span>{item.date}</span></div>
                <div className="experience-description">
                  <p>{item.description}</p>
                  {item.links && (
                    <div className="experience-links">
                      {item.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><span>{link.label}</span> <span aria-hidden="true">↗</span></a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="projects" className="projects-section section-shell fade-section" aria-labelledby="projects-heading">
          <ProjectsCarousel />
          <div className="little-tools"><span>One smaller tool:</span><Link to="/splitter">Instagram banner splitter ↗</Link></div>
        </section>
        <section id="about" className="about-section section-shell fade-section" aria-labelledby="about-heading">
          <div className="about-copy">
            <h2 id="about-heading">a bit more.</h2>
            <p>I’m studying computer science at UC Irvine (class of 2027). I like building for the communities I’m part of, from Discord servers to hackathons and nonprofits.</p>
            <p>Outside of that: board games, indie games, and making spreadsheets more complicated than they need to be. The little faces around here are hand-drawn by me.</p>
            <a className="text-link" href="/Yousef-Khan-Resume.pdf" target="_blank" rel="noopener noreferrer">the longer version (my resume) ↗</a>
          </div>
          <AboutPhoto />
        </section>
      </div>
    </>
  );
}

export default Home;
