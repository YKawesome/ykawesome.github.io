import { Link } from "react-router-dom";
import checkersImage from "../../../assets/checkersai.webp";

function CheckersAI() {
  return (
    <article className="project-detail section-shell">
      <Link className="text-link" to="/#projects">← Selected work</Link>
      <div className="project-detail-grid">
        <div>
          <p className="eyebrow">AI / CS 171</p>
          <h1>CheckersAI.</h1>
          <p className="project-lede">A checkers AI that uses Monte Carlo Tree Search with a capture heuristic to decide its next move.</p>
          <p className="project-collaborators">Built for Introduction to Artificial Intelligence with <a href="https://github.com/ABoukour" target="_blank" rel="noopener noreferrer">Amin Boukour</a>.</p>
          <div className="project-actions">
            <a href="https://docs.google.com/document/d/1IN9ijCWQVAfQLkW-jE5PGGN-ucdlqjwJAsfMfAFGgkg/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Read the final report ↗</a>
          </div>
        </div>
        <img src={checkersImage} alt="CheckersAI project artwork" width="640" height="640" decoding="async" />
      </div>
    </article>
  );
}

export default CheckersAI;
