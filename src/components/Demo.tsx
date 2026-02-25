
import { motion } from "framer-motion"

export default function Demo() {
  return (
    <section className="section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Live Workflow Simulation</h2>
        <p>Lead captured → AI qualified → Deal closed.</p>
      </motion.div>
    </section>
  )
}
