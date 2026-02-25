import { useEffect, useState } from "react"

const SECTIONS = ["Hero", "Features", "Demo", "Chat"]

export default function ScrollProgress() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const container = document.querySelector("html")!
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight)
      setActive(Math.min(idx, SECTIONS.length - 1))
    }
    container.addEventListener("scroll", onScroll)
    return () => container.removeEventListener("scroll", onScroll)
  }, [])

  const goTo = (i: number) => {
    document.querySelector("html")!.scrollTo({ top: i * window.innerHeight, behavior: "smooth" })
  }

  return (
    <nav className="scroll-progress">
      {SECTIONS.map((s, i) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {i > 0 && <div className="progress-line" />}
          <div
            className={`progress-dot ${active === i ? "active" : ""}`}
            onClick={() => goTo(i)}
            title={s}
          />
        </div>
      ))}
    </nav>
  )
}
