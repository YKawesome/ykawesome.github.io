import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { tools } from "../data/tools";
import usePinnedScroll from "../hooks/usePinnedScroll";
import withHighlights from "./withHighlights";

// About a 10% overshoot, settling in half a second.
const STIFFNESS = 230;
const DAMPING = 18;

// A closed card is just its face, plus the card's border.
const closedWidth = (card) => card.offsetWidth - card.clientWidth + card.firstElementChild.offsetWidth;

// Springs each card's --open (App.css turns it into width) toward 0 or 1, so an
// opening card overshoots and shoves its neighbors, which lean as they slide.
// The track scrolls along with the card in motion so it ends up fully in view,
// details first when it can't all fit.
function useCardSpring(trackRef, openIndex, scrollTrackTo, trackPosition) {
  const springs = useRef(null);
  const focus = useRef(-1);

  useEffect(() => {
    const track = trackRef.current;
    const cards = [...track.children];
    if (!springs.current) springs.current = cards.map(() => ({ value: 0, velocity: 0 }));
    const state = springs.current;
    const index = openIndex >= 0 ? openIndex : focus.current;
    focus.current = openIndex;
    if (index < 0) return;

    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap);
    const view = track.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const width = closedWidth(cards[index]);
    const slot = width + gap;
    const extra = openIndex >= 0 ? slot : 0;
    const left = index * slot;
    const max = Math.max(cards.length * slot - gap + extra - view, 0);
    const shown = track.scrollLeft;
    const goal = Math.min(Math.max(Math.min(shown, left), left + width + extra - view, 0), max);
    // A pinned page that hasn't reached the frame only moves if the track must.
    const from = trackPosition();
    const to = Math.abs(goal - shown) < 1 ? from : goal;
    const start = state[index].value;
    const target = openIndex >= 0 ? 1 : 0;
    const previous = [];
    let frame = 0;
    let last = performance.now();

    const render = (dt) => {
      cards.forEach((card, i) => card.style.setProperty("--open", state[i].value));
      const progress = start === target ? 1 : (state[index].value - start) / (target - start);
      const scroll = from + (to - from) * progress;
      scrollTrackTo(scroll, "instant");
      let x = -Math.max(scroll, 0);
      cards.forEach((card, i) => {
        if (dt && i !== index) card.style.rotate = `${Math.max(-2.5, Math.min(2.5, ((previous[i] - x) / dt) * 0.0008)).toFixed(2)}deg`;
        previous[i] = x;
        x += slot * (1 + state[i].value);
      });
    };
    const settle = () => {
      track.removeAttribute("data-animating");
      cards.forEach((card) => card.style.removeProperty("rotate"));
    };
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      let moving = false;
      state.forEach((spring, i) => {
        const end = i === openIndex ? 1 : 0;
        spring.velocity += (STIFFNESS * (end - spring.value) - DAMPING * spring.velocity) * dt;
        spring.value += spring.velocity * dt;
        // A closing card lands instead of squashing past shut.
        if (spring.value < 0) spring.value = spring.velocity = 0;
        if (Math.abs(end - spring.value) < 0.001 && Math.abs(spring.velocity) < 0.01) {
          spring.value = end;
          spring.velocity = 0;
        } else {
          moving = true;
        }
      });
      render(dt);
      if (moving) frame = requestAnimationFrame(tick);
      else settle();
    };

    // Snapping would fight the scroll on every frame.
    track.setAttribute("data-animating", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      state.forEach((spring, i) => Object.assign(spring, { value: i === openIndex ? 1 : 0, velocity: 0 }));
      render(0);
      settle();
      return;
    }
    render(0);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      settle();
    };
  }, [trackRef, openIndex, scrollTrackTo, trackPosition]);
}

function ProjectsCarousel() {
  const trackRef = useRef(null);
  const { scrollerRef, frameRef, scrollTrackTo, trackPosition } = usePinnedScroll(trackRef);
  const [openIndex, setOpenIndex] = useState(-1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  useCardSpring(trackRef, openIndex, scrollTrackTo, trackPosition);

  const updatePosition = () => {
    const track = trackRef.current;
    setAtStart(track.scrollLeft < 4);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4);
  };

  // Cards change width as they open, so watch them as well as the track.
  useEffect(() => {
    const track = trackRef.current;
    const observer = new ResizeObserver(updatePosition);
    [track, ...track.children].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const move = (direction) => {
    const track = trackRef.current;
    const step = closedWidth(track.firstElementChild) + parseFloat(getComputedStyle(track).columnGap);
    scrollTrackTo(
      (Math.round(track.scrollLeft / step) + direction) * step,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    );
  };

  const close = (card) => {
    setOpenIndex(-1);
    card.querySelector(".project-face").focus();
  };

  return (
    <div className="projects-scroller" ref={scrollerRef}>
      <div className="projects-pin" ref={frameRef}>
        <div className="projects-heading" data-reveal="heading">
          <div><h2 id="projects-heading">projects.</h2><p>some things i’ve made!! check em out :)</p></div>
          <div className="carousel-controls" aria-label="Project carousel controls" hidden={atStart && atEnd}>
            <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous projects">←</button>
            <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next projects">→</button>
          </div>
        </div>
        <div className="project-carousel" ref={trackRef} onScroll={updatePosition} role="region" aria-label="Projects" aria-roledescription="carousel">
          {projects.map((project, index) => {
            const open = index === openIndex;
            return (
              <article className="project-card" key={project.id} data-open={open || undefined} data-reveal="card" style={{ "--reveal-delay": `${index * 80}ms` }} onKeyDown={(event) => {
                if (open && event.key === "Escape") close(event.currentTarget);
              }}>
                <button type="button" className="project-face" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open} aria-controls={`project-${project.id}-details`} aria-label={`Read about ${project.name}${project.featured ? " (featured)" : ""}`}>
                  <div className={`project-art ${project.id}-art`}>
                    {project.featured && <span className="project-featured" aria-hidden="true">★ Featured</span>}
                    {project.image ? <img className="project-thumbnail" src={project.image} alt="" width="640" height="480" loading="lazy" decoding="async" /> : <span aria-hidden="true">{project.id === "grouper" ? "grouper" : "401(k)"}</span>}
                    <img className="project-reaction" src={project.reaction} alt="" width="160" height="160" loading="lazy" decoding="async" />
                    <span className="project-expand" aria-hidden="true">→</span>
                  </div>
                  <div className="project-card-copy">
                    <span className="project-kind">{project.kind}</span>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                  </div>
                </button>
                <div className="project-details" id={`project-${project.id}-details`} role="region" aria-label={project.name} inert={!open}>
                  <p className="project-description">{withHighlights(project.description)}</p>
                  <p className="project-detail">{project.detail}</p>
                  <ul className="project-stack" aria-label="Built with">
                    {project.stack.split(" · ").map((item, chip) => <li key={item} style={{ "--chip": chip }}>{item}</li>)}
                  </ul>
                  <div className="project-actions">
                    {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
                  </div>
                  <button className="project-close" type="button" onClick={(event) => close(event.currentTarget.closest(".project-card"))} aria-label={`Close ${project.name}`}>×</button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="carousel-progress" aria-hidden="true"><span /></div>
        <div className="little-tools" data-reveal>
          <span>Little tools:</span>
          {tools.map((tool) => <Link key={tool.slug} to={`/tools/${tool.slug}`}>{tool.name} ↗</Link>)}
          <Link to="/tools">all tools ↗</Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectsCarousel;
