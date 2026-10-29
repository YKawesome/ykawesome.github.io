import { useEffect, useState } from "react";

const greeting = "hi, i’m yousef khan.";

function TypingHeading() {
  const [characterCount, setCharacterCount] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? greeting.length : 0
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let nextCharacter = 0;

    const typeCharacter = () => {
      nextCharacter += 1;
      setCharacterCount(nextCharacter);
      if (nextCharacter < greeting.length) {
        const character = greeting[nextCharacter - 1];
        const delay = character === "," ? 260 : character === " " ? 65 : 90 + (nextCharacter % 3) * 20;
        timer = setTimeout(typeCharacter, delay);
      }
    };

    const handlePreference = () => {
      if (preference.matches) {
        clearTimeout(timer);
        setCharacterCount(greeting.length);
      }
    };

    if (!preference.matches) timer = setTimeout(typeCharacter, 350);
    preference.addEventListener("change", handlePreference);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", handlePreference);
    };
  }, []);

  return (
    <h1 id="intro-heading" aria-label={greeting}>
      <span className={`intro-typewriter${characterCount === greeting.length ? " is-complete" : ""}`} aria-hidden="true">
        <span className="intro-typewriter-space">{greeting}</span>
        <span className="intro-typed-text">{greeting.slice(0, characterCount)}</span>
      </span>
    </h1>
  );
}

export default TypingHeading;
