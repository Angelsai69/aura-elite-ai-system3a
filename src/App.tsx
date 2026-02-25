import { useState } from "react"
import Loader from "./components/Loader"
import Cursor from "./components/Cursor"
import ScrollProgress from "./components/ScrollProgress"
import Hero from "./components/Hero"
import Features from "./components/Features"
import DashboardPreview from "./components/DashboardPreview"
import Demo from "./components/Demo"
import CTA from "./components/CTA"
import AIChat from "./components/AIChat"
import { useScrollEffects } from "./hooks/useScrollEffects"

const SECTION_COUNT = 5

function ScrollBlurOverlay() {
  const { transitionBlur } = useScrollEffects(SECTION_COUNT)
  if (transitionBlur < 0.5) return null
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 90,
        backdropFilter: `blur(${transitionBlur}px)`,
        WebkitBackdropFilter: `blur(${transitionBlur}px)`,
        transition: "backdrop-filter 0.1s linear",
      }}
    />
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Cursor />
      <Loader onDone={() => setReady(true)} />
      {ready && (
        <>
          <ScrollBlurOverlay />
          <ScrollProgress />
          <main>
            <Hero />
            <Features />
            <DashboardPreview />
            <Demo />
            <CTA />
          </main>
          <AIChat />
        </>
      )}
    </>
  )
}
