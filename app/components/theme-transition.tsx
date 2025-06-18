"use client"

import { useTheme } from "../providers"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeTransition() {
  const { theme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [theme])

  if (!isTransitioning) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at center, rgba(232, 93, 117, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(173, 155, 154, 0.1) 0%, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 2, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  )
}
