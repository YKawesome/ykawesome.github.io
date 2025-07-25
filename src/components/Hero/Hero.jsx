import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";
import { useState } from "react";
import { motion } from "framer-motion";
import blackNoise from "../../assets/blacknoise.png";

const emojis = {};
const context = import.meta.glob("../../assets/emojis/*.{png,jpg,jpeg,svg}", { eager: true });

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
        duration: .2,
        ease: "linear",
        repeatType: "mirror",
      }}
      style={{
        backgroundImage: `url(${blackNoise})`,
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[5%]"
    />
  );
};

function Hero({ toggleShetr }) {
  const [emojiIndex, setEmojiIndex] = useState(3);
  const emojiKeys = Object.values(emojis);
  const heroBg = images["deeryakmainslow.gif"];

  const handleHover = () => {
    setEmojiIndex((prevIndex) => (prevIndex + 1) % emojiKeys.length);
  };

  return (
    <div
      className="hero min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-overlay opacity-50"></div>
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
            I'm a Computer Science Student at UCI. I'm passionate about many
            things, but I truly love making things that save people time.
          </p>
          <p className="mb-5 text-xl">
            Also, I love <span onClick={toggleShetr}>spreadsheets</span>.
          </p>
          <p className="mb-5">and discord.</p>
          <div className="justify-center flex">
            <img
              src={emojiKeys[emojiIndex]}
              alt="emojis"
              className="h-16 w-16 hover:cursor-none clickable transition-transform duration-400 ease-in-out transform hover:scale-110"
              onMouseEnter={() => window.innerWidth >= 640 && handleHover()}
              onClick={() => window.innerWidth < 640 && handleHover()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
