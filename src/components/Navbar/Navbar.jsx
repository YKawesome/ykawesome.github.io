import { Link } from "react-router-dom";
import { images } from "../../utils/preloadimages";

function Navbar({ shetr = false }) {
  const avatar = images["avatar.png"];
  const shetravatar = images["shetravatar.png"];

  return (
    <div className="navbar bg-neutral text-neutral-content h-[8vh] max-h-[5rem]">
      <div className="ps-4 hovergrow flex flex-row ml-[-1.5rem] lg:ml-0">
        <Link to="/" className="btn btn-ghost lg:text-2xl text-xl">
          {shetr ? "SHETR" : "Yousef Khan"}
        </Link>
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
              {/* <a className="btn lg:btn-lg btn-ghost rounded-field hovergrow">WIP :D</a> */}
              {/* <Link className="btn lg:btn-lg btn-ghost rounded-field hovergrow" to="/ktane">
                KTANE
              </Link> */}
            </>
          ) : (
            <>
              <a
                className="btn lg:btn-lg btn-ghost rounded-field hovergrow"
                href="https://drive.google.com/file/d/1Btq2-jyancHuOpClUi1aQusLX5mcrKrQ/view?usp=sharing"
                target="_blank"
              >
                Resume
              </a>
              <div className="drawer drawer-end">
                <input id="projects-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  {/* Navbar content here */}
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn lg:btn-lg btn-ghost rounded-field hovergrow"
                  >
                    <label htmlFor="projects-drawer" className="cursor-pointer">Projects</label>
                  </div>
                </div>
                <div className="drawer-side z-10">
                  <label htmlFor="projects-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                  <ul className="menu bg-neutral text-neutral-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                      <Link to="/" onClick={() => (document.getElementById('projects-drawer').checked = false)}>Home</Link>
                    </li>
                    <li>
                      <Link to="/projects/antlogic" onClick={() => (document.getElementById('projects-drawer').checked = false)}>AntLogic</Link>
                    </li>
                    <li>
                      <Link to="/projects/ICSYAK" onClick={() => (document.getElementById('projects-drawer').checked = false)}>ICSYAK</Link>
                    </li>
                    <li>
                      <Link to="/projects/checkersai" onClick={() => (document.getElementById('projects-drawer').checked = false)}>CheckersAI</Link>
                    </li>
                    <li>
                      <Link to="/projects/splitter" onClick={() => (document.getElementById('projects-drawer').checked = false)}>Splitter</Link>
                    </li>
                    <li>
                      <Link to="/projects/calculator" onClick={() => (document.getElementById('projects-drawer').checked = false)}>Calculator</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
