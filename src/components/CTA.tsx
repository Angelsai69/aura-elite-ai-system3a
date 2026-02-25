import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import { useAdaptiveMotion } from "../hooks/useAdaptiveMotion"

function MagneticBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 })
  const sy = useSpring(y, { stiffness: 180, damping: 16 })
  const motion_ = useAdaptiveMotion()

  const move = (e: React.MouseEvent) => {
    if (!motion_.parallax) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }

  return (
    <motion.button
      ref={ref}
      className={primary ? "btn btn-primary" : "btn btn-ghost"}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}

export default function CTA() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(124,108,255,0.12) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 300, height: 300, background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 640, position: "relative", zIndex: 2, padding: "0 2rem" }}
      >
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 80, height: 80, border: "1px solid rgba(124,108,255,0.2)", borderTopColor: "rgba(124,108,255,0.6)", borderRadius: "50%" }}
        />

        <div className="section-label" style={{ justifyContent: "center", display: "flex" }}>Join the Waitlist</div>

        <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
          The future of work<br />
          <span>is autonomous.</span>
        </h2>

        <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Join 2,400+ teams already on the waitlist.<br />
          Early access launching Q1 2025.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <MagneticBtn primary>Request Early Access →</MagneticBtn>
          <MagneticBtn>Talk to Sales</MagneticBtn>
        </div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
        >
          <div style={{ display: "flex" }}>
            {["#7c6cff", "#00d4ff", "#ff6c9d", "#5affc2", "#ffb347"].map((c, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${c}, ${c}88)`, border: "2px solid #040408", marginLeft: i > 0 ? -10 : 0 }} />
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            <span style={{ color: "var(--text)", fontWeight: 700 }}>2,400+</span> teams waiting
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
