export async function POST(req: Request) {
  const { trackingNumber } = await req.json();

  const response = await fetch(
    "https://api.ship24.com/public/v1/trackers/track",
    {
      method: "POST",
      headers: {
        "x-api-key": process.env.API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackingNumber,
      }),
    },
  );

  const data = await response.json();

  return Response.json(data);
}
