import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectsDrawer from "../ui/ProjectsDrawer";
import { useAchievements } from "../../context/AchievementsContext";
import heroVid from "../../assets/deeryakmainslow.mp4";

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
      className="absolute pointer-events-none -inset-full opacity-4"
    />
  );
};

function Hero() {
  const [emojiIndex, setEmojiIndex] = useState(3);
  const emojiKeys = Object.values(emojis);
  const [open, setOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null); // Track active project
  const highlightRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate
  const { achievements, unlock } = useAchievements();
  const emojiMasterUnlocked = useMemo(() => achievements.find(a => a.id === 'emoji-master')?.unlocked, [achievements]);
  const [seen, setSeen] = useState(() => new Set([emojiKeys[3]])); // track unique emojis

  const handleHover = () => {
    setEmojiIndex((prevIndex) => {
      const next = (prevIndex + 1) % emojiKeys.length;
      setSeen(prev => {
        if (emojiMasterUnlocked) return prev; // no need to track
        if (!prev.has(emojiKeys[next])) {
          const updated = new Set(prev);
            updated.add(emojiKeys[next]);
            // unlock if all seen
            if (updated.size === emojiKeys.length && !emojiMasterUnlocked) {
              unlock('emoji-master');
            }
          return updated;
        }
        return prev;
      });
      return next;
    });
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
    <div className="relative min-h-screen overflow-hidden hero">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={heroVid} type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="hero-overlay opacity-60"></div>
      <FuzzyOverlay />

      <div className="text-center hero-content text-neutral-content rounded-2xl lg:p-9 lg:pb-6 lg:shadow-2xl">
        <div className="max-w-md lg:max-w-xl lg:w-xl">
          <TypeIt
            className="text-4xl font-bold sm:text-6xl"
            options={{ startDelay: 1500 }}
          >
            hi, i&apos;m yousef khan.
          </TypeIt>
          <p className="max-w-md mt-5 mb-5 text-2xl sm:text-3xl lg:max-w-xl lg:w-xl">
            I&apos;m a{" "}
            <span className="hover:bg-primary hover:text-primary-content transform hover:rotate-1 inline-block transition-transform ease-in-out px-0.5 hover:cursor-none">
              Computer Science Student
            </span>{" "}
            at{" "}
            <span className="hover:bg-secondary hover:text-secondary-content transform hover:-rotate-2 inline-block transition-transform ease-in-out px-0.5 hover:cursor-none">
              UCI
            </span>
            . I&apos;m passionate about many things, but I truly love{" "}
            <span className="hover:bg-accent hover:text-accent-content transform hover:rotate-1 inline-block transition-transform ease-in-out px-0.5 hover:cursor-none">
              making things
            </span>{" "}
            that save people time.
          </p>
          <p className="mb-5 text-xl">
            {/* Also, I love <span onClick={toggleShetr}>spreadsheets</span>. */}
            Also, I love spreadsheets.
          </p>
          <p className="mb-5">and discord.</p>
          <div className="flex justify-center" onClick={handleOpenDrawer}>
            <img
              src={emojiKeys[emojiIndex]}
              alt="emojis"
              className="w-16 h-16 transition-transform ease-in-out transform hover:cursor-none clickable duration-400 hover:scale-110 hover:rotate-12"
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

Hero.propTypes = {};
