import { Link } from "react-router-dom";
import { projects } from "../../../data/projects";

const project = projects.find((item) => item.id === "icsyak");

function ICSYAK() {
  return (
    <article className="project-detail section-shell">
      <Link className="text-link" to="/#projects">← Projects</Link>
      <div className="project-detail-grid">
        <div>
          <p className="eyebrow">Discord / Made for UCI</p>
          <h1>{project.name}.</h1>
          <p className="project-lede">{project.description}</p>
          <p className="project-collaborators">{project.detail}</p>
          <p className="project-stack">{project.stack}</p>
          <div className="project-actions">
            {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
          </div>
        </div>
        <img src={project.image} alt="ICSYAK Discord bot screenshot" width="640" height="640" decoding="async" />
      </div>
    </article>
  );
}

export default ICSYAK;
