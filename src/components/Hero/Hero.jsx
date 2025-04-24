import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";

function Hero({ toggleShetr }) {
  const heroBg = images["herobg.png"];

  return (
    <div
      className="hero h-[92vh]"
      style={{
        backgroundImage:
          `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-overlay opacity-50"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="lg:max-w-xl max-w-md">
          <TypeIt className="mb-10 text-6xl font-bold" options={{ startDelay: 1500 }}>
            hi, i'm yousef khan.
          </TypeIt>
          <p className="mb-5 mt-5 text-3xl max-w-lg">
            I'm a Computer Science Student at UCI. I'm passionate about many
            things, but I truly love making things that save people time.
          </p>
          <p className="mb-5 text-xl">Also, I love <span onClick={toggleShetr}>spreadsheets</span>.</p>
          <p className="mb-5">And discord.</p>
          {/* <button className="btn btn-neutral">Get Started</button> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
