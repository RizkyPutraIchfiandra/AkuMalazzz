export const config = {
  runtime: "edge",
};

const HEADERS = {
  "Cache-Control": "public, max-age=60",
  "Access-Control-Allow-Origin": "*",
};

export default async function handler(request: Request) {
  const ch =
    new URL(request.url).searchParams.get("channel") ??
    "UCn1YeWo_XYhcy57-TGTMJcA";
    try {
    const r = await fetch(
      `https://api.socialcounts.org/youtube-live-subscriber-count/${ch}`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j: any = await r.json();
    const c = j?.counters?.api ?? j?.counters?.estimation ?? {};
    const subscribers = j.subscribers ?? c.subscriberCount ?? 0;
    const views = j.views ?? c.viewCount ?? 0;
    const videos = j.videos ?? c.videoCount ?? 0;
    return Response.json(
      { subscribers, views, videos, ok: true },
      { headers: HEADERS },
    );
  } catch (err) {
    console.error("[api/youtube]", String(err));
    // Fallback: return last known or placeholder
    return Response.json(
      { subscribers: 1, views: 0, videos: 0, ok: false, error: String(err) },
      { headers: HEADERS },
    );
  }
}
