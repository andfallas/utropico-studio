import { motion } from 'framer-motion'

const versions = [
  { id: 'v1', label: 'Oscuro',  dot: '#EDE4D3', dotOff: '#6B5040', bg: '#8B5E3C', bgOff: 'rgba(14,12,10,0.6)', color: '#EDE4D3', colorOff: '#8F7A69' },
  { id: 'v2', label: 'Arena',   dot: '#EDE4D3', dotOff: '#6B5040', bg: '#8B5E3C', bgOff: 'rgba(14,12,10,0.6)', color: '#EDE4D3', colorOff: '#8F7A69' },
  { id: 'v3', label: 'Minimal', dot: '#EDE4D3', dotOff: '#6B5040', bg: '#8B5E3C', bgOff: 'rgba(14,12,10,0.6)', color: '#EDE4D3', colorOff: '#8F7A69' },
  { id: 'v4', label: 'Natural', dot: '#1A2018', dotOff: '#8B7A5A', bg: '#C17A3F', bgOff: 'rgba(245,240,232,0.85)', color: '#FFFFFF', colorOff: '#8B7A5A' },
  { id: 'v5', label: 'Deco',    dot: '#FAF8F5', dotOff: '#7A7974', bg: '#1A1A18', bgOff: 'rgba(250,248,245,0.85)', color: '#FAF8F5', colorOff: '#7A7974' },
]

export default function VersionSwitch({ version, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 'var(--container-px)',
        zIndex: 9990,
        display: 'flex',
        alignItems: 'center',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(139,94,60,0.3)',
        overflow: 'hidden',
      }}
    >
      {versions.map((v, i) => {
        const isActive = version === v.id
        return (
          <div key={v.id} style={{ display: 'contents' }}>
            {i > 0 && (
              <div style={{ width: 1, height: 28, backgroundColor: 'rgba(139,94,60,0.3)', flexShrink: 0 }} />
            )}
            <button
              onClick={() => onChange(v.id)}
              aria-pressed={isActive}
              aria-label={`Versión ${v.label}`}
              style={{
                padding: '9px 16px',
                fontSize: 9,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                backgroundColor: isActive ? v.bg : v.bgOff,
                color: isActive ? v.color : v.colorOff,
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{
                display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                backgroundColor: isActive ? v.dot : v.dotOff,
                transition: 'background-color 0.3s',
              }} />
              {v.label}
            </button>
          </div>
        )
      })}
    </motion.div>
  )
}
