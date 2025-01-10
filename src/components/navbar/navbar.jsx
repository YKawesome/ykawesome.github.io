import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.png";

function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="">
        <a href="/" className="btn btn-ghost text-xl">
          Yousef Khan
        </a>
      </div>
      <div className="avatar flex-1">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={avatar} />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/resume"
              className="hovergrow"
            >
              Resume
            </Link>
          </li>
          <li>
            <details>
              <summary className="hovergrow">Projects</summary>
              <ul className="bg-neutral rounded-t-none p-2">
                <li>
                  <Link to="/projects/antlogic">AntLogic</Link>
                </li>
                <li>
                  <Link to="/projects/ICSYAK">ICSYAK</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
