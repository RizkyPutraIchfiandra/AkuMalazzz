/**
 * Fixed decorative layer behind all content. White/gray patterns and
 * outlined ornaments lift the near-black background without adding color.
 * Purely decorative and non-interactive.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* layered patterns */}
      <div className="absolute inset-0 bg-dots" />
      <div className="absolute inset-0 bg-diagonal" />
      <div className="absolute inset-0 bg-vignette" />

      {/* large outlined ring ornaments */}
      <div
        className="ornament-ring"
        style={{ top: "-14rem", right: "-10rem", width: "34rem", height: "34rem" }}
      />
      <div
        className="ornament-ring"
        style={{ bottom: "-18rem", left: "-12rem", width: "40rem", height: "40rem" }}
      />

      {/* scattered plus markers */}
      <span className="ornament-plus" style={{ top: "18%", left: "8%" }} />
      <span className="ornament-plus" style={{ top: "42%", right: "12%" }} />
      <span className="ornament-plus" style={{ top: "68%", left: "22%" }} />
      <span className="ornament-plus" style={{ bottom: "12%", right: "28%" }} />
    </div>
  );
}