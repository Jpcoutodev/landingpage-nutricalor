import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import {
  CALCULATOR_KEYS,
  HREFLANG,
  LOCALES,
  homePath,
  pathFor,
  type PageKey,
} from '@/lib/routes'

/**
 * Sitemap com todos os idiomas.
 *
 * Cada entrada declara os equivalentes em `alternates.languages`, que é o que
 * o Google usa para relacionar as versões e não tratá-las como duplicadas.
 * As páginas legais ficam de fora — são `noindex`.
 */
const INDEXABLE: { key: PageKey | 'home'; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { key: 'home', priority: 1, changeFrequency: 'weekly' },
  { key: 'howItWorks', priority: 0.8, changeFrequency: 'monthly' },
  ...CALCULATOR_KEYS.map((key) => ({
    key: key as PageKey,
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  })),
  { key: 'contact', priority: 0.4, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const { key, priority, changeFrequency } of INDEXABLE) {
    const languages: Record<string, string> = {}
    for (const locale of LOCALES) {
      const path = key === 'home' ? homePath(locale) : pathFor(key, locale)
      languages[HREFLANG[locale]] = `${SITE_URL}${path}`
    }

    for (const locale of LOCALES) {
      const path = key === 'home' ? homePath(locale) : pathFor(key, locale)
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages },
      })
    }
  }

  return entries
}
