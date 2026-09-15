import { SaweriaIcon } from "@/components/BrandIcons";
import { SOCIALS, openExternal } from "@/lib/site";

const NAV = [
  ["#about", "Tentang"],
  ["#work", "Konten"],
  ["#stats", "Stats"],
  ["#socials", "Sosial"],
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="display text-xl tracking-tight">AkuMalazz</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            gamer & streamer
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          {NAV.map(([href, label]) => (
            <a key={href} href={href} className="transition hover:text-foreground">
              {label}
            </a>
          ))}
        </nav>

        <a
          href={SOCIALS.saweria}
          onClick={openExternal(SOCIALS.saweria)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-b border-accent pb-0.5 text-sm font-medium text-accent transition hover:opacity-70"
        >
          <SaweriaIcon className="h-4 w-4" />
          Donate
        </a>
      </div>
    </header>
  );
}