import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Clicking the heading cycles through these, retyping from wherever it is.
const greetings = ["yousef khan", "yak", "yk_awesome"].map((name) => `hi, i’m ${name}.`);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function TypingHeading() {
  const [target, setTarget] = useState(0);
  const [typed, setTyped] = useState(() => (reducedMotion() ? greetings[0] : ""));
  const greeting = greetings[target];
  const boxRef = useRef(null);

  // The box takes the width of the greeting being typed, so each one ends up
  // centered. It glides there while the old name is erased (App.css), and it's
  // in em to keep up with the font size.
  useLayoutEffect(() => {
    const box = boxRef.current;
    const width = box.querySelector(".intro-typewriter-space").getBoundingClientRect().width;
    box.style.width = `${width / parseFloat(getComputedStyle(box).fontSize)}em`;
  }, [greeting]);

  // One keystroke per run: backspace to the shared start, then type the rest.
  useEffect(() => {
    if (typed === greeting) return;
    const typing = greeting.startsWith(typed);
    const last = typed.at(-1);
    const delay = !typing ? 45 : !typed ? 350 : last === "," ? 260 : last === " " ? 65 : 90 + (typed.length % 3) * 20;
    const timer = setTimeout(() => setTyped(typing ? greeting.slice(0, typed.length + 1) : typed.slice(0, -1)), delay);
    return () => clearTimeout(timer);
  }, [greeting, typed]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => {
      if (preference.matches) setTyped(greetings[target]);
    };
    preference.addEventListener("change", handlePreference);
    return () => preference.removeEventListener("change", handlePreference);
  }, [target]);

  const showNextName = () => {
    const next = (target + 1) % greetings.length;
    setTarget(next);
    if (reducedMotion()) setTyped(greetings[next]);
  };

  return (
    <h1 id="intro-heading">
      <button type="button" className="intro-name" onClick={showNextName} aria-label={greeting}>
        <span className={`intro-typewriter${typed === greeting ? " is-complete" : ""}`} ref={boxRef} aria-hidden="true">
          <span className="intro-typewriter-space">{greeting}</span>
          <span className="intro-typed-text">{typed}</span>
        </span>
      </button>
    </h1>
  );
}

export default TypingHeading;
