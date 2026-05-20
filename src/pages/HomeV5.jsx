import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function useIsMobile(bp = 768) {
  const [m, setM] = useState(() => window.innerWidth <= bp)
  useEffect(() => {
    const fn = () => setM(window.innerWidth <= bp)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [bp])
  return m
}

// ── Tokens ─────────────────────────────────────────────────────────────────────
const P = {
  bg:      '#FAF8F5',
  white:   '#FFFFFF',
  dark:    '#1A1A18',
  text:    '#1A1A18',
  muted:   '#7A7974',
  border:  '#E8E4DE',
  card:    '#F3F0EB',
  ticker:  '#1A1A18',
}

const SERIF = "'Fraunces', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"

// ── Unsplash images ─────────────────────────────────────────────────────────────
const HERO_IMG        = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85'
const FEATURE_IMG     = 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900&q=85'
const SALA_IMG        = '/images/living-room.jpg'

const HOTSPOTS = [
  {
    id: 'sofa',
    label: 'Sofá',
    top: '68%', left: '18%',
    categoria: 'Sala de estar',
    nombre: 'Sofá Lino Natural',
    desc: 'Estructura en fresno macizo, tapizado en lino 100% natural. Cojines intercambiables.',
    material: 'Fresno + Lino',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
  },
  {
    id: 'mesa-centro',
    label: 'Mesa centro',
    top: '80%', left: '47%',
    categoria: 'Sala de estar',
    nombre: 'Mesa Travertino',
    desc: 'Tapa en piedra travertino, base en acero pintado negro mate. Edición limitada.',
    material: 'Travertino + Acero',
    img: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400&q=80',
  },
  {
    id: 'silla',
    label: 'Sillón',
    top: '70%', left: '72%',
    categoria: 'Sala de estar',
    nombre: 'Sillón Nogal',
    desc: 'Madera de nogal macizo con tapizado en bouclé. Brazos en cuero natural.',
    material: 'Nogal + Bouclé',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
  },
  {
    id: 'mesa-fondo',
    label: 'Mesa lateral',
    top: '52%', left: '50%',
    categoria: 'Comedor',
    nombre: 'Mesa Lateral Rattan',
    desc: 'Ratán natural trenzado a mano sobre base de madera de teca. Acabado natural.',
    material: 'Ratán + Teca',
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80',
  },
]
const FEATURED_PROD   = 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=85'


const COLLECTIONS = [
  { label: 'Sillones',    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80' },
  { label: 'Sofás',       img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
  { label: 'Mesas',       img: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500&q=80' },
  { label: 'Comedor',     img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80' },
]

const TICKER_ITEMS = [
  'Envío gratis en pedidos sobre $100',
  'Colección limitada — hasta 50% off',
  'Materiales naturales certificados',
  'Entrega en 48 hs hábiles',
]

// ── Nav icons ──────────────────────────────────────────────────────────────────
function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M13 13l4 4" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="10" cy="7" r="3.5" />
      <path d="M3 18c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  )
}
function IconBag() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 8V6a4 4 0 118 0v2" />
      <rect x="2" y="8" width="16" height="11" rx="2" />
    </svg>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const STYLES = `
  .v5-ticker-wrap { overflow: hidden; white-space: nowrap; }
  .v5-ticker-track {
    display: inline-flex; gap: 0;
    animation: v5-tick 28s linear infinite;
  }
  @keyframes v5-tick {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .v5-ticker-track:hover { animation-play-state: paused; }

  .v5-hero {
    position: relative;
    width: 100%;
    height: clamp(480px, 85vh, 800px);
    overflow: hidden;
  }
  .v5-hero img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center 30%;
  }
  .v5-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(62,38,18,0.35) 0%, rgba(62,38,18,0.52) 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 24px;
  }

  .v5-collections-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .v5-col-card {
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    cursor: pointer; text-decoration: none;
  }
  .v5-col-img {
    width: 100%; aspect-ratio: 1 / 1;
    border-radius: 18px; overflow: hidden;
    background: #F0EDE8;
  }
  .v5-col-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }
  .v5-col-card:hover .v5-col-img img { transform: scale(1.06); }

  .v5-feature-grid {
    display: grid;
    grid-template-columns: 44fr 56fr;
    gap: 0;
    align-items: stretch;
  }
  .v5-feature-img {
    overflow: hidden;
    border-radius: 20px;
  }
  .v5-feature-img img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
    min-height: 460px;
  }

  .v5-handmade-grid {
    display: grid;
    grid-template-columns: 52fr 48fr;
    gap: clamp(40px, 6vw, 88px);
    align-items: center;
  }
  .v5-handmade-imgs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 12px;
  }
  .v5-handmade-imgs img {
    width: 100%; object-fit: cover; display: block;
    border-radius: 14px;
  }
  .v5-stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  .v5-stat-card {
    padding: 20px 16px;
    border: 1px solid #E8E4DE;
    border-radius: 14px;
    text-align: center;
    background: #F3F0EB;
  }

  .v5-featured-grid {
    display: grid;
    grid-template-columns: 48fr 52fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;
  }
  .v5-featured-img {
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 4 / 5;
  }
  .v5-featured-img img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.6s ease;
  }
  .v5-featured-img:hover img { transform: scale(1.04); }

  .v5-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 5vw, 64px);
    align-items: start;
  }

  @keyframes v5-pulse {
    0%   { transform: scale(1);   opacity: 0.8; }
    50%  { transform: scale(1.9); opacity: 0; }
    100% { transform: scale(1);   opacity: 0; }
  }
  .v5-hotspot-pulse {
    position: absolute; inset: 0;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    animation: v5-pulse 2.4s ease-out infinite;
  }
  .v5-hotspot-card {
    position: absolute;
    transform: translateX(-50%);
    z-index: 10;
    cursor: pointer;
  }
  .v5-hotspot-pill {
    position: relative;
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 40px;
    padding: 7px 12px 7px 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    white-space: nowrap;
    transition: border-radius 0.3s;
  }
  .v5-hotspot-expanded {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%; transform: translateX(-50%);
    background: rgba(255,255,255,0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0,0,0,0.22);
    width: 240px;
    opacity: 0; pointer-events: none;
    transform: translateX(-50%) translateY(8px);
    transition: opacity 0.28s ease, transform 0.28s ease;
  }
  .v5-hotspot-card:hover {
    z-index: 30;
  }
  .v5-hotspot-card:hover .v5-hotspot-expanded {
    opacity: 1; pointer-events: auto;
    transform: translateX(-50%) translateY(0);
  }
  .v5-hotspot-card:hover .v5-hotspot-pulse {
    animation-play-state: paused;
  }

  @media (max-width: 1023px) {
    .v5-featured-grid { grid-template-columns: 1fr !important; }
    .v5-contact-grid  { grid-template-columns: 1fr !important; }
    .v5-taller-grid   { grid-template-columns: 1fr !important; height: auto !important; max-height: none !important; }
    .v5-taller-grid .taller-img { min-height: 56vw; }
    .v5-taller-text { padding: clamp(32px, 5vw, 48px) clamp(24px, 5vw, 48px) !important; }
  }
  @media (max-width: 767px) {
    .v5-featured-img { aspect-ratio: 3/2 !important; }
    .v5-hotspot-expanded { width: 180px !important; }
  }

  .v5-featured-btns {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .v5-nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #1A1A18;
    text-decoration: none; transition: opacity 0.2s;
  }
  .v5-nav-link:hover { opacity: 0.55; }
  .v5-icon-btn {
    background: none; border: none;
    cursor: pointer; color: #1A1A18;
    display: flex; align-items: center; padding: 6px;
    border-radius: 6px; transition: opacity 0.2s;
  }
  .v5-icon-btn:hover { opacity: 0.55; }

  @media (max-width: 1023px) {
    .v5-feature-grid { grid-template-columns: 1fr !important; }
    .v5-feature-img { min-height: 320px !important; }
  }
  .v5-sala-label { display: none; }

  @media (max-width: 767px) {
    .v5-collections-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
    .v5-nav-links { display: none !important; }
    .v5-feature-content { padding: 32px 0 !important; }
    .v5-sala-section { height: 56vh !important; min-height: 320px !important; }
    .v5-featured-btns { flex-direction: column !important; }
    .v5-featured-btns a { width: 100% !important; box-sizing: border-box !important; }
    .v5-cta-wrap a, .v5-cta-wrap button { display: flex !important; width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
    .v5-sala-info { display: none !important; }
    .v5-sala-label { display: block; }
  }
  @media (max-width: 479px) {
    .v5-collections-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`

// ── Component ──────────────────────────────────────────────────────────────────
export default function HomeV5() {
  const isMobile = useIsMobile()
  const [activeHot, setActiveHot] = useState(null)
  const activeHotData = HOTSPOTS.find(h => h.id === activeHot) ?? null

  useEffect(() => {
    if (!activeHot) return
    const close = () => setActiveHot(null)
    window.addEventListener('scroll', close, { passive: true })
    return () => window.removeEventListener('scroll', close)
  }, [activeHot])

  return (
    <div style={{ backgroundColor: P.bg, color: P.text, fontFamily: SANS }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />


      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="v5-hero">
        <img src={HERO_IMG} alt="Interior cálido utropico" />
        <div className="v5-hero-overlay">
          <motion.svg
            viewBox="0 0 60 80"
            width="32"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ marginBottom: 20, display: 'block' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <path
              d="M 10,5 L 10,50 C 10,70 50,70 50,50 L 50,5"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.svg>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.65 }}
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(32px, 6vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: P.white,
              maxWidth: 700,
              marginBottom: 36,
              letterSpacing: '-0.02em',
            }}
          >
            Piezas únicas.<br />Hogares únicos.
          </motion.h1>

          <motion.div
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <Link
              to="/catalogo"
              style={{
                display: 'inline-block',
                padding: '14px 28px',
                border: '1.5px solid rgba(255,255,255,0.7)',
                borderRadius: 6,
                fontFamily: SANS,
                fontSize: 13,
                fontWeight: 600,
                color: P.white,
                textDecoration: 'none',
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                letterSpacing: '0.04em',
                transition: 'background-color 0.25s, color 0.25s',
              }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = P.white; e.currentTarget.style.color = P.dark }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = P.white }}
            >
              Ver todo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DISCOVER OUR COLLECTIONS ─────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: P.bg,
          padding: 'clamp(64px, 9vh, 96px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Section label */}
          <p style={{
            fontFamily: SANS,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: P.muted,
            textAlign: 'center',
            marginBottom: 14,
          }}>
            Encontrá lo que tu hogar necesita
          </p>

          {/* Heading */}
          <h2 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: P.dark,
            textAlign: 'center',
            marginBottom: 48,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}>
            Descubrí Nuestras Colecciones
          </h2>

          {/* Grid */}
          <div className="v5-collections-grid">
            {COLLECTIONS.map((col, i) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to="/catalogo" className="v5-col-card">
                  <div className="v5-col-img">
                    <img src={col.img} alt={col.label} loading="lazy" />
                  </div>
                  <p style={{
                    fontFamily: SANS,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: P.text,
                    textAlign: 'center',
                  }}>
                    {col.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── FEATURE SPLIT ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        style={{
          backgroundColor: P.bg,
          padding: 'clamp(56px, 8vh, 88px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div
          className="v5-feature-grid"
          style={{ maxWidth: 1280, margin: '0 auto', gap: 'clamp(32px, 5vw, 72px)' }}
        >
          {/* Left image */}
          <motion.div
            className="v5-feature-img"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src={FEATURE_IMG} alt="Ambiente utropico" loading="lazy" />
          </motion.div>

          {/* Right content */}
          <motion.div
            className="v5-feature-content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(24px, 4vw, 0px)',
            }}
          >
            <p style={{
              fontFamily: SANS,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: P.muted,
              marginBottom: 20,
            }}>
              Envío gratis en todos los pedidos sobre $100
            </p>

            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: P.dark,
              marginBottom: 28,
              letterSpacing: '-0.02em',
            }}>
              Diseñado para la familia contemporánea, cada detalle pensado con cuidado.
            </h2>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              {[
                'Asientos & Sofás — Diseño de Cocina',
                'Arte Cerámico — Decoración Vegetal',
                'Iluminación — Últimas Novedades',
              ].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    backgroundColor: P.dark, flexShrink: 0,
                    marginTop: 1,
                  }} />
                  <span style={{
                    fontFamily: SANS,
                    fontSize: 14,
                    color: P.muted,
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="v5-cta-wrap">
              <Link
                to="/nosotros"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  border: `1.5px solid ${P.dark}`,
                  borderRadius: 6,
                  fontFamily: SANS,
                  fontSize: 13,
                  fontWeight: 600,
                  color: P.dark,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'background-color 0.25s, color 0.25s',
                }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = P.dark; e.currentTarget.style.color = P.white }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = P.dark }}
              >
                Saber más
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SALA INTERACTIVA ─────────────────────────────────────────────────── */}
      <div className="v5-sala-label" style={{ backgroundColor: P.bg, padding: '28px clamp(24px, 5vw, 48px) 16px', borderTop: `1px solid ${P.border}` }}>
        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 6 }}>
          Proyecto
        </p>
        <p style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
          Sala Nogal
        </p>
      </div>

      <section className="v5-sala-section" style={{ position: 'relative', width: '100%', height: '80vh', minHeight: 480, overflow: 'hidden' }}>
        {/* Imagen full */}
        <img
          src={SALA_IMG}
          alt="Sala completa utropico studio"
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            display: 'block',
          }}
        />

        {/* Overlay muy sutil para que resalten las cards */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.22) 100%)',
        }} />

        {/* Info panel — bottom right (mobile: full width bottom) */}
        <div className="v5-sala-info" style={{
          position: 'absolute', bottom: 32, right: 36,
          zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12,
        }}>
          <div className="v5-sala-info-card" style={{
            backgroundColor: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 14,
            padding: '18px 22px',
            display: 'flex', flexDirection: 'column', gap: 14,
            minWidth: 210,
          }}>
            {/* Nombre del proyecto */}
            <div>
              <p style={{
                fontFamily: SANS, fontSize: 9, fontWeight: 600,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', marginBottom: 5,
              }}>
                Proyecto
              </p>
              <p style={{
                fontFamily: SERIF, fontSize: 20, fontWeight: 700,
                color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.01em',
              }}>
                Sala Nogal
              </p>
            </div>

            {/* Divisor */}
            <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.18)' }} />

            {/* Características */}
            <div className="v5-sala-info-specs" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { k: 'Estilo',    v: 'Escandinavo natural' },
                { k: 'Material',  v: 'Nogal · Lino · Piedra' },
                { k: 'Ambiente',  v: 'Sala de estar' },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: SANS, fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', flexShrink: 0 }}>
                    {k}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, color: '#FFFFFF', textAlign: 'right' }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hotspots */}
        {HOTSPOTS.map((h) => (
          <div
            key={h.id}
            className="v5-hotspot-card"
            style={{ top: h.top, left: h.left }}
            onClick={isMobile ? (e) => { e.stopPropagation(); setActiveHot(activeHot === h.id ? null : h.id) } : undefined}
          >
            {/* Pill — containing block del expanded card */}
            <div className="v5-hotspot-pill">
              {/* Card expandida — dentro del pill, se posiciona arriba via bottom: 100% */}
              <div className="v5-hotspot-expanded" style={{ display: isMobile ? 'none' : undefined }}>
                {/* Imagen del producto */}
                <div style={{ width: '100%', height: 148, overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={h.img}
                    alt={h.nombre}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '14px 16px 16px' }}>
                  <p style={{
                    fontFamily: SANS, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: P.muted, marginBottom: 5,
                  }}>
                    {h.categoria}
                  </p>
                  <p style={{
                    fontFamily: SERIF, fontSize: 15, fontWeight: 700,
                    color: P.dark, marginBottom: 7, lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }}>
                    {h.nombre}
                  </p>
                  <p style={{
                    fontFamily: SANS, fontSize: 11, lineHeight: 1.55,
                    color: P.muted, marginBottom: 10,
                  }}>
                    {h.desc}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingTop: 10, borderTop: `1px solid ${P.border}`,
                  }}>
                    <span style={{ fontFamily: SANS, fontSize: 10, color: P.muted, letterSpacing: '0.06em' }}>
                      {h.material}
                    </span>
                    <Link
                      to="/catalogo"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontFamily: SANS, fontSize: 11,
                        fontWeight: 700, color: P.dark, textDecoration: 'none',
                      }}
                    >
                      Ver más
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M2 6H10M7 3l3 3-3 3"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Dot con pulse */}
              <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
                <div className="v5-hotspot-pulse" />
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 10, height: 10, borderRadius: '50%',
                  backgroundColor: P.dark,
                }} />
              </div>
              <span style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 600,
                color: P.dark, letterSpacing: '0.04em',
              }}>
                {h.label}
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={P.muted} strokeWidth="1.8" strokeLinecap="round">
                <path d="M7 3v8M3 7h8"/>
              </svg>
            </div>
          </div>
        ))}
      </section>

      {/* ── ARTÍCULO DESTACADO ───────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65 }}
        style={{
          backgroundColor: P.bg,
          padding: 'clamp(64px, 9vh, 100px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Section label */}
          <p style={{
            fontFamily: SANS, fontSize: 11, fontWeight: 500,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: P.muted, textAlign: 'center', marginBottom: 12,
          }}>
            Artículo destacado
          </p>
          <h2 style={{
            fontFamily: SERIF, fontSize: 'clamp(26px, 3.5vw, 44px)',
            fontWeight: 700, fontStyle: 'italic',
            color: P.dark, textAlign: 'center',
            marginBottom: 52, lineHeight: 1.15,
          }}>
            La pieza de la temporada
          </h2>

          <div className="v5-featured-grid">

            {/* Image */}
            <motion.div
              className="v5-featured-img"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img src={FEATURED_PROD} alt="Sillón Nogal utropico" loading="lazy" />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12 }}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}
            >
              <span style={{
                display: 'inline-block',
                padding: '5px 14px',
                backgroundColor: P.card,
                borderRadius: 20,
                fontFamily: SANS, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: P.muted, marginBottom: 22,
                alignSelf: 'flex-start',
              }}>
                Dormitorio
              </span>

              <h3 style={{
                fontFamily: SERIF,
                fontSize: 'clamp(28px, 4vw, 52px)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: P.dark,
                marginBottom: 18,
                letterSpacing: '-0.025em',
              }}>
                Sillón Nogal<br />Edición Limitada
              </h3>

              <p style={{
                fontFamily: SANS, fontSize: 15, lineHeight: 1.75,
                color: P.muted, marginBottom: 32, maxWidth: 420,
              }}>
                Estructura en madera de nogal macizo, tapizado en lino natural.
                Diseño ergonómico con costuras artesanales visibles.
                Disponible en tres tonos de madera.
              </p>

              {/* Specs */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '14px 24px', marginBottom: 36,
              }}>
                {[
                  { k: 'Material', v: 'Nogal macizo + Lino' },
                  { k: 'Dimensiones', v: '72 × 80 × 88 cm' },
                  { k: 'Acabado', v: 'Aceite natural mate' },
                  { k: 'Origen', v: 'Taller propio, Costa Rica' },
                ].map((s) => (
                  <div key={s.k} style={{ borderTop: `1px solid ${P.border}`, paddingTop: 12 }}>
                    <p style={{ fontFamily: SANS, fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: P.muted, marginBottom: 4 }}>
                      {s.k}
                    </p>
                    <p style={{ fontFamily: SANS, fontSize: 14, color: P.dark, fontWeight: 500 }}>
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="v5-featured-btns">
                <Link
                  to="/catalogo"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 28px',
                    backgroundColor: P.dark, color: P.white,
                    borderRadius: 6, fontFamily: SANS,
                    fontSize: 13, fontWeight: 600,
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'opacity 0.25s',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  Ver en catálogo
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8H13M9 4l4 4-4 4"/></svg>
                </Link>
                <Link
                  to="/contacto"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '13px 28px',
                    border: `1.5px solid ${P.dark}`,
                    borderRadius: 6, fontFamily: SANS,
                    fontSize: 13, fontWeight: 500,
                    color: P.dark, textDecoration: 'none',
                    transition: 'background-color 0.25s, color 0.25s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.backgroundColor = P.dark; e.currentTarget.style.color = P.white }}
                  onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = P.dark }}
                >
                  Consultar precio
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── TALLER ───────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        style={{ borderTop: `1px solid ${P.border}` }}
      >
        <div className="v5-taller-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '80vh', maxHeight: 720 }}>
          {/* Imagen */}
          <div className="taller-img" style={{ position: 'relative', overflow: 'hidden', backgroundColor: P.card, minHeight: 0 }}>
            <motion.img
              src="/images/taller-1.jpg"
              alt="Artesanos trabajando en el taller utropico"
              initial={{ scale: 1.06 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          {/* Texto */}
          <div className="v5-taller-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px, 8vw, 96px)', backgroundColor: P.card }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 20 }}>
              Nuestro taller
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
              Cada pieza pasa por las mismas manos.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3 }}
              style={{ fontFamily: SANS, fontSize: 15, color: P.muted, lineHeight: 1.75, margin: '0 0 36px', maxWidth: 400 }}>
              Producimos en nuestro taller en Costa Rica. Los mismos artesanos que diseñan, construyen. Sin intermediarios, sin líneas de producción masiva.
            </motion.p>
            <motion.div
              className="v5-cta-wrap"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.38 }}>
              <a href="/nosotros"
                style={{ display: 'inline-block', fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: P.dark, border: `1.5px solid ${P.dark}`, padding: '14px 28px', textDecoration: 'none', transition: 'all 0.22s ease', borderRadius: 6 }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = P.dark; e.currentTarget.style.color = P.bg }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = P.dark }}>
                Conocer el estudio
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── CONTACTO ─────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundColor: P.bg,
          borderTop: `1px solid ${P.border}`,
          padding: 'clamp(64px, 10vh, 104px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="v5-contact-grid">

            {/* Left: heading */}
            <div>
              <p style={{
                fontFamily: SANS, fontSize: 11, fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: P.muted, marginBottom: 20,
              }}>
                Hablemos
              </p>
              <h2 style={{
                fontFamily: SERIF,
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 900,
                lineHeight: 1.1,
                color: P.dark,
                letterSpacing: '-0.03em',
              }}>
                ¿Tenés un<br />proyecto<br />en mente?
              </h2>
            </div>

            {/* Right: contact info + CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
              <p style={{
                fontFamily: SANS, fontSize: 16, lineHeight: 1.75,
                color: P.muted, maxWidth: 400,
              }}>
                Diseñamos y fabricamos piezas a medida. Contanos tu espacio,
                tus materiales preferidos y tu presupuesto — y lo hacemos realidad.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a
                  href="https://wa.me/XXXXXXXXXXX"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    fontFamily: SANS, fontSize: 15, fontWeight: 500,
                    color: P.dark, textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.55'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: `1px solid ${P.border}`,
                    backgroundColor: P.card,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: P.dark,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5H5l-2 2V12a8.5 8.5 0 0118 0v-.5z"/>
                    </svg>
                  </span>
                  WhatsApp: +XX XXXX XXXX
                </a>

                <a
                  href="mailto:hola@utropicostudio.com"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    fontFamily: SANS, fontSize: 15, fontWeight: 500,
                    color: P.dark, textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.55'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: `1px solid ${P.border}`,
                    backgroundColor: P.card,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: P.dark,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M2 7l10 7 10-7"/>
                    </svg>
                  </span>
                  hola@utropicostudio.com
                </a>
              </div>

              <div className="v5-cta-wrap" style={{ paddingTop: 8 }}>
                <Link
                  to="/contacto"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px',
                    backgroundColor: P.dark, color: P.white,
                    borderRadius: 6, fontFamily: SANS,
                    fontSize: 13, fontWeight: 600,
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'opacity 0.25s',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  Ir a contacto
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8H13M9 4l4 4-4 4"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── MOBILE HOTSPOT SHEET ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobile && activeHotData && (
          <motion.div
            key="hotsheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveHot(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: 'rgba(0,0,0,0.35)' }}
          >
            <motion.div
              key="hotsheet-card"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute', bottom: 24, left: 16, right: 16,
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 16px 48px rgba(0,0,0,0.28)',
              }}
            >
              <div style={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={activeHotData.img}
                  alt={activeHotData.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                />
              </div>
              <div style={{ padding: '16px 18px 20px' }}>
                <p style={{ fontFamily: SANS, fontSize: 9, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: P.muted, marginBottom: 5 }}>
                  {activeHotData.categoria}
                </p>
                <p style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 700, color: P.dark, marginBottom: 8, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  {activeHotData.nombre}
                </p>
                <p style={{ fontFamily: SANS, fontSize: 13, lineHeight: 1.55, color: P.muted, marginBottom: 14 }}>
                  {activeHotData.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${P.border}` }}>
                  <span style={{ fontFamily: SANS, fontSize: 11, color: P.muted, letterSpacing: '0.06em' }}>
                    {activeHotData.material}
                  </span>
                  <Link
                    to="/catalogo"
                    onClick={() => setActiveHot(null)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: SANS, fontSize: 12, fontWeight: 700, color: P.dark, textDecoration: 'none' }}
                  >
                    Ver más
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M2 6H10M7 3l3 3-3 3"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
