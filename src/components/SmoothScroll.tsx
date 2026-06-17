'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip Lenis on touch devices — native momentum scroll feels better
    if (window.matchMedia('(hover: none)').matches) return

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let animId: number

    function raf(time: number) {
      lenis.raf(time)
      animId = requestAnimationFrame(raf)
    }

    animId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
