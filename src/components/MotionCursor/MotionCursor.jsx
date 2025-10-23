import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import PropTypes from "prop-types";

export default function MotionCursor({
  innerSize = 12,
  outerSize = 32,
  innerScale = 1,
  outerScale = 2.5,
  clickables = [
    "a",
    "button",
    'img[class*="clickable"]',
    'div[class*="clickable"]',
    'div[role="button"]',
  ],
  showSystemCursor = false,
  hasBlendMode = true,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 40, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 40, mass: 0.6 });

  const [visible, setVisible] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const selectors = useRef(clickables.join(","));
  useEffect(() => {
    selectors.current = clickables.join(",");
  }, [clickables]);

  useEffect(() => {
    if (!showSystemCursor) {
      document.documentElement.classList.add("yk-hide-cursor");
    }
    return () => {
      document.documentElement.classList.remove("yk-hide-cursor");
    };
  }, [showSystemCursor]);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onDown = () => setIsDown(true);
    const onUp = () => setIsDown(false);

    const onOver = (e) => {
      const target = e.target;
      if (!target) return;
      const match = target.closest(selectors.current);
      setIsHover(!!match);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, visible]);

  const innerR = innerSize / 2;
  const outerR = outerSize / 2;

  const innerScaleFinal = isDown ? innerScale * 0.85 : innerScale;
  const outerScaleFinal = isHover ? outerScale : isDown ? outerScale * 0.9 : 1;

  const display = visible ? "block" : "none";

  return (
    <>
      {/* inner dot */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          translateX: mouseX,
          translateY: mouseY,
          width: innerSize,
          height: innerSize,
          marginLeft: -innerR,
          marginTop: -innerR,
          borderRadius: "9999px",
          pointerEvents: "none",
          backgroundColor: "var(--cursor-color)",
          mixBlendMode: "normal",
          display,
          zIndex: 9999,
        }}
        animate={{ scale: innerScaleFinal, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      />

      {/* outer ring */}
      <motion.div
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          translateX: smoothX,
          translateY: smoothY,
          width: outerSize,
          height: outerSize,
          marginLeft: -outerR,
          marginTop: -outerR,
          borderRadius: "9999px",
          pointerEvents: "none",
          backgroundColor: "var(--cursor-color)",
          opacity: 0.25,
          mixBlendMode: hasBlendMode ? "overlay" : "normal",
          display,
          zIndex: 9998,
        }}
        animate={{ scale: outerScaleFinal, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      />
    </>
  );
}

MotionCursor.propTypes = {
  innerSize: PropTypes.number,
  outerSize: PropTypes.number,
  innerScale: PropTypes.number,
  outerScale: PropTypes.number,
  clickables: PropTypes.arrayOf(PropTypes.string),
  showSystemCursor: PropTypes.bool,
  hasBlendMode: PropTypes.bool,
};