import { SOCIALS, openExternal } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-5 pb-12 pt-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} AkuMalazz</span>
        <a
          href={SOCIALS.saweria}
          onClick={openExternal(SOCIALS.saweria)}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-accent pb-0.5 text-accent transition hover:opacity-70"
        >
          Support via Saweria ↗
        </a>
      </div>
    </footer>
  );
}