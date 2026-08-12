import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/dictionaries'
import { APP_NAME, SITE_URL } from '@/lib/constants'
import {
  CALCULATOR_KEYS,
  LOCALES,
  OG_LOCALE,
  PAGE_KEYS,
  SLUGS,
  alternatesFor,
  isLocale,
  pageKeyForSlug,
  type Locale,
  type PageKey,
} from '@/lib/routes'
import type { CalculatorKey } from '@/dictionaries/types'
import CalculatorPage from '@/views/CalculatorPage'
import ContactPage from '@/views/ContactPage'
import HowItWorksPage from '@/views/HowItWorksPage'
import LegalPage from '@/views/LegalPage'

type PageProps = {
  params: Promise<{ lang: string; slug: string }>
}

/** Só os pares (idioma, slug) do registro existem — o resto é 404. */
export const dynamicParams = false

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of LOCALES) {
    for (const key of PAGE_KEYS) {
      params.push({ lang, slug: SLUGS[key][lang] })
    }
  }
  return params
}

function isCalculator(key: PageKey): key is CalculatorKey {
  return (CALCULATOR_KEYS as readonly PageKey[]).includes(key)
}

/** Resolve idioma + slug, ou dispara 404. */
async function resolve(params: PageProps['params']) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()

  const locale: Locale = lang
  const pageKey = pageKeyForSlug(locale, slug)
  if (!pageKey) notFound()

  const dict = await getDictionary(locale)
  return { locale, pageKey, dict }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, pageKey, dict } = await resolve(params)
  const meta = dict[pageKey].meta
  const url = `${SITE_URL}/${locale}/${SLUGS[pageKey][locale]}`
  const isLegal = pageKey === 'privacy' || pageKey === 'terms'

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: alternatesFor(pageKey, SITE_URL),
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      siteName: APP_NAME,
      title: meta.title,
      description: meta.description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    // Páginas legais não disputam busca e ainda dependem de revisão jurídica.
    robots: isLegal ? { index: false, follow: true } : { index: true, follow: true },
  }
}

export default async function Page({ params }: PageProps) {
  const { locale, pageKey, dict } = await resolve(params)

  if (isCalculator(pageKey)) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: dict[pageKey].faq.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <CalculatorPage calcKey={pageKey} locale={locale} dict={dict} />
      </>
    )
  }

  switch (pageKey) {
    case 'howItWorks':
      return <HowItWorksPage content={dict.howItWorks} />
    case 'contact':
      return <ContactPage content={dict.contact} />
    case 'privacy':
      return <LegalPage content={dict.privacy} />
    case 'terms':
      return <LegalPage content={dict.terms} />
  }
}
