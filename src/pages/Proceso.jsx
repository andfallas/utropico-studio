import { motion } from 'framer-motion'

const P = { bg: '#FAF8F5', dark: '#1A1A18', muted: '#7A7974', border: '#E8E4DE' }
const SERIF = "'Fraunces', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"

export default function Proceso() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4 }}
      style={{ backgroundColor: P.bg, minHeight: '80vh', fontFamily: SANS }}
    >
      {/* Page header */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(64px, 10vh, 100px) clamp(24px, 5vw, 64px) clamp(40px, 6vh, 64px)',
        borderBottom: `1px solid ${P.border}`,
      }}>
        <p style={{
          fontFamily: SANS, fontSize: 11, fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          color: P.muted, marginBottom: 16,
        }}>
          Proceso
        </p>
        <h1 style={{
          fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 900, color: P.dark,
          lineHeight: 1.08, letterSpacing: '-0.025em',
        }}>
          Cómo trabajamos.
        </h1>
      </div>

      {/* Content placeholder */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(48px, 8vh, 80px) clamp(24px, 5vw, 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 400,
      }}>
        <p style={{
          fontFamily: SANS, fontSize: 15, color: P.muted,
          letterSpacing: '0.06em',
        }}>
          — Diseño en construcción —
        </p>
      </div>
    </motion.div>
  )
}
