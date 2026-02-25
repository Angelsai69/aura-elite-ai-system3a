
import { motion } from "framer-motion"

export default function Features() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="card-grid"
      >
        <div className="card">AI Automation</div>
        <div className="card">Real-Time Intelligence</div>
        <div className="card">Enterprise Scale</div>
      </motion.div>
    </section>
  )
}
