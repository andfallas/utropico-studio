import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SERIF = "'Fraunces', 'Georgia', serif"
const SANS  = "'DM Sans', system-ui, sans-serif"
const P = { dark: '#1A1A18', muted: '#7A7974', border: '#E8E4DE', bg: '#FAF8F5' }

const NAV_LINKS = [
  { to: '/',         label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= breakpoint)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [breakpoint])
  return isMobile
}

export default function NavbarInner() {
  const { pathname } = useLocation()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: `1px solid ${P.border}`,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 48px)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* ── MOBILE ── */}
          {isMobile ? (
            <>
              {/* Logo */}
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 900, color: P.dark, letterSpacing: '-0.02em' }}>
                  utropico
                </span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setOpen(o => !o)}
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', color: P.dark }}
              >
                {open ? (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="18" x2="19" y2="18"/>
                  </svg>
                )}
              </button>
            </>
          ) : (

          /* ── DESKTOP ── */
            <>
              {/* Left: links */}
              <nav style={{ display: 'flex', gap: 28, alignItems: 'center', flex: 1 }}>
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} style={{
                    fontFamily: SANS, fontSize: 14,
                    color: pathname === to ? P.dark : P.muted,
                    fontWeight: pathname === to ? 600 : 400,
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                    onMouseOver={e => e.currentTarget.style.color = P.dark}
                    onMouseOut={e => e.currentTarget.style.color = pathname === to ? P.dark : P.muted}
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Center: logo */}
              <Link to="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 900, color: P.dark, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  utropico
                </span>
              </Link>

              {/* Right: lang switch + button */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
                <LangSwitch />
                <Link to="/contacto" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 20px',
                  backgroundColor: P.dark, color: '#FFFFFF',
                  borderRadius: 6, fontFamily: SANS,
                  fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', letterSpacing: '0.03em',
                  transition: 'opacity 0.2s',
                }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  Contacto
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M2 7H12M8 3l4 4-4 4"/>
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      {isMobile && open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
          padding: '40px clamp(24px, 6vw, 40px) 40px',
          borderTop: `1px solid ${P.border}`,
          overflowY: 'auto',
        }}>
          {/* Links */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                fontFamily: SANS,
                fontSize: 'clamp(22px, 6vw, 32px)',
                fontWeight: 600,
                color: pathname === to ? P.dark : '#C8C4BE',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                lineHeight: 1,
                padding: '18px 0',
                borderBottom: `1px solid ${P.border}`,
                transition: 'color 0.15s',
              }}
                onMouseOver={e => e.currentTarget.style.color = P.dark}
                onMouseOut={e => e.currentTarget.style.color = pathname === to ? P.dark : '#C8C4BE'}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Lang + CTA */}
          <div style={{ paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LangSwitch />
            </div>
            <Link to="/contacto" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '16px 24px',
              backgroundColor: P.dark, color: '#FFFFFF',
              borderRadius: 6, fontFamily: SANS,
              fontSize: 13, fontWeight: 700,
              textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Hablemos
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 7H12M8 3l4 4-4 4"/>
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

function LangSwitch() {
  const [lang, setLang] = useState('ES')
  const other = lang === 'ES' ? 'EN' : 'ES'
  return (
    <button
      onClick={() => setLang(other)}
      style={{
        fontFamily: SANS, fontSize: 11, fontWeight: 500,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: P.muted, background: 'none', border: 'none',
        cursor: 'pointer', padding: 0,
        transition: 'color 0.2s ease',
      }}
      onMouseOver={e => e.currentTarget.style.color = P.dark}
      onMouseOut={e => e.currentTarget.style.color = P.muted}
    >
      {other}
    </button>
  )
}
