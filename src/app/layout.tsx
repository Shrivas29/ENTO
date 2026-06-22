import type { Metadata, Viewport } from 'next'
import { Syne, Space_Grotesk } from 'next/font/google'
import { ClientShell } from '@/components/ClientShell'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const BASE_URL = 'https://entostudios.com'

export const viewport: Viewport = {
  themeColor: '#060606',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ENTØ — Web Development Studio',
    template: '%s | ENTØ',
  },
  description:
    'ENTØ is a premium web development studio founded by Shrivas. We design and build high-performance websites, web apps, and AI-powered digital experiences that convert and grow your business.',
  keywords: [
    'web development studio',
    'web design agency',
    'Next.js development',
    'AI web development',
    'UI UX design',
    'brand identity',
    'digital strategy',
    'website development India',
    'custom website design',
    'Shrivas',
    'ENTØ studio',
    'web app development',
    'startup website',
    'SaaS website design',
    'e-commerce development',
  ],
  authors: [{ name: 'Shrivas', url: BASE_URL }],
  creator: 'Shrivas',
  publisher: 'ENTØ Studio',
  category: 'technology',
  verification: {
    google: 'jiHJZGA6YRKwLdLXexW5a-P4p925IXQ1oVg2Ksxv_Zg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'ENTØ — Web Development Studio',
    description:
      'Premium web development studio. We design and build websites that convert, perform, and last. Next.js · AI · UI/UX · Brand.',
    url: BASE_URL,
    siteName: 'ENTØ',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ENTØ — Web Development Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENTØ — Web Development Studio',
    description: 'Premium web development studio. We build websites that convert, perform, and last.',
    creator: '@buildwithento',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ENTØ Studio',
    description: 'Premium web development studio specialising in Next.js, AI integration, UI/UX design, and brand identity.',
    url: BASE_URL,
    founder: {
      '@type': 'Person',
      name: 'SHRIVAS VM',
      jobTitle: 'Founder & Creative Director',
      image: `${BASE_URL}/shrivas-founder.webp`,
    },
    serviceType: [
      'Web Development',
      'UI/UX Design',
      'Brand Identity',
      'AI Integration',
      'Digital Strategy',
      'Website Development',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8220097558',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.instagram.com/buildwithento/',
      'https://www.linkedin.com/in/shrivas-vm-612540250/',
    ],
    priceRange: '$$',
    areaServed: 'Worldwide',
    foundingDate: '2026',
  }

  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3315E548WN" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-3315E548WN');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#060606] text-[#F0EDE8] overflow-x-hidden antialiased">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
