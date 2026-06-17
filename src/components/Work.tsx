'use client'
import { useState } from 'react'
import { m } from 'framer-motion'

const PROJECTS = [
  {
    id: 'orion',
    name: 'Orion AI',
    client: 'Power Management',
    year: '2025',
    category: 'AI Agent · Web App',
    color: '#7B61FF',
    desc: 'An intelligent power management agent that monitors and optimises energy usage in real time — built for the UK grid.',
  },
  {
    id: 'compass',
    name: 'Compass',
    client: 'EdTech · Study Abroad',
    year: '2025',
    category: 'AI Assistant · Mobile Web',
    color: '#C8FF57',
    desc: 'An AI-powered companion for international students — guiding every step of the study abroad journey, from applications to settling in.',
  },
  {
    id: 'navigate',
    name: 'Navigate',
    client: 'Tourism Platform',
    year: '2025',
    category: 'Website · AI · VR',
    color: '#00D4FF',
    desc: 'A next-gen tourism site with deep AI integration — personalised itineraries, VR destination previews, and intelligent travel planning.',
  },
  {
    id: 'techonova',
    name: 'Techonova',
    client: 'Tech Events',
    year: '2024',
    category: 'Event Website',
    color: '#FF6B35',
    desc: 'A bold event website built for a flagship tech conference — schedules, speaker profiles, and live session tracking.',
  },
]

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <m.div
      className="relative overflow-hidden"
      style={{ background: '#0C0C0C', border: '1px solid #181818' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 2) * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Color wash on hover */}
      <m.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{ background: `radial-gradient(ellipse at 30% 30%, ${project.color}18 0%, transparent 70%)` }}
        transition={{ duration: 0.4 }}
      />

      {/* Top accent line */}
      <m.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        animate={{ background: hovered ? project.color : 'transparent' }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-7 md:p-9 flex flex-col gap-5">
        <div>
          <span className="font-body text-[10px] tracking-[0.2em] text-[#F0EDE8]/30 uppercase block mb-3">
            {project.client}
          </span>
          <m.h3
            className="font-display font-bold leading-none tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}
            animate={{ color: hovered ? project.color : '#F0EDE8' }}
            transition={{ duration: 0.3 }}
          >
            {project.name}
          </m.h3>
        </div>

        <p className="font-body text-sm text-[#F0EDE8]/50 leading-relaxed">
          {project.desc}
        </p>

        <div className="flex items-center justify-between pt-5 border-t border-[#1E1E1E]">
          <span className="font-body text-[10px] tracking-[0.14em] text-[#F0EDE8]/30 uppercase">
            {project.category}
          </span>
          <span className="font-body text-[10px] tracking-[0.14em] text-[#F0EDE8]/25">
            {project.year}
          </span>
        </div>
      </div>
    </m.div>
  )
}

export function Work() {
  return (
    <section
      id="work"
      className="py-24 md:py-36 px-6 md:px-10"
      style={{ borderTop: '1px solid #181818' }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
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
              Selected Work
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
            Work that
            <br />
            <span className="text-[#C8FF57]">matters.</span>
          </m.h2>
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Stats bar */}
      <m.div
        className="mt-16 md:mt-20 pt-10 border-t border-[#181818] grid grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {[
          { value: '8+', label: 'Websites Launched' },
          { value: '98', label: 'Avg. Lighthouse Score' },
          { value: '100%', label: 'Client Retention' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-display font-bold text-[#C8FF57] mb-1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              {stat.value}
            </p>
            <p className="font-body text-[11px] tracking-[0.14em] text-[#F0EDE8]/35 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </m.div>
    </section>
  )
}
