import gamerImg from "@/assets/gamer.png";
import { DiscordIcon, YouTubeIcon } from "@/components/BrandIcons";
import { useReveal } from "@/hooks/use-reveal";
import { Lightfall } from "@/components/site/Lightfall";
import { DecayCard } from "@/components/site/DecayCard";
import { SOCIALS, openExternal, formatCount } from "@/lib/site";

export function Hero({ followers }: { followers: number }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="top" ref={ref} className="relative overflow-hidden">
      {/* lightfall sebagai dekorasi background area jumbotron */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 85% at 50% 50%, transparent 0%, transparent 45%, black 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 85% at 50% 50%, transparent 0%, transparent 45%, black 100%)",
        }}
      >
        <Lightfall
          colors={["#FFFFFF"]}
          backgroundColor="#444444"
          speed={0.6}
          streakCount={3}
          streakWidth={1}
          streakLength={1.2}
          glow={0.9}
          density={0.7}
          zoom={2.8}
          backgroundGlow={0}
          opacity={0.65}
          mouseInteraction
          mouseStrength={0.5}
          mouseRadius={0.8}
        />
      </div>

      {/* scrim halus biar teks lebih kebaca di atas streak */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 80%)",
        }}
      />

      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="blur-in mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Gamer & Streamer · Indonesia
          </p>
          <h1 className="streak-in display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Main game, ngobrol, dan tumbuh bareng komunitas.
          </h1>
          <p className="blur-in blur-in-delay-2 mt-7 max-w-xl text-base leading-8 text-muted-foreground">
            AkuMalazz nge-stream dari setup sederhana di kamar, upload
            gameplay yang apa adanya, dan pelan-pelan bangun tempat nongkrong
            buat penonton yang suka game dan jokes receh.
          </p>

          <div className="blur-in blur-in-delay-3 mt-9 flex flex-wrap items-center gap-6">
            <a
              href={SOCIALS.youtube}
              onClick={openExternal(SOCIALS.youtube)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              <YouTubeIcon className="h-4 w-4" />
              Buka YouTube
            </a>
            <a
              href={SOCIALS.discord}
              onClick={openExternal(SOCIALS.discord)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-medium transition hover:opacity-60"
            >
              <DiscordIcon className="h-4 w-4" />
              Join Discord
            </a>
          </div>
        </div>

        <div className="blur-in blur-in-delay-1">
          <figure className="relative">
            <div className="aspect-[4/5] w-full overflow-hidden grayscale">
              <DecayCard
                image={gamerImg}
                alt="AkuMalazz anime gamer laki-laki berkacamata"
                baseFrequency={0.018}
                numOctaves={4}
                seed={4}
                maxDisplacement={350}
                movementBound={40}
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
              <span className="text-muted-foreground">TikTok followers</span>
              <span className="display text-2xl tabular-nums">
                {formatCount(followers)}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}