'use client'
import { useState } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    num: '01',
    slug: 'web-development',
    title: 'Web Development',
    short: 'Build',
    desc: 'We engineer fast, scalable websites and web applications from the ground up — pixel-perfect, performant, and built to grow with your business.',
    tags: ['Next.js', 'React', 'Full-Stack', 'Custom CMS'],
    color: '#7B61FF',
  },
  {
    num: '02',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    short: 'Design',
    desc: 'Interfaces that feel inevitable. We design web experiences where every interaction is deliberate and every screen earns the next click.',
    tags: ['Web Design', 'Interaction Design', 'Design Systems', 'Prototyping'],
    color: '#FF6B35',
  },
  {
    num: '03',
    slug: 'brand-identity',
    title: 'Brand & Identity',
    short: 'Brand',
    desc: 'Visual identities that translate flawlessly to the web. We build brands that own their space online — from logo to live site.',
    tags: ['Identity Systems', 'Typography', 'Motion Identity', 'Art Direction'],
    color: '#00D4FF',
  },
  {
    num: '04',
    slug: 'ai-integration',
    title: 'AI Integration',
    short: 'AI',
    desc: 'We embed AI natively into web products — chatbots, personalization engines, generative interfaces, and intelligent automation that actually works.',
    tags: ['LLM Integration', 'AI Features', 'Automation', 'Predictive UX'],
    color: '#FF3D7F',
  },
  {
    num: '05',
    slug: 'digital-strategy',
    title: 'Digital Strategy',
    short: 'Strategy',
    desc: 'We map the full digital landscape — positioning, architecture, and go-to-market plans that make your website a business asset, not a brochure.',
    tags: ['SEO Strategy', 'Conversion', 'Analytics', 'Growth Systems'],
    color: '#C8FF57',
  },
  {
    num: '06',
    slug: 'website-development',
    title: 'Website Development',
    short: 'Launch',
    desc: 'End-to-end website builds for startups, studios, and scaling businesses. We own the full process: design, development, launch, and beyond.',
    tags: ['Landing Pages', 'SaaS Sites', 'E-Commerce', 'Web Apps'],
    color: '#FFB547',
  },
]

function ServiceRow({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <m.div
      className="relative border-b border-[#181818] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="explore"
      data-cursor-label={service.short.toUpperCase()}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hover background fill */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ background: `${service.color}06` }}
      />

      {/* Left accent bar */}
      <m.div
        className="absolute left-0 top-0 bottom-0 w-0.5"
        animate={{
          background: hovered ? service.color : 'transparent',
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <Link href={`/services/${service.slug}`} className="block">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 px-6 md:px-10 py-8 md:py-10 relative">
          {/* Number */}
          <span className="font-body text-[11px] tracking-[0.2em] text-[#F0EDE8]/25 uppercase w-16 shrink-0">
            {service.num}
          </span>

          {/* Title */}
          <div className="flex-1 md:flex-none md:w-64">
            <m.h3
              className="font-display font-bold text-2xl md:text-3xl tracking-tight"
              animate={{ color: hovered ? service.color : '#F0EDE8' }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </m.h3>
          </div>

          {/* Description — expands on hover */}
          <div className="flex-1 md:px-8">
            <AnimatePresence mode="wait">
              {hovered ? (
                <m.p
                  key="desc"
                  className="font-body text-sm text-[#F0EDE8]/65 leading-relaxed max-w-sm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {service.desc}
                </m.p>
              ) : (
                <m.div
                  key="tags"
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[10px] tracking-[0.14em] text-[#F0EDE8]/30 uppercase border border-[#282828] px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Arrow */}
          <m.div
            className="hidden md:flex items-center gap-2 shrink-0"
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
          >
            <span className="font-body text-[10px] tracking-[0.18em] text-[#F0EDE8]/60 uppercase">
              Explore
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F0EDE8]/60" />
            </svg>
          </m.div>
        </div>
      </Link>
    </m.div>
  )
}

export function Services() {
  return (
    <section
      id="services"
      className="py-24 md:py-36"
      style={{ borderTop: '1px solid #181818' }}
    >
      <div className="px-6 md:px-10 mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <m.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block w-6 h-px bg-[#C8FF57]" />
            <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">
              Capabilities
            </span>
          </m.div>
          <m.h2
            className="font-display font-bold tracking-tight text-[#F0EDE8]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            What we
            <br />
            <span className="text-[#C8FF57]">build.</span>
          </m.h2>
        </div>
        <m.p
          className="font-body text-sm text-[#F0EDE8]/40 max-w-xs leading-relaxed md:text-right"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Six web-native disciplines. Deployed together or individually. Each one informed by the others.
        </m.p>
      </div>

      <div className="border-t border-[#181818]">
        {SERVICES.map((svc, i) => (
          <ServiceRow key={svc.num} service={svc} index={i} />
        ))}
      </div>
    </section>
  )
}
