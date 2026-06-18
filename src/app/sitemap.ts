import type { MetadataRoute } from 'next'

const BASE_URL = 'https://entostudios.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const serviceslugs = [
    'web-development',
    'ui-ux-design',
    'brand-identity',
    'ai-integration',
    'digital-strategy',
    'website-development',
  ]

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...serviceslugs.map((slug) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
