import { useState } from "react";
import { SaweriaIcon } from "@/components/BrandIcons";
import { SOCIALS, openExternal } from "@/lib/site";

const NAV = [
  ["#about", "Tentang"],
  ["#work", "Konten"],
  ["#stats", "Stats"],
  ["#socials", "Sosial"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
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

        <div className="flex items-center gap-4">
          <a
            href={SOCIALS.saweria}
            onClick={openExternal(SOCIALS.saweria)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 border-b border-accent pb-0.5 text-sm font-medium text-accent transition hover:opacity-70 sm:inline-flex"
          >
            <SaweriaIcon className="h-4 w-4" />
            Donate
          </a>
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 p-2 sm:hidden"
          >
            <span
              className={`block h-px w-5 bg-foreground transition-transform ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-transform ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background/90 px-5 py-3 text-sm sm:hidden">
          {NAV.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-muted-foreground transition hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href={SOCIALS.saweria}
            onClick={(e) => {
              setOpen(false);
              openExternal(SOCIALS.saweria)(e);
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-2 border-t border-border pt-3 text-sm font-medium text-accent"
          >
            <SaweriaIcon className="h-4 w-4" />
            Donate
          </a>
        </nav>
      )}
    </header>
  );
}
