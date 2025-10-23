import React from "react";
import TypeIt from "typeit-react";
import { images } from "../../../utils/preloadimages";
import { motion } from "framer-motion";
import { LinkPreview } from "../../../components/ui/link-preview";

function AntLogic() {
  const antLogicImage = images["antlogic.png"];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="min-h-screen hero"
        style={{
          backgroundImage: `url(${antLogicImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content sm:text-center">
          <div className="p-8 shadow-2xl md:w-lg sm:w-sm w-xs bg-black/20 glass rounded-2xl">
            <div className="mb-6 text-5xl font-bold md:text-8xl text-neutral-content">
              AntLogic.
            </div>
            <TypeIt
              className="text-lg sm:text-xl md:text-2xl"
              options={{ speed: 23 }}
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
                <LinkPreview
                  url="https://github.com/benjamin-cates"
                  className="font-bold link link-primary"
                  target="_blank"
                >
                  (benjamin-cates)
                </LinkPreview>
              </li>
              <li>
                Jackson Podgorski{" "}
                <LinkPreview
                  url="https://github.com/podskio"
                  className="font-bold link link-primary"
                  target="_blank"
                >
                  (Podskio)
                </LinkPreview>
              </li>
            </ul>
            <div className="mt-6 join hovergrow">
              <LinkPreview
                url="https://github.com/benjamin-cates/ant_logic?tab=readme-ov-file"
                target="_blank"
              >
                <button className="rounded-l-sm btn btn-sm md:btn-lg btn-secondary join-item">
                  GitHub
                </button>
              </LinkPreview>
              <LinkPreview
                url="https://ant-logic.thebenjicat.dev/"
                target="_blank"
              >
                <button className="btn btn-sm md:btn-lg btn-primary join-item">
                  Live Site
                </button>
              </LinkPreview>
              <LinkPreview
                url="https://devpost.com/software/antlogic"
                target="_blank"
              >
                <button className="btn btn-sm md:btn-lg btn-accent join-item">
                  Devpost
                </button>
              </LinkPreview>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AntLogic;
