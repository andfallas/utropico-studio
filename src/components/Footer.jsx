import { Link } from 'react-router-dom'

const FOOTER_BG = '/images/footer-bg.jpg'

const navLinks = [
  { href: '/',          label: 'Inicio' },
  { href: '/catalogo',  label: 'Catálogo' },
  { href: '/nosotros',  label: 'Nosotros' },
  { href: '/contacto',  label: 'Contacto' },
]

const categories = [
  { href: '/catalogo', label: 'Sala de estar' },
  { href: '/catalogo', label: 'Comedor' },
  { href: '/catalogo', label: 'Dormitorio' },
  { href: '/catalogo', label: 'Estudio' },
  { href: '/catalogo', label: 'Exterior' },
]

const LABEL = {
  fontFamily: 'var(--font-body)',
  fontSize: 9,
  letterSpacing: '0.38em',
  textTransform: 'uppercase',
  color: 'rgba(196,168,130,0.65)',
  marginBottom: 22,
}

const LINK_STYLE = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  color: 'rgba(237,228,211,0.62)',
  textDecoration: 'none',
  transition: 'color 0.3s',
}

const FOOTER_STYLES = `
  @media (max-width: 1023px) {
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 599px) {
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .footer-logo { font-size: clamp(40px, 12vw, 72px) !important; }
  }
  @media (max-width: 399px) {
    .footer-grid { grid-template-columns: 1fr !important; }
  }
`

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />

      {/* Background image */}
      <img
        src={FOOTER_BG}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 40%',
          userSelect: 'none',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(4,10,5,0.82) 0%, rgba(2,8,3,0.92) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ── Logo premium ── */}
        <div
          className="container-main"
          style={{
            paddingTop: 'clamp(64px, 10vh, 100px)',
            paddingBottom: 'clamp(40px, 6vh, 64px)',
            borderBottom: '1px solid rgba(196,168,130,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 20,
          }}
        >
          {/* Decorative top line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
            <div style={{ width: 36, height: 1, backgroundColor: 'rgba(196,168,130,0.4)' }} />
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 9,
              letterSpacing: '0.42em', textTransform: 'uppercase',
              color: 'rgba(196,168,130,0.5)',
            }}>
              utropico studio
            </span>
          </div>

          {/* Large tagline */}
          <h2
            className="footer-logo"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(52px, 8vw, 112px)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.0,
              color: '#EDE4D3',
              letterSpacing: '-0.01em',
            }}
          >
            Cada espacio,<br />una historia.
          </h2>
        </div>

        {/* ── 4-column grid ── */}
        <div
          className="container-main footer-grid"
          style={{
            paddingTop: 'clamp(48px, 7vh, 72px)',
            paddingBottom: 64,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px 32px',
            borderBottom: '1px solid rgba(196,168,130,0.12)',
          }}
        >
          {/* Navegación */}
          <div>
            <p style={LABEL}>Navegación</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={LINK_STYLE}
                    onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.62)'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <p style={LABEL}>Categorías</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    to={cat.href}
                    style={LINK_STYLE}
                    onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
                    onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.62)'}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p style={LABEL}>Contacto</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <a
                href="https://wa.me/XXXXXXXXXXX"
                style={LINK_STYLE}
                onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.62)'}
              >
                WhatsApp: +XX XXXX XXXX
              </a>
              <a
                href="mailto:hola@utropicostudio.com"
                style={LINK_STYLE}
                onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.62)'}
              >
                hola@utropicostudio.com
              </a>
            </div>
          </div>

          {/* Redes */}
          <div>
            <p style={LABEL}>Redes</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <a
                href="https://instagram.com/utropicostudio"
                target="_blank" rel="noopener noreferrer"
                style={LINK_STYLE}
                onMouseOver={e => e.currentTarget.style.color = '#EDE4D3'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(237,228,211,0.62)'}
              >
                @utropicostudio
              </a>
            </div>
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div
          className="container-main"
          style={{
            paddingTop: 22, paddingBottom: 32,
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 17,
            fontStyle: 'italic',
            color: 'rgba(237,228,211,0.45)',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}>
            utropico studio
          </span>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11,
            color: 'rgba(196,168,130,0.35)', letterSpacing: '0.04em',
          }}>
            © 2025 · Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  )
}
