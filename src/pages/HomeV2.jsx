import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ImageHover from '../components/ui/ImageHover'
import useScrollReveal from '../hooks/useScrollReveal'
import { catalogoItems } from '../data/catalogo'

const HERO_IMG = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90'
const ABOUT_IMG = 'https://images.unsplash.com/photo-1600607687939-ce8a6c349d9e?w=1920&q=80'

const C = {
  bg:      '#F4EDE0',
  surface: '#EDE5D3',
  text:    '#1A140C',
  muted:   '#5E4835',
  accent:  '#8B5E3C',
  label:   '#7A5533',
  line:    '#D6C9B4',
  sand:    '#C4A882',
  dark:    '#130F09',
}

// Bodoni Moda — ultra high-contrast strokes, fashion luxury; completely distinct from V1's Instrument Serif
const BD = 'var(--font-display-v2)'

const TICKER_ITEMS = ['Madera', 'Ratán', 'Piedra', 'Lino', 'Teca', 'Bambú', 'Nogal', 'Cemento']

const categories = [
  { nombre: 'Sala',       count: 4, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=85' },
  { nombre: 'Comedor',    count: 3, img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=85' },
  { nombre: 'Dormitorio', count: 3, img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=85' },
  { nombre: 'Exterior',   count: 1, img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=85' },
  { nombre: 'Estudio',    count: 2, img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85' },
]

const featured = catalogoItems[1] // Mesa Nogal XL
const previewItems = [catalogoItems[0], ...catalogoItems.slice(2, 6)]

const V2_STYLES = `
  @keyframes v2-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .v2-ticker-track { animation: v2-ticker 32s linear infinite; }
  .v2-cat-img { transition: transform 0.9s cubic-bezier(0.16,1,0.3,1); }
  .v2-cat-card:hover .v2-cat-img { transform: scale(1.07); }
  @media (max-width: 767px) {
    .v2-categories-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .v2-featured-grid   { grid-template-columns: 1fr !important; }
    .v2-stats-grid      { grid-template-columns: 1fr !important; }
    .v2-stats-grid > *  { border-right: none !important; border-bottom: 1px solid rgba(196,168,130,0.2); }
  }
`

function FadeIn({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const visible = useScrollReveal(ref)
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HomeV2() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ backgroundColor: C.bg }}
    >
      <style dangerouslySetInnerHTML={{ __html: V2_STYLES }} />

      {/* ── 1. HERO — cinematic, overlay preservado ── */}
      <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
        <img
          src={HERO_IMG}
          alt="utropico studio — interiorismo de lujo"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(14,12,10,0.88) 0%, rgba(14,12,10,0.2) 55%, transparent 100%)',
        }} />

        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)',
          paddingBottom: 'clamp(48px, 8vh, 96px)', maxWidth: '920px',
        }}>
          <motion.p
            style={{ color: '#C4A882', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Diseño · Madera · Artesanía
          </motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <motion.h1
              style={{ fontFamily: BD, color: '#EDE4D3', lineHeight: 0.92, fontSize: 'clamp(52px, 7.5vw, 108px)', fontWeight: 700 }}
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Espacios que
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 44 }}>
            <motion.h1
              style={{ fontFamily: BD, color: '#EDE4D3', lineHeight: 0.92, fontSize: 'clamp(52px, 7.5vw, 108px)', fontStyle: 'italic', fontWeight: 400 }}
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              cuentan historias
            </motion.h1>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.7 }}>
            <Link
              to="/catalogo"
              style={{ display: 'inline-block', border: '1px solid #EDE4D3', color: '#EDE4D3', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '14px 36px', textDecoration: 'none', transition: 'background-color 0.35s, color 0.35s' }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = '#EDE4D3'; e.currentTarget.style.color = '#0E0C0A' }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#EDE4D3' }}
            >
              Ver catálogo
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ position: 'absolute', bottom: 40, right: 'var(--container-px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        >
          <span style={{ color: '#C4A882', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-rl', fontFamily: 'var(--font-body)' }}>Scroll</span>
          <motion.div
            style={{ width: 1, height: 52, backgroundColor: '#C4A882', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── 2. BRAND TICKER — identity strip ── */}
      <div style={{ backgroundColor: C.accent, overflow: 'hidden', padding: '13px 0' }}>
        <div
          className="v2-ticker-track"
          style={{ display: 'inline-flex', gap: 0, whiteSpace: 'nowrap', alignItems: 'center' }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#EDE4D3', padding: '0 40px' }}>
              {item} <span style={{ opacity: 0.4, marginLeft: 40 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. CATEGORIES — editorial card grid ── */}
      <section style={{ backgroundColor: C.bg, paddingTop: 'var(--section-py)', paddingBottom: 0 }}>
        <div className="container-main" style={{ marginBottom: 40 }}>
          <FadeIn style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: C.label, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 10 }}>
                Colección
              </p>
              <h2 style={{ fontFamily: BD, color: C.text, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, lineHeight: 1 }}>
                Explorar por espacio
              </h2>
            </div>
            <Link
              to="/catalogo"
              style={{ color: C.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'color 0.3s', paddingBottom: 4 }}
              onMouseOver={e => e.currentTarget.style.color = C.text}
              onMouseOut={e => e.currentTarget.style.color = C.label}
            >
              Ver todo →
            </Link>
          </FadeIn>
        </div>

        <div
          className="v2-categories-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}
        >
          {categories.map((cat, i) => (
            <FadeIn key={cat.nombre} delay={i * 0.07}>
              <Link
                to="/catalogo"
                className="v2-cat-card"
                style={{ display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4', textDecoration: 'none' }}
              >
                <img
                  src={cat.img}
                  alt={cat.nombre}
                  loading="lazy"
                  className="v2-cat-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(20,14,6,0.82) 0%, rgba(20,14,6,0.05) 55%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '22px 20px' }}>
                  <p style={{ fontFamily: BD, fontSize: 24, fontStyle: 'italic', fontWeight: 400, color: '#EDE4D3', lineHeight: 1, marginBottom: 7 }}>{cat.nombre}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 9, color: C.sand, letterSpacing: '0.28em', textTransform: 'uppercase' }}>{cat.count} piezas</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCT — luxury editorial split ── */}
      <section style={{ backgroundColor: C.surface, borderTop: '1px solid ' + C.line, borderBottom: '1px solid ' + C.line }}>
        <div
          className="v2-featured-grid"
          style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', minHeight: '82vh' }}
        >
          {/* Image */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img
              src={featured.imagenes[0]}
              alt={featured.nombre}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '500px', transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute', top: 24, left: 24,
              backgroundColor: C.accent, color: '#EDE4D3',
              fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase',
              padding: '8px 16px',
            }}>
              Destacado
            </div>
          </div>

          {/* Content */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(52px, 6vw, 100px) clamp(40px, 5vw, 80px)',
          }}>
            <FadeIn delay={0.1}>
              <p style={{ color: C.label, fontSize: 10, letterSpacing: '0.42em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 28 }}>
                Producto destacado
              </p>
              <h2 style={{ fontFamily: BD, color: C.text, fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 0.92, fontWeight: 700, marginBottom: 6 }}>
                Mesa Nogal
              </h2>
              <h2 style={{ fontFamily: BD, color: C.accent, fontSize: 'clamp(42px, 5vw, 72px)', lineHeight: 0.92, fontStyle: 'italic', fontWeight: 400, marginBottom: 40 }}>
                XL
              </h2>

              <div style={{ width: 40, height: 1, backgroundColor: C.accent, marginBottom: 36 }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 16px', marginBottom: 40 }}>
                <div>
                  <p style={{ color: C.label, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 5 }}>Material</p>
                  <p style={{ color: C.text, fontSize: 14, fontFamily: 'var(--font-body)' }}>{featured.material}</p>
                </div>
                <div>
                  <p style={{ color: C.label, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 5 }}>Dimensiones</p>
                  <p style={{ color: C.text, fontSize: 14, fontFamily: 'var(--font-body)' }}>{featured.dimensiones}</p>
                </div>
                <div>
                  <p style={{ color: C.label, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 5 }}>Categoría</p>
                  <p style={{ color: C.text, fontSize: 14, fontFamily: 'var(--font-body)' }}>{featured.categoria}</p>
                </div>
                <div>
                  <p style={{ color: C.label, fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 5 }}>Acabado</p>
                  <p style={{ color: C.text, fontSize: 14, fontFamily: 'var(--font-body)' }}>Natural mate</p>
                </div>
              </div>

              <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.85, marginBottom: 48, maxWidth: 380 }}>
                Nogal macizo seleccionado, con líneas contemporáneas y acabado natural mate
                que resalta las venas únicas de cada pieza. Disponible a medida.
              </p>

              <Link
                to="/catalogo"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 14,
                  backgroundColor: C.text, color: '#EDE4D3',
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
                  padding: '15px 36px', textDecoration: 'none', alignSelf: 'flex-start',
                  transition: 'background-color 0.35s',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = C.accent}
                onMouseOut={e => e.currentTarget.style.backgroundColor = C.text}
              >
                Ver en catálogo →
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 5. CATALOG PREVIEW ── */}
      <section style={{ backgroundColor: C.bg, paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
        <div className="container-main">
          <FadeIn style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: C.label, fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
                Proyectos y productos
              </p>
              <h2 style={{ fontFamily: BD, color: C.text, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700 }}>Colección</h2>
            </div>
            <Link
              to="/catalogo"
              style={{ color: C.label, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = C.text}
              onMouseOut={e => e.currentTarget.style.color = C.label}
            >
              Ver todo →
            </Link>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8, height: 'clamp(400px, 55vw, 600px)' }}>
            <div style={{ gridRow: '1 / 3' }}>
              <ImageHover src={previewItems[0].imagenes[0]} alt={previewItems[0].nombre} nombre={previewItems[0].nombre} categoria={previewItems[0].categoria} onClick={() => {}} className="w-full h-full" />
            </div>
            {previewItems.slice(1).map((item) => (
              <div key={item.id} style={{ overflow: 'hidden' }}>
                <ImageHover src={item.imagenes[0]} alt={item.nombre} nombre={item.nombre} categoria={item.categoria} onClick={() => {}} className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. STATS — dark editorial break, dramatic contrast ── */}
      <section style={{ backgroundColor: C.dark }}>
        <div className="container-main" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div
            className="v2-stats-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {[
              { num: '80+', label: 'Proyectos completados', sub: 'Residencial · Comercial' },
              { num: '8',   label: 'Años de experiencia',    sub: 'Desde 2016' },
              { num: '3',   label: 'Países de exportación',  sub: 'AR · CL · UY' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  borderRight: i < 2 ? '1px solid rgba(196,168,130,0.18)' : 'none',
                }}>
                  <p style={{ fontFamily: BD, fontSize: 'clamp(64px, 8vw, 100px)', color: '#EDE4D3', lineHeight: 1, marginBottom: 14, fontWeight: 700 }}>{stat.num}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: C.sand, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>{stat.label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(196,168,130,0.45)', letterSpacing: '0.08em' }}>{stat.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. ABOUT — full bleed, overlay conservado ── */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={ABOUT_IMG}
          alt="utropico studio taller"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 640, padding: '0 var(--container-px)' }}>
          <FadeIn>
            <h2 style={{ fontFamily: BD, fontSize: 'clamp(30px, 5vw, 58px)', color: '#EDE4D3', lineHeight: 1.2, fontStyle: 'italic', fontWeight: 400, marginBottom: 24 }}>
              "Cada pieza tiene un origen."
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p style={{ color: 'rgba(237,228,211,0.7)', fontSize: 14, lineHeight: 1.8, marginBottom: 36 }}>
              Somos un estudio especializado en diseño y fabricación de muebles de lujo natural.
              Cada proyecto es una colaboración entre el cliente, el espacio y el material.
            </p>
            <Link
              to="/nosotros"
              style={{ color: '#C4A882', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
              onMouseOut={e => e.currentTarget.style.color = '#C4A882'}
            >
              Nuestra historia →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section style={{ backgroundColor: C.text, textAlign: 'center', padding: 'var(--section-py) var(--container-px)' }}>
        <FadeIn>
          <h2 style={{ fontFamily: BD, color: '#EDE4D3', fontSize: 'clamp(36px, 6.5vw, 86px)', lineHeight: 0.95, fontWeight: 700 }}>
            ¿Tenés un proyecto
          </h2>
          <h2 style={{ fontFamily: BD, color: C.sand, fontSize: 'clamp(36px, 6.5vw, 86px)', lineHeight: 0.95, fontStyle: 'italic', fontWeight: 400, marginBottom: 56 }}>
            en mente?
          </h2>
          <Link
            to="/contacto"
            style={{ display: 'inline-block', border: '1px solid rgba(237,228,211,0.6)', color: '#EDE4D3', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '16px 52px', textDecoration: 'none', transition: 'background-color 0.35s, border-color 0.35s', marginBottom: 52 }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = '#EDE4D3'; e.currentTarget.style.color = '#1A140C'; e.currentTarget.style.borderColor = '#EDE4D3' }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#EDE4D3'; e.currentTarget.style.borderColor = 'rgba(237,228,211,0.6)' }}
          >
            Escribinos
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 32px' }}>
            <a href="https://wa.me/XXXXXXXXXXX" style={{ color: 'rgba(237,228,211,0.4)', fontSize: 13, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.4)'}
            >WhatsApp: +XX XXXX XXXX</a>
            <span style={{ color: 'rgba(237,228,211,0.15)' }}>·</span>
            <a href="mailto:hola@utropicostudio.com" style={{ color: 'rgba(237,228,211,0.4)', fontSize: 13, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.4)'}
            >hola@utropicostudio.com</a>
          </div>
        </FadeIn>
      </section>

    </motion.main>
  )
}
