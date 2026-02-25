import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is not set")
    return res.status(500).json({ error: "Server configuration error: missing API key" })
  }

  let messages: any[]
  try {
    messages = req.body?.messages
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request: messages array required" })
    }
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" })
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://aiza-ai-elite.vercel.app",
        "X-Title": "AIZA AI Elite",
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages,
        max_tokens: 1000,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("OpenRouter error:", response.status, data)
      return res.status(200).json({
        reply: data?.error?.message || `OpenRouter error: ${response.status}`,
      })
    }

    const reply: string = data.choices?.[0]?.message?.content ?? "No response"
    return res.status(200).json({ reply })
  } catch (err: any) {
    console.error("Handler error:", err?.message || err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
