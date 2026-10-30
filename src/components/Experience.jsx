import { useEffect, useRef, useState } from "react";
import { experience } from "../data/experience";
import withHighlights from "./withHighlights";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const parseMonth = (value) => value.split("-").map(Number);
const sortedExperience = [...experience].sort((a, b) => b.start.localeCompare(a.start));

function formatDates({ start, end }) {
  const [startYear, startMonth] = parseMonth(start);
  if (!end) return `${monthNames[startMonth - 1]} ${startYear} – present`;
  const [endYear, endMonth] = parseMonth(end);
  return startYear === endYear
    ? `${monthNames[startMonth - 1]} – ${monthNames[endMonth - 1]} ${endYear}`
    : `${monthNames[startMonth - 1]} ${startYear} – ${monthNames[endMonth - 1]} ${endYear}`;
}

// Update the decorative path directly, without rendering React on every scroll.
function useTimelineProgress(timelineRef) {
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const stops = [...timeline.children];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let releaseTimer = 0;
    let previousDistances = null;
    let previousFocus = -1;
    const activeUntil = stops.map(() => 0);

    const update = () => {
      frame = 0;
      clearTimeout(releaseTimer);
      const now = performance.now();
      const readingLine = window.innerHeight * 0.7;
      const positions = stops.map((stop) => stop.getBoundingClientRect());
      const focusLine = window.innerHeight * 0.5;
      let focusedIndex = -1;
      let nearestDistance = Infinity;
      positions.forEach(({ top, bottom, height }, index) => {
        const distance = Math.abs(top + height / 2 - focusLine);
        if (bottom > window.innerHeight * 0.15 && top < window.innerHeight * 0.85 && distance < nearestDistance) {
          focusedIndex = index;
          nearestDistance = distance;
        }
      });
      const distances = positions.map(({ top, height }) => top + height / 2 - focusLine);
      let nextRelease = Infinity;
      stops.forEach((stop, index) => {
        // A quick wheel gesture can carry a whole card past the focus line
        // between frames. Give crossed cards the same complete peek as a stop.
        const crossed = previousDistances !== null && (
          (previousDistances[index] > 0 && distances[index] <= 0) ||
          (previousDistances[index] < 0 && distances[index] >= 0)
        );
        if ((index === focusedIndex && index !== previousFocus) || crossed) {
          activeUntil[index] = preference.matches ? now : now + 750;
        }
        const active = index === focusedIndex || (!preference.matches && now < activeUntil[index]);
        if (!preference.matches && index !== focusedIndex && now < activeUntil[index]) {
          nextRelease = Math.min(nextRelease, activeUntil[index]);
        }
        const { top, height } = positions[index];
        const progress = preference.matches ? 1 : Math.max(0, Math.min(1, (readingLine - top) / height));
        stop.style.setProperty("--path-progress", progress);
        stop.toggleAttribute("data-reached", progress >= 0.5);
        stop.toggleAttribute("data-scroll-focused", index === focusedIndex);
        stop.toggleAttribute("data-scroll-active", active);
      });
      previousDistances = distances;
      previousFocus = focusedIndex;
      if (nextRelease < Infinity) releaseTimer = setTimeout(schedule, Math.ceil(nextRelease - now));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    timeline.dataset.tracking = "";
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(timeline);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(releaseTimer);
      stops.forEach((stop) => {
        stop.removeAttribute("data-scroll-focused");
        stop.removeAttribute("data-scroll-active");
      });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      resizeObserver.disconnect();
      delete timeline.dataset.tracking;
    };
  }, [timelineRef]);
}

function Experience() {
  const [spaceXPeek, setSpaceXPeek] = useState(false);
  const timelineRef = useRef(null);
  useTimelineProgress(timelineRef);

  const jumpTo = (id) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`experience-${id}`)?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "center" });
  };

  return (
    <section id="experience" className="experience-section section-shell" aria-labelledby="experience-heading">
      <div className="experience-intro">
        <div data-reveal="heading"><h2 id="experience-heading">work & experience.</h2><p>i’m in a lot of places at once...</p></div>
        <span className="experience-scroll-note" data-reveal>by start date · newest first <span aria-hidden="true">↓</span></span>
      </div>
      <ol className="experience-journey" ref={timelineRef} aria-label="Experience, newest start date first">
        {sortedExperience.map((item) => (
          <li className="experience-stop" key={item.id}>
            <svg className="experience-path" viewBox="0 0 160 200" preserveAspectRatio="none" aria-hidden="true">
              <path className="experience-path-track" d="M80 0 C80 40 40 60 40 100 C40 140 80 160 80 200" />
              <path className="experience-path-fill" d="M80 0 C80 40 40 60 40 100 C40 140 80 160 80 200" />
            </svg>
            <div className="experience-waypoint">
              <button className="experience-node" onClick={() => jumpTo(item.id)} aria-label={`Scroll to ${item.organization}`} aria-controls={`experience-${item.id}`}><span /></button>
            </div>
            <div className="experience-year" aria-hidden="true">
              <span className="experience-year-number">
                {item.start.slice(0, 4)}
                <span className="experience-year-burst">
                  <svg viewBox="0 0 64 80" fill="none" focusable="false">
                    <path className="year-streak" d="M8 25Q17 13 29 8" pathLength="1" />
                    <path className="year-streak" d="M12 40Q30 36 47 39" pathLength="1" style={{ "--streak-delay": "65ms" }} />
                    <path className="year-streak" d="M8 55Q20 61 30 72" pathLength="1" style={{ "--streak-delay": "130ms" }} />
                  </svg>
                </span>
              </span>
              <small>started {monthNames[parseMonth(item.start)[1] - 1]}</small>
            </div>
            <div className="experience-card-wrap">
              <span className={`experience-logo-echo experience-logo-echo--${item.id}`} aria-hidden="true"><img src={item.logo} alt="" width="200" height="200" loading="lazy" decoding="async" /></span>
              <article id={`experience-${item.id}`} className="experience-card" data-reveal="row">
                <div className="experience-card-top">
                  <span className="experience-badge" aria-hidden="true">
                    <span className={`experience-logo experience-logo--${item.logoVariant ?? "light"}`}>
                      <img src={item.logo} alt="" width="160" height="160" loading="lazy" decoding="async" />
                    </span>
                    <img className="experience-sticker" src={item.reaction} alt="" width="160" height="160" loading="lazy" decoding="async" />
                  </span>
                  <span className="experience-dates">{formatDates(item)}</span>
                </div>
                <div className="experience-meta"><h3>{item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.organization} <span aria-hidden="true">↗</span></a> : item.organization}</h3><p>{item.role}</p></div>
                <div className="experience-description">
                  <p>{withHighlights(item.description)}</p>
                  {item.links && (
                    <div className="experience-links">
                      {item.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"><span>{link.label}</span> <span aria-hidden="true">↗</span></a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
              {item.tagline && (
                <p className="experience-tagline" data-reveal="tagline">
                  {item.tagline.map((phrase, index) => (
                    <span key={phrase} style={{ "--phrase-step": index }}>{phrase}</span>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="experience-endnote">
        <button className="experience-star-peek" type="button" aria-label="Peek at the SpaceX logo" aria-pressed={spaceXPeek} onClick={() => setSpaceXPeek((visible) => !visible)}>
          <span className="experience-spacex" aria-hidden="true" />
          <span className="experience-star" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
              <path d="M14 3c1.1 6.2 2.1 7.2 8 8.5-5.9 1.3-6.9 2.3-8 8.5-1.1-6.2-2.1-7.2-8-8.5 5.9-1.3 6.9-2.3 8-8.5Z" />
              <path d="M5 1.5c.4 2.6.9 3.1 3.5 3.5C5.9 5.4 5.4 5.9 5 8.5 4.6 5.9 4.1 5.4 1.5 5 4.1 4.6 4.6 4.1 5 1.5ZM5 15c.35 2.2.8 2.65 3 3-2.2.35-2.65.8-3 3-.35-2.2-.8-2.65-3-3 2.2-.35 2.65-.8 3-3Z" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}

export default Experience;
