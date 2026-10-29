import { useEffect, useRef, useState } from "react";
import portrait from "../assets/yousef-boba.webp";
import { reactions } from "../data/reactions";

const faces = [reactions.teehee, reactions.hearts, reactions.nerd, reactions.smile];
const peekPositions = [
  { left: "0%", top: "22%", "--peek-x": "-60%", "--peek-y": "-20%", "--peek-angle": "-20deg" },
  { left: "75%", top: "0%", "--peek-x": "-10%", "--peek-y": "-65%", "--peek-angle": "12deg" },
  { left: "100%", top: "58%", "--peek-x": "-35%", "--peek-y": "-20%", "--peek-angle": "22deg" },
  { left: "20%", top: "100%", "--peek-x": "-20%", "--peek-y": "-35%", "--peek-angle": "-12deg" },
];
const burstOrigins = [
  // Use the corner diagonals between the four hover peekers.
  { left: "10%", top: "10%", x: -56, y: -56 },
  { left: "90%", top: "10%", x: 56, y: -56 },
  { left: "90%", top: "90%", x: 56, y: 56 },
  { left: "10%", top: "90%", x: -56, y: 56 },
];

function AboutPhoto() {
  const [bursts, setBursts] = useState([]);
  const nextId = useRef(0);
  const timers = useRef(new Set());

  useEffect(() => {
    const pendingTimers = timers.current;
    return () => pendingTimers.forEach(clearTimeout);
  }, []);

  const popFaces = () => {
    const id = nextId.current++;
    // Bound both the visible bursts and their cleanup timers during rapid clicks.
    if (timers.current.size >= 4) return;
    setBursts((current) => [...current, id]);
    const timer = setTimeout(() => {
      setBursts((current) => current.filter((burst) => burst !== id));
      timers.current.delete(timer);
    }, 1400);
    timers.current.add(timer);
  };

  return (
    <figure className="about-photo" data-reveal="photo">
      <button className="about-photo-button" type="button" onClick={popFaces} aria-label="Pop out more emojis around Yousef’s photo">
        <span className="photo-peeks" aria-hidden="true">
          {faces.map((src, index) => (
            <img className="photo-peek" key={src} src={src} alt="" width="160" height="160" loading="lazy" decoding="async" style={{ ...peekPositions[index], "--peek-delay": `${index * 45}ms` }} />
          ))}
        </span>
        <img className="about-portrait" src={portrait} alt="Yousef wearing sunglasses and enjoying a boba tea" width="800" height="748" loading="lazy" decoding="async" />
        <span className="photo-bursts" aria-hidden="true">
          {bursts.flatMap((id) => burstOrigins.map((origin, index) => (
            <img className="photo-burst" key={`${id}-${index}`} src={faces[(id + index) % faces.length]} alt="" width="160" height="160" decoding="async" style={{ left: origin.left, top: origin.top, "--burst-x": `${origin.x}px`, "--burst-y": `${origin.y}px`, "--burst-angle": `${(id % 2 ? -1 : 1) * (18 + index * 9)}deg`, animationDelay: `${index * 55}ms` }} />
          )))}
        </span>
      </button>
    </figure>
  );
}

export default AboutPhoto;
