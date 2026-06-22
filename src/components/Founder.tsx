'use client'
import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const TRAITS = [
  'Full-Stack Developer',
  'Creative Director',
  'AI Native',
  'Web Architect',
  'UI/UX Designer',
  'Digital Strategist',
]

const PHILOSOPHY = [
  {
    label: 'On the Web',
    text: 'A website is not a brochure. It is the most powerful sales tool, brand statement, and growth engine a business can own.',
  },
  {
    label: 'On Code',
    text: 'Great code and great design are inseparable. The best websites feel effortless because someone cared deeply about both.',
  },
  {
    label: 'On the Future',
    text: 'AI is rewriting what websites can do. We build at that frontier — where intelligent interfaces meet world-class design.',
  },
]

export function Founder() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const nameX = useTransform(scrollYProgress, [0.1, 0.5], ['-4%', '0%'])
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.6, 0])

  return (
    <section
      ref={sectionRef}
      id="founder"
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ borderTop: '1px solid #181818', background: '#060606' }}
    >
      {/* Ambient glow */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,97,255,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative px-6 md:px-10 lg:px-14">
        {/* Label */}
        <m.div
          className="flex items-center gap-4 mb-16 md:mb-24"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block w-6 h-px bg-[#C8FF57]" />
          <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">
            The Founder
          </span>
        </m.div>

        {/* Name + Photo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6 md:mb-10">
          <div className="overflow-hidden" ref={nameRef}>
            <m.h2
              className="font-display font-bold text-[#F0EDE8] leading-none tracking-tight"
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 14rem)',
                x: nameX,
                opacity: nameOpacity,
              }}
            >
              SHRIVAS VM
            </m.h2>
          </div>

          {/* Founder photo */}
          <m.div
            className="relative flex-shrink-0 self-center md:self-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden"
              style={{ width: 'clamp(140px, 18vw, 280px)', aspectRatio: '3/4' }}
            >
              <picture>
                <source
                  srcSet="/shrivas-founder-sm.webp"
                  media="(max-width: 768px)"
                  type="image/webp"
                />
                <source
                  srcSet="/shrivas-founder.webp"
                  media="(min-width: 769px)"
                  type="image/webp"
                />
                <Image
                  src="/shrivas-founder.webp"
                  alt="SHRIVAS VM — Founder of ENTØ Studios"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 140px, 280px"
                  priority
                />
              </picture>
              {/* Subtle overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060606 0%, transparent 40%)' }} />
            </div>
            {/* Corner accent */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r border-b border-[#C8FF57]" />
          </m.div>
        </div>

        {/* Role + traits */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16 md:mb-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <p className="font-body text-sm text-[#F0EDE8]/50 tracking-[0.08em]">
              Founder & Creative Director
            </p>
            <p className="font-body text-sm text-[#C8FF57]/70 tracking-[0.08em] mt-1">
              ENTØ Studio
            </p>
          </m.div>

          <m.div
            className="flex flex-wrap gap-2 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {TRAITS.map((trait, i) => (
              <m.span
                key={trait}
                className="font-body text-[10px] tracking-[0.16em] text-[#F0EDE8]/40 border border-[#242424] px-3 py-1.5 uppercase"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                whileHover={{
                  borderColor: '#C8FF57',
                  color: '#C8FF57',
                  transition: { duration: 0.2 },
                }}
              >
                {trait}
              </m.span>
            ))}
          </m.div>
        </div>

        {/* Philosophy grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-[#181818]">
          {PHILOSOPHY.map((item, i) => (
            <m.div
              key={item.label}
              className="py-10 md:py-14 border-b lg:border-b-0 lg:border-r border-[#181818] last:border-0 lg:px-10 first:pl-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-[9px] tracking-[0.3em] text-[#C8FF57]/70 uppercase mb-5">
                {item.label}
              </p>
              <p className="font-body text-sm md:text-base text-[#F0EDE8]/60 leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
            </m.div>
          ))}
        </div>

        {/* Closing line */}
        <m.div
          className="mt-16 md:mt-24 flex items-center gap-5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-display font-bold text-2xl md:text-3xl text-[#F0EDE8]">
            Building years ahead.
          </span>
          <span className="font-display font-bold text-2xl md:text-3xl text-[#C8FF57]">Always.</span>
        </m.div>
      </div>
    </section>
  )
}
