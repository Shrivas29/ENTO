'use client'
import { useEffect, useState } from 'react'
import { m, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type CursorMode = 'default' | 'text' | 'button' | 'explore' | 'hidden'

// Scale factors relative to base ring size (38px)
const RING_BASE = 38
const RING_SCALE: Record<CursorMode, number> = {
  default: 1,
  text:    1.2,
  button:  1.52,
  explore: 3.16,   // 120px / 38
  hidden:  0,
}

export function Cursor() {
  const [mode, setMode]     = useState<CursorMode>('default')
  const [label, setLabel]   = useState('')
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Dot: tight spring (near-instant)
  const dotX = useSpring(mx, { damping: 55, stiffness: 950, mass: 0.06 })
  const dotY = useSpring(my, { damping: 55, stiffness: 950, mass: 0.06 })
  // Ring: looser spring (lags behind for depth feel)
  const ringX = useSpring(mx, { damping: 28, stiffness: 190, mass: 0.55 })
  const ringY = useSpring(my, { damping: 28, stiffness: 190, mass: 0.55 })

  useEffect(() => {
    // Skip cursor completely on touch devices — saves all cursor JS cost
    if (window.matchMedia('(hover: none)').matches) {
      setIsTouch(true)
      return
    }

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mx, my, visible])

  useEffect(() => {
    if (isTouch) return
    const detect = (e: MouseEvent) => {
      const el = e.target as Element
      if (el.closest('[data-cursor="explore"]')) {
        setMode('explore')
        setLabel(el.closest('[data-cursor="explore"]')?.getAttribute('data-cursor-label') ?? 'VIEW')
      } else if (el.closest('[data-cursor="hidden"]')) {
        setMode('hidden')
      } else if (el.closest('button, [data-cursor="button"], [role="button"]')) {
        setMode('button')
        setLabel('')
      } else if (el.closest('a, [data-cursor="text"]')) {
        setMode('text')
        setLabel('')
      } else {
        setMode('default')
        setLabel('')
      }
    }
    window.addEventListener('mousemove', detect, { passive: true })
    return () => window.removeEventListener('mousemove', detect)
  }, [isTouch])

  if (isTouch) return null

  const dotSize = (mode === 'hidden' || mode === 'explore' || mode === 'button') ? 0 : 6

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Precise dot — GPU layer via translateZ */}
          <m.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none select-none gpu"
            style={{ x: dotX, y: dotY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <m.div
              className="rounded-full bg-[#F0EDE8]"
              style={{ translateX: '-50%', translateY: '-50%' }}
              animate={{ width: dotSize, height: dotSize }}
              transition={{ type: 'spring', damping: 22, stiffness: 380 }}
            />
          </m.div>

          {/* Ring — scale instead of width/height → no layout cost */}
          <m.div
            className="fixed top-0 left-0 z-[9998] pointer-events-none select-none gpu"
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <m.div
              className="flex items-center justify-center rounded-full border"
              style={{
                width: RING_BASE,
                height: RING_BASE,
                translateX: '-50%',
                translateY: '-50%',
              }}
              animate={{
                scale: RING_SCALE[mode],
                borderColor:
                  mode === 'explore' || mode === 'button'
                    ? 'rgba(200,255,87,0.75)'
                    : 'rgba(240,237,232,0.38)',
                backgroundColor:
                  mode === 'button'  ? 'rgba(200,255,87,0.08)' :
                  mode === 'explore' ? 'rgba(200,255,87,0.04)' : 'transparent',
              }}
              transition={{ type: 'spring', damping: 24, stiffness: 310, mass: 0.35 }}
            >
              <AnimatePresence mode="wait">
                {mode === 'explore' && (
                  <m.span
                    key={label}
                    className="font-body text-[9px] font-semibold tracking-[0.22em] text-[#C8FF57] uppercase"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                    style={{ pointerEvents: 'none' }}
                  >
                    {label}
                  </m.span>
                )}
              </AnimatePresence>
            </m.div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
