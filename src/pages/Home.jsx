import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ImageHover from '../components/ui/ImageHover'
import RevealText from '../components/ui/RevealText'
import useScrollReveal from '../hooks/useScrollReveal'
import { catalogoItems } from '../data/catalogo'

const HERO_IMG = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90'
const ABOUT_IMG = 'https://images.unsplash.com/photo-1600607687939-ce8a6c349d9e?w=1920&q=80'

const previewItems = catalogoItems.slice(0, 5)

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const visible = useScrollReveal(ref)
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── 1. HERO — full-bleed ── */}
      <section style={{ position: 'relative', height: '100svh', overflow: 'hidden' }}>
        <img
          src={HERO_IMG}
          alt="utropico studio — interiorismo de lujo"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(14,12,10,0.88) 0%, rgba(14,12,10,0.2) 55%, transparent 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute', bottom: 0, left: 0,
            paddingLeft: 'var(--container-px)',
            paddingRight: 'var(--container-px)',
            paddingBottom: 'clamp(48px, 8vh, 96px)',
            maxWidth: '900px',
          }}
        >
          <motion.p
            style={{ color: 'var(--color-sand)', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 24, fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Diseño · Madera · Artesanía
          </motion.p>

          <div style={{ overflow: 'hidden', marginBottom: 4 }}>
            <motion.h1
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)', lineHeight: 1, fontSize: 'clamp(48px, 7vw, 96px)' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Espacios que
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 40 }}>
            <motion.h1
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)', lineHeight: 1, fontSize: 'clamp(48px, 7vw, 96px)', fontStyle: 'italic' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              cuentan historias
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <Link to="/catalogo" className="btn-outline">
              Ver catálogo
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: 40, right: 'var(--container-px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span style={{ color: 'var(--color-muted)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-rl', fontFamily: 'var(--font-body)' }}>
            Scroll
          </span>
          <motion.div
            style={{ width: 1, height: 52, backgroundColor: 'var(--color-sand)', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ── 2. FILOSOFÍA ── */}
      <section className="section-pad">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <FadeIn>
              <span
                className="font-display block select-none leading-none"
                style={{ fontSize: 'clamp(100px, 14vw, 200px)', color: 'var(--color-line)' }}
              >
                01
              </span>
            </FadeIn>

            <div>
              <FadeIn delay={0.1}>
                <p style={{ color: 'var(--color-sand)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 28, fontFamily: 'var(--font-body)' }}>
                  Nuestra filosofía
                </p>
              </FadeIn>
              <RevealText
                className="font-display text-3xl lg:text-4xl text-cream leading-snug"
                style={{ borderLeft: '2px solid var(--color-wood)', paddingLeft: 28 }}
                delay={0.2}
                stagger={0.12}
              >
                {'Cada material tiene memoria.\nCada pieza tiene un origen.\nDiseñamos para durar.'}
              </RevealText>
              <FadeIn delay={0.45}>
                <p style={{ color: 'var(--color-muted)', fontSize: 14, lineHeight: 1.75, maxWidth: 380, marginTop: 32 }}>
                  En utropico studio creemos que los espacios son más que estética —
                  son una extensión de quienes los habitan. Trabajamos con madera, ratán y
                  materiales naturales porque respiran, envejecen con dignidad y cuentan una historia.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CATÁLOGO PREVIEW ── */}
      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container-main">
          <FadeIn style={{ marginBottom: 48 }}>
            <p style={{ color: 'var(--color-sand)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
              Proyectos y productos
            </p>
            <h2 className="font-display text-cream" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>Colección</h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 12, height: 'clamp(400px, 55vw, 600px)' }}>
            <div style={{ gridRow: '1 / 3' }}>
              <ImageHover
                src={previewItems[0].imagenes[0]}
                alt={previewItems[0].nombre}
                nombre={previewItems[0].nombre}
                categoria={previewItems[0].categoria}
                onClick={() => {}}
                className="w-full h-full"
              />
            </div>
            {previewItems.slice(1).map((item) => (
              <div key={item.id} style={{ overflow: 'hidden' }}>
                <ImageHover
                  src={item.imagenes[0]}
                  alt={item.nombre}
                  nombre={item.nombre}
                  categoria={item.categoria}
                  onClick={() => {}}
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          <FadeIn style={{ marginTop: 40, textAlign: 'right' }}>
            <Link
              to="/catalogo"
              style={{ color: 'var(--color-sand)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'color 0.3s', display: 'inline-flex', alignItems: 'center', gap: 12 }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-cream)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-sand)'}
            >
              Ver colección completa <span>→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. PROCESO PREVIEW ── */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container-main">
          <FadeIn style={{ marginBottom: 64 }}>
            <p style={{ color: 'var(--color-sand)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
              Cómo trabajamos
            </p>
            <h2 className="font-display text-cream" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>El proceso</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {[
              { num: '01', title: 'Diseño', desc: 'Escuchamos tu visión y la convertimos en propuestas a medida, adaptadas al espacio y la luz.' },
              { num: '02', title: 'Fabricación', desc: 'Nuestros artesanos trabajan cada pieza con técnicas tradicionales y materiales seleccionados.' },
              { num: '03', title: 'Entrega', desc: 'Coordinamos la instalación y el montaje final para que el resultado sea exactamente lo que imaginaste.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.15}>
                <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: 32 }}>
                  <span className="font-display block leading-none" style={{ fontSize: 64, color: 'var(--color-line)', marginBottom: 20 }}>{step.num}</span>
                  <h3 className="font-display text-cream" style={{ fontSize: 24, marginBottom: 16 }}>{step.title}</h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: 13, lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn style={{ marginTop: 64 }}>
            <Link
              to="/proceso"
              style={{ color: 'var(--color-sand)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-cream)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-sand)'}
            >
              Conocé nuestro proceso completo <span>→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. ABOUT PREVIEW — full-bleed ── */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={ABOUT_IMG}
          alt="utropico studio taller"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 640, padding: '0 var(--container-px)' }}>
          <RevealText
            className="font-display text-cream"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.3, marginBottom: 24 }}
            delay={0}
          >
            "Cada pieza tiene un origen."
          </RevealText>
          <FadeIn delay={0.3}>
            <p style={{ color: 'rgba(237,228,211,0.65)', fontSize: 14, lineHeight: 1.75, marginBottom: 36 }}>
              Somos un estudio especializado en diseño y fabricación de muebles de lujo natural.
              Cada proyecto es una colaboración entre el cliente, el espacio y el material.
            </p>
            <Link
              to="/nosotros"
              style={{ color: 'var(--color-sand)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-cream)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-sand)'}
            >
              Nuestra historia <span>→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── 6. CONTACTO CTA — full-bleed ── */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-wood)', textAlign: 'center', padding: 'var(--section-py) var(--container-px)' }}>
        <FadeIn>
          <h2 className="font-display text-cream" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1 }}>
            ¿Tenés un proyecto
          </h2>
          <h2 className="font-display text-cream" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.1, fontStyle: 'italic', marginBottom: 48 }}>
            en mente?
          </h2>
          <p className="font-display" style={{ fontSize: 32, color: 'rgba(237,228,211,0.75)', marginBottom: 44 }}>Hablemos.</p>
          <Link to="/contacto" className="btn-solid">
            Escribinos
          </Link>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '12px 32px' }}>
            <a href="https://wa.me/XXXXXXXXXXX" style={{ color: 'rgba(237,228,211,0.6)', fontSize: 14, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-cream)'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.6)'}
            >
              WhatsApp: +XX XXXX XXXX
            </a>
            <span style={{ color: 'rgba(237,228,211,0.25)' }}>·</span>
            <a href="mailto:hola@utropicostudio.com" style={{ color: 'rgba(237,228,211,0.6)', fontSize: 14, textDecoration: 'none', fontFamily: 'var(--font-body)', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--color-cream)'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.6)'}
            >
              hola@utropicostudio.com
            </a>
          </div>
        </FadeIn>
      </section>
    </motion.main>
  )
}
