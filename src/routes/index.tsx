import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  DiscordIcon,
  SaweriaIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/BrandIcons";
import { useReveal } from "@/hooks/use-reveal";
import { Backdrop } from "@/components/site/Backdrop";
import { Preloader } from "@/components/site/Preloader";
import { Hero } from "@/components/site/Hero";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Ticker } from "@/components/site/Ticker";
import { SocialRow } from "@/components/site/SocialRow";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SOCIALS, openExternal, formatCount } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AkuMalazz — Gamer & Streamer Indonesia" },
      {
        name: "description",
        content:
          "Portfolio AkuMalazz, gamer & streamer Indonesia. Live streaming, gameplay, highlight, dan komunitas Discord. Realtime stats YouTube & TikTok.",
      },
      { property: "og:title", content: "AkuMalazz — Gamer & Streamer Indonesia" },
      {
        property: "og:description",
        content:
          "Realtime stats YouTube & TikTok, dukungan via Saweria, dan komunitas Discord.",
      },
    ],
  }),
  component: HomePage,
});

function useCountUp(target: number, duration = 900) {
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
          fetch("/api/youtube", { cache: "no-store" }),
          fetch("/api/tiktok", { cache: "no-store" }),
        ]);
        const y = await yRes.json();
        const t = await tRes.json();
        if (!mounted) return;
        setYt({
          subscribers:
            y.subscribers ??
            y?.counters?.api?.subscriberCount ??
            y?.counters?.estimation?.subscriberCount ??
            0,
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
    const id = setInterval(load, 60_000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const subs = useCountUp(yt.subscribers);
  const followers = useCountUp(tt.followers);
  const hearts = useCountUp(tt.hearts);

  return (
    <main className="min-h-screen">
      <Preloader />
      <Backdrop />
      <SiteHeader />
      <Hero followers={followers} />
      <Ticker />
      <About />
      <Work />
      <Stats
        subs={subs}
        followers={followers}
        hearts={hearts}
        yt={yt}
        tt={tt}
        updatedAt={updatedAt}
      />
      <Socials />
      <SiteFooter />
    </main>
  );
}

/* -------------------------------- About ------------------------------- */

function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="about"
      ref={ref}
      className="mx-auto max-w-5xl px-5 py-20 sm:px-8"
    >
      <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <div className="blur-in">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Tentang
          </p>
          <h2 className="display mt-4 text-4xl leading-tight">
            Kontenkreator yang lagi merintis dari kamar sendiri.
          </h2>
        </div>
        <div className="blur-in blur-in-delay-1">
          <p className="text-lg leading-9 text-foreground/90">
            AkuMalazz mulai dari setup sederhana, upload gameplay yang apa
            adanya, terus pelan-pelan bangun komunitas yang santai. Konten
            utamanya gameplay, highlight lucu, dan live bareng penonton.
          </p>
          <p className="mt-5 text-lg leading-9 text-foreground/90">
            Karir kontenkreatornya dibangun tanpa drama: konsisten upload,
            ngobrol sama penonton, dan main game yang lagi seru. Tujuannya
            simpel — bikin tempat nongkrong online yang asik buat semua orang.
          </p>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <Fact label="Asal" value="Indonesia" />
            <Fact label="Peran" value="Kontenkreator" />
            <Fact label="Status" value="Merintis" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </dt>
      <dd className="display mt-2 text-2xl">{value}</dd>
    </div>
  );
}

/* -------------------------------- Work -------------------------------- */

const WORK = [
  {
    no: "01",
    title: "Gameplay & Highlight",
    desc: "Cuplikan momen seru, clutch, dan fail yang malah jadi hiburan.",
    tag: "YouTube",
  },
  {
    no: "02",
    title: "Live Streaming",
    desc: "Main bareng penonton, ngobrol santai, request game.",
    tag: "TikTok Live",
  },
  {
    no: "03",
    title: "Series & Playthrough",
    desc: "Series rutin buat tamatin game seru bareng penonton.",
    tag: "YouTube",
  },
  {
    no: "04",
    title: "Short Content",
    desc: "Highlight singkat dan editan cepat buat TikTok & YouTube Shorts.",
    tag: "Shorts",
  },
  {
    no: "05",
    title: "Komunitas Discord",
    desc: "Tempat nongkrong, cari temen mabar, dan info jadwal live.",
    tag: "Discord",
  },
];

function Work() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="work" ref={ref} className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <div className="blur-in border-b border-border pb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Yang dikerjain
        </p>
        <h2 className="display mt-3 text-4xl">Konten & kegiatan.</h2>
      </div>

      <div className="blur-group">
        {WORK.map((item, i) => (
          <div
            key={item.no}
            className={`blur-hover blur-in blur-in-delay-${(i % 3) + 1} group flex flex-col gap-3 border-b border-border py-8 sm:flex-row sm:items-baseline sm:gap-8`}
          >
            <span className="display text-sm text-muted-foreground sm:w-12">
              {item.no}
            </span>
            <div className="flex-1">
              <h3 className="display text-3xl transition group-hover:translate-x-1">
                {item.title}
              </h3>
              <p className="mt-2 max-w-md text-muted-foreground">{item.desc}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.15em] text-accent">
              {item.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- Stats ------------------------------- */

function Stats({
  subs,
  followers,
  hearts,
  yt,
  tt,
  updatedAt,
}: {
  subs: number;
  followers: number;
  hearts: number;
  yt: YT;
  tt: TT;
  updatedAt: Date | null;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="stats"
      ref={ref}
      className="mx-auto max-w-5xl px-5 py-20 sm:px-8"
    >
      <div className="blur-in flex flex-wrap items-end justify-between gap-3 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Realtime stats
          </p>
          <h2 className="display mt-3 text-4xl">Angka terbaru</h2>
        </div>
        <span className="text-xs text-muted-foreground">
          {updatedAt
            ? `Update ${updatedAt.toLocaleTimeString("id-ID")}`
            : "Memuat data…"}
        </span>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2">
        <StatCard
          className="blur-in"
          icon={<YouTubeIcon className="h-5 w-5" />}
          brand="YouTube"
          handle="@akumalazz"
          value={formatCount(subs)}
          metric="subscribers publik"
          extra={
            yt.subscribers === 0
              ? "YouTube belum membuka angka publik untuk channel ini"
              : `${formatCount(yt.videos)} video · ${formatCount(yt.views)} views`
          }
          href={SOCIALS.youtube}
        />
        <StatCard
          className="blur-in blur-in-delay-1"
          icon={<TikTokIcon className="h-5 w-5" />}
          brand="TikTok"
          handle="@u_1t.hn_"
          value={formatCount(followers)}
          metric="followers"
          extra={`${formatCount(tt.videos)} video · ${formatCount(hearts)} likes`}
          href={SOCIALS.tiktok}
        />
      </div>
    </section>
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
  className = "",
}: {
  icon: ReactNode;
  brand: string;
  handle: string;
  value: string;
  metric: string;
  extra: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={openExternal(href)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group bg-background p-8 transition hover:bg-muted ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-sm">
            <span className="font-medium">{brand}</span>
            <span className="ml-2 text-muted-foreground">{handle}</span>
          </span>
        </div>
        <span className="text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground">
          ↗
        </span>
      </div>
      <div className="display mt-10 text-6xl tabular-nums leading-none">
        {value}
      </div>
      <div className="mt-3 text-sm font-medium">{metric}</div>
      <div className="mt-4 text-xs text-muted-foreground">{extra}</div>
    </a>
  );
}

/* ------------------------------- Socials ------------------------------ */

function Socials() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="socials"
      ref={ref}
      className="mx-auto max-w-5xl px-5 py-20 sm:px-8"
    >
      <div className="blur-in border-b border-border pb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Sosial & support
        </p>
        <h2 className="display mt-3 text-4xl">Semua link utama.</h2>
      </div>

      <div className="blur-group divide-y divide-border">
        <SocialRow
          href={SOCIALS.saweria}
          icon={<SaweriaIcon className="h-6 w-6" />}
          name="Saweria"
          handle="saweria.co/AkuMalazz"
          highlight
        />
        <SocialRow
          href={SOCIALS.youtube}
          icon={<YouTubeIcon className="h-6 w-6" />}
          name="YouTube"
          handle="@akumalazz"
        />
        <SocialRow
          href={SOCIALS.tiktok}
          icon={<TikTokIcon className="h-6 w-6" />}
          name="TikTok"
          handle="@u_1t.hn_"
        />
        <SocialRow
          href={SOCIALS.discord}
          icon={<DiscordIcon className="h-6 w-6" />}
          name="Discord"
          handle="discord.gg/hqJXceM4S"
        />
      </div>
    </section>
  );
}
