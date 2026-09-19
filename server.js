/* Optional. Only Pantry Pal's camera recognition needs this — and only because
   a browser will not grant camera access to a file:// page, and because an API
   key must never sit in a page anyone can view-source.

   The Ledger and Anchor need nothing: open them directly. Pantry Pal's manual
   entry works offline too. Run this only if you want to photograph a shelf. */

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "12mb" })); // photos arrive base64-encoded

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error("ANTHROPIC_API_KEY is not set — exiting.");
  console.error("Copy .env.example to .env and set it, or run with the variable inline.");
  process.exit(1);
}

app.post("/api/anthropic", async (req, res) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000); // vision calls are slow
  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });
    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch (err) {
    if (err.name === "AbortError") {
      res.status(504).json({ error: "Request to upstream API timed out." });
    } else {
      console.error("Upstream fetch error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  } finally {
    clearTimeout(timeout);
  }
});

// Served over localhost so the browser will hand over the camera.
app.use(express.static(__dirname));
app.get(["/pantry", "/pantry.html"], (_, res) =>
  res.sendFile(join(__dirname, "pantry.html"))
);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () =>
  console.log(`Pantry Pal: http://localhost:${PORT}/pantry`)
);

server.on("error", (err) => { console.error("Server error:", err); process.exit(1); });
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => server.close(() => process.exit(0)));
}
