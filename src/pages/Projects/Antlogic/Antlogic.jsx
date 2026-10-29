import { Link } from "react-router-dom";
import antlogicImage from "../../../assets/antlogic.webp";

function AntLogic() {
  return (
    <article className="project-detail section-shell">
      <Link className="text-link" to="/#projects">← Selected work</Link>
      <div className="project-detail-grid">
        <div>
          <p className="eyebrow">Education / IrvineHacks 2024</p>
          <h1>AntLogic.</h1>
          <p className="project-lede">An interactive logic gate simulator for education. Built to make digital logic something you can experiment with.</p>
          <p className="project-collaborators">Made with <a href="https://github.com/benjamin-cates" target="_blank" rel="noopener noreferrer">Benjamin Cates</a> and <a href="https://github.com/podskio" target="_blank" rel="noopener noreferrer">Jackson Podgorski</a>.</p>
          <div className="project-actions">
            <a href="https://ant-logic.thebenjicat.dev/" target="_blank" rel="noopener noreferrer">Try AntLogic ↗</a>
            <a href="https://github.com/benjamin-cates/ant_logic" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://devpost.com/software/antlogic" target="_blank" rel="noopener noreferrer">Devpost ↗</a>
          </div>
        </div>
        <img src={antlogicImage} alt="AntLogic project artwork" width="640" height="640" decoding="async" />
      </div>
    </article>
  );
}

export default AntLogic;
