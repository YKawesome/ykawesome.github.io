import avatar from "../../assets/avatar.png";

function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="">
        <a className="btn btn-ghost text-xl">Yousef Khan</a>
      </div>
      <div className="avatar flex-1">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={avatar} />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="https://drive.google.com/file/d/1Vp9he2YazHY5kEKJP5P4DwKnGaaJSd3j/view?usp=sharing" target="_blank" className="hovergrow">Resume</a>
          </li>
          <li>
            <details>
              <summary className="hovergrow">Projects</summary>
              <ul className="bg-neutral rounded-t-none p-2">
                <li>
                  <a>Hello</a>
                </li>
                <li>
                  <a>World</a>
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
