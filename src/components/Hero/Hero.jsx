import TypeIt from "typeit-react";
import { images } from "../../utils/preloadimages";

function Hero({ toggleShetr }) {
  const heroBg = images["deeryakmainslow.gif"];

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-overlay opacity-50"></div>
      <div className="hero-content text-neutral-content text-center rounded-2xl lg:p-12 lg:shadow-2xl">
        <div className="lg:max-w-xl lg:w-xl max-w-md">
          <TypeIt className="text-4xl sm:text-6xl font-bold" options={{ startDelay: 1500 }}>
            hi, i'm yousef khan.
          </TypeIt>
          <p className="mb-5 mt-5 text-2xl sm:text-3xl lg:max-w-xl lg:w-xl max-w-md">
            I'm a Computer Science Student at UCI. I'm passionate about many
            things, but I truly love making things that save people time.
          </p>
          <p className="mb-5 text-xl">Also, I love <span onClick={toggleShetr}>spreadsheets</span>.</p>
          <p className="">And discord.</p>
          {/* <button className="btn btn-neutral">Get Started</button> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
