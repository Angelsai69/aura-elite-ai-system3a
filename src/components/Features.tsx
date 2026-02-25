import { motion } from "framer-motion"

const CARDS = [
  {
    icon: "⚡",
    title: "Instant Automation",
    desc: "Deploy multi-step workflows in seconds. No code. No friction. Pure velocity.",
    color: "#7c6aff",
  },
  {
    icon: "🧠",
    title: "Neural Intelligence",
    desc: "Self-optimizing AI that learns your pipeline, adapts in real-time, and eliminates bottlenecks.",
    color: "#38bdf8",
  },
  {
    icon: "📈",
    title: "Revenue Engine",
    desc: "From lead capture to closed deal — fully automated qualification, nurturing, and conversion.",
    color: "#a78bfa",
  },
  {
    icon: "🛡️",
    title: "Enterprise Security",
    desc: "SOC 2 compliant. Zero-trust architecture. Your data stays sovereign.",
    color: "#4ade80",
  },
  {
    icon: "🔗",
    title: "Universal Integrations",
    desc: "Connect 500+ tools instantly. CRM, ERP, Slack, email — AIZA orchestrates everything.",
    color: "#fb923c",
  },
  {
    icon: "📊",
    title: "Live Analytics",
    desc: "Real-time dashboards with predictive insights. Know what's working before your competitors do.",
    color: "#f472b6",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Features() {
  return (
    <section className="section">
      <div className="bg-layer">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="orb" style={{ width: 400, height: 400, background: "#7c6aff", bottom: -100, right: 100, opacity: 0.1, position: "absolute", borderRadius: "50%", filter: "blur(80px)" }} />
      </div>

      <div className="features-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Core Capabilities</div>
          <h2 className="section-title">
            Built for teams that<br /><span>refuse to lose.</span>
          </h2>
        </motion.div>

        <motion.div
          className="card-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {CARDS.map((card) => (
            <motion.div key={card.title} className="card" variants={item}>
              <div className="card-glow" style={{ background: card.color }} />
              <span className="card-icon">{card.icon}</span>
              <div className="card-title">{card.title}</div>
              <div className="card-desc">{card.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
