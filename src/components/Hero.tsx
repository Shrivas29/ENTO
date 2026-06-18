'use client'
import { useRef, useEffect, useState } from 'react'
import {
  m,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'

const SERVICES = ['WEB', 'DESIGN', 'AI', 'STRATEGY', 'GROWTH', 'BUILD']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  // Normalized mouse 0→1
  const rawMx = useMotionValue(0.5)
  const rawMy = useMotionValue(0.5)
  // Gentler spring on mobile would be irrelevant; skip parallax for touch
  const mx = useSpring(rawMx, { stiffness: 36, damping: 24 })
  const my = useSpring(rawMy, { stiffness: 36, damping: 24 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const entoOpacity = useTransform(scrollYProgress, [0, 0.42, 0.62], [1, 1, 0])
  const entoY       = useTransform(scrollYProgress, [0.40, 0.65], ['0%', '-12%'])
  const entoScale   = useTransform(scrollYProgress, [0, 0.40, 0.65], [1, 1, 0.88])

  const taglineOpacity = useTransform(scrollYProgress, [0, 0.22, 0.42], [1, 1, 0])

  const svcOpacity = useTransform(scrollYProgress, [0.58, 0.72, 0.92, 1.0], [0, 1, 1, 0])
  const svcY       = useTransform(scrollYProgress, [0.58, 0.72], ['5vh', '0vh'])

  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  // Green juice fill — maps to the full ENTØ sticky window as a scroll progress indicator
  const fillClip = useTransform(scrollYProgress, [0, 0.42], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'])

  // Letter parallax — defined at top level, not in loop
  const eX = useTransform(mx, [0, 1], ['-18px', '18px'])
  const eY = useTransform(my, [0, 1], ['-7px',  '7px'])
  const nX = useTransform(mx, [0, 1], ['-9px',  '9px'])
  const nY = useTransform(my, [0, 1], ['-4px',  '4px'])
  const tX = useTransform(mx, [0, 1], ['9px',  '-9px'])
  const tY = useTransform(my, [0, 1], ['4px',  '-4px'])
  const oX = useTransform(mx, [0, 1], ['18px', '-18px'])
  const oY = useTransform(my, [0, 1], ['7px',  '-7px'])

  const letterProps = [
    { char: 'E', x: eX, y: eY, delay: 0.28 },
    { char: 'N', x: nX, y: nY, delay: 0.36 },
    { char: 'T', x: tX, y: tY, delay: 0.44 },
    { char: 'Ø', x: oX, y: oY, delay: 0.52 },
  ]

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const onMove = (e: MouseEvent) => {
      rawMx.set(e.clientX / window.innerWidth)
      rawMy.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawMx, rawMy, isTouch])

  return (
    <section ref={containerRef} className="relative h-[150vh] md:h-[210vh]" id="hero">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

        {/* Ambient glow — plain div, no JS */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(40,25,70,0.55) 0%, transparent 65%)',
          }}
        />

        {/* ── ENTØ Phase ── */}
        <m.div
          style={{ opacity: entoOpacity, y: entoY, scale: entoScale, willChange: 'transform, opacity' }}
          className="relative flex flex-col items-center"
        >
          <div className="flex items-center" style={{ gap: 'clamp(0.02em, 0.5vw, 0.08em)' }}>
            {letterProps.map(({ char, x, y, delay }) => (
              <m.span
                key={char}
                className="font-display select-none gpu"
                style={{
                  fontSize: 'clamp(3.8rem, 19vw, 22rem)',
                  lineHeight: 0.9,
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  x: isTouch ? 0 : x,
                  y: isTouch ? 0 : y,
                  display: 'inline-block',
                  willChange: 'transform',
                  position: 'relative',
                }}
                initial={{ opacity: 0, y: '70%', clipPath: 'inset(0 0 100% 0)' }}
                animate={mounted ? { opacity: 1, y: '0%', clipPath: 'inset(0 0 0% 0)' } : {}}
                transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Base cream letter */}
                <span style={{ color: '#F0EDE8', display: 'block' }}>{char}</span>
                {/* Green juice fill — rises from bottom on scroll */}
                <m.span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    color: '#C8FF57',
                    clipPath: fillClip,
                    display: 'block',
                    pointerEvents: 'none',
                  }}
                >
                  {char}
                </m.span>
              </m.span>
            ))}
          </div>

          {/* Tagline */}
          <m.div
            style={{ opacity: taglineOpacity }}
            className="flex items-center gap-4 mt-5 md:mt-7"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-block h-px bg-[#F0EDE8]/25" style={{ width: 'clamp(1.5rem, 3vw, 3rem)' }} />
            <span className="font-body text-[10px] md:text-xs tracking-[0.3em] text-[#F0EDE8]/45 uppercase">
              Creative Intelligence Studio
            </span>
            <span className="inline-block h-px bg-[#F0EDE8]/25" style={{ width: 'clamp(1.5rem, 3vw, 3rem)' }} />
          </m.div>
        </m.div>

        {/* ── Services Phase ── */}
        <m.div
          style={{ opacity: svcOpacity, y: svcY, willChange: 'transform, opacity' }}
          className="absolute inset-x-0 flex flex-col items-center justify-center px-6"
          aria-hidden
        >
          <div className="flex flex-wrap items-baseline justify-center leading-none">
            {SERVICES.map((svc, i) => (
              <span
                key={svc}
                className="font-display font-bold text-[#F0EDE8] select-none"
                style={{
                  fontSize: 'clamp(2.8rem, 8.5vw, 10rem)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.05,
                  padding: '0 clamp(0.15rem, 0.5vw, 0.4rem)',
                }}
              >
                {i > 0 && (
                  <span className="text-[#C8FF57]" style={{ fontSize: '0.28em', verticalAlign: 'middle', margin: '0 0.15em' }}>
                    ·
                  </span>
                )}
                {svc}
              </span>
            ))}
          </div>
          <p className="font-body text-[10px] md:text-[11px] tracking-[0.3em] text-[#F0EDE8]/35 uppercase mt-6">
            Six Disciplines. One Vision.
          </p>
        </m.div>

        {/* Side labels */}
        <m.div
          className="absolute left-5 md:left-8 bottom-1/2 translate-y-1/2 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-body text-[9px] tracking-[0.28em] text-[#F0EDE8]/22 uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Est. 2026
          </span>
          <span className="w-px h-10 bg-[#F0EDE8]/12 block" />
        </m.div>

        <m.div
          className="absolute right-5 md:right-8 bottom-1/2 translate-y-1/2 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="w-px h-10 bg-[#F0EDE8]/12 block" />
          <span className="font-body text-[9px] tracking-[0.28em] text-[#F0EDE8]/22 uppercase" style={{ writingMode: 'vertical-rl' }}>
            Founder — Shrivas
          </span>
        </m.div>

        {/* Scroll cue */}
        <m.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="font-body text-[9px] tracking-[0.35em] text-[#F0EDE8]/28 uppercase">Scroll</span>
          <m.div
            className="w-px bg-gradient-to-b from-[#C8FF57]/60 to-transparent gpu"
            style={{ height: 36 }}
            animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          />
        </m.div>

        {/* Accent dot */}
        <m.div
          className="absolute"
          style={{ top: '50%', left: '50%', translateX: '-50%', translateY: '8rem' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.5, ease: 'backOut' }}
        >
          <span className="inline-block rounded-full bg-[#C8FF57]" style={{ width: 4, height: 4 }} />
        </m.div>
      </div>
    </section>
  )
}
