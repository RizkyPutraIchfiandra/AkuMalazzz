import type { MouseEvent } from "react";

export const SOCIALS = {
  youtube: "https://www.youtube.com/@akumalazz",
  tiktok: "https://www.tiktok.com/@u_1t.hn_",
  saweria: "https://saweria.co/AkuMalazz",
  discord: "https://discord.gg/hqJXceM4S",
};

export function openExternal(href: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  };
}

export function formatCount(n: number) {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 10_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString("id-ID");
}