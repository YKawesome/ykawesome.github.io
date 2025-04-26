import React from "react";
import TypeIt from "typeit-react";
import { images } from "../../../utils/preloadimages";
import { motion } from "framer-motion";

function AntLogic() {
  const antLogicImage = images["antlogic.png"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${antLogicImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content sm:text-center">
          <div className="md:w-lg sm:w-sm w-xs p-8 glass bg-black/20 rounded-2xl shadow-2xl">
            <TypeIt className="text-5xl md:text-8xl text-neutral-content font-bold mb-20">
              AntLogic.
            </TypeIt>
            <div className="mt-6"></div>
            <TypeIt
              className="mt-20 text-lg sm:text-xl md:text-2xl"
              options={{ startDelay: 1500, speed: 23 }}
            >
              An <span className="italic">interactive</span>{" "}
              <span className="font-bold bg-primary text-primary-content px-0.5">
                logic gate simulator
              </span>{" "}
              for{" "}
              <span className="font-bold bg-accent text-accent-content px-0.5">
                education
              </span>
              , created at{" "}
              <span className="font-bold bg-secondary text-secondary-content px-0.5">
                IrvineHacks 2024
              </span>
              .
            </TypeIt>
            <p className="py-3 md:text-xl sm:text-lg text-md">
              Developed in collaboration with:
            </p>
            <ul>
              <li>
                Benjamin Cates{" "}
                <a
                  href="https://github.com/benjamin-cates"
                  className="link link-primary font-bold"
                  target="_blank"
                >
                  (benjamin-cates)
                </a>
              </li>
              <li>
                Jackson Podgorski{" "}
                <a
                  href="https://github.com/podskio"
                  className="link link-primary font-bold"
                  target="_blank"
                >
                  (Podskio)
                </a>
              </li>
            </ul>
            <div className="join hovergrow mt-6">
              <a
                href="https://github.com/benjamin-cates/ant_logic?tab=readme-ov-file"
                target="_blank"
              >
                <button className="btn btn-sm md:btn-lg btn-secondary join-item">
                  GitHub
                </button>
              </a>
              <a href="https://ant-logic.thebenjicat.dev/" target="_blank">
                <button className="btn btn-sm md:btn-lg btn-primary join-item">
                  Live Site
                </button>
              </a>
              <a href="https://devpost.com/software/antlogic" target="_blank">
                <button className="btn btn-sm md:btn-lg btn-accent join-item">
                  Devpost
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AntLogic;
