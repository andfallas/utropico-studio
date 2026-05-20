import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const P = {
  cream:  '#F5F0E8',
  green:  '#1A2018',
  greenMid: '#2C3829',
  orange: '#C17A3F',
  orangeLight: '#D4915A',
  white:  '#FFFFFF',
  text:   '#1A1A17',
  muted:  '#6B6860',
  border: '#E3DDD4',
  gray:   '#F2EDE5',
}

const SERIF = "'DM Serif Display', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconLeaf() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24C4 24 8 14 18 8C24 4 26 4 26 4C26 4 26 6 22 12C16 22 6 24 4 24Z" />
      <path d="M4 24L14 14" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3L4 7V14C4 19.5 8.5 24.6 14 26C19.5 24.6 24 19.5 24 14V7L14 3Z" />
      <path d="M10 14L13 17L18 11" />
    </svg>
  )
}

function IconTruck() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="16" height="12" rx="1" />
      <path d="M18 12H22L25 16V20H18V12Z" />
      <circle cx="7" cy="21" r="2" />
      <circle cx="21" cy="21" r="2" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="16,3 20,12 30,13 23,20 25,30 16,25 7,30 9,20 2,13 12,12" />
    </svg>
  )
}

function IconHand() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14V8a2 2 0 114 0v6m0-4a2 2 0 114 0v4m0-2a2 2 0 114 0v8c0 4-3 6-7 6s-7-2-7-6v-6a2 2 0 114 0" />
    </svg>
  )
}

function IconRecycle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4L20 8H17C11 8 6 13 6 19" />
      <path d="M6 19L2 15" /><path d="M6 19L10 15" />
      <path d="M16 28L12 24H15C21 24 26 19 26 13" />
      <path d="M26 13L30 17" /><path d="M26 13L22 17" />
    </svg>
  )
}

function IconBolt() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3L6 18H16L14 29L26 14H16L18 3Z" />
    </svg>
  )
}

function IconEmail() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7L12 13L22 7" />
    </svg>
  )
}

const HERO_IMG  = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85'
const STORY_IMG = 'https://images.unsplash.com/photo-1600607687939-ce8a6c349d9e?w=1000&q=85'

// ── Categories data ────────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'Sala',      img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=85', slug: '/catalogo' },
  { label: 'Comedor',   img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=85', slug: '/catalogo' },
  { label: 'Estudio',   img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85',   slug: '/catalogo' },
  { label: 'Dormitorio',img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=85', slug: '/catalogo' },
]

const FEATURES = [
  { icon: <IconRecycle />, title: 'Materiales Sostenibles', desc: 'Maderas certificadas y materiales naturales de origen responsable.' },
  { icon: <IconStar />,    title: 'Calidad Premium',        desc: 'Cada pieza es revisada manualmente antes de ser enviada.' },
  { icon: <IconHand />,    title: 'Hecho a Mano',           desc: 'Artesanos con décadas de experiencia en cada detalle.' },
  { icon: <IconBolt />,    title: 'Entrega Rápida',         desc: 'Envío gratuito y confirmado en 48 horas hábiles.' },
]

const V4_STYLES = `
  .v4-hero-img {
    border-bottom-left-radius: 80px;
    overflow: hidden;
    height: 100%;
    min-height: 560px;
  }
  .v4-hero-img img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
  }
  .v4-cat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .v4-cat-card {
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    aspect-ratio: 3/4;
    cursor: pointer;
  }
  .v4-cat-card img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }
  .v4-cat-card:hover img { transform: scale(1.06); }
  .v4-cat-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(10,16,9,0.75) 0%, transparent 55%);
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 20px;
  }
  .v4-feat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  .v4-story-grid {
    display: grid;
    grid-template-columns: 42fr 58fr;
    min-height: 580px;
  }
  .v4-story-img img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    display: block;
  }
  .v4-orange-line {
    display: inline-block;
    width: 48px; height: 3px;
    background: #C17A3F;
    margin-bottom: 20px;
    border-radius: 2px;
  }

  @media (max-width: 1023px) {
    .v4-cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .v4-feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .v4-story-grid { grid-template-columns: 1fr !important; }
    .v4-story-img { min-height: 360px !important; }
  }
  @media (max-width: 767px) {
    .v4-hero-split { flex-direction: column !important; }
    .v4-hero-content { padding: 60px 24px 48px !important; }
    .v4-hero-img { min-height: 320px !important; border-bottom-left-radius: 40px !important; }
    .v4-cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
    .v4-feat-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
    .v4-trust-row { flex-direction: column !important; gap: 12px !important; }
    .v4-nl-row { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
    .v4-nl-form { width: 100% !important; }
  }
  @media (max-width: 479px) {
    .v4-cat-grid { grid-template-columns: 1fr !important; }
    .v4-feat-grid { grid-template-columns: 1fr !important; }
  }
`

// ── Component ──────────────────────────────────────────────────────────────────
export default function HomeV4() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) { setSent(true); setEmail('') }
  }

  return (
    <div style={{ fontFamily: SANS, backgroundColor: P.cream, color: P.text, overflowX: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: V4_STYLES }} />

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: P.cream, paddingTop: 80 }}>
        <div
          className="v4-hero-split"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            maxWidth: 1400,
            margin: '0 auto',
            gap: 0,
          }}
        >
          {/* Left: content */}
          <div
            className="v4-hero-content"
            style={{
              flex: '0 0 50%',
              padding: 'clamp(48px, 8vw, 96px) clamp(32px, 5vw, 80px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: SANS,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: P.orange,
                marginBottom: 20,
                display: 'block',
              }}
            >
              Modern Living. Timeless Comfort.
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(38px, 5.5vw, 68px)',
                lineHeight: 1.1,
                color: P.text,
                marginBottom: 24,
                fontWeight: 400,
              }}
            >
              Diseñado para<br />la forma en que<br />vivís.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              style={{
                fontFamily: SANS,
                fontSize: 16,
                lineHeight: 1.7,
                color: P.muted,
                marginBottom: 36,
                maxWidth: 420,
              }}
            >
              Muebles que transforman cada rincón en un espacio con alma.
              Maderas nobles, formas atemporales, artesanía real.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}
            >
              <Link
                to="/catalogo"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  backgroundColor: P.green,
                  color: P.white,
                  borderRadius: 40,
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = P.greenMid}
                onMouseOut={e => e.currentTarget.style.backgroundColor = P.green}
              >
                Ver Colección
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8H13M9 4l4 4-4 4"/></svg>
              </Link>
              <Link
                to="/proceso"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  color: P.text,
                  border: `1.5px solid ${P.border}`,
                  borderRadius: 40,
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  transition: 'border-color 0.3s',
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = P.text}
                onMouseOut={e => e.currentTarget.style.borderColor = P.border}
              >
                Nuestro Proceso
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="v4-trust-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}
            >
              {[
                { icon: <IconLeaf />, text: 'Materiales Sostenibles' },
                { icon: <IconShield />, text: 'Calidad Premium' },
                { icon: <IconTruck />, text: 'Entrega Gratis' },
              ].map((b) => (
                <div
                  key={b.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '9px 16px 9px 12px',
                    backgroundColor: P.white,
                    borderRadius: 10,
                    border: `1px solid ${P.border}`,
                  }}
                >
                  <span style={{ color: P.orange, display: 'flex' }}>{b.icon}</span>
                  <span style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, color: P.text, whiteSpace: 'nowrap' }}>{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            className="v4-hero-img"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ flex: '0 0 50%' }}
          >
            <img
              src={HERO_IMG}
              alt="Interior design utropico studio"
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2. SHOP BY CATEGORY ─────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        style={{
          backgroundColor: P.green,
          padding: 'clamp(64px, 10vh, 100px) clamp(24px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <motion.div variants={fadeUp} style={{ marginBottom: 48, textAlign: 'center' }}>
            <div className="v4-orange-line" />
            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(30px, 4vw, 48px)',
              color: P.white,
              fontWeight: 400,
              lineHeight: 1.15,
            }}>
              Comprar por Categoría
            </h2>
          </motion.div>

          <motion.div className="v4-cat-grid" variants={stagger}>
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.label} variants={fadeUp}>
                <Link to={cat.slug} style={{ textDecoration: 'none' }}>
                  <div className="v4-cat-card">
                    <img src={cat.img} alt={cat.label} loading="lazy" />
                    <div className="v4-cat-card-overlay">
                      <p style={{
                        fontFamily: SERIF,
                        fontSize: 22,
                        color: P.white,
                        fontWeight: 400,
                        marginBottom: 6,
                      }}>
                        {cat.label}
                      </p>
                      <span style={{
                        fontFamily: SANS,
                        fontSize: 12,
                        fontWeight: 600,
                        color: P.orangeLight,
                        letterSpacing: '0.06em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}>
                        Explorar
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7H12M8 3l4 4-4 4"/></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── 3. WHY CHOOSE ───────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        style={{
          backgroundColor: P.white,
          padding: 'clamp(64px, 10vh, 100px) clamp(24px, 5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="v4-orange-line" />
            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: P.text,
              fontWeight: 400,
              lineHeight: 1.15,
            }}>
              ¿Por qué elegir utropico?
            </h2>
          </motion.div>

          <motion.div className="v4-feat-grid" variants={stagger}>
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '32px 28px',
                  border: `1px solid ${P.border}`,
                  borderRadius: 16,
                  backgroundColor: P.cream,
                }}
              >
                <span style={{ color: P.orange, display: 'flex' }}>{f.icon}</span>
                <h3 style={{
                  fontFamily: SERIF,
                  fontSize: 20,
                  fontWeight: 400,
                  color: P.text,
                  lineHeight: 1.25,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: SANS,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: P.muted,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── 4. OUR STORY ────────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
        style={{ backgroundColor: P.cream, overflow: 'hidden' }}
      >
        <div className="v4-story-grid" style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Image */}
          <motion.div
            className="v4-story-img"
            variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut' } } }}
            style={{ overflow: 'hidden' }}
          >
            <img src={STORY_IMG} alt="Taller utropico studio" loading="lazy" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            style={{
              padding: 'clamp(56px, 8vw, 100px) clamp(36px, 6vw, 88px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span style={{
              fontFamily: SANS,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: P.orange,
              marginBottom: 20,
            }}>
              Nuestra Historia
            </span>
            <h2 style={{
              fontFamily: SERIF,
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.15,
              fontWeight: 400,
              color: P.text,
              marginBottom: 24,
            }}>
              Desde el taller<br />hasta tu hogar.
            </h2>
            <p style={{
              fontFamily: SANS,
              fontSize: 16,
              lineHeight: 1.75,
              color: P.muted,
              maxWidth: 480,
              marginBottom: 16,
            }}>
              Nacimos con la convicción de que un buen mueble no es solo funcional —
              es un objeto que cuenta una historia. Cada pieza pasa por manos
              artesanas antes de llegar a la tuya.
            </p>
            <p style={{
              fontFamily: SANS,
              fontSize: 16,
              lineHeight: 1.75,
              color: P.muted,
              maxWidth: 480,
              marginBottom: 40,
            }}>
              Trabajamos con maderas certificadas de bosques gestionados,
              ratán natural y telas de origen responsable. Porque la belleza
              no debería costarle nada al planeta.
            </p>
            <div>
              <Link
                to="/nosotros"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  backgroundColor: P.green,
                  color: P.white,
                  borderRadius: 40,
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = P.greenMid}
                onMouseOut={e => e.currentTarget.style.backgroundColor = P.green}
              >
                Conocer más
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8H13M9 4l4 4-4 4"/></svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── 5. NEWSLETTER ───────────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        style={{
          backgroundColor: P.gray,
          padding: 'clamp(56px, 8vh, 80px) clamp(24px, 5vw, 80px)',
          borderTop: `1px solid ${P.border}`,
        }}
      >
        <div
          className="v4-nl-row"
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {/* Icon + heading */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              backgroundColor: P.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: P.white, flexShrink: 0,
            }}>
              <IconEmail />
            </div>
            <div>
              <h3 style={{
                fontFamily: SERIF,
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 400,
                color: P.text,
                marginBottom: 6,
                lineHeight: 1.2,
              }}>
                Sé el primero en saber.
              </h3>
              <p style={{ fontFamily: SANS, fontSize: 14, color: P.muted, lineHeight: 1.5 }}>
                Nuevas piezas, lanzamientos y contenido editorial. Sin spam.
              </p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <p style={{ fontFamily: SANS, fontSize: 15, color: P.green, fontWeight: 600 }}>
              ¡Gracias! Te avisamos pronto.
            </p>
          ) : (
            <form
              className="v4-nl-form"
              onSubmit={handleSubscribe}
              style={{ display: 'flex', gap: 10, flexShrink: 0 }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                style={{
                  padding: '13px 18px',
                  borderRadius: 40,
                  border: `1.5px solid ${P.border}`,
                  fontFamily: SANS,
                  fontSize: 14,
                  backgroundColor: P.white,
                  color: P.text,
                  outline: 'none',
                  width: 260,
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = P.orange}
                onBlur={e => e.currentTarget.style.borderColor = P.border}
              />
              <button
                type="submit"
                style={{
                  padding: '13px 24px',
                  borderRadius: 40,
                  border: 'none',
                  backgroundColor: P.orange,
                  color: P.white,
                  fontFamily: SANS,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  transition: 'background-color 0.3s',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#A8663A'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = P.orange}
              >
                Suscribirse
              </button>
            </form>
          )}
        </div>
      </motion.section>
    </div>
  )
}
