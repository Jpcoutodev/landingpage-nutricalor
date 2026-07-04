import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: `${SITE_URL}/pt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/pt/como-funciona`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pt/privacidade`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/pt/termos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/pt/contato`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    // Futuras calculadoras serão adicionadas aqui:
    // { url: `${SITE_URL}/calculadora-tmb`, ... },
    // { url: `${SITE_URL}/calculadora-imc`, ... },
  ]
}
