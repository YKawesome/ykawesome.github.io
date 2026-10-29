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
            <h2 id="about-heading" data-reveal="heading">a bit more :D</h2>
            <p data-reveal> There's a known thing for software developers where we'd rather spend time making an automation than doing the actual manual work even if it would've been faster to just do it. </p>
              <p>That's me. I try to channel that into everything I do and every community I'm a part of, whether that's working on a Discord bot, making random tools, or making better experiences for nonprofits I work with.</p>
            <p data-reveal style={{ "--reveal-delay": "90ms" }}>I don't just do SWE though LOL, I LOVE board games, indie video games, overengineering/styling spreadsheets, and drawing (all the emojis were drawn by me :D)</p>
            <a className="text-link" data-reveal style={{ "--reveal-delay": "160ms" }} href="/Yousef-Khan-Resume.pdf" target="_blank" rel="noopener noreferrer">the longer version (my resume...) ↗</a>
          </div>
          <AboutPhoto />
        </section>
      </div>
    </>
  );
}

export default Home;
