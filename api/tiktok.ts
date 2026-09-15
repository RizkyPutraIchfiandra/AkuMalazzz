export const config = {
  runtime: "edge",
};

const HEADERS = {
  "Cache-Control": "public, max-age=60",
  "Access-Control-Allow-Origin": "*",
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36";

async function fromTikTok(id: string) {
  const html = await (
    await fetch(`https://www.tiktok.com/@${id}`, { headers: { "User-Agent": UA } })
  ).text();
  const m = html.match(
    /"followerCount":(\d+).*?"heartCount":(\d+).*?"videoCount":(\d+)/,
  );
  return m ? { followers: +m[1], hearts: +m[2], videos: +m[3] } : null;
}

async function fromTikwm(id: string) {
  const r = await fetch(`https://www.tikwm.com/api/user/info?unique_id=${id}`, {
    headers: { "User-Agent": UA },
  });
  if (!r.headers.get("content-type")?.includes("json")) return null;
  const s = (await r.json())?.data?.stats;
  return s
    ? {
        followers: s.followerCount ?? 0,
        hearts: s.heartCount ?? 0,
        videos: s.videoCount ?? 0,
      }
    : null;
}

export default async function handler(request: Request) {
  const id = new URL(request.url).searchParams.get("id") ?? "u_1t.hn_";
  for (const fn of [fromTikTok, fromTikwm]) {
    try {
      const d = await fn(id);
      if (d?.followers) return Response.json({ ...d, ok: true }, { headers: HEADERS });
    } catch {
      /* try next */
    }
  }
  return Response.json(
    { followers: 0, hearts: 0, videos: 0, ok: false },
    { headers: HEADERS },
  );
}
