import { useEffect, useState } from "react";

// Clicking the heading cycles through these, retyping from wherever it is.
const greetings = ["yousef khan", "yak", "yk_awesome"].map((name) => `hi, i’m ${name}.`);
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function TypingHeading() {
  const [target, setTarget] = useState(0);
  const [typed, setTyped] = useState(() => (reducedMotion() ? greetings[0] : ""));
  const greeting = greetings[target];

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
        <span className={`intro-typewriter${typed === greeting ? " is-complete" : ""}`} aria-hidden="true">
          {/* Every greeting reserves its width, so switching names doesn't shift the line. */}
          {greetings.map((text) => <span className="intro-typewriter-space" key={text} data-current={text === greeting || undefined}>{text}</span>)}
          <span className="intro-typed-text">{typed}</span>
        </span>
      </button>
    </h1>
  );
}

export default TypingHeading;
