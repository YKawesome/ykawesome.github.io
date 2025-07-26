import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectsDrawer from "../ui/ProjectsDrawer";

const emojis = {};
const context = import.meta.glob("../../assets/emojis/*.{png,jpg,jpeg,svg}", {
  eager: true,
});

for (const path in context) {
  const fileName = path.split("/").pop();
  emojis[fileName] = context[path].default;
}

const FuzzyOverlay = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: `url(${images["blacknoise.png"]})`,
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[4%]"
    />
  );
};

function Hero({ toggleShetr }) {
  const [emojiIndex, setEmojiIndex] = useState(3);
  const emojiKeys = Object.values(emojis);
  const heroBg = images["deeryakmainslow.gif"];
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null); // Track active project
  const highlightRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleHover = () => {
    setEmojiIndex((prevIndex) => (prevIndex + 1) % emojiKeys.length);
  };

  const handleOpenDrawer = () => {
    if (window.innerWidth >= 1024) {
      setOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (highlightRef.current && !highlightRef.current.contains(event.target)) {
        setActiveProject(null); // Reset active project
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="hero min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-overlay opacity-40"></div>
      <FuzzyOverlay />

      <div className="hero-content text-neutral-content text-center rounded-2xl lg:p-9 lg:pb-6 lg:shadow-2xl">
        <div className="lg:max-w-xl lg:w-xl max-w-md">
          <TypeIt
            className="text-4xl sm:text-6xl font-bold"
            options={{ startDelay: 1500 }}
          >
            hi, i'm yousef khan.
          </TypeIt>
          <p className="mb-5 mt-5 text-2xl sm:text-3xl lg:max-w-xl lg:w-xl max-w-md">
            I'm a{" "}
            <span className="hover:bg-primary hover:text-primary-content transform hover:rotate-1 inline-block transition-transform ease-in-out px-0.5">
              Computer Science Student
            </span>{" "}
            at{" "}
            <span className="hover:bg-secondary hover:text-secondary-content transform hover:-rotate-2 inline-block transition-transform ease-in-out px-0.5">
              UCI
            </span>
            . I'm passionate about many things, but I truly love{" "}
            <span className="hover:bg-accent hover:text-accent-content transform hover:rotate-1 inline-block transition-transform ease-in-out px-0.5">
              making things
            </span>{" "}
            that save people time.
          </p>
          <p className="mb-5 text-xl">
            {/* Also, I love <span onClick={toggleShetr}>spreadsheets</span>. */}
            Also, I love spreadsheets.
          </p>
          <p className="mb-5">and discord.</p>
          <div className="justify-center flex" onClick={handleOpenDrawer}>
            <img
              src={emojiKeys[emojiIndex]}
              alt="emojis"
              className="h-16 w-16 hover:cursor-none clickable transition-transform duration-400 ease-in-out transform hover:scale-110 hover:rotate-[12deg]"
              onMouseEnter={() => window.innerWidth >= 640 && handleHover()}
              onClick={() => window.innerWidth < 640 && handleHover()}
            />
          </div>
        </div>
      </div>

      <ProjectsDrawer
        open={open}
        setOpen={setOpen}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        navigate={navigate}
        highlightRef={highlightRef}
      />
    </div>
  );
}

export default Hero;
