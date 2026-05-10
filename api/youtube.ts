export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  return Response.json(
    { subscribers: 999, views: 5000, videos: 25, ok: true },
    { headers: { "Cache-Control": "public, max-age=30", "Access-Control-Allow-Origin": "*" } },
  );
}
