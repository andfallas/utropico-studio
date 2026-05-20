import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { catalogoItems } from '../data/catalogo'

const P = { bg: '#FAF8F5', dark: '#1A1A18', muted: '#7A7974', border: '#E8E4DE', card: '#F0EDE8' }
const SERIF = "'Fraunces', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"

const FILTERS = [
  { id: 'todos',       label: 'Todos' },
  { id: 'Sofás',       label: 'Sofás' },
  { id: 'Sillas',      label: 'Sillas' },
  { id: 'Mesas',       label: 'Mesas' },
  { id: 'Camas',       label: 'Camas' },
  { id: 'Estanterías', label: 'Estanterías' },
]

export default function Catalogo() {
  const [active, setActive]       = useState('todos')
  const [selected, setSelected]   = useState(null)

  const items = useMemo(() => {
    if (active === 'todos') return catalogoItems
    return catalogoItems.filter(i => i.categoria === active)
  }, [active])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4 }}
      style={{ backgroundColor: P.bg, minHeight: '100vh', fontFamily: SANS }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 3vw, 36px);
        }
        @media (max-width: 1024px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .cat-grid { grid-template-columns: 1fr; } }

        .filter-bar { display: flex; gap: 8px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 2px; }
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-btn {
          font-family: 'DM Sans', system-ui, sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 9px 20px; border: 1px solid #E8E4DE; background: transparent;
          color: #7A7974; cursor: pointer; border-radius: 6px;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .filter-btn:hover { border-color: #1A1A18; color: #1A1A18; }
        .filter-btn.active { background: #1A1A18; border-color: #1A1A18; color: #FAF8F5; }

        .card-root { cursor: pointer; }
        .card-img-wrap { position: relative; overflow: hidden; aspect-ratio: 4/3; background: #F0EDE8; }
        .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s cubic-bezier(0.25, 0.1, 0.25, 1); }
        .card-root:hover .card-img { transform: scale(1.06); }
        .card-overlay {
          position: absolute; inset: 0; background: rgba(26,26,24,0.42);
          opacity: 0; transition: opacity 0.3s ease;
          display: flex; align-items: center; justify-content: center;
        }
        .card-root:hover .card-overlay { opacity: 1; }
        .card-cta {
          font-family: 'DM Sans', system-ui, sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #FAF8F5; border: 1px solid rgba(250,248,245,0.55); padding: 10px 26px;
        }

        /* Modal */
        .modal-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          min-height: 0;
        }
        @media (max-width: 768px) {
          .modal-layout { grid-template-columns: 1fr; }
          .modal-info { max-height: none !important; }
        }
        .modal-info { overflow-y: auto; }
        .thumb-btn { border: none; padding: 0; cursor: pointer; background: none; flex-shrink: 0; }
        .thumb-btn:focus-visible { outline: 2px solid #1A1A18; outline-offset: 2px; }
      `}} />

      {/* Page header */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(64px, 10vh, 100px) clamp(24px, 5vw, 64px) clamp(36px, 5vh, 56px)',
        borderBottom: `1px solid ${P.border}`,
      }}>
        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 16 }}>
          Catálogo
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: P.dark, lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
            Nuestras piezas.
          </h1>
          <motion.p key={items.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            style={{ fontFamily: SANS, fontSize: 13, color: P.muted, margin: 0, letterSpacing: '0.04em' }}>
            {items.length} {items.length === 1 ? 'pieza' : 'piezas'}
          </motion.p>
        </div>
      </div>

      {/* Filter bar — full bleed so scroll hides at screen edges */}
      <div style={{ borderBottom: `1px solid ${P.border}`, padding: 'clamp(20px, 3vh, 32px) 0' }}>
        <div className="filter-bar" style={{ paddingLeft: 'clamp(24px, 5vw, 64px)', paddingRight: 'clamp(24px, 5vw, 64px)' }}>
          {FILTERS.map(f => (
            <button key={f.id} className={`filter-btn${active === f.id ? ' active' : ''}`} onClick={() => setActive(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 7vh, 72px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 120px)' }}>
        <motion.div className="cat-grid" layout>
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id} layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, delay: Math.min(i * 0.06, 0.3) }}
              >
                <ProductCard item={item} onClick={() => setSelected(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {items.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '100px 0', color: P.muted, fontFamily: SANS, fontSize: 14, letterSpacing: '0.06em' }}>
            — Sin resultados —
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ borderTop: `1px solid ${P.border}`, backgroundColor: P.card, padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px)', textAlign: 'center' }}>
        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 20 }}>
          ¿No encontrás lo que buscás?
        </p>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 32px' }}>
          Diseñamos a medida.
        </h2>
        <a href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: P.bg, backgroundColor: P.dark, padding: '14px 28px', textDecoration: 'none', borderRadius: 6 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          Hablemos
        </a>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProductModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Card ── */
function ProductCard({ item, onClick }) {
  return (
    <div className="card-root" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="card-img-wrap">
        <img className="card-img" src={item.imagenes[0]} alt={item.nombre} loading="lazy" />
        <div className="card-overlay">
          <span className="card-cta">Ver pieza</span>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: P.muted, margin: '0 0 8px' }}>
          {item.categoria}
        </p>
        <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: P.dark, margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
          {item.nombre}
        </h3>
        <p style={{ fontFamily: SANS, fontSize: 13, color: P.muted, margin: '0 0 4px', lineHeight: 1.55 }}>
          {item.material}
        </p>
        {item.dimensiones && (
          <p style={{ fontFamily: SANS, fontSize: 12, color: P.muted, margin: 0, opacity: 0.7 }}>
            {item.dimensiones}
          </p>
        )}
      </div>
    </div>
  )
}

/* ── Modal ── */
function ProductModal({ item, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setActiveImg(0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [item])

  const handleKey = useCallback(e => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % item.imagenes.length)
    if (e.key === 'ArrowLeft')  setActiveImg(i => (i - 1 + item.imagenes.length) % item.imagenes.length)
  }, [onClose, item.imagenes.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(26,26,24,0.72)', backdropFilter: 'blur(6px)', zIndex: 200 }}
      />

      {/* Centering wrapper — flexbox avoids transform conflict with framer-motion */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 201,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '4vh 3vw',
        pointerEvents: 'none',
      }}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        role="dialog" aria-modal="true" aria-label={item.nombre}
        style={{
          width: '100%',
          maxWidth: 1080,
          maxHeight: '92vh',
          backgroundColor: P.bg,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          pointerEvents: 'auto',
          position: 'relative',
        }}
      >
        {/* Close */}
        <button onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: P.dark, opacity: 0.6 }}
          aria-label="Cerrar"
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
          </svg>
        </button>

        <div className="modal-layout" style={{ flex: 1, minHeight: 0 }}>
          {/* Left: gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: P.card }}>
            {/* Main image */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 280 }}>
              <AnimatePresence mode="crossfade">
                <motion.img
                  key={activeImg}
                  src={item.imagenes[activeImg]}
                  alt={item.nombre}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AnimatePresence>

              {/* Arrow nav */}
              {item.imagenes.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + item.imagenes.length) % item.imagenes.length)}
                    style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(250,248,245,0.85)', border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}
                    aria-label="Imagen anterior">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={P.dark} strokeWidth="1.5"><polyline points="10,4 6,8 10,12"/></svg>
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % item.imagenes.length)}
                    style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(250,248,245,0.85)', border: 'none', cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}
                    aria-label="Imagen siguiente">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={P.dark} strokeWidth="1.5"><polyline points="6,4 10,8 6,12"/></svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 4, padding: '12px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {item.imagenes.map((img, i) => (
                <button key={i} className="thumb-btn" onClick={() => setActiveImg(i)}
                  style={{ width: 68, height: 52, overflow: 'hidden', flexShrink: 0, outline: activeImg === i ? `2px solid ${P.dark}` : '2px solid transparent', outlineOffset: 2, transition: 'outline 0.15s ease' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImg === i ? 1 : 0.55, transition: 'opacity 0.15s ease' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: info */}
          <div className="modal-info" style={{ padding: 'clamp(32px, 5vh, 52px) clamp(28px, 4vw, 48px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: P.muted, margin: '0 0 16px' }}>
              {item.categoria}
            </p>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, color: P.dark, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
              {item.nombre}
            </h2>

            <p style={{ fontFamily: SANS, fontSize: 14, color: '#4A4A48', lineHeight: 1.7, margin: '0 0 32px' }}>
              {item.descripcionCompleta}
            </p>

            <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted, minWidth: 88 }}>Material</span>
                <span style={{ fontFamily: SANS, fontSize: 13, color: P.dark }}>{item.material}</span>
              </div>
              {item.dimensiones && (
                <div style={{ display: 'flex', gap: 16 }}>
                  <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted, minWidth: 88 }}>Medidas</span>
                  <span style={{ fontFamily: SANS, fontSize: 13, color: P.dark }}>{item.dimensiones}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: P.muted, minWidth: 88 }}>Origen</span>
                <span style={{ fontFamily: SANS, fontSize: 13, color: P.dark }}>Hecho a mano · Costa Rica</span>
              </div>
            </div>

            <a href="/contacto"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: P.bg, backgroundColor: P.dark, padding: '14px 28px', textDecoration: 'none', transition: 'opacity 0.2s ease', borderRadius: 6 }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Consultar esta pieza
            </a>
            <p style={{ fontFamily: SANS, fontSize: 11, color: P.muted, textAlign: 'center', margin: '12px 0 0', letterSpacing: '0.04em' }}>
              Producción a medida · Tiempo de entrega estimado 4–8 semanas
            </p>
          </div>
        </div>
      </motion.div>
      </div>
    </>
  )
}
