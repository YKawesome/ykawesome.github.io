import React from "react";
import TypeIt from "typeit-react";
import antLogicImage from "../../../../assets/antlogic.png";

function AntLogic() {
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
              className="mt-20 text-lg md:text-xl"
              options={{ startDelay: 1500, speed: 40 }}
            >
              An <span className="italic">interactive</span>{" "}
              <span className="font-bold bg-primary text-primary-content">
                logic gate simulator
              </span>{" "}
              for{" "}
              <span className="font-bold bg-accent text-primary-content">
                education
              </span>
              , created at{" "}
              <span className="font-bold bg-secondary text-primary-content">
                IrvineHacks 2024
              </span>
              .
            </TypeIt>
            <p className="py-3 text-base md:text-lg">
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
                <button className="btn btn-secondary my-6 join-item">
                  GitHub
                </button>
              </a>
              <a href="https://ant-logic.thebenjicat.dev/" target="_blank">
                <button className="btn btn-primary my-6 join-item">
                  Live Site
                </button>
              </a>
              <a href="https://devpost.com/software/antlogic" target="_blank">
                <button className="btn btn-accent my-6 join-item">
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
