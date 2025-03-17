import { Link } from "react-router-dom";
import { images } from "../../utils/preloadimages";

function Navbar({ shetr = false }) {
  const avatar = images["avatar.png"];
  const shetravatar = images["shetravatar.png"];

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="">
        <a href="/" className="btn btn-ghost text-xl">
          {shetr ? "SHETR" : "Yousef Khan"}
        </a>
      </div>
      <div className="avatar flex-1">
        <div className="w-10 rounded-full">
          <img alt="Avatar" src={shetr ? shetravatar : avatar} />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {shetr ? (
            <>
              <li>
                <p>WIP :D</p>
              </li>
              <li>
                <Link to="/splitter">Splitter</Link>
              </li>
              <li>
                <Link to="/ktane">KTANE</Link>
              </li>

            </>
          ) : (
            <>
              <li>
                <a
                  href="https://drive.google.com/file/d/1Btq2-jyancHuOpClUi1aQusLX5mcrKrQ/view?usp=sharing"
                  target="_blank"
                  className="hovergrow"
                >
                  Resume
                </a>
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
                    <li>
                      <Link to="/projects/checkersai">CheckersAI</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
