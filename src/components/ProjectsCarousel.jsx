import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

function ProjectsCarousel() {
  const trackRef = useRef(null);
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(projects[0]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updatePosition = () => {
    const track = trackRef.current;
    setAtStart(track.scrollLeft < 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  };

  useEffect(() => {
    const observer = new ResizeObserver(updatePosition);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, []);

  const move = (direction) => {
    const track = trackRef.current;
    const card = track.querySelector(".project-card");
    track.scrollBy({
      left: direction * (card.offsetWidth + 20),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const openProject = (project) => {
    setSelected(project);
    dialogRef.current.showModal();
  };

  return (
    <>
      <div className="projects-heading" data-reveal="heading">
        <div><h2 id="projects-heading">projects.</h2><p>Some things I’ve made. Click one to take a look.</p></div>
        <div className="carousel-controls" aria-label="Project carousel controls">
          <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous projects">←</button>
          <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next projects">→</button>
        </div>
      </div>
      <div className="project-carousel" ref={trackRef} onScroll={updatePosition} role="region" aria-label="Projects" aria-roledescription="carousel">
        {projects.map((project, index) => (
          <button type="button" className="project-card" key={project.id} data-reveal="card" style={{ "--reveal-delay": `${index * 80}ms` }} onClick={() => openProject(project)} aria-haspopup="dialog" aria-label={`Read about ${project.name}`}>
            <div className={`project-art ${project.id}-art`}>
              {project.image ? <img className="project-thumbnail" src={project.image} alt="" width="640" height="480" loading="lazy" decoding="async" /> : <span aria-hidden="true">{project.id === "grouper" ? "grouper" : "401(k)"}</span>}
              <img className="project-reaction" src={project.reaction} alt="" width="160" height="160" loading="lazy" decoding="async" />
              <span className="project-expand" aria-hidden="true">↗</span>
            </div>
            <div className="project-card-copy">
              <span className="project-kind">{project.kind}</span>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </div>
          </button>
        ))}
      </div>
      <dialog className="project-modal" ref={dialogRef} aria-labelledby="modal-title" onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current.close();
      }}>
        <div className="project-modal-content">
          <button className="modal-close" type="button" onClick={() => dialogRef.current.close()} aria-label="Close project">×</button>
          <p className="project-kind">{selected.kind}</p>
          <h2 id="modal-title">{selected.name}</h2>
          <p className="modal-description">{selected.description}</p>
          <p className="modal-detail">{selected.detail}</p>
          <p className="project-stack">{selected.stack}</p>
          <div className="project-actions">
            {selected.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ProjectsCarousel;
