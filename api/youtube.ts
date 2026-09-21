export const config = {
  runtime: "edge",
};

const HEADERS = {
  "Cache-Control": "public, max-age=60",
  "Access-Control-Allow-Origin": "*",
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function fromYouTubeWeb(handleOrId: string) {
  const isHandle = handleOrId.startsWith("@");
  const urls = isHandle
    ? [`https://www.youtube.com/${handleOrId}`]
    : [
        `https://www.youtube.com/@akumalazz`,
        `https://www.youtube.com/channel/${handleOrId}`,
      ];

  for (const url of urls) {
    try {
      const r = await fetch(url, {
        headers: {
          "User-Agent": UA,
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!r.ok) continue;
      const html = await r.text();
      const m = html.match(/ytInitialData\s*=\s*({.+?});<\/script>/);
      if (!m) continue;

      const data = JSON.parse(m[1]);
      const header =
        data?.header?.pageHeaderRenderer?.content?.pageHeaderViewModel;
      const metadataRows =
        header?.metadata?.contentMetadataViewModel?.metadataRows || [];

      let subscribers = 0;
      let videos = 0;
      const views = 0;
      let found = false;

      for (const row of metadataRows) {
        for (const part of row.metadataParts || []) {
          const text =
            part.text?.content || part.text?.accessibilityLabel || "";
          const subMatch = text.match(/([\d.,]+)\s*([KMBkmb]?)\s*subscribers?/i);
          if (subMatch) {
            let num = parseFloat(subMatch[1].replace(/,/g, ""));
            const unit = subMatch[2].toUpperCase();
            if (unit === "K") num *= 1000;
            else if (unit === "M") num *= 1000000;
            else if (unit === "B") num *= 1000000000;
            subscribers = Math.round(num);
            found = true;
          }

          const vidMatch = text.match(/([\d.,]+)\s*([KMBkmb]?)\s*videos?/i);
          if (vidMatch) {
            let num = parseFloat(vidMatch[1].replace(/,/g, ""));
            const unit = vidMatch[2].toUpperCase();
            if (unit === "K") num *= 1000;
            else if (unit === "M") num *= 1000000;
            videos = Math.round(num);
            found = true;
          }
        }
      }

      if (found) {
        return { subscribers, views, videos };
      }
    } catch {}
  }
  return null;
}

async function fromSocialCounts(channelId: string) {
  const r = await fetch(
    `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`,
    { signal: AbortSignal.timeout(8000) },
  );
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j: any = await r.json();
  const c = j?.counters?.api ?? j?.counters?.estimation ?? {};
  const subscribers = j.subscribers ?? c.subscriberCount ?? 0;
  const views = j.views ?? c.viewCount ?? 0;
  const videos = j.videos ?? c.videoCount ?? 0;
  return { subscribers, views, videos };
}

export default async function handler(request: Request) {
  const ch =
    new URL(request.url).searchParams.get("channel") ??
    "UCn1YeWo_XYhcy57-TGTMJcA";

  // Try direct YouTube first
  try {
    const direct = await fromYouTubeWeb(ch);
    if (direct) {
      return Response.json({ ...direct, ok: true }, { headers: HEADERS });
    }
  } catch (err) {
    console.warn("[api/youtube] direct web error", String(err));
  }

  // Fallback to socialcounts
  try {
    const sc = await fromSocialCounts(ch);
    return Response.json({ ...sc, ok: true }, { headers: HEADERS });
  } catch (err) {
    console.error("[api/youtube] all failed", String(err));
    return Response.json(
      { subscribers: 1, views: 0, videos: 0, ok: false, error: String(err) },
      { headers: HEADERS },
    );
  }
}
