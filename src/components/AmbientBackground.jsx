import { useEffect, useRef } from "react";

const dots = [
  [5, 8, 3], [92, 6, 4], [15, 22, 2], [96, 31, 3],
  [3, 42, 4], [86, 48, 2], [10, 61, 3], [94, 67, 4],
  [6, 82, 2], [88, 90, 3], [35, 35, 2], [64, 76, 2],
];

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
      <div className="ambient-parallax">
        <div className="ambient-grid" />
        <div className="ambient-wash" />
        {dots.map(([x, y, size], index) => (
          <span className="ambient-dot" key={index} style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, "--dot-duration": `${9 + index % 5 * 2}s`, "--dot-delay": `${-index * 1.7}s`, "--dot-drift": `${index % 2 ? -14 : 14}px` }} />
        ))}
      </div>
    </div>
  );
}

export default AmbientBackground;
