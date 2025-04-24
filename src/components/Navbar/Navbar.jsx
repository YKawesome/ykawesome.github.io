import { Link } from "react-router-dom";
import { images } from "../../utils/preloadimages";

function Navbar({ shetr = false }) {
  const avatar = images["avatar.png"];
  const shetravatar = images["shetravatar.png"];

  return (
    <div className="navbar bg-neutral text-neutral-content min-h-[8vh]">
      <div className="ps-4 hovergrow flex flex-row ml-[-1.5rem] lg:ml-0">
        <a href="/" className="btn btn-ghost lg:text-2xl text-xl">
          {shetr ? "SHETR" : "Yousef Khan"}
        </a>
        <div className="avatar flex-1 lg:ml-2">
          <div className="w-10 rounded-full">
            <img alt="Avatar" src={shetr ? shetravatar : avatar} />
          </div>
        </div>
      </div>


      <div className="flex grow justify-end px-2">
        <div className="flex items-stretch">
          {shetr ? (
            <>
              <a className="btn btn-ghost rounded-field">WIP :D</a>
              <Link className="btn btn-ghost rounded-field" to="/splitter">
                Splitter
              </Link>
              <Link className="btn btn-ghost rounded-field" to="/ktane">
                KTANE
              </Link>
            </>
          ) : (
            <>
              <a
                className="btn btn-ghost rounded-field hovergrow"
                href="https://drive.google.com/file/d/1BIS5fku_vO_cuy38PgntfNzWpXQL6Cxy/view?usp=sharing"
                target="_blank"
              >
                Resume
              </a>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost rounded-field hovergrow"
                >
                  Projects
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-neutral rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
                >
                  <>
                    <li>
                      <Link to="/projects/antlogic">AntLogic</Link>
                    </li>
                    <li>
                      <Link to="/projects/ICSYAK">ICSYAK</Link>
                    </li>
                    <li>
                      <Link to="/projects/checkersai">CheckersAI</Link>
                    </li>
                  </>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
