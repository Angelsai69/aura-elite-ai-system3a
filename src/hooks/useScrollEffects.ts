import { useEffect, useState, useRef } from "react"

/**
 * Tracks scroll position, active section index, and
 * per-section blur depth for the depth illusion system.
 */
export function useScrollEffects(sectionCount: number) {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    const el = document.documentElement
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const sy = el.scrollTop
          const vh = window.innerHeight
          const idx = Math.floor(sy / vh)
          const progress = (sy % vh) / vh

          setScrollY(sy)
          setActiveSection(Math.min(idx, sectionCount - 1))
          setSectionProgress(progress)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [sectionCount])

  // Blur amount: peaks at section transitions (progress near 0 or 1)
  const transitionBlur = Math.sin(sectionProgress * Math.PI) * 4

  return { scrollY, activeSection, sectionProgress, transitionBlur }
}
