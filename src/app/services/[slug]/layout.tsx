import type { Metadata } from 'next'

const BASE_URL = 'https://entostudio.com'

const SERVICE_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  'web-development': {
    title: 'Web Development',
    description:
      'Custom Next.js and React web development. ENTØ engineers fast, scalable websites and web applications — hand-coded for performance, SEO, and conversion.',
    keywords: ['web development', 'Next.js developer', 'React developer', 'custom web app', 'full stack development', 'headless CMS'],
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    description:
      'Premium UI/UX design for websites and web apps. ENTØ creates interfaces that feel inevitable — research-led, conversion-focused, pixel-perfect.',
    keywords: ['UI UX design', 'web design', 'user experience design', 'Figma design', 'design system', 'interaction design'],
  },
  'brand-identity': {
    title: 'Brand & Identity',
    description:
      'Visual identity design built for the web. ENTØ creates logo systems, typography, and brand guidelines that translate flawlessly across every digital surface.',
    keywords: ['brand identity design', 'logo design', 'brand guidelines', 'visual identity', 'brand strategy', 'typography system'],
  },
  'ai-integration': {
    title: 'AI Integration',
    description:
      'Native AI integration for websites and web products. ENTØ embeds LLMs, intelligent search, and automation that actually works — not bolted-on chatbots.',
    keywords: ['AI integration', 'LLM integration', 'AI web app', 'ChatGPT integration', 'Claude API', 'AI features', 'intelligent automation'],
  },
  'digital-strategy': {
    title: 'Digital Strategy',
    description:
      'Website strategy, SEO, and conversion optimisation. ENTØ maps your full digital landscape and executes the highest-leverage improvements first.',
    keywords: ['digital strategy', 'SEO strategy', 'conversion rate optimisation', 'web analytics', 'website strategy', 'growth systems'],
  },
  'website-development': {
    title: 'Website Development',
    description:
      'End-to-end website delivery — strategy, design, development, and launch. ENTØ owns the full process so you get one team and a website that moves the needle.',
    keywords: ['website development', 'landing page design', 'SaaS website', 'e-commerce website', 'startup website', 'web agency'],
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = SERVICE_META[slug]

  if (!meta) return { title: 'Service | ENTØ' }

  const url = `${BASE_URL}/services/${slug}`

  return {
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords, 'ENTØ studio', 'Shrivas', 'web development studio'],
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.title} — ENTØ`,
      description: meta.description,
      url,
      siteName: 'ENTØ',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${meta.title} — ENTØ` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} — ENTØ`,
      description: meta.description,
      images: ['/og-image.png'],
    },
  }
}

export default function ServiceSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
