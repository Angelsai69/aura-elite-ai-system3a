import { useEffect, useState } from "react"

const SECTIONS = ["Hero", "Features", "Dashboard", "Demo", "Launch"]

export default function ScrollProgress() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = document.documentElement
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / window.innerHeight)
      setActive(Math.min(idx, SECTIONS.length - 1))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  const goTo = (i: number) => {
    document.documentElement.scrollTo({ top: i * window.innerHeight, behavior: "smooth" })
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
