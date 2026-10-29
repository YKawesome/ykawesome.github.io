import { useRef } from "react";
import Hero from "../../components/Hero/Hero";
import ProjectsCarousel from "../../components/ProjectsCarousel";
import AboutPhoto from "../../components/AboutPhoto";
import AmbientBackground from "../../components/AmbientBackground";
import Experience from "../../components/Experience";
import useScrollReveal from "../../hooks/useScrollReveal";

function Home() {
  const contentRef = useRef(null);
  useScrollReveal(contentRef);

  return (
    <>
      <Hero />
      <div className="home-content" ref={contentRef}>
        <AmbientBackground />
        <Experience />
        <section id="projects" className="projects-section section-shell" aria-labelledby="projects-heading">
          <ProjectsCarousel />
        </section>
        <section id="about" className="about-section section-shell" aria-labelledby="about-heading">
          <div className="about-copy">
            <h2 id="about-heading" data-reveal="heading">a bit more.</h2>
            <p data-reveal>I’m studying computer science at UC Irvine (class of 2027). I like building for the communities I’m part of, from Discord servers to hackathons and nonprofits.</p>
            <p data-reveal style={{ "--reveal-delay": "90ms" }}>Outside of that: board games, indie games, and making spreadsheets more complicated than they need to be. The little faces around here are hand-drawn by me.</p>
            <a className="text-link" data-reveal style={{ "--reveal-delay": "160ms" }} href="/Yousef-Khan-Resume.pdf" target="_blank" rel="noopener noreferrer">the longer version (my resume) ↗</a>
          </div>
          <AboutPhoto />
        </section>
      </div>
    </>
  );
}

export default Home;
