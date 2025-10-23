import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";

function ShetrHero({ toggleShetr }) {
  const shetrHeroBg = images["shetrherobg.png"];

  return (
    <div
      className="min-h-screen hero"
      style={{
        backgroundImage: `url(${shetrHeroBg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-overlay"></div>
      <div className="text-center hero-content text-neutral-content rounded-2xl lg:p-12 lg:shadow-2xl">
        <div className="max-w-md lg:max-w-xl lg:w-xl">
          <TypeIt className="text-4xl font-bold sm:text-6xl">hi, i'm SHETR.</TypeIt>
          <p className="max-w-md mt-5 mb-5 text-2xl sm:text-3xl lg:max-w-xl lg:w-xl">
            I'm a petr who likes spreadsheets. I have plenty of interests,
            especially indie games!
          </p>
          <p className="mb-5 text-xl">I spend too much time on Discord.</p>
          <p className="mb-5">help me.</p>
          <p className="mb-5" onClick={toggleShetr}>
            {"{go back}"}
          </p>
          {/* <button className="btn btn-neutral">Get Started</button> */}
        </div>
      </div>
    </div>
  );
}

export default ShetrHero;
