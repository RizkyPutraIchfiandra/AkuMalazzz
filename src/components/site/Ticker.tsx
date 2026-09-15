const ITEMS = [
  "Gameplay",
  "Live bareng komunitas",
  "Mobile & PC",
  "YouTube Shorts",
  "TikTok Live",
  "Support via Saweria",
  "Join Discord",
];

export function Ticker() {
  return (
    <section className="overflow-hidden border-y border-border py-4">
      <div className="marquee-mask">
        <div className="ticker-track flex w-max whitespace-nowrap text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, set) => (
            <div
              key={set}
              aria-hidden={set === 1 ? true : undefined}
              className="flex shrink-0 items-center"
            >
              {ITEMS.map((item, i) => (
                <span key={i} className="flex shrink-0 items-center">
                  <span className="px-7">{item}</span>
                  <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}