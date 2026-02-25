import { useState } from "react"
import Loader from "./components/Loader"
import Cursor from "./components/Cursor"
import ScrollProgress from "./components/ScrollProgress"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Demo from "./components/Demo"
import AIChat from "./components/AIChat"

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Cursor />
      <Loader onDone={() => setReady(true)} />
      {ready && (
        <>
          <ScrollProgress />
          <main>
            <Hero />
            <Features />
            <Demo />
            <section className="section" style={{ scrollSnapAlign: "start" }}>
              <div className="bg-layer">
                <div className="grid-overlay" />
                <div className="noise-overlay" />
                <div className="orb" style={{ width: 600, height: 600, background: "var(--accent)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08, position: "absolute", borderRadius: "50%", filter: "blur(100px)" }} />
              </div>
              <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 600, padding: "0 2rem" }}>
                <div className="section-label">AI Assistant</div>
                <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                  Ask AIZA<br /><span>anything.</span>
                </h2>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                  Your AI strategist is online 24/7.<br />
                  Click the <strong style={{ color: "var(--accent2)" }}>✦</strong> button to start a conversation.
                </p>
              </div>
            </section>
          </main>
          <AIChat />
        </>
      )}
    </>
  )
}
