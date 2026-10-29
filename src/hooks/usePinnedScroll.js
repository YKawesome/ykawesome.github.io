import { useCallback, useEffect, useRef } from "react";

// When the cards don't fit, the frame turns sticky (see motion.css) and
// scrolling the page through the taller scroller moves the track sideways one
// to one. Sideways swipes over the track, and anything else that scrolls it,
// move the page to match.
export default function usePinnedScroll(trackRef) {
  const scrollerRef = useRef(null);
  const frameRef = useRef(null);
  const pin = useRef({ active: false, distance: 0, applied: 0 });

  const scrollTrackTo = useCallback((left, behavior) => {
    const { active, distance } = pin.current;
    if (!active) {
      trackRef.current.scrollTo({ left, behavior });
      return;
    }
    const top = scrollerRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + Math.min(Math.max(left, 0), distance), behavior });
  }, [trackRef]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;
    const state = pin.current;
    const offset = () => -scroller.getBoundingClientRect().top;
    const clamp = (left) => Math.min(Math.max(left, 0), state.distance);
    const jumpPage = (left) => window.scrollTo({ top: window.scrollY - offset() + left, behavior: "instant" });

    const setTrack = (left) => {
      state.applied = left;
      if (Math.abs(track.scrollLeft - left) >= 1) track.scrollLeft = left;
      frame.style.setProperty("--pin-progress", state.distance ? left / state.distance : 0);
    };
    const followPage = () => {
      if (state.active) setTrack(clamp(offset()));
    };
    const followTrack = () => {
      if (!state.active || Math.abs(track.scrollLeft - state.applied) < 2) return;
      setTrack(track.scrollLeft);
      jumpPage(track.scrollLeft);
    };
    const measure = () => {
      // Decide from the static row, so pinning can't change its own answer.
      // Unpinning shortens the page for a moment, which can clamp the scroll near the bottom.
      const y = window.scrollY;
      scroller.removeAttribute("data-pinned");
      scroller.toggleAttribute("data-pinned", track.scrollWidth - track.clientWidth > 1);
      if (window.scrollY !== y) window.scrollTo({ top: y, behavior: "instant" });
      state.active = getComputedStyle(frame).position === "sticky";
      state.distance = state.active ? track.scrollWidth - track.clientWidth : 0;
      // On the root, so the background's pin hold in motion.css can read it too.
      document.documentElement.style.setProperty("--pin-distance", `${state.distance}px`);
      followPage();
    };
    const steerWheel = (event) => {
      const current = offset();
      if (!state.active || current < 0 || current > state.distance || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      jumpPage(clamp(current + event.deltaX * (event.deltaMode ? 16 : 1)));
    };
    // Browsers scroll a focused card into view after focusin. Moving the page
    // there first keeps the next page scroll from pulling the card back out.
    const showFocused = (event) => {
      const card = event.target.closest(".project-card");
      if (!state.active || !card) return;
      const view = track.getBoundingClientRect();
      const box = card.getBoundingClientRect();
      if (box.left >= view.left && box.right <= view.right) return;
      const left = clamp(box.left - view.left + track.scrollLeft - parseFloat(getComputedStyle(track).paddingLeft));
      setTrack(left);
      jumpPage(left);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", followPage, { passive: true });
    track.addEventListener("scroll", followTrack, { passive: true });
    track.addEventListener("wheel", steerWheel, { passive: false });
    track.addEventListener("focusin", showFocused);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", followPage);
      track.removeEventListener("scroll", followTrack);
      track.removeEventListener("wheel", steerWheel);
      track.removeEventListener("focusin", showFocused);
      document.documentElement.style.removeProperty("--pin-distance");
    };
  }, [trackRef]);

  return { scrollerRef, frameRef, scrollTrackTo };
}
