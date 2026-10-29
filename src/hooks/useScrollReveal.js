import { useEffect } from "react";

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;

    const elements = [...container.querySelectorAll("[data-reveal]")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    const reveal = (element, immediately = false) => {
      element.classList.add("is-visible");
      if (immediately) element.classList.remove("reveal-ready");
      observer?.unobserve(element);
    };

    const observe = () => {
      observer?.disconnect();
      if (preference.matches) {
        elements.forEach((element) => reveal(element, true));
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        element.classList.add("reveal-ready");
        observer.observe(element);
      });
    };

    // Keyboard navigation should never wait for an entrance animation.
    const handleFocus = (event) => {
      const element = event.target.closest("[data-reveal]");
      if (element && container.contains(element)) reveal(element, true);
    };
    const handleAnimationEnd = (event) => {
      if (event.animationName === "scroll-arrive") {
        event.target.classList.remove("reveal-ready");
      }
    };

    observe();
    preference.addEventListener("change", observe);
    container.addEventListener("focusin", handleFocus);
    container.addEventListener("animationend", handleAnimationEnd);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", observe);
      container.removeEventListener("focusin", handleFocus);
      container.removeEventListener("animationend", handleAnimationEnd);
      elements.forEach((element) => element.classList.remove("reveal-ready"));
    };
  }, [containerRef]);
}
