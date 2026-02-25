import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'

export default function CTA() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(124,108,255,0.12) 0%, transparent 65%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '15%',
        width: 300, height: 300,
        background: 'radial-gradient(ellipse, rgba(255,108,157,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 640, position: 'relative' }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
            width: 80, height: 80,
            border: '1px solid rgba(124,108,255,0.2)',
            borderTopColor: 'rgba(124,108,255,0.6)',
            borderRadius: '50%',
          }}
        />

        <p style={{
          fontSize: '0.78rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--accent3)',
          fontWeight: 600, marginBottom: '1.2rem',
        }}>
          Join the Waitlist
        </p>

        <h2 style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 800,
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          letterSpacing: '-0.03em', lineHeight: 1.1,
          marginBottom: '1.5rem',
        }}>
          The future of work<br />
          <span className="grad">is autonomous.</span>
        </h2>

        <p style={{
          color: 'var(--muted)', fontSize: '1.05rem',
          lineHeight: 1.65, marginBottom: '2.5rem', fontWeight: 300,
        }}>
          Join 2,400+ teams already on the waitlist.<br />
          Early access launching Q1 2025.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <MagneticCTA primary>Request Early Access →</MagneticCTA>
          <MagneticCTA>Talk to Sales</MagneticCTA>
        </div>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
        >
          <div style={{ display: 'flex' }}>
            {['#7c6cff','#00d4ff','#ff6c9d','#5affc2','#ffb347'].map((c, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${c}, ${c}88)`,
                border: '2px solid #07070d',
                marginLeft: i > 0 ? -10 : 0,
              }} />
            ))}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>2,400+</span> teams waiting
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}

function MagneticCTA({ children, primary }: { children: React.ReactNode, primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 })
  const sy = useSpring(y, { stiffness: 180, damping: 16 })

  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.4)
    y.set((e.clientY - r.top - r.height / 2) * 0.4)
  }

  return (
    <motion.button
      ref={ref}
      className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`}
      style={{ x: sx, y: sy, cursor: 'none', fontSize: primary ? '1rem' : '0.9rem' }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
