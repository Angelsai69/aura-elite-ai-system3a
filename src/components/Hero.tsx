
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const words = ["Automate.", "Scale.", "Dominate."]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section hero">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        AIZA AI
      </motion.h1>

      <motion.h2
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="typing"
      >
        {words[index]}
      </motion.h2>
    </section>
  )
}
