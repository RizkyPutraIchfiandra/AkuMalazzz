import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import gamerImg from "@/assets/gamer.jpg";
import { DiscordIcon, SaweriaIcon, TikTokIcon, YouTubeIcon } from "@/components/BrandIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AkuMalazz — Gamer & Streamer Indonesia" },
      {
        name: "description",
        content:
          "Portfolio AkuMalazz, gamer & streamer Indonesia. Realtime stats YouTube & TikTok, dukungan via Saweria, dan komunitas Discord.",
      },
      { property: "og:title", content: "AkuMalazz — Gamer & Streamer Indonesia" },
      {
        property: "og:description",
        content: "Realtime stats YouTube & TikTok, dukungan via Saweria, dan komunitas Discord.",
      },
    ],
  }),
  component: HomePage,
});

const SOCIALS = {
  youtube: "https://www.youtube.com/@akumalazz",
  tiktok: "https://www.tiktok.com/@u_1t.hn_",
  saweria: "https://saweria.co/AkuMalazz",
  discord: "https://discord.gg/hqJXceM4S",
};

function openExternal(href: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  };
}

function formatCount(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 10_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString("id-ID");
}

function useCountUp(target: number, duration = 700) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = val;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return val;
}

type YT = { subscribers: number; views: number; videos: number };
type TT = { followers: number; hearts: number; videos: number };

function HomePage() {
  const [yt, setYt] = useState<YT>({ subscribers: 0, views: 0, videos: 0 });
  const [tt, setTt] = useState<TT>({ followers: 0, hearts: 0, videos: 0 });
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [yRes, tRes] = await Promise.all([
          fetch(
            "https://api.socialcounts.org/youtube-live-subscriber-count/UCn1YeWo_XYhcy57-TGTMJcA",
            { cache: "no-store" },
          ),
          fetch(
            "https://www.tikwm.com/api/user/info?unique_id=u_1t.hn_",
            { cache: "no-store" },
          ),
        ]);
        const y = await yRes.json();
        const t = await tRes.json();
        console.log("YouTube API:", y);
        console.log("TikTok API:", t);
        if (!mounted) return;
        setYt({
          subscribers: y.subscribers ?? y?.counters?.api?.subscriberCount ?? y?.counters?.estimation?.subscriberCount ?? 0,
          views: y.views ?? y?.counters?.api?.viewCount ?? 0,
          videos: y.videos ?? y?.counters?.api?.videoCount ?? 0,
        });
        setTt({
          followers: t.followers ?? t?.data?.stats?.followerCount ?? 0,
          hearts: t.hearts ?? t?.data?.stats?.heartCount ?? 0,
          videos: t.videos ?? t?.data?.stats?.videoCount ?? 0,
        });
        setUpdatedAt(new Date());
      } catch (err) {
        console.error("Stats fetch error:", err);
        if (mounted) setUpdatedAt(new Date());
      }
    };

    load();
    const id = setInterval(load, 8_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const subs = useCountUp(yt.subscribers);
  const followers = useCountUp(tt.followers);
  const hearts = useCountUp(tt.hearts);

  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-sm font-extrabold text-secondary-foreground">
              AM
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="display block text-lg font-extrabold">AkuMalazz</span>
              <span className="block text-xs font-medium text-muted-foreground">gamer indonesia</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            <a href="#about" className="text-muted-foreground transition hover:text-foreground">
              Tentang
            </a>
            <a href="#stats" className="text-muted-foreground transition hover:text-foreground">
              Stats
            </a>
            <a href="#socials" className="text-muted-foreground transition hover:text-foreground">
              Sosial
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SOCIALS.discord}
              onClick={openExternal(SOCIALS.discord)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-bold shadow-clean transition hover:-translate-y-0.5 hover:border-foreground md:inline-flex"
            >
              <DiscordIcon className="h-4 w-4" />
              Discord
            </a>
            <a
              href={SOCIALS.saweria}
              onClick={openExternal(SOCIALS.saweria)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-extrabold text-accent-foreground shadow-clean transition hover:-translate-y-0.5 hover:shadow-strong"
            >
              <SaweriaIcon className="h-5 w-5" />
              Donate
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
        <div className="animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-extrabold uppercase tracking-wide shadow-clean">
            <span className="h-2 w-2 rounded-full status-dot animate-pulse-soft" />
            Streamer merintis dari Indonesia
          </div>
          <h1 className="display max-w-3xl text-5xl font-extrabold leading-[0.96] text-foreground sm:text-6xl lg:text-7xl">
            Gaming santai, momen rame, dan komunitas yang solid.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            AkuMalazz mulai dari setup sederhana di kamar, upload gameplay yang apa adanya,
            lalu pelan-pelan bangun tempat nongkrong buat penonton yang suka game dan jokes receh.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SOCIALS.youtube}
              onClick={openExternal(SOCIALS.youtube)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-extrabold text-secondary-foreground shadow-clean transition hover:-translate-y-0.5 hover:shadow-strong"
            >
              <YouTubeIcon className="h-5 w-5" />
              Buka YouTube
              <span aria-hidden>↗</span>
            </a>
            <a
              href={SOCIALS.discord}
              onClick={openExternal(SOCIALS.discord)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-extrabold shadow-clean transition hover:-translate-y-0.5 hover:border-foreground"
            >
              <DiscordIcon className="h-5 w-5" />
              Join Discord
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up lg:mr-0" style={{ animationDelay: "0.12s" }}>
          <div className="absolute -left-4 top-8 hidden rounded-lg bg-accent px-4 py-3 text-sm font-extrabold text-accent-foreground shadow-clean sm:block">
            LIVE SOON
          </div>
          <div className="rounded-2xl border border-border bg-card p-3 shadow-strong">
            <img
              src={gamerImg}
              alt="AkuMalazz anime gamer laki-laki berkacamata"
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full rounded-xl object-cover animate-float"
            />
          </div>
          <div className="absolute -bottom-5 right-4 rounded-xl bg-secondary px-4 py-3 text-secondary-foreground shadow-clean">
            <div className="text-xs font-semibold text-secondary-foreground/75">TikTok followers</div>
            <div className="display text-3xl font-extrabold tabular-nums">{formatCount(followers)}</div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-3 text-secondary-foreground">
        <div className="flex w-[200%] gap-8 ticker-track whitespace-nowrap text-sm font-extrabold uppercase tracking-wide">
          {Array.from({ length: 2 }).map((_, set) => (
            <div key={set} className="flex min-w-[50%] gap-8">
              <span>AkuMalazz</span>
              <span>Gameplay</span>
              <span>Live bareng komunitas</span>
              <span>Mobile & PC</span>
              <span>Support via Saweria</span>
              <span>Join Discord</span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-clean">
          <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Tentang AkuMalazz</p>
          <h2 className="display mt-3 text-4xl font-extrabold leading-tight">Streamer kecil yang lagi naik level.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <InfoCard label="Asal" value="Indonesia" />
          <InfoCard label="Konten" value="Gaming" />
          <InfoCard label="Status" value="Merintis" />
          <div className="rounded-2xl border border-border bg-card p-6 shadow-clean sm:col-span-3">
            <p className="text-base leading-8 text-muted-foreground">
              Kontennya fokus ke gameplay, highlight lucu, momen gagal yang malah jadi hiburan,
              dan live santai bareng penonton. Vibenya dibuat simpel: main game, ngobrol, dan
              tumbuh bareng komunitas tanpa dibuat-buat.
            </p>
          </div>
        </div>
      </section>

      <section id="stats" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Realtime stats</p>
            <h2 className="display mt-2 text-4xl font-extrabold">Angka terbaru</h2>
          </div>
          <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground shadow-clean">
            {updatedAt ? `Update ${updatedAt.toLocaleTimeString("id-ID")}` : "Memuat data…"}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <StatCard
            icon={<YouTubeIcon className="h-7 w-7" />}
            brand="YouTube"
            handle="@akumalazz"
            value={formatCount(subs)}
            metric="subscribers publik"
            extra={yt.subscribers === 0 ? "YouTube belum membuka angka publik untuk channel ini" : `${formatCount(yt.videos)} video · ${formatCount(yt.views)} views`}
            href={SOCIALS.youtube}
          />
          <StatCard
            icon={<TikTokIcon className="h-7 w-7" />}
            brand="TikTok"
            handle="@u_1t.hn_"
            value={formatCount(followers)}
            metric="followers"
            extra={`${formatCount(tt.videos)} video · ${formatCount(hearts)} likes`}
            href={SOCIALS.tiktok}
          />
        </div>
      </section>

      <section id="socials" className="mx-auto grid max-w-6xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="ink-panel rounded-2xl p-6 shadow-strong">
          <p className="text-xs font-extrabold uppercase tracking-wide text-secondary-foreground/70">Sosial & support</p>
          <h2 className="display mt-3 text-4xl font-extrabold leading-tight">Semua link utama ada di sini.</h2>
          <p className="mt-4 text-sm leading-7 text-secondary-foreground/75">
            Saweria sudah ditaruh di header supaya orang bisa langsung donate tanpa cari-cari.
          </p>
        </div>

        <div className="grid gap-3">
          <SocialRow href={SOCIALS.saweria} icon={<SaweriaIcon className="h-7 w-7" />} name="Saweria" handle="saweria.co/AkuMalazz" highlight />
          <SocialRow href={SOCIALS.youtube} icon={<YouTubeIcon className="h-7 w-7" />} name="YouTube" handle="@akumalazz" />
          <SocialRow href={SOCIALS.tiktok} icon={<TikTokIcon className="h-7 w-7" />} name="TikTok" handle="@u_1t.hn_" />
          <SocialRow href={SOCIALS.discord} icon={<DiscordIcon className="h-7 w-7" />} name="Discord" handle="discord.gg/hqJXceM4S" />
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-sm font-medium text-muted-foreground sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <span>© {new Date().getFullYear()} AkuMalazz</span>
          <a href={SOCIALS.saweria} onClick={openExternal(SOCIALS.saweria)} target="_blank" rel="noopener noreferrer" className="font-extrabold text-foreground">
            Support via Saweria ↗
          </a>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-clean">
      <dt className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="display mt-2 text-2xl font-extrabold">{value}</dd>
    </div>
  );
}

function StatCard({
  icon,
  brand,
  handle,
  value,
  metric,
  extra,
  href,
}: {
  icon: ReactNode;
  brand: string;
  handle: string;
  value: string;
  metric: string;
  extra: string;
  href: string;
}) {
  return (
    <a
      href={href}
      onClick={openExternal(href)}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-2xl border border-border bg-card p-6 shadow-clean transition hover:-translate-y-1 hover:border-foreground hover:shadow-strong"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-muted">{icon}</span>
          <span>
            <span className="block text-sm font-extrabold">{brand}</span>
            <span className="block text-xs font-semibold text-muted-foreground">{handle}</span>
          </span>
        </div>
        <span className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground">↗</span>
      </div>
      <div className="mt-8 display text-6xl font-extrabold tabular-nums leading-none sm:text-7xl">{value}</div>
      <div className="mt-2 text-sm font-extrabold text-foreground">{metric}</div>
      <div className="mt-5 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-muted-foreground">{extra}</div>
    </a>
  );
}

function SocialRow({
  href,
  icon,
  name,
  handle,
  highlight = false,
}: {
  href: string;
  icon: ReactNode;
  name: string;
  handle: string;
  highlight?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={openExternal(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-2xl border border-border p-4 shadow-clean transition hover:-translate-y-0.5 hover:border-foreground hover:shadow-strong ${
        highlight ? "bg-accent text-accent-foreground" : "bg-card"
      }`}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-background">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="display block text-2xl font-extrabold">{name}</span>
        <span className={`block truncate text-sm font-semibold ${highlight ? "text-accent-foreground/75" : "text-muted-foreground"}`}>
          {handle}
        </span>
      </span>
      <span className="text-xl transition group-hover:translate-x-1">↗</span>
    </a>
  );
}
