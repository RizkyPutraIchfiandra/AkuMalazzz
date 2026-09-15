import type { ReactNode } from "react";
import { openExternal } from "@/lib/site";

export function SocialRow({
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
      className="blur-hover group flex items-center gap-5 py-6 transition"
    >
      <span className="text-muted-foreground">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="display block text-2xl">{name}</span>
        <span className="block truncate text-sm text-muted-foreground">
          {handle}
        </span>
      </span>
      {highlight && (
        <span className="hidden text-xs uppercase tracking-[0.15em] text-accent sm:block">
          Dukung
        </span>
      )}
      <span className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground">
        ↗
      </span>
    </a>
  );
}