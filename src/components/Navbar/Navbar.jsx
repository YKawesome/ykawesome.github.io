import { Link } from "react-router-dom";
import { images } from "../../utils/preloadimages";

function Avatar({ shetr }) {
  const avatar = images["avatar.png"];
  const shetravatar = images["shetravatar.png"];
  return (
    <div className="avatar flex-1 sm:flex hidden">
      <div className="w-10 rounded-full">
        <img alt="Avatar" src={shetr ? shetravatar : avatar} />
      </div>
    </div>
  );
}

function DrawerContent({ closeDrawer }) {
  const links = [
    { to: "/", label: "Home", icon: images["homeicon.png"] },
    { to: "/projects/antlogic", label: "AntLogic", icon: images["antlogicicon.png"] },
    { to: "/projects/ICSYAK", label: "ICSYAK", icon: images["yak.png"] },
    { to: "/projects/checkersai", label: "CheckersAI", icon: images["checkersaiicon.png"] },
    { to: "/projects/splitter", label: "Splitter", icon: images["splittericon.png"] },
    { to: "/projects/calculator", label: "Calculator", icon: images["calculatoricon.png"] },
  ];

  return (
    <ul className="menu bg-neutral text-neutral-content min-h-full w-80 p-4 text-2xl gap-1">
      <li className="sm:hidden">
        <a
          href="https://drive.google.com/file/d/1Btq2-jyancHuOpClUi1aQusLX5mcrKrQ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume
        </a>
      </li>
      {links.map(({ to, label, icon }) => (
        <li key={to}>
          <Link to={to} onClick={closeDrawer}>
            {/* <img src={icon} alt={`${label} icon`} className="inlinie-block w-7 h-7 mask mask-squircle" /> */}
            {label}
          </Link>
        </li>
      ))}
      <div className="mt-auto flex justify-end gap-4">
        <SocialLinks />
      </div>
    </ul>
  );
}

function SocialLinks() {
  const links = [
    {
      href: "https://www.instagram.com/yak_awesome/profilecard/?igsh=MzRlODBiNWFlZA==",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512"
          className="fill-current"
        >
          <path d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294zM149.977 1.773c-27.239 1.286-45.843 5.648-62.101 12.019-16.829 6.561-31.095 15.353-45.286 29.603C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.548 1.302 27.231 5.649 45.827 12.019 62.092 6.569 16.83 15.353 31.089 29.611 45.289 14.25 14.2 28.55 22.918 45.404 29.438 16.282 6.294 34.902 10.583 62.15 11.777 27.305 1.203 36.022 1.468 105.521 1.336 69.532-.133 78.25-.44 105.555-1.734 27.239-1.302 45.826-5.664 62.1-12.019 16.829-6.585 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.404 6.304-16.282 10.592-34.904 11.777-62.134 1.195-27.323 1.478-36.049 1.344-105.557-.133-69.516-.447-78.225-1.741-105.522-1.294-27.256-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.08-29.602-45.288-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.304-34.903-10.6-62.15-11.778C333.747.164 325.03-.101 255.506.031c-69.507.133-78.224.431-105.529 1.742z" />
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/theyousefkhan/",
      icon: (
        <svg
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current"
          viewBox="0 0 310 310"
        >
          <g id="XMLID_801_">
            <path
              id="XMLID_802_"
              d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73
              C77.16,101.969,74.922,99.73,72.16,99.73z"
            />
            <path
              id="XMLID_803_"
              d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4
              c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
            />
            <path
              id="XMLID_804_"
              d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599
              c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319
              c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995
              C310,145.43,300.549,94.761,230.454,94.761z"
            />
          </g>
        </svg>
      ),
    },
    {
      href: "https://github.com/YKawesome",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 1024 1024"
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            transform="scale(64)"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {links.map(({ href, icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="hovergrow"
        >
          {icon}
        </a>
      ))}
    </>
  );
}

function Navbar({ shetr = false }) {
  const closeDrawer = () => {
    const drawer = document.getElementById("projects-drawer");
    if (drawer) drawer.checked = false;
  };

  return (
    <div className="navbar bg-neutral text-neutral-content h-[8vh] max-h-[5rem]">
      <div className="ps-4 hovergrow flex flex-row ml-[-1.5rem] sm:ml-0">
        <Link to="/" className="btn btn-ghost text-2xl">
          {shetr ? "SHETR" : "Yousef Khan"}
        </Link>
        <Avatar shetr={shetr} />
      </div>

      <div className="flex grow justify-end px-2">
        <div className="flex items-stretch">
          {shetr ? (
            <></>
          ) : (
            <>
              <a
                className="btn lg:btn-lg btn-ghost rounded-field hovergrow hidden sm:flex"
                href="https://drive.google.com/file/d/1Btq2-jyancHuOpClUi1aQusLX5mcrKrQ/view?usp=sharing"
                target="_blank"
              >
                Resume
              </a>
              <div className="drawer drawer-end">
                <input
                  id="projects-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn lg:btn-lg btn-ghost rounded-field hovergrow cursor-none"
                  >
                    <label
                      htmlFor="projects-drawer"
                      className="cursor-none sm:block hidden"
                    >
                      Projects
                    </label>
                    <label htmlFor="projects-drawer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current sm:hidden"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="drawer-side z-10">
                  <label
                    htmlFor="projects-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <DrawerContent closeDrawer={closeDrawer} />
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