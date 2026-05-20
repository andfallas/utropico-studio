import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { catalogoItems } from '../data/catalogo'

// ── Design tokens — fresh palette, NO references to V1/V2 ──
const P = {
  bg:      '#FFFFFF',
  surface: '#F7F5F2',
  card:    '#FFFFFF',
  text:    '#171412',
  muted:   '#78716C',
  border:  '#E7E2DD',
  accent:  '#171412',
  gold:    '#A16207',
  star:    '#F59E0B',
  pill:    '#FEFCE8',
  pillBd:  '#FEF08A',
}

// ── Fonts — Plus Jakarta Sans (bold grotesque) + Josefin Sans (geometric uppercase)
//    Completely different from V1 (Instrument Serif) and V2 (Bodoni Moda / DM Sans)
const DISPLAY = "'Plus Jakarta Sans', 'Arial Black', sans-serif"
const BODY    = "'Plus Jakarta Sans', system-ui, sans-serif"
const LABEL   = "'Josefin Sans', 'Arial', sans-serif"

// ── Data ──
const HERO_IMG = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85'
const cardItems    = catalogoItems.slice(0, 4)
const listingItems = [catalogoItems[1], catalogoItems[7]] // Mesa Nogal XL, Cama Nogal King
const categories   = ['Sala', 'Comedor', 'Dormitorio', 'Exterior', 'Estudio']
const featured     = ['AD Premio', 'Elle Decor', 'Ambientes', 'Infobae']

// ── Inline styles injected ──
const V3_CSS = `
  .v3-hero   { display: grid; grid-template-columns: 55fr 45fr; gap: 64px; align-items: center; }
  .v3-cards  { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .v3-listing-row { display: grid; grid-template-columns: 220px 1fr 1.1fr 190px; }
  .v3-cats   { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
  .v3-trusted{ display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
  .v3-card-img { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .v3-card-wrap:hover .v3-card-img { transform: scale(1.05); }
  .v3-btn-ghost:hover { background-color: #171412 !important; color: #FFFFFF !important; border-color: #171412 !important; }
  @media (max-width: 1023px) {
    .v3-listing-row { grid-template-columns: 180px 1fr 1fr !important; }
    .v3-listing-col4 { display: none !important; }
  }
  @media (max-width: 767px) {
    .v3-hero    { grid-template-columns: 1fr !important; gap: 36px !important; }
    .v3-cards   { grid-template-columns: repeat(2, 1fr) !important; }
    .v3-listing-row { grid-template-columns: 1fr !important; }
    .v3-listing-row > div { border-right: none !important; border-bottom: 1px solid #E7E2DD !important; }
    .v3-listing-col3 { display: none !important; }
    .v3-listing-col4 { display: block !important; }
  }
  @media (max-width: 479px) {
    .v3-cards { grid-template-columns: 1fr !important; }
  }
`

// ── SVG icons ──
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)
const HeartIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#171412" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
)
const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171412" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

function FadeUp({ children, delay = 0, style = {}, className = '' }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Outer container shared style
const WRAP = {
  maxWidth: 1280, margin: '0 auto',
  paddingLeft: 'clamp(20px, 5vw, 80px)',
  paddingRight: 'clamp(20px, 5vw, 80px)',
}

export default function HomeV3() {
  const [activeTab, setActiveTab] = useState('Sala')

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: P.bg, fontFamily: BODY }}
    >
      <style dangerouslySetInnerHTML={{ __html: V3_CSS }} />

      {/* ══════════════════════════════════════════════════════════════
          1. HERO — split layout (reference: left text / right image)
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 'clamp(96px, 12vw, 140px)', paddingBottom: 72, backgroundColor: P.bg }}>
        <div style={WRAP}>
          <div className="v3-hero">

            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Rating pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                backgroundColor: P.pill, border: '1px solid ' + P.pillBd,
                borderRadius: 100, padding: '6px 14px', marginBottom: 28,
              }}>
                <StarIcon />
                <span style={{ fontFamily: BODY, fontSize: 13, fontWeight: 700, color: P.text }}>4.5 Calificación</span>
                <span style={{ fontFamily: BODY, fontSize: 11, color: P.muted, marginLeft: 2 }}>por Architectural Digest</span>
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: DISPLAY, fontWeight: 800,
                fontSize: 'clamp(44px, 6vw, 76px)',
                color: P.text, lineHeight: 1.05,
                letterSpacing: '-0.025em', marginBottom: 18,
              }}>
                Encontrá el<br />mejor diseño.
              </h1>

              {/* Body */}
              <p style={{
                fontFamily: BODY, fontSize: 15, fontWeight: 400,
                color: P.muted, lineHeight: 1.75,
                maxWidth: 400, marginBottom: 36,
              }}>
                Diseñamos y fabricamos muebles de lujo natural. Cada pieza
                es una colaboración entre el cliente, el espacio y el material.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link
                  to="/nosotros"
                  style={{
                    fontFamily: BODY, fontSize: 14, fontWeight: 500,
                    color: P.text, border: '1.5px solid ' + P.border,
                    borderRadius: 100, padding: '12px 28px',
                    textDecoration: 'none', transition: 'border-color 0.22s, background 0.22s',
                    display: 'inline-block', cursor: 'pointer',
                  }}
                  onMouseOver={e => { e.currentTarget.style.backgroundColor = P.surface; e.currentTarget.style.borderColor = P.text }}
                  onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = P.border }}
                >
                  Nosotros
                </Link>
                <Link
                  to="/catalogo"
                  style={{
                    fontFamily: BODY, fontSize: 14, fontWeight: 700,
                    color: '#FFF', backgroundColor: P.accent,
                    border: '1.5px solid ' + P.accent,
                    borderRadius: 100, padding: '12px 28px',
                    textDecoration: 'none', transition: 'opacity 0.22s',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer',
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  Ver catálogo <ArrowIcon />
                </Link>
              </div>

              {/* Featured in */}
              <div>
                <p style={{
                  fontFamily: LABEL, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: P.muted, marginBottom: 14,
                }}>
                  Destacados en
                </p>
                <div className="v3-trusted">
                  {featured.map((b) => (
                    <span key={b} style={{
                      fontFamily: DISPLAY, fontSize: 13, fontWeight: 800,
                      color: P.text, opacity: 0.3, letterSpacing: '-0.01em',
                    }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — rounded image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 28, overflow: 'hidden',
                height: 'clamp(360px, 48vw, 540px)',
              }}
            >
              <img
                src={HERO_IMG}
                alt="Diseño de interiores utropico studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. PREVIEW CARDS — horizontal grid of 4
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ paddingBottom: 80, backgroundColor: P.bg }}>
        <div style={WRAP}>
          <div className="v3-cards">
            {/* Cards 0 & 1 — image cards */}
            {cardItems.slice(0, 2).map((item, i) => (
              <FadeUp key={item.id} delay={i * 0.07}>
                <Link to="/catalogo" style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="v3-card-wrap" style={{
                    borderRadius: 18, overflow: 'hidden',
                    border: '1px solid ' + P.border,
                    backgroundColor: P.card, cursor: 'pointer',
                  }}>
                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                      <img
                        src={item.imagenes[0]}
                        alt={item.nombre}
                        loading="lazy"
                        className="v3-card-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{
                        position: 'absolute', top: 10, right: 10,
                        width: 30, height: 30, borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                      }}>
                        <HeartIcon />
                      </div>
                    </div>
                    <div style={{ padding: '13px 15px 15px' }}>
                      <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 3 }}>{item.nombre}</p>
                      <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 400, color: P.muted }}>{item.categoria}</p>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}

            {/* Card 2 — editorial text card */}
            <FadeUp delay={0.14}>
              <div style={{
                borderRadius: 18, backgroundColor: P.surface,
                border: '1px solid ' + P.border,
                padding: '24px 20px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                height: '100%', boxSizing: 'border-box',
              }}>
                <div>
                  <p style={{
                    fontFamily: LABEL, fontSize: 9, fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: P.muted, marginBottom: 12,
                  }}>
                    Colección 2025
                  </p>
                  <p style={{
                    fontFamily: DISPLAY, fontSize: 19, fontWeight: 800,
                    color: P.text, lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}>
                    La mejor opción para tu próximo proyecto.
                  </p>
                </div>
                <Link
                  to="/catalogo"
                  className="v3-btn-ghost"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: BODY, fontSize: 12, fontWeight: 700,
                    color: P.text, textDecoration: 'none',
                    border: '1.5px solid ' + P.border, borderRadius: 100,
                    padding: '9px 16px', alignSelf: 'flex-start',
                    marginTop: 20, transition: 'all 0.22s', cursor: 'pointer',
                  }}
                >
                  Explorar más <ArrowIcon />
                </Link>
              </div>
            </FadeUp>

            {/* Card 3 — image card */}
            <FadeUp delay={0.21}>
              <Link to="/catalogo" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="v3-card-wrap" style={{
                  borderRadius: 18, overflow: 'hidden',
                  border: '1px solid ' + P.border,
                  backgroundColor: P.card, cursor: 'pointer',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={cardItems[3].imagenes[0]}
                      alt={cardItems[3].nombre}
                      loading="lazy"
                      className="v3-card-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute', top: 10, right: 10,
                      width: 30, height: 30, borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.88)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                      <HeartIcon />
                    </div>
                  </div>
                  <div style={{ padding: '13px 15px 15px' }}>
                    <p style={{ fontFamily: BODY, fontSize: 13, fontWeight: 700, color: P.text, marginBottom: 3 }}>{cardItems[3].nombre}</p>
                    <p style={{ fontFamily: BODY, fontSize: 11, fontWeight: 400, color: P.muted }}>{cardItems[3].categoria}</p>
                  </div>
                </div>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. CATEGORY SECTION — oversized display + tabs
      ══════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: P.surface,
        borderTop: '1px solid ' + P.border,
        borderBottom: '1px solid ' + P.border,
        paddingTop: 72, paddingBottom: 72,
      }}>
        <div style={WRAP}>
          <FadeUp>
            <p style={{
              fontFamily: LABEL, fontSize: 11, fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: P.muted, textAlign: 'center', marginBottom: 8,
            }}>
              Colección de espacios
            </p>
            {/* Oversized display — "exaggerated minimalism" per design system */}
            <h2 style={{
              fontFamily: DISPLAY, fontWeight: 800,
              fontSize: 'clamp(52px, 11vw, 128px)',
              color: P.text, textAlign: 'center',
              letterSpacing: '-0.04em', lineHeight: 0.9,
              marginBottom: 52,
            }}>
              colección
            </h2>

            {/* Category tabs — pill buttons */}
            <div className="v3-cats">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  style={{
                    fontFamily: BODY, fontSize: 13, fontWeight: 600,
                    color: activeTab === cat ? '#FFF' : P.text,
                    backgroundColor: activeTab === cat ? P.accent : 'transparent',
                    border: '1.5px solid ' + (activeTab === cat ? P.accent : P.border),
                    borderRadius: 100, padding: '10px 24px',
                    cursor: 'pointer', transition: 'all 0.2s', minHeight: 44,
                  }}
                  onMouseOver={e => { if (activeTab !== cat) { e.currentTarget.style.borderColor = P.text } }}
                  onMouseOut={e => { if (activeTab !== cat) { e.currentTarget.style.borderColor = P.border } }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. LISTING CARDS — detailed 4-column rows
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: P.bg, paddingTop: 52, paddingBottom: 88 }}>
        <div style={WRAP}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {listingItems.map((item, i) => (
              <FadeUp key={item.id} delay={i * 0.1}>
                <div style={{
                  borderRadius: 20, border: '1px solid ' + P.border,
                  overflow: 'hidden', backgroundColor: P.card,
                }} className="v3-listing-row">

                  {/* Col 1: Image */}
                  <div style={{ position: 'relative', minHeight: 240 }}>
                    <img
                      src={item.imagenes[0]}
                      alt={item.nombre}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                    />
                    {/* Rating badge */}
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      backgroundColor: 'rgba(255,255,255,0.93)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 100, padding: '5px 10px',
                    }}>
                      <StarIcon />
                      <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 800, color: P.text }}>4.5</span>
                    </div>
                  </div>

                  {/* Col 2: Title + tipo + link */}
                  <div style={{
                    padding: '28px 24px', borderRight: '1px solid ' + P.border,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}>
                    <div>
                      <p style={{
                        fontFamily: LABEL, fontSize: 9, fontWeight: 700,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: P.muted, marginBottom: 14,
                      }}>
                        {item.tipo === 'proyecto' ? 'Proyecto residencial' : 'Producto de catálogo'}
                      </p>
                      <p style={{
                        fontFamily: DISPLAY, fontSize: 20, fontWeight: 800,
                        color: P.text, lineHeight: 1.25,
                        letterSpacing: '-0.01em',
                      }}>
                        {item.nombre}
                      </p>
                      <p style={{
                        fontFamily: BODY, fontSize: 13, fontWeight: 400,
                        color: P.muted, lineHeight: 1.65, marginTop: 10,
                      }}>
                        {item.descripcion}
                      </p>
                    </div>
                    <Link
                      to="/catalogo"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontFamily: BODY, fontSize: 12, fontWeight: 700,
                        color: P.text, textDecoration: 'none',
                        marginTop: 20, transition: 'opacity 0.2s',
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.55'}
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    >
                      Ver detalle <ArrowIcon />
                    </Link>
                  </div>

                  {/* Col 3: Specs / price-equivalent */}
                  <div className="v3-listing-col3" style={{ padding: '28px 24px', borderRight: '1px solid ' + P.border }}>
                    {/* "Price" equivalent — dimensions or "A medida" */}
                    <p style={{
                      fontFamily: DISPLAY, fontWeight: 800,
                      fontSize: item.dimensiones ? 22 : 28,
                      color: P.text, marginBottom: 4, letterSpacing: '-0.02em',
                    }}>
                      {item.dimensiones ?? 'A medida'}
                    </p>
                    <p style={{ fontFamily: BODY, fontSize: 11, color: P.muted, marginBottom: 24 }}>
                      {item.dimensiones ? 'Dimensiones estándar' : 'Dimensiones a pedido'}
                    </p>

                    <p style={{
                      fontFamily: LABEL, fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      color: P.text, marginBottom: 14,
                    }}>
                      Información
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {[
                        { label: 'Material',    val: item.material },
                        { label: 'Categoría',   val: item.categoria },
                        { label: 'Tipo',        val: item.tipo === 'proyecto' ? 'Proyecto' : 'Producto' },
                        { label: 'Acabado',     val: 'Natural / mate' },
                      ].map((row) => (
                        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                          <span style={{ fontFamily: BODY, fontSize: 12, color: P.muted }}>{row.label}</span>
                          <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: P.text, textAlign: 'right' }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 4: Amenities + CTA */}
                  <div className="v3-listing-col4" style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      {/* Amenity 1 */}
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 10,
                          backgroundColor: P.surface, border: '1px solid ' + P.border,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <CheckIcon />
                        </div>
                        <div>
                          <p style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: P.text, marginBottom: 3 }}>Calidad garantizada</p>
                          <p style={{ fontFamily: BODY, fontSize: 11, color: P.muted, lineHeight: 1.55 }}>Materiales naturales premium con selección rigurosa.</p>
                        </div>
                      </div>
                      {/* Amenity 2 */}
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 10,
                          backgroundColor: P.surface, border: '1px solid ' + P.border,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <GridIcon />
                        </div>
                        <div>
                          <p style={{ fontFamily: BODY, fontSize: 12, fontWeight: 700, color: P.text, marginBottom: 3 }}>Materiales</p>
                          <p style={{ fontFamily: BODY, fontSize: 11, color: P.muted, lineHeight: 1.55 }}>Teca · Nogal · Ratán · Lino · Cemento</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to="/contacto"
                      style={{
                        display: 'block', textAlign: 'center',
                        backgroundColor: P.accent, color: '#FFF',
                        fontFamily: BODY, fontSize: 13, fontWeight: 700,
                        borderRadius: 12, padding: '13px 16px',
                        textDecoration: 'none', transition: 'opacity 0.22s',
                        letterSpacing: '0.01em', cursor: 'pointer',
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.82'}
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    >
                      Consultar ahora
                    </Link>
                  </div>

                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

    </motion.main>
  )
}
