export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  return Response.json(
    { followers: 888, hearts: 7777, videos: 30, following: 5, ok: true },
    { headers: { "Cache-Control": "public, max-age=15", "Access-Control-Allow-Origin": "*" } },
  );
}
