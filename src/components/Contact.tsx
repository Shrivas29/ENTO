'use client'
import { useRef, useState } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const bx = useSpring(mx, { stiffness: 260, damping: 22 })
  const by = useSpring(my, { stiffness: 260, damping: 22 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mx.set((e.clientX - cx) * 0.35)
    my.set((e.clientY - cy) * 0.35)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
    setHovered(false)
  }

  return (
    <m.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: bx, y: by }}
      className="relative inline-flex items-center gap-4 font-body font-semibold text-sm tracking-[0.18em] uppercase text-[#060606] bg-[#C8FF57] px-10 py-5 overflow-hidden group"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      data-cursor="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', damping: 20, stiffness: 400 }}
    >
      <m.span
        className="absolute inset-0 bg-[#F0EDE8]"
        initial={{ x: '-101%' }}
        animate={{ x: hovered ? '0%' : '-101%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <span className="relative z-10">{children}</span>
      <m.svg
        className="relative z-10"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </m.svg>
    </m.a>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 md:py-44 px-6 md:px-10 overflow-hidden"
      style={{ borderTop: '1px solid #181818', background: '#060606' }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,255,87,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Label */}
        <m.div
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block w-6 h-px bg-[#C8FF57]" />
          <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">
            Let's Build Together
          </span>
          <span className="inline-block w-6 h-px bg-[#C8FF57]" />
        </m.div>

        {/* Headline */}
        <m.h2
          className="font-display font-bold text-[#F0EDE8] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 9vw, 10rem)', lineHeight: 1.0 }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Have a vision?
          <br />
          <span className="text-[#C8FF57]">Let's make it</span>
          <br />
          real.
        </m.h2>

        {/* Subtext */}
        <m.p
          className="font-body text-sm md:text-base text-[#F0EDE8]/40 max-w-md mx-auto leading-relaxed mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          We partner with founders, startups, and brands who need a website that actually converts —
          designed to impress, built to perform. Serious inquiries only.
        </m.p>

        {/* CTA */}
        <m.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          <MagneticButton href="https://wa.me/918220097558">
            Start a Conversation
          </MagneticButton>

          <a
            href="mailto:shrivasvm@gmail.com"
            className="font-body text-[11px] tracking-[0.2em] uppercase text-[#F0EDE8]/40 hover:text-[#F0EDE8] transition-colors duration-200"
          >
            shrivasvm@gmail.com
          </a>
        </m.div>

        {/* Availability tag */}
        <m.div
          className="mt-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-[#C8FF57] animate-pulse" />
          <span className="font-body text-[10px] tracking-[0.2em] text-[#F0EDE8]/30 uppercase">
            Accepting new projects — Q3 2026
          </span>
        </m.div>
      </div>

      {/* Info grid at bottom */}
      <m.div
        className="relative mt-24 md:mt-32 pt-10 border-t border-[#181818] grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {[
          { label: 'Location', value: 'Remote-First' },
          { label: 'Timezone', value: 'IST / UTC+5:30' },
          { label: 'Response', value: 'Within 24h' },
          { label: 'Availability', value: 'Q3 2026' },
        ].map((item) => (
          <div key={item.label}>
            <p className="font-body text-[9px] tracking-[0.25em] text-[#F0EDE8]/25 uppercase mb-2">
              {item.label}
            </p>
            <p className="font-body text-sm text-[#F0EDE8]/60">
              {item.value}
            </p>
          </div>
        ))}
      </m.div>
    </section>
  )
}
