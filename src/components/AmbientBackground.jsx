import { useEffect, useRef } from "react";

function AmbientBackground() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => {
      background.dataset.active = String(inView && !document.hidden && !preference.matches);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(background);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="ambient-background" ref={backgroundRef} data-active="false" aria-hidden="true">
      <div className="ambient-grid" />
    </div>
  );
}

export default AmbientBackground;
