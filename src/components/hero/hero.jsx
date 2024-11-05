import TypeIt from "typeit-react";
import heroBg from "../../assets/herobg.png";

function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <TypeIt className="mb-10 text-5xl font-bold" options={{ startDelay: 1500 }}>
            hi, i'm yousef khan.
          </TypeIt>
          <p className="mb-5 mt-5 text-2xl">
            I'm a Computer Science Student at UCI. I'm passionate about many
            things, but I truly love making things that save people time.
          </p>
          <p className="mb-5 text-xl">Also, I love spreadsheets.</p>
          <p className="mb-5">And discord.</p>
          {/* <button className="btn btn-neutral">Get Started</button> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
