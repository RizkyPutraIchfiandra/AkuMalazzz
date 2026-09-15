import { useEffect, useRef } from "react";

/**
 * Reveal-on-scroll. Adds the `in` class to the element and every descendant
 * carrying `.blur-in`, `.streak-in`, or `.skill-bar-fill` once the section
 * enters the viewport, triggering the reveal/fill animations in styles.css.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const root = entry.target as HTMLElement;
          const sel = ".blur-in, .streak-in, .skill-bar-fill";
          const targets = root.matches(sel)
            ? [root]
            : Array.from(root.querySelectorAll<HTMLElement>(sel));
          if (targets.length === 0) targets.push(root);
          targets.forEach((t) => t.classList.add("in"));
          io.unobserve(root);
        });
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}