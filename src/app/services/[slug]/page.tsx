'use client'
import { useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'

const SERVICES: Record<string, {
  num: string
  title: string
  tagline: string
  color: string
  description: string
  process: { step: string; title: string; body: string }[]
  deliverables: string[]
  ideal: string[]
}> = {
  'web-development': {
    num: '01',
    title: 'Web Development',
    tagline: 'Fast. Scalable. Engineered to win.',
    color: '#7B61FF',
    description:
      'We engineer custom websites and web applications from the ground up. Every project is hand-coded with performance obsession — no bloated page builders, no shortcuts. Just clean, scalable architecture that loads fast, ranks well, and converts better.',
    process: [
      { step: '01', title: 'Discovery & Architecture', body: 'We map out your technical requirements, stack decisions, and system architecture before writing a single line of code.' },
      { step: '02', title: 'Design Handoff', body: 'Pixel-perfect implementation of your designs — or we handle design too. Every component is built with responsiveness and accessibility baked in.' },
      { step: '03', title: 'Development Sprints', body: 'Iterative builds with weekly demos. You see real progress, not status updates. We move fast without breaking things.' },
      { step: '04', title: 'QA & Launch', body: 'Cross-browser testing, performance audits, Lighthouse optimization, and a zero-downtime deployment to production.' },
    ],
    deliverables: ['Production-ready codebase', 'Lighthouse 95+ score', 'CMS integration', 'Documentation', '30-day post-launch support'],
    ideal: ['SaaS startups', 'Tech companies', 'Founders launching MVPs', 'Businesses replacing outdated sites'],
  },
  'ui-ux-design': {
    num: '02',
    title: 'UI/UX Design',
    tagline: 'Interfaces that feel inevitable.',
    color: '#FF6B35',
    description:
      'We design web experiences where every interaction earns the next click. No generic components, no template thinking — just deeply considered design that makes your users feel understood and your brand feel premium.',
    process: [
      { step: '01', title: 'Research & Audit', body: 'We study your users, competitors, and current experience. We identify friction, opportunity, and the north star for the redesign.' },
      { step: '02', title: 'Wireframes & Structure', body: 'Low-fidelity wireframes map the information architecture and user flows before any visual design decisions are made.' },
      { step: '03', title: 'Visual Design', body: 'High-fidelity screens with your brand fully applied. Typography, color, spacing, and motion all in harmony.' },
      { step: '04', title: 'Prototype & Handoff', body: 'Interactive Figma prototypes for stakeholder review, followed by a developer-ready handoff with specs, assets, and component documentation.' },
    ],
    deliverables: ['Figma design files', 'Interactive prototype', 'Design system', 'Component documentation', 'Motion specs'],
    ideal: ['Startups pre-launch', 'SaaS companies improving conversion', 'Brands needing a digital redesign', 'Founders with a vision but no designer'],
  },
  'brand-identity': {
    num: '03',
    title: 'Brand & Identity',
    tagline: 'Your brand, built for the web.',
    color: '#00D4FF',
    description:
      'We create visual identities that don\'t just look good in a PDF — they work on every screen, at every size, in every context. From logo to full brand system, we build the visual language your web presence needs to command authority.',
    process: [
      { step: '01', title: 'Brand Strategy', body: 'We define your positioning, audience, and personality before touching a design tool. Brand clarity comes before brand visuals.' },
      { step: '02', title: 'Visual Exploration', body: 'Multiple creative directions presented — each with a rationale. We don\'t just present options, we recommend one.' },
      { step: '03', title: 'Refinement', body: 'We develop the chosen direction to full resolution — wordmark, symbol, color, typography — tested across real-world applications.' },
      { step: '04', title: 'System & Handoff', body: 'A complete brand system built for teams to use consistently. Web-ready assets, usage rules, and do/don\'t guidelines.' },
    ],
    deliverables: ['Logo suite (all formats)', 'Brand guidelines PDF', 'Web asset library', 'Typography & color system', 'Social media kit'],
    ideal: ['New businesses launching online', 'Rebranding companies', 'Startups preparing to fundraise', 'Creators building a personal brand'],
  },
  'ai-integration': {
    num: '04',
    title: 'AI Integration',
    tagline: 'Intelligence, built into every layer.',
    color: '#FF3D7F',
    description:
      'We embed AI natively into your website and web products — not as a chatbot bolted on the side, but as a core feature that makes your product genuinely smarter. LLM integration, intelligent search, personalization engines, and automation that actually works.',
    process: [
      { step: '01', title: 'Use Case Definition', body: 'We identify exactly where AI adds real value in your product — not where it\'s trendy. Use cases must solve real user problems.' },
      { step: '02', title: 'Model Selection & Architecture', body: 'We choose the right model, embedding strategy, and infrastructure based on your cost, latency, and capability requirements.' },
      { step: '03', title: 'Build & Evaluate', body: 'Iterative development with continuous evaluation. We measure quality, relevance, and performance — not just whether it works, but how well.' },
      { step: '04', title: 'Deploy & Monitor', body: 'Production deployment with monitoring, rate limiting, error handling, and cost controls. AI in production is different from a demo.' },
    ],
    deliverables: ['Production AI feature', 'API integration', 'Prompt engineering', 'Monitoring setup', 'Cost & usage dashboard'],
    ideal: ['SaaS products adding AI features', 'Businesses automating workflows', 'E-commerce needing personalization', 'Content platforms improving discovery'],
  },
  'digital-strategy': {
    num: '05',
    title: 'Digital Strategy',
    tagline: 'Your website as a growth engine.',
    color: '#C8FF57',
    description:
      'We map the full digital picture — from how your website should be structured to how it will be found, how users will convert, and how it will scale. Strategy first, execution second. Every decision has a reason.',
    process: [
      { step: '01', title: 'Audit & Benchmark', body: 'We audit your current digital presence — traffic, rankings, conversions, site speed — and benchmark against your top 5 competitors.' },
      { step: '02', title: 'Strategy Document', body: 'A clear, prioritized roadmap: what to build, what to fix, what to stop doing, and in what order. No fluff, no padding.' },
      { step: '03', title: 'Implementation', body: 'We execute the highest-leverage items first — technical fixes, analytics setup, on-page SEO, conversion improvements.' },
      { step: '04', title: 'Report & Iterate', body: 'Monthly reporting on what\'s working and what to optimize next. Strategy evolves as data comes in.' },
    ],
    deliverables: ['Strategy document', 'SEO audit report', 'Analytics setup', 'Competitor analysis', 'Monthly performance reports'],
    ideal: ['Businesses with traffic but low conversion', 'New websites planning for SEO from day one', 'Companies scaling their digital presence', 'Startups defining their online positioning'],
  },
  'website-development': {
    num: '06',
    title: 'Website Development',
    tagline: 'End-to-end. Designed. Built. Launched.',
    color: '#FFB547',
    description:
      'Our flagship service — complete website delivery from first concept to live URL. We own the full process: strategy, design, development, content, and launch. You get one team, one point of contact, and a website that genuinely moves the needle.',
    process: [
      { step: '01', title: 'Kickoff & Discovery', body: 'A deep session to understand your goals, audience, competitors, and what success looks like. We ask the uncomfortable questions up front.' },
      { step: '02', title: 'Design', body: 'We design every page — mobile first, fully responsive. You approve before we write a single line of production code.' },
      { step: '03', title: 'Development', body: 'Hand-coded with Next.js. No WordPress, no Webflow templates. Built for speed, SEO, and a flawless experience on every device.' },
      { step: '04', title: 'Launch & Beyond', body: 'Domain setup, CMS training, analytics, and a post-launch support window. We don\'t disappear after delivery.' },
    ],
    deliverables: ['Fully designed & developed website', 'CMS (you edit content yourself)', 'SEO foundations', 'Analytics setup', '30-day post-launch support'],
    ideal: ['Startups launching their first website', 'Established businesses refreshing their online presence', 'Agencies needing a white-label partner', 'Creators monetizing their audience'],
  },
}

export default function ServicePage() {
  const params = useParams()
  const slug = params?.slug as string
  const service = SERVICES[slug]

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!service) return notFound()

  return (
    <div className="min-h-screen bg-[#060606] text-[#F0EDE8]">

        {/* Back nav */}
        <m.div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5"
          style={{ background: 'rgba(6,6,6,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #181818' }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/#services"
            className="flex items-center gap-3 font-body text-[10px] tracking-[0.2em] text-[#F0EDE8]/50 hover:text-[#F0EDE8] transition-colors duration-200 uppercase group"
          >
            <m.svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              animate={{ x: 0 }}
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </m.svg>
            Back to Services
          </Link>

          <span className="font-display font-bold text-sm tracking-[0.18em] text-[#F0EDE8]">ENTØ</span>

          <Link
            href="/#contact"
            className="hidden md:flex font-body text-[10px] font-semibold tracking-[0.18em] uppercase text-[#060606] bg-[#C8FF57] px-4 py-2 hover:bg-[#F0EDE8] transition-colors duration-200"
          >
            Start a Project
          </Link>
        </m.div>

        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-10 lg:px-14" style={{ borderBottom: '1px solid #181818' }}>
          <m.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block w-6 h-px" style={{ background: service.color }} />
            <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">
              Service {service.num}
            </span>
          </m.div>

          <m.h1
            className="font-display font-bold tracking-tight text-[#F0EDE8] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 9vw, 11rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ delay: 0.15, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.title}
          </m.h1>

          <m.p
            className="font-display font-bold mb-10"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: service.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.tagline}
          </m.p>

          <m.p
            className="font-body text-base md:text-lg text-[#F0EDE8]/60 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            {service.description}
          </m.p>
        </section>

        {/* Process */}
        <section className="py-20 md:py-28 px-6 md:px-10 lg:px-14" style={{ borderBottom: '1px solid #181818' }}>
          <m.div
            className="flex items-center gap-4 mb-14"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: service.color }} />
            <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">Our Process</span>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 border-t border-[#181818]">
            {service.process.map((step, i) => (
              <m.div
                key={step.step}
                className="py-10 border-b border-[#181818]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-body text-[10px] tracking-[0.22em] text-[#F0EDE8]/25 uppercase">{step.step}</span>
                  <span className="inline-block w-4 h-px bg-[#F0EDE8]/15" />
                  <span className="font-display font-bold text-lg" style={{ color: service.color }}>{step.title}</span>
                </div>
                <p className="font-body text-sm text-[#F0EDE8]/55 leading-relaxed">{step.body}</p>
              </m.div>
            ))}
          </div>
        </section>

        {/* Deliverables + Ideal For */}
        <section className="py-20 md:py-28 px-6 md:px-10 lg:px-14" style={{ borderBottom: '1px solid #181818' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {/* Deliverables */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="inline-block w-6 h-px" style={{ background: service.color }} />
                <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">Deliverables</span>
              </div>
              <div className="flex flex-col gap-3">
                {service.deliverables.map((d, i) => (
                  <m.div
                    key={d}
                    className="flex items-center gap-4 py-3 border-b border-[#181818]"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke={service.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-body text-sm text-[#F0EDE8]/70">{d}</span>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Ideal For */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: 0.1, duration: 0.65 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <span className="inline-block w-6 h-px" style={{ background: service.color }} />
                <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">Ideal For</span>
              </div>
              <div className="flex flex-col gap-3">
                {service.ideal.map((item, i) => (
                  <m.div
                    key={item}
                    className="flex items-start gap-4 py-3 border-b border-[#181818]"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                  >
                    <span className="inline-block mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                    <span className="font-body text-sm text-[#F0EDE8]/70">{item}</span>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-36 px-6 md:px-10 text-center">
          <m.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block w-6 h-px" style={{ background: service.color }} />
            <span className="font-body text-[10px] tracking-[0.3em] text-[#F0EDE8]/40 uppercase">Ready to start?</span>
            <span className="inline-block w-6 h-px" style={{ background: service.color }} />
          </m.div>

          <m.h2
            className="font-display font-bold text-[#F0EDE8] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 7vw, 7rem)', lineHeight: 1.05 }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's build your
            <br />
            <span style={{ color: service.color }}>{service.title.toLowerCase()}.</span>
          </m.h2>

          <m.p
            className="font-body text-sm text-[#F0EDE8]/40 max-w-md mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Tell us about your project. We'll come back with a clear plan, timeline, and investment estimate.
          </m.p>

          <m.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 font-body font-semibold text-sm tracking-[0.18em] uppercase text-[#060606] px-10 py-5 hover:opacity-90 transition-opacity duration-200"
              style={{ background: service.color }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/#services"
              className="font-body text-[11px] tracking-[0.2em] uppercase text-[#F0EDE8]/40 hover:text-[#F0EDE8] transition-colors duration-200"
            >
              View All Services
            </Link>
          </m.div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 md:px-10 flex items-center justify-between border-t border-[#181818]">
          <span className="font-display font-bold text-xs tracking-[0.18em] text-[#F0EDE8]/40">ENTØ</span>
          <span className="font-body text-[10px] text-[#F0EDE8]/20 tracking-[0.1em]">© 2025 ENTØ Studio</span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8FF57]" />
            <span className="font-body text-[10px] tracking-[0.14em] text-[#F0EDE8]/20 uppercase hidden md:block">Web Development Studio</span>
          </span>
        </footer>
    </div>
  )
}
