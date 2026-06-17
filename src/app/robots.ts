import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://entostudio.com/sitemap.xml',
    host: 'https://entostudio.com',
  }
}
