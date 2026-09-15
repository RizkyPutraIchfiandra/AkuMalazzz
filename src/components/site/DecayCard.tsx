import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type DecayCardProps = {
  /** width in px; if undefined, fills parent (100%) */
  width?: number;
  /** height in px; if undefined, fills parent (100%) */
  height?: number;
  image: string;
  alt?: string;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
  className?: string;
  children?: ReactNode;
};

/**
 * DecayCard — gambar di-bungkus filter SVG turbulence + displacement.
 * Pas cursor gerak, gambar terdistorsi (efek "decay"), dan card-nya juga
 * geser/miring halus ngikutin kursor.
 * Implementasi adaptasi dari React Bits (gsap).
 */
export function DecayCard({
  width,
  height,
  image,
  alt = "",
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  className = "",
  children,
}: DecayCardProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const filterId = useRef(`decay-filter-${Math.random().toString(36).slice(2, 9)}`);

  const cursor = useRef({ x: 0, y: 0 });
  const cachedCursor = useRef({ x: 0, y: 0 });
  const winsize = useRef({ width: 1, height: 1 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cachedCursor.current = { ...cursor.current };
    winsize.current = { width: window.innerWidth, height: window.innerHeight };

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const map = (
      x: number,
      a: number,
      b: number,
      c: number,
      d: number,
    ) => ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number) =>
      Math.hypot(x1 - x2, y1 - y2);

    const onResize = () => {
      winsize.current = { width: window.innerWidth, height: window.innerHeight };
    };
    const onMouseMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    const imgValues = {
      x: 0,
      y: 0,
      rz: 0,
      displacementScale: 0,
    };

    let rafId = 0;
    const render = () => {
      let targetX = lerp(
        imgValues.x,
        map(cursor.current.x, 0, winsize.current.width, -120, 120),
        0.1,
      );
      let targetY = lerp(
        imgValues.y,
        map(cursor.current.y, 0, winsize.current.height, -120, 120),
        0.1,
      );
      const targetRz = lerp(
        imgValues.rz,
        map(cursor.current.x, 0, winsize.current.width, -10, 10),
        0.1,
      );

      // bound the translation softly
      if (targetX > movementBound)
        targetX = movementBound + (targetX - movementBound) * 0.2;
      if (targetX < -movementBound)
        targetX = -movementBound + (targetX + movementBound) * 0.2;
      if (targetY > movementBound)
        targetY = movementBound + (targetY - movementBound) * 0.2;
      if (targetY < -movementBound)
        targetY = -movementBound + (targetY + movementBound) * 0.2;

      imgValues.x = targetX;
      imgValues.y = targetY;
      imgValues.rz = targetRz;

      if (wrapperRef.current) {
        gsap.set(wrapperRef.current, {
          x: imgValues.x,
          y: imgValues.y,
          rotateZ: imgValues.rz,
        });
      }

      const travelled = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y,
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(travelled, 0, 200, 0, maxDisplacement),
        0.06,
      );
      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale },
        });
      }
      cachedCursor.current = { ...cursor.current };
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        maxWidth: "100%",
      }}
    >
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="relative block h-full w-full will-change-transform"
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        <filter id={filterId.current}>
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter={`url(#${filterId.current})`}
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      {children && (
        <div className="pointer-events-none absolute inset-0">{children}</div>
      )}
    </div>
  );
}