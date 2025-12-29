export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { username } = req.query;
  if (!username) return res.status(400).json({ error: "Username required" });

  const normalized = username.trim().toLowerCase();
  const blobUrl =
    `https://blob.vercel-storage.com/keystrokes/users/${normalized}.json`;

  try {
    const response = await fetch(blobUrl);

    if (response.ok) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });

  } catch (err) {
    console.error(err);
    return res.status(200).json({ exists: false });
  }
}
