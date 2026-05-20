import { motion } from 'framer-motion'

const P = { bg: '#FAF8F5', dark: '#1A1A18', muted: '#7A7974', border: '#E8E4DE', card: '#F0EDE8' }
const SERIF = "'Fraunces', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const EQUIPO = [
  {
    nombre: 'Andrea Mora',
    rol: 'Fundadora · Dirección Creativa',
    bio: 'Diseñadora con 12 años de experiencia en interiorismo de lujo. Convirtió su pasión por los materiales naturales en Utropico Studio.',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=85',
  },
  {
    nombre: 'Sebastián Rojas',
    rol: 'Director de Diseño',
    bio: 'Arquitecto de formación, diseñador de muebles por vocación. Cada pieza que sale del taller lleva su sello conceptual.',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85',
  },
  {
    nombre: 'Marco Jiménez',
    rol: 'Maestro Ebanista',
    bio: '25 años trabajando la madera. Aprendió el oficio con su padre y hoy lidera el taller con una precisión artesanal que no admite atajos.',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=85',
  },
]

const PROCESO = [
  { n: '01', titulo: 'Escuchamos', texto: 'Entendemos tu espacio, tu vida cotidiana y lo que buscás sentir en él. Sin plantillas ni soluciones genéricas.' },
  { n: '02', titulo: 'Diseñamos', texto: 'Creamos la pieza desde cero, pensada exactamente para el lugar donde va a vivir. Cada ángulo tiene una razón.' },
  { n: '03', titulo: 'Producimos', texto: 'Cada mueble se trabaja a mano en nuestro taller en Costa Rica, con materiales seleccionados uno por uno.' },
  { n: '04', titulo: 'Entregamos', texto: 'Instalamos en tu espacio y ajustamos hasta que todo esté en su lugar. El proceso no termina hasta que vos estés conforme.' },
]

const MATERIALES = [
  { nombre: 'Nogal',  desc: 'Venas profundas, calidez oscura. Una madera que envejece con carácter.' },
  { nombre: 'Teca',   desc: 'Alta durabilidad natural. Resistente a la humedad y al paso del tiempo.' },
  { nombre: 'Ratán',  desc: 'Liviano, sostenible y trenzado a mano. Define la estética tropical premium.' },
  { nombre: 'Lino',   desc: 'Tejido natural que respira. Textura honesta, paleta neutra y atemporal.' },
  { nombre: 'Roble',  desc: 'Estructura y elegancia. Grano abierto que acepta cualquier acabado.' },
  { nombre: 'Cuero',  desc: 'Envejece con dignidad. Cada marca es parte de su historia.' },
]

export default function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4 }}
      style={{ backgroundColor: P.bg, minHeight: '100vh', fontFamily: SANS }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .about-story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px, 8vw, 96px);
          align-items: start;
        }
        @media (max-width: 768px) { .about-story-grid { grid-template-columns: 1fr; } }

        .taller-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          grid-template-rows: auto auto;
          gap: 6px;
          height: clamp(360px, 55vh, 560px);
        }
        .taller-grid .tall { grid-row: 1 / 3; }
        @media (max-width: 640px) {
          .taller-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 300px 200px 200px;
            height: auto;
          }
          .taller-grid .tall { grid-row: auto; }
        }

        .equipo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 4vw, 40px);
        }
        @media (max-width: 860px) { .equipo-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .equipo-grid { grid-template-columns: 1fr; } }

        .proceso-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) { .proceso-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .proceso-grid { grid-template-columns: 1fr; } }

        .mat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) { .mat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .mat-grid { grid-template-columns: 1fr; } }

        @media (max-width: 768px) {
          .about-cta-wrap a, .about-cta-wrap button {
            display: flex !important; width: 100% !important;
            justify-content: center !important; box-sizing: border-box !important;
          }
        }
      `}} />

      {/* ── HEADER ── */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(64px, 10vh, 100px) clamp(24px, 5vw, 64px) clamp(40px, 6vh, 64px)',
        borderBottom: `1px solid ${P.border}`,
      }}>
        <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 16 }}>
          Nosotros
        </p>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: P.dark, lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
          Quiénes somos.
        </h1>
      </div>

      {/* ── INTRO STORY ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px)', borderBottom: `1px solid ${P.border}` }}>
        <div className="about-story-grid">
          <motion.div {...fade(0)}>
            <p style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 700, color: P.dark, lineHeight: 1.25, letterSpacing: '-0.015em', margin: 0 }}>
              "Creemos que los muebles que usás cada día merecen ser bellos, honestos y hechos para durar generaciones."
            </p>
          </motion.div>
          <motion.div {...fade(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontFamily: SANS, fontSize: 15, color: '#4A4A48', lineHeight: 1.75, margin: 0 }}>
              Utropico Studio nació de esa convicción. Somos un estudio de diseño y producción de muebles artesanales con sede en Costa Rica. Cada pieza que hacemos empieza con una conversación y termina en tu espacio.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 15, color: '#4A4A48', lineHeight: 1.75, margin: 0 }}>
              No trabajamos con líneas de producción masiva. Seleccionamos los materiales uno por uno, diseñamos a medida y producimos a mano en nuestro propio taller. El resultado son piezas con carácter propio, que envejecen con dignidad.
            </p>
            <p style={{ fontFamily: SANS, fontSize: 15, color: '#4A4A48', lineHeight: 1.75, margin: 0 }}>
              Trabajamos con arquitectos, diseñadores de interiores y clientes directos que entienden que un buen mueble es también una inversión en calidad de vida.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── GALERÍA TALLER ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(40px, 6vh, 64px) clamp(24px, 5vw, 64px)', borderBottom: `1px solid ${P.border}` }}>
        <motion.div {...fade(0)} className="taller-grid">
          <div className="tall" style={{ overflow: 'hidden', backgroundColor: P.card }}>
            <img
              src="/images/taller-1.jpg"
              alt="Artesano trabajando en el taller"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ overflow: 'hidden', backgroundColor: P.card }}>
            <img
              src="/images/taller-2.jpg"
              alt="Detalle de trabajo en madera"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ overflow: 'hidden', backgroundColor: P.card }}>
            <img
              src="/images/taller-3.jpg"
              alt="Manos trabajando la madera"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease', cursor: 'default' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </motion.div>
      </div>

      {/* ── HECHO A MANO ── */}
      <div style={{ backgroundColor: P.dark, padding: 'clamp(64px, 10vh, 110px) clamp(24px, 5vw, 64px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.p {...fade(0)} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,248,245,0.45)', marginBottom: 16 }}>
            Filosofía
          </motion.p>
          <motion.h2 {...fade(0.05)} style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, color: P.bg, lineHeight: 1.08, letterSpacing: '-0.025em', margin: '0 0 clamp(48px, 7vh, 72px)', maxWidth: 720 }}>
            Hecho a mano.
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(32px, 5vw, 56px)' }}>
            {[
              { titulo: 'Materiales nobles', texto: 'Solo usamos maderas y materiales naturales seleccionados por su calidad, durabilidad y carácter visual. Nada que no pueda envejecer con belleza.' },
              { titulo: 'Sin atajos', texto: 'Cada unión, cada acabado y cada detalle se trabaja con el tiempo que merece. La velocidad nunca es el objetivo; la permanencia, sí.' },
              { titulo: 'Diseño con propósito', texto: 'Cada línea en un diseño tiene una razón funcional o visual. No diseñamos decoración: diseñamos objetos que mejoran la experiencia de vivir.' },
            ].map((v, i) => (
              <motion.div key={v.titulo} {...fade(i * 0.08)} style={{ borderTop: '1px solid rgba(250,248,245,0.15)', paddingTop: 28 }}>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 700, color: P.bg, margin: '0 0 14px', letterSpacing: '-0.01em' }}>{v.titulo}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: 'rgba(250,248,245,0.6)', lineHeight: 1.7, margin: 0 }}>{v.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROCESO ── */}
      <div style={{ borderBottom: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px) 0' }}>
          <motion.p {...fade(0)} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 16 }}>Proceso</motion.p>
          <motion.h2 {...fade(0.05)} style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 clamp(40px, 6vh, 64px)' }}>
            Cómo trabajamos.
          </motion.h2>
        </div>
        <div className="proceso-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {PROCESO.map((step, i) => (
            <motion.div key={step.n} {...fade(i * 0.07)}
              style={{ padding: 'clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px) clamp(40px, 6vh, 56px)', borderRight: i < PROCESO.length - 1 ? `1px solid ${P.border}` : 'none', borderTop: `1px solid ${P.border}` }}>
              <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: P.muted, margin: '0 0 24px' }}>{step.n}</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 700, color: P.dark, margin: '0 0 14px', letterSpacing: '-0.01em' }}>{step.titulo}</h3>
              <p style={{ fontFamily: SANS, fontSize: 14, color: P.muted, lineHeight: 1.7, margin: 0 }}>{step.texto}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── EQUIPO ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px)', borderBottom: `1px solid ${P.border}` }}>
        <motion.p {...fade(0)} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 16 }}>
          El equipo
        </motion.p>
        <motion.h2 {...fade(0.05)} style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 clamp(40px, 6vh, 56px)' }}>
          Las personas detrás de cada pieza.
        </motion.h2>
        <div className="equipo-grid">
          {EQUIPO.map((persona, i) => (
            <motion.div key={persona.nombre} {...fade(i * 0.1)}>
              <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: P.card, marginBottom: 20 }}>
                <img
                  src={persona.foto}
                  alt={persona.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.7s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: P.dark, margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                {persona.nombre}
              </h3>
              <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: P.muted, margin: '0 0 12px' }}>
                {persona.rol}
              </p>
              <p style={{ fontFamily: SANS, fontSize: 13, color: P.muted, lineHeight: 1.65, margin: 0 }}>
                {persona.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── MATERIALES ── */}
      <div style={{ borderBottom: `1px solid ${P.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px) 0' }}>
          <motion.p {...fade(0)} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 16 }}>Materiales</motion.p>
          <motion.h2 {...fade(0.05)} style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 clamp(40px, 6vh, 64px)' }}>
            Lo que elegimos.
          </motion.h2>
        </div>
        <div className="mat-grid" style={{ maxWidth: 1280, margin: '0 auto' }}>
          {MATERIALES.map((m, i) => (
            <motion.div key={m.nombre} {...fade(i * 0.06)}
              style={{ padding: 'clamp(28px, 4vw, 40px)', borderTop: `1px solid ${P.border}`, borderRight: (i % 3 !== 2) ? `1px solid ${P.border}` : 'none' }}>
              <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: P.dark, margin: '0 0 10px', letterSpacing: '-0.01em' }}>{m.nombre}</h3>
              <p style={{ fontFamily: SANS, fontSize: 13, color: P.muted, lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ backgroundColor: P.card, padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px)', textAlign: 'center' }}>
        <motion.p {...fade(0)} style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 20 }}>
          ¿Tenés un proyecto?
        </motion.p>
        <motion.h2 {...fade(0.05)} style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 32px' }}>
          Hablemos.
        </motion.h2>
        <motion.div {...fade(0.1)} className="about-cta-wrap">
          <a href="/contacto"
            style={{ display: 'inline-flex', alignItems: 'center', fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: P.bg, backgroundColor: P.dark, padding: '14px 28px', textDecoration: 'none', transition: 'opacity 0.2s ease', borderRadius: 6 }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            Contacto
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
