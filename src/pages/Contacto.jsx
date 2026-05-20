import { useState } from 'react'
import { motion } from 'framer-motion'

const P = { bg: '#FAF8F5', dark: '#1A1A18', muted: '#7A7974', border: '#E8E4DE', card: '#F0EDE8' }
const SERIF = "'Fraunces', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

const INFO = [
  {
    label: 'Email',
    valor: 'hola@utropicostudio.com',
    href: 'mailto:hola@utropicostudio.com',
  },
  {
    label: 'WhatsApp',
    valor: '+506 8888 0000',
    href: 'https://wa.me/50688880000',
  },
  {
    label: 'Ubicación',
    valor: 'San José, Costa Rica',
    href: null,
  },
  {
    label: 'Horario',
    valor: 'Lunes a viernes · 9am – 6pm',
    href: null,
  },
]

export default function Contacto() {
  const [form, setForm]       = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setEnviando(true)
    setTimeout(() => { setEnviando(false); setEnviado(true) }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4 }}
      style={{ backgroundColor: P.bg, minHeight: '100vh', fontFamily: SANS }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .contacto-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(48px, 8vw, 96px);
          align-items: start;
        }
        @media (max-width: 860px) { .contacto-grid { grid-template-columns: 1fr; } }

        .form-input {
          width: 100%;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px;
          color: #1A1A18;
          background: transparent;
          border: none;
          border-bottom: 1px solid #E8E4DE;
          padding: 12px 0;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
          -webkit-appearance: none;
          border-radius: 0;
        }
        .form-input::placeholder { color: #B0ACA7; }
        .form-input:focus { border-bottom-color: #1A1A18; }

        textarea.form-input {
          resize: none;
          min-height: 120px;
          line-height: 1.6;
        }

        .form-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A7974;
          display: block;
          margin-bottom: 4px;
        }

        .submit-btn {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #FAF8F5;
          background: #1A1A18;
          border: none;
          padding: 14px 28px;
          cursor: pointer;
          transition: opacity 0.2s ease;
          width: 100%;
          border-radius: 6px;
        }
        .submit-btn:hover { opacity: 0.8; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .info-link {
          color: #1A1A18;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .info-link:hover { opacity: 0.6; }

        @media (max-width: 768px) {
          .contacto-cta a, .contacto-cta button {
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
          Contacto
        </p>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: P.dark, lineHeight: 1.08, letterSpacing: '-0.025em', margin: '0 0 20px' }}>
          Hablemos.
        </h1>
        <p style={{ fontFamily: SANS, fontSize: 15, color: P.muted, margin: 0, maxWidth: 480, lineHeight: 1.65 }}>
          Contanos tu proyecto y te respondemos en menos de 24 horas. Sin compromiso.
        </p>
      </div>

      {/* ── MAIN ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px, 9vh, 96px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 120px)' }}>
        <div className="contacto-grid">

          {/* ── FORM ── */}
          <motion.div {...fade(0)}>
            {!enviado ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div>
                    <label className="form-label" htmlFor="nombre">Nombre</label>
                    <input
                      id="nombre" name="nombre" type="text"
                      className="form-input" placeholder="Tu nombre"
                      value={form.nombre} onChange={handleChange} required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email"
                      className="form-input" placeholder="tu@email.com"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="telefono">Teléfono <span style={{ fontWeight: 400, letterSpacing: 0, textTransform: 'none', fontSize: 11, color: P.muted }}>(opcional)</span></label>
                  <input
                    id="telefono" name="telefono" type="tel"
                    className="form-input" placeholder="+506 0000 0000"
                    value={form.telefono} onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje" name="mensaje"
                    className="form-input" placeholder="Contanos sobre tu espacio o el mueble que tenés en mente…"
                    value={form.mensaje} onChange={handleChange} required
                  />
                </div>

                <div>
                  <button type="submit" className="submit-btn" disabled={enviando}>
                    {enviando ? 'Enviando…' : 'Enviar mensaje'}
                  </button>
                  <p style={{ fontFamily: SANS, fontSize: 11, color: P.muted, margin: '12px 0 0', letterSpacing: '0.03em' }}>
                    Te respondemos en menos de 24 horas hábiles.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ padding: 'clamp(40px, 6vh, 64px) 0' }}
              >
                <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: P.muted, marginBottom: 20 }}>
                  Mensaje enviado
                </p>
                <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 900, color: P.dark, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
                  Gracias, {form.nombre || 'por escribirnos'}.
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 15, color: P.muted, lineHeight: 1.7, margin: '0 0 32px' }}>
                  Recibimos tu mensaje y te vamos a responder a <strong style={{ color: P.dark }}>{form.email}</strong> en las próximas 24 horas.
                </p>
                <div className="contacto-cta">
                <button
                  onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', telefono: '', mensaje: '' }) }}
                  style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: P.dark, background: 'none', border: `1.5px solid ${P.border}`, padding: '14px 28px', cursor: 'pointer', transition: 'border-color 0.2s ease', borderRadius: 6 }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = P.dark}
                  onMouseLeave={e => e.currentTarget.style.borderColor = P.border}
                >
                  Enviar otro mensaje
                </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── INFO ── */}
          <motion.div {...fade(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ borderTop: `1px solid ${P.border}` }}>
              {INFO.map((item, i) => (
                <div key={item.label} style={{ borderBottom: `1px solid ${P.border}`, padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: P.muted }}>
                    {item.label}
                  </span>
                  {item.href ? (
                    <a href={item.href} className="info-link" style={{ fontFamily: SANS, fontSize: 15, color: P.dark, lineHeight: 1.4 }}>
                      {item.valor}
                    </a>
                  ) : (
                    <span style={{ fontFamily: SANS, fontSize: 15, color: P.dark, lineHeight: 1.4 }}>
                      {item.valor}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <p style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: P.muted, marginBottom: 16 }}>
                Redes
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { red: 'Instagram', url: 'https://instagram.com/utropicostudio' },
                  { red: 'Pinterest',  url: 'https://pinterest.com/utropicostudio' },
                ].map(s => (
                  <a key={s.red} href={s.url} target="_blank" rel="noopener noreferrer" className="info-link"
                    style={{ fontFamily: SANS, fontSize: 14, color: P.dark, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {s.red}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.4 }}>
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 48, padding: 28, backgroundColor: P.card }}>
              <p style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, color: P.dark, margin: '0 0 10px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                ¿Preferís hablar por WhatsApp?
              </p>
              <p style={{ fontFamily: SANS, fontSize: 13, color: P.muted, margin: '0 0 20px', lineHeight: 1.6 }}>
                También podés escribirnos directamente y te respondemos lo antes posible.
              </p>
              <div className="contacto-cta">
              <a href="https://wa.me/50688880000"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', color: P.bg, backgroundColor: P.dark, padding: '14px 28px', textDecoration: 'none', transition: 'opacity 0.2s ease', borderRadius: 6 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Abrir WhatsApp
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12L12 2M12 2H5M12 2V9"/>
                </svg>
              </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
