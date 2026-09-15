import { useEffect, useState } from "react";

/**
 * Full-screen intro animation shown before the site reveals.
 * Spinning dual gradient rings + flickering initials + a loading bar that
 * counts to 100%, then fades the whole overlay away.
 */
export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1900; // ms to reach 100%
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out so it slows near the end
      const eased = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
        setTimeout(() => setRemoved(true), 1000);
      }
    };
    raf = requestAnimationFrame(tick);

    // lock scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (removed) return null;

  return (
    <div className={`preloader ${done ? "done" : ""}`} aria-hidden={done}>
      <div className="preloader-mark">
        <span className="preloader-ring" />
        <span className="preloader-ring slow" />
        <span className="preloader-initials display">AM</span>

        <div className="preloader-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="preloader-pct">{String(pct).padStart(3, "0")}%</div>
      </div>
    </div>
  );
}