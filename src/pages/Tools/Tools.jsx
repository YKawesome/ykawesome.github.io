import { useRef } from "react";
import { Link } from "react-router-dom";
import AmbientBackground from "../../components/AmbientBackground";
import { reactions } from "../../data/reactions";
import useScrollReveal from "../../hooks/useScrollReveal";
import { tools } from "../../data/tools";

function Tools() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);

  return (
    <div className="tools-page section-shell" ref={pageRef}>
      <title>Tools · Yousef Khan</title>
      <AmbientBackground />
      <div className="tools-heading" data-reveal="heading">
        <h1>tools.</h1>
        <p>Small things I made because I needed them. Free to use, no sign-up.</p>
      </div>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link className="project-card" to={`/tools/${tool.slug}`} key={tool.slug} data-reveal="card" style={{ "--reveal-delay": `${index * 80}ms` }}>
            <div className={`project-art ${tool.slug}-art`}>
              <img className="project-thumbnail" src={tool.image} alt="" width="640" height="480" loading="lazy" decoding="async" />
              <img className="project-reaction" src={tool.reaction} alt="" width="160" height="160" loading="lazy" decoding="async" />
              <span className="project-expand" aria-hidden="true">↗</span>
            </div>
            <div className="project-card-copy">
              <span className="project-kind">{tool.kind}</span>
              <h2>{tool.name}</h2>
              <p>{tool.summary}</p>
            </div>
          </Link>
        ))}
        <div className="tools-soon" data-reveal="card" style={{ "--reveal-delay": `${tools.length * 80}ms` }}>
          <img src={reactions.popcorn} alt="" width="160" height="160" loading="lazy" decoding="async" />
          <h2>more soon.</h2>
          <p>I make these whenever something bugs me enough.</p>
        </div>
      </div>
    </div>
  );
}

export default Tools;
