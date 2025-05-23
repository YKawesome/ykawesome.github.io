import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";

function ShetrHero({ toggleShetr }) {
  const shetrHeroBg = images["shetrherobg.png"];

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${shetrHeroBg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center rounded-2xl lg:p-12 lg:shadow-2xl">
        <div className="lg:max-w-xl lg:w-xl max-w-md">
          <TypeIt className="text-4xl sm:text-6xl font-bold">hi, i'm SHETR.</TypeIt>
          <p className="mb-5 mt-5 text-2xl sm:text-3xl lg:max-w-xl lg:w-xl max-w-md">
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
