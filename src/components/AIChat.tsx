import { useState } from "react"

export default function AIChat() {
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const updated = [...messages, { role: "user", content: input }]
    setMessages(updated)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(err.error || `Server error: ${res.status}`)
      }

      const data = await res.json()
      setMessages([...updated, { role: "assistant", content: data.reply }])
    } catch (err: any) {
      setMessages([...updated, { role: "assistant", content: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>{m.content}</div>
        ))}
        {loading && <div>Thinking...</div>}
      </div>
      <div className="input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask AIZA..."
        />
        <button onClick={sendMessage} disabled={loading}>Send</button>
      </div>
    </div>
  )
}
