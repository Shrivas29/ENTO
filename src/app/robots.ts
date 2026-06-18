import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://entostudios.com/sitemap.xml',
    host: 'https://entostudios.com',
  }
}
