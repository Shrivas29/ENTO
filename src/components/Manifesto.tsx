'use client'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'

const LINES = [
  { text: 'We don\'t make websites.', accent: false },
  { text: 'We build experiences.', accent: true },
  { text: 'Every pixel is', accent: false },
  { text: 'intentional.', accent: true },
  { text: 'Every line of code', accent: false },
  { text: 'has a purpose.', accent: true },
]

function ManifestoLine({
  text,
  accent,
  index,
  total,
}: {
  text: string
  accent: boolean
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'start 0.38'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['28px', '0px'])

  return (
    <m.div
      ref={ref}
      style={{ opacity, y }}
      className="overflow-hidden"
    >
      <span
        className={`font-display font-bold block leading-[1.05] tracking-tight ${
          accent ? 'text-[#C8FF57]' : 'text-[#F0EDE8]'
        }`}
        style={{ fontSize: 'clamp(1.9rem, 7.5vw, 8.5rem)' }}
      >
        {text}
      </span>
    </m.div>
  )
}

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative py-28 md:py-40 px-6 md:px-14 lg:px-24"
      style={{ borderTop: '1px solid #181818' }}
    >
      {/* Label */}
      <m.div
        className="flex items-center gap-4 mb-16 md:mb-24"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-block w-6 h-px bg-[#C8FF57]" />
        <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">
          Our Manifesto
        </span>
      </m.div>

      {/* Lines */}
      <div className="max-w-5xl">
        {LINES.map((line, i) => (
          <ManifestoLine
            key={i}
            text={line.text}
            accent={line.accent}
            index={i}
            total={LINES.length}
          />
        ))}
      </div>

      {/* Bottom statement */}
      <m.div
        className="mt-20 md:mt-28 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-body text-sm md:text-base text-[#F0EDE8]/45 max-w-md leading-relaxed">
          ENTØ builds websites that work as hard as you do — combining precision engineering,
          world-class design, and AI-powered intelligence to create digital presences that
          generate real business results.
        </p>
        <div className="flex items-center gap-3">
          <span className="font-body text-[10px] tracking-[0.22em] text-[#F0EDE8]/30 uppercase">
            Est. 2026
          </span>
          <span className="font-display font-bold text-lg text-[#C8FF57]">—</span>
          <span className="font-body text-[10px] tracking-[0.22em] text-[#F0EDE8]/30 uppercase">
            Present
          </span>
        </div>
      </m.div>
    </section>
  )
}
