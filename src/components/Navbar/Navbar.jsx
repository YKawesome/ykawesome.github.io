import { Link, useLocation } from "react-router-dom";
import { reactions } from "../../data/reactions";

function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className={`site-header${pathname === "/" ? " home-header" : ""}`}>
      <Link className="site-name" to="/" aria-label="Yousef Khan, home">Yousef Khan</Link>
      <nav aria-label="Main navigation">
        <Link to="/#experience">Experience<img className="nav-reaction" src={reactions.nerd} alt="" width="160" height="160" decoding="async" /></Link>
        <Link to="/#projects">Projects<img className="nav-reaction" src={reactions.teehee} alt="" width="160" height="160" decoding="async" /></Link>
        <a href="/Yousef-Khan-Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↗<img className="nav-reaction" src={reactions.smile} alt="" width="160" height="160" decoding="async" /></a>
      </nav>
    </header>
  );
}

export default Navbar;
