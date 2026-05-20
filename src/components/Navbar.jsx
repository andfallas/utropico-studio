import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/proceso', label: 'Proceso' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
          paddingLeft: 'var(--container-px)',
          paddingRight: 'var(--container-px)',
          transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
          backgroundColor: isScrolled ? 'rgba(14,12,10,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-line)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            color: 'var(--color-cream)',
            letterSpacing: '0.06em',
            lineHeight: 1,
            textDecoration: 'none',
          }}
        >
          utropico studio
        </Link>

        {/* Desktop nav — controlled via CSS (.nav-desktop) */}
        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              style={({ isActive }) => ({
                position: 'relative',
                fontSize: 13,
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-body)',
                color: isActive ? 'var(--color-cream)' : 'var(--color-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s',
                padding: '10px 0',
              })}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{ position: 'absolute', bottom: 2, left: 0, right: 0, height: 1, backgroundColor: 'var(--color-sand)' }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger — controlled via CSS (.nav-hamburger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="nav-hamburger"
          style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 6, width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <motion.span style={{ display: 'block', width: 24, height: 1, backgroundColor: 'var(--color-cream)', transformOrigin: 'center' }}
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }} transition={{ duration: 0.3 }} />
          <motion.span style={{ display: 'block', width: 24, height: 1, backgroundColor: 'var(--color-cream)' }}
            animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} transition={{ duration: 0.3 }} />
          <motion.span style={{ display: 'block', width: 24, height: 1, backgroundColor: 'var(--color-cream)', transformOrigin: 'center' }}
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }} transition={{ duration: 0.3 }} />
        </button>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.5 }}
                >
                  <NavLink
                    to={link.href}
                    end={link.href === '/'}
                    style={({ isActive }) => ({
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(36px, 8vw, 56px)',
                      lineHeight: 1.2,
                      color: isActive ? 'var(--color-cream)' : 'var(--color-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'block',
                      padding: '8px 0',
                    })}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
