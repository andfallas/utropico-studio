import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  useEffect(() => {
    const doneTimer = setTimeout(() => onComplete(), 1600)
    return () => clearTimeout(doneTimer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-bg"
      exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      <svg
        viewBox="0 0 60 80"
        width="72"
        height="96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Stroke — dibuja el contorno de la U */}
        <motion.path
          d="M 10,5 L 10,50 C 10,70 50,70 50,50 L 50,5"
          stroke="#EDE4D3"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      <motion.p
        className="text-muted text-[10px] tracking-[0.6em] uppercase font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        utropico studio
      </motion.p>
    </motion.div>
  )
}
