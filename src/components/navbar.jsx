function Navbar() {
  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Yousef Khan</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Resume</a>
          </li>
          <li>
            <details>
              <summary>Projects</summary>
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
