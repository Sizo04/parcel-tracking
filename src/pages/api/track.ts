import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { trackingNumber } = req.body;

  try {
    const response = await fetch(
      "https://api.ship24.com/public/v1/trackers/track",
      {
        method: "POST",
        headers: {
          Authorization: process.env.API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber }),
      },
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
