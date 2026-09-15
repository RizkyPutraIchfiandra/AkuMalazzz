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
    const j: any = await (
      await fetch(
        `https://api.socialcounts.org/youtube-live-subscriber-count/${ch}`,
      )
    ).json();
    const c = j?.counters?.api ?? j?.counters?.estimation ?? {};
    return Response.json(
      {
        subscribers: j.subscribers ?? c.subscriberCount ?? 0,
        views: j.views ?? c.viewCount ?? 0,
        videos: j.videos ?? c.videoCount ?? 0,
        ok: true,
      },
      { headers: HEADERS },
    );
  } catch {
    return Response.json(
      { subscribers: 0, views: 0, videos: 0, ok: false },
      { headers: HEADERS },
    );
  }
}
