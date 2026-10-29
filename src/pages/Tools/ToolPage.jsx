import { Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AmbientBackground from "../../components/AmbientBackground";
import { tools } from "../../data/tools";

// The shared shell around every tool: header from src/data/tools.js, then the tool.
function ToolPage() {
  const { slug } = useParams();
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) return <Navigate to="/tools" replace />;
  const { Tool } = tool;

  return (
    <article className="tool-page section-shell" aria-labelledby="tool-heading">
      <title>{`${tool.name} · Yousef Khan`}</title>
      <AmbientBackground />
      <Link className="text-link" to="/tools">← all tools</Link>
      <header className="tool-header">
        <p className="project-kind">{tool.kind}</p>
        <h1 id="tool-heading">{tool.name}</h1>
        <p>{tool.description}</p>
      </header>
      <Suspense fallback={<p className="tool-status" role="status">Loading the tool…</p>}>
        <Tool />
      </Suspense>
    </article>
  );
}

export default ToolPage;
