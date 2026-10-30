import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TypingHeading from "./TypingHeading";
import heroVideo from "../../assets/deeryakmainslow.mp4";
import heroPoster from "../../assets/hero-poster.webp";

function Hero() {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || Boolean(navigator.connection?.saveData)
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => setPaused(preference.matches || Boolean(navigator.connection?.saveData));
    preference.addEventListener("change", handlePreference);
    return () => preference.removeEventListener("change", handlePreference);
  }, []);

  // The whole clip downloads before it plays, so a slow connection can't stall the loop partway through.
  useEffect(() => {
    if (paused || videoUrl) return;
    const controller = new AbortController();
    fetch(heroVideo, { signal: controller.signal })
      .then((response) => (response.ok ? response.blob() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then((blob) => {
        if (!controller.signal.aborted) setVideoUrl(URL.createObjectURL(blob));
      })
      .catch(() => {});
    return () => controller.abort();
  }, [paused, videoUrl]);

  useEffect(() => () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    let inView = false;
    let active = true;
    const updatePlayback = () => {
      if (paused || !inView || document.hidden) {
        video.pause();
      } else if (videoUrl) {
        // An AbortError only means a pause() interrupted this play(); anything else means autoplay is blocked.
        video.play().catch((error) => {
          if (active && error.name !== "AbortError") setPaused(true);
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
  }, [paused, videoUrl]);

  return (
    <section className="intro" aria-labelledby="intro-heading">
      <img className="intro-poster" src={heroPoster} width="888" height="1000" fetchPriority="high" alt="Illustrated Yousef with antlers, holding a boba tea" />
      {/* The first frame matches the poster, so fading in on playback hides the swap. */}
      <video className={playing ? "intro-video is-playing" : "intro-video"} ref={videoRef} src={videoUrl ?? undefined} width="888" height="1000" loop muted playsInline aria-hidden="true" onPlaying={() => setPlaying(true)} />
      <div className="intro-shade" aria-hidden="true" />
      <div className="intro-copy">
        <TypingHeading />
        <p>i’m a computer science student at uci.<br />i like making things that save people time.</p>
        <p className="intro-aside">also, i love spreadsheets. and discord...</p>
        <Link className="intro-scroll" to="/#experience"><span className="intro-scroll-label">a little more about me</span><span className="intro-scroll-arrow" aria-hidden="true">↓</span></Link>
      </div>
    </section>
  );
}

export default Hero;
