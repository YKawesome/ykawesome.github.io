import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className={`site-header${pathname === "/" ? " home-header" : ""}`}>
      <Link className="site-name" to="/" aria-label="Yousef Khan, home">Yousef Khan</Link>
      <nav aria-label="Main navigation">
        <Link to="/#experience">Experience</Link>
        <Link to="/#projects">Projects</Link>
        <a href="/Yousef-Khan-Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</a>
      </nav>
    </header>
  );
}

export default Navbar;
