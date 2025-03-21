import React from "react";
import TypeIt from "typeit-react";
import { images } from "../../../utils/preloadimages";

function AntLogic() {
  const antLogicImage = images["antlogic.png"];
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${antLogicImage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <TypeIt className="text-6xl md:text-8xl text-neutral-content font-bold mb-20">
              AntLogic.
            </TypeIt>
            <div className="mt-6"></div>
            <TypeIt
              className="mt-20 text-xl md:text-2xl"
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
            <p className="py-3 md:text-xl text-lg">
              Developed in collaboration with:
            </p>
            <ul className="">
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
            <div className="join hovergrow">
              <a
                href="https://github.com/benjamin-cates/ant_logic?tab=readme-ov-file"
                target="_blank"
              >
                <button className="btn btn-lg btn-secondary my-6 join-item">
                  GitHub
                </button>
              </a>
              <a href="https://ant-logic.thebenjicat.dev/" target="_blank">
                <button className="btn btn-lg btn-primary my-6 join-item">
                  Live Site
                </button>
              </a>
              <a href="https://devpost.com/software/antlogic" target="_blank">
                <button className="btn btn-lg btn-accent my-6 join-item">
                  Devpost
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AntLogic;
