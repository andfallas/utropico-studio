import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Footer from './components/Footer'
import NavbarInner from './components/NavbarInner'
import GrainOverlay from './components/ui/GrainOverlay'
import CursorFollow from './components/ui/CursorFollow'
import HomeV5 from './pages/HomeV5'
import Catalogo from './pages/Catalogo'
import AboutUs from './pages/AboutUs'
import Contacto from './pages/Contacto'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      <GrainOverlay />
      <CursorFollow />

      <AnimatePresence>
        {isLoading && (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <a href="#main-content" className="skip-link">Saltar al contenido</a>
          <NavbarInner />
          <div id="main-content" tabIndex={-1} style={{ outline: 'none' }}>
            <AnimatePresence mode="wait" onExitComplete={() => { document.documentElement.scrollTop = 0 }}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomeV5 />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/nosotros" element={<AboutUs />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </AnimatePresence>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}
