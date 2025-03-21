import TypeIt from "typeit-react";
import { images } from "../../../utils/preloadimages";
import CodeBlock from "./CodeBlock";

function CheckersAI() {
    const CheckersAIImage = images["checkersai.png"];
    // const antLogicImage = images["antlogic.png"];
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${CheckersAIImage})`,
                }}
            >
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <TypeIt className="text-5xl md:text-7xl text-neutral-content font-bold mb-20">
                            CheckersAI.
                        </TypeIt>
                        <div className="mt-6"></div>
                        <TypeIt
                            className="mt-20 text-xl md:text-2xl"
                            options={{ startDelay: 1500, speed: 23 }}
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
                        <p className="py-3 md:text-xl text-lg">
                            Developed in collaboration with:
                        </p>
                        <ul className="">
                            <li>
                                Amin Boukour{" "}
                                <a
                                    href="https://github.com/AaBoukour"
                                    className="link link-primary font-bold"
                                    target="_blank"
                                >
                                    (ABoukour)
                                </a>
                            </li>
                        </ul>
                        <div className="join hovergrow">
                            {/* <a
                                href="https://github.com/benjamin-cates/ant_logic?tab=readme-ov-file"
                                target="_blank"
                            >
                                <button className="btn btn-secondary my-6 join-item">
                                    GitHub
                                </button>
                            </a> */}
                            {/* <a href="https://ant-logic.thebenjicat.dev/" target="_blank">
                                <button className="btn btn-primary my-6 join-item">
                                    Live Site
                                </button>
                            </a> */}
                            <a href="https://docs.google.com/document/d/e/2PACX-1vSbCRCgaWrp4FFz6-SIwOA14mpsjQdnclNBKv-ZiVK7XEGrOb8XncNN3IbeGuq0zebwoe-frBf5Ogix/pub" target="_blank">
                                <button className="btn btn-lg btn-accent my-6 join-item">
                                    Final Report
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="hero bg-base-200 h-[50vh]">
                <div className="hero-content flex-col lg:flex-row-reverse">
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
        </div>
    );
}

export default CheckersAI;