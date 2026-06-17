'use client'
import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <m.header
        className="fixed top-0 left-0 right-0 z-[200]"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="flex items-center justify-between px-6 py-5 md:px-10 transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(6,6,6,0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(24,24,24,0.8)' : '1px solid transparent',
          }}
        >
          {/* Wordmark */}
          <a
            href="#"
            className="font-display font-bold text-sm tracking-[0.18em] text-[#F0EDE8] relative group"
          >
            ENTØ
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C8FF57] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-[10px] font-medium tracking-[0.18em] text-[#F0EDE8]/50 hover:text-[#F0EDE8] transition-colors duration-200 uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C8FF57] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-[#060606] bg-[#C8FF57] px-4 py-2 hover:bg-[#F0EDE8] transition-colors duration-200"
            >
              Start a Project
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden font-body text-[10px] font-semibold tracking-[0.2em] text-[#F0EDE8]/60 hover:text-[#F0EDE8] transition-colors uppercase"
              aria-label="Toggle navigation"
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </m.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            className="fixed inset-0 z-[199] bg-[#060606] flex flex-col justify-between px-6 py-20"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-1 mt-8">
              {NAV_LINKS.map((link, i) => (
                <m.a
                  key={link.label}
                  href={link.href}
                  className="font-display font-bold text-[#F0EDE8] active:text-[#C8FF57] transition-colors duration-200 py-3 block"
                  style={{ fontSize: 'clamp(2.5rem, 11vw, 4.5rem)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </m.a>
              ))}
              <m.a
                href="#contact"
                className="mt-6 inline-flex items-center gap-3 font-body font-semibold text-xs tracking-[0.18em] uppercase text-[#060606] bg-[#C8FF57] px-6 py-4 self-start"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
              >
                Start a Project
              </m.a>
            </div>
            <m.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <span className="font-body text-xs tracking-[0.2em] text-[#F0EDE8]/30 uppercase">
                Creative Intelligence Studio
              </span>
              <span className="font-body text-xs text-[#F0EDE8]/20">
                shrivasvm@gmail.com
              </span>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
