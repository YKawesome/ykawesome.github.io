import TypeIt from "typeit-react";
import { images } from "../../../utils/preloadimages";
import { motion } from "framer-motion";
import { LinkPreview } from "../../../components/ui/link-preview";

function CheckersAI() {
    const CheckersAIImage = images["checkersai.png"];
    // const antLogicImage = images["antlogic.png"];
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
                    backgroundImage: `url(${CheckersAIImage})`,
                }}
            >
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-neutral-content sm:text-center">
                    <div className="p-8 shadow-2xl md:w-lg sm:w-sm w-xs glass bg-black/20 rounded-2xl">
                        <div className="mb-5 text-4xl font-bold sm:text-5xl md:text-7xl text-neutral-content">
                            CheckersAI.
                        </div>
                        <TypeIt
                            className="text-xl  sm:text-xl md:text-2xl"
                            options={{ speed: 23 }}
                        >
                            <span className="font-bold bg-primary text-primary-content px-0.5">
                                Final Project
                            </span>{" "}
                            for{" "}
                            <span className="italic">CS 171: Introduction to Artificial Intelligence</span>;
                            a{" "}
                            <span className="font-bold bg-accent text-accent-content px-0.5">
                                checkers AI
                            </span>{" "}
                            that uses{" "}
                            <span className="font-bold bg-secondary text-secondary-content px-0.5">
                                Monte Carlo Tree Search
                            </span>{" "}
                            with a{" "}
                            <span className="font-bold bg-primary text-primary-content px-0.5">
                                capture heuristic
                            </span>{" "}
                            to play checkers.
                        </TypeIt>
                        <p className="py-3 md:text-xl sm:text-lg text-md">
                            Developed in collaboration with:
                        </p>
                        <ul className="">
                            <li>
                                Amin Boukour{" "}
                                <LinkPreview
                                    url="https://github.com/ABoukour"
                                    className="font-bold link link-primary"
                                    target="_blank"
                                >
                                    (ABoukour)
                                </LinkPreview>
                            </li>
                        </ul>
                        <div className="hovergrow">
                            {/* <a
                                href="https://github.com/benjamin-cates/ant_logic?tab=readme-ov-file"
                                target="_blank"
                            >
                                <button className="my-6 btn btn-secondary join-item">
                                    GitHub
                                </button>
                            </a> */}
                            {/* <a href="https://ant-logic.thebenjicat.dev/" target="_blank">
                                <button className="my-6 btn btn-primary join-item">
                                    Live Site
                                </button>
                            </a> */}
                            <LinkPreview url="https://docs.google.com/document/d/1IN9ijCWQVAfQLkW-jE5PGGN-ucdlqjwJAsfMfAFGgkg/edit?usp=sharing" target="_blank">
                                <button className="mt-6 btn btn-sm sm:btn-lg btn-accent">
                                    Final Report
                                </button>
                            </LinkPreview>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="hero bg-base-200 h-[50vh]">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <CodeBlock />
                    <div>
                        <h1 className="text-5xl font-bold">Node Class</h1>
                        <p className="py-6">
                            temp
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div> */}
        </motion.div>
    );
}

export default CheckersAI;