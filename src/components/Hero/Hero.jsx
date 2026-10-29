import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { Link } from "react-router-dom";
import heroVideo from "../../assets/deeryakmainslow.mp4";
import heroPoster from "../../assets/hero-poster.webp";

function Hero() {
  preload(heroPoster, { as: "image", fetchPriority: "high" });
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || Boolean(navigator.connection?.saveData)
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => setPaused(preference.matches || Boolean(navigator.connection?.saveData));
    preference.addEventListener("change", handlePreference);
    return () => preference.removeEventListener("change", handlePreference);
  }, []);

  useEffect(() => {
    if (!paused) setStarted(true);
    const video = videoRef.current;
    let inView = false;
    let active = true;
    const updatePlayback = () => {
      if (paused || !inView || document.hidden) {
        video.pause();
      } else if (started) {
        video.play().catch(() => {
          if (active) setPaused(true);
        });
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(video);
    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      video.pause();
    };
  }, [paused, started]);

  return (
    <section className="intro" aria-labelledby="intro-heading">
      <video className="intro-video" ref={videoRef} src={started ? heroVideo : undefined} poster={heroPoster} width="888" height="1000" loop muted playsInline preload="none" aria-label="Illustrated Yousef with antlers, holding a boba tea" />
      <div className="intro-shade" aria-hidden="true" />
      <div className="intro-copy">
        <h1 id="intro-heading" aria-label="hi, i'm yousef khan."><span aria-hidden="true">hi, i’m yousef khan.</span></h1>
        <p>i’m a computer science student at uci.<br />i like making things that save people time.</p>
        <p className="intro-aside">also, i love spreadsheets. and discord.</p>
        <Link className="intro-scroll" to="/#experience">a little more about me <span aria-hidden="true">↓</span></Link>
      </div>
    </section>
  );
}

export default Hero;
