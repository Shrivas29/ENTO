'use client'
import { useEffect, useRef } from 'react'

// Generates a 256×256 noise tile ONCE, then CSS animates the position.
// Zero JS per-frame cost — the compositor handles the grain shift.
export function NoiseOverlay() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const SIZE = 256
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')!

    const imageData = ctx.createImageData(SIZE, SIZE)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0
      data[i] = data[i + 1] = data[i + 2] = v
      data[i + 3] = 20
    }
    ctx.putImageData(imageData, 0, 0)

    if (innerRef.current) {
      innerRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`
    }
  }, [])

  return (
    <div className="grain-wrap" aria-hidden="true">
      <div ref={innerRef} className="grain-inner" />
    </div>
  )
}
