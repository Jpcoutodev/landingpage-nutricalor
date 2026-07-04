import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/dictionaries'
import { SITE_URL, APP_NAME } from '@/lib/constants'
import DeficitCalculator from '@/components/DeficitCalculator'
import AppCTA from '@/components/AppCTA'
import styles from './page.module.css'

type PageProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return {
    title: dict.deficitCalculator.meta.title,
    description: dict.deficitCalculator.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculadora-deficit-calorico`,
      languages: {
        'pt-BR': `${SITE_URL}/pt/calculadora-deficit-calorico`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
      siteName: APP_NAME,
      title: dict.deficitCalculator.meta.title,
      description: dict.deficitCalculator.meta.description,
      url: `${SITE_URL}/${lang}/calculadora-deficit-calorico`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.deficitCalculator.meta.title,
      description: dict.deficitCalculator.meta.description,
    },
  }
}

export default async function CalculadoraDeficitPage({ params }: PageProps) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)
  const t = dict.deficitCalculator

  // JSON-LD FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero: calculator on top */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <header className={styles.intro}>
            <h1 className={styles.title}>{t.h1}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </header>
          <DeficitCalculator dict={{ form: t.form, result: t.result }} />
        </div>
      </div>

      {/* CTA for the app */}
      <section className={styles.ctaSection} aria-label={t.cta.title}>
        <div className={`container container--narrow ${styles.ctaInner}`}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
            <p className={styles.ctaText}>{t.cta.text}</p>
            <div className={styles.ctaBadge}>
              <AppCTA variant="block" dict={dict.common} />
            </div>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <article className={styles.article}>
        <div className={`container container--narrow`}>
          <section className={styles.seoBlock} aria-labelledby="sec-what-is">
            <h2 id="sec-what-is" className={styles.seoTitle}>
              {t.seo.whatIsTitle}
            </h2>
            {t.seo.whatIsText.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          <section className={styles.seoBlock} aria-labelledby="sec-how-calc">
            <h2 id="sec-how-calc" className={styles.seoTitle}>
              {t.seo.howToCalcTitle}
            </h2>
            {t.seo.howToCalcText.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          <section className={styles.seoBlock} aria-labelledby="sec-safe-deficit">
            <h2 id="sec-safe-deficit" className={styles.seoTitle}>
              {t.seo.safeDeficitTitle}
            </h2>
            {t.seo.safeDeficitText.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          <section className={styles.seoBlock} aria-labelledby="sec-weekly-loss">
            <h2 id="sec-weekly-loss" className={styles.seoTitle}>
              {t.seo.weeklyLossTitle}
            </h2>
            {t.seo.weeklyLossText.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* FAQ */}
          <section className={styles.faqSection} aria-labelledby="sec-faq">
            <h2 id="sec-faq" className={styles.seoTitle}>
              {t.faq.title}
            </h2>
            <dl className={styles.faqList}>
              {t.faq.items.map(
                (item: { question: string; answer: string }, i: number) => (
                  <div key={i} className={styles.faqItem}>
                    <dt className={styles.faqQuestion}>{item.question}</dt>
                    <dd className={styles.faqAnswer}>{item.answer}</dd>
                  </div>
                ),
              )}
            </dl>
          </section>

          {/* Cross-links to other calculators */}
          <section className={styles.crossLinksSection} aria-labelledby="sec-cross-links">
            <h2 id="sec-cross-links" className={styles.seoTitle}>
              {t.crossLinks.title}
            </h2>
            <div className={styles.crossLinksGrid}>
              <Link
                href={`/${lang}/calculadora-tmb`}
                className={styles.crossLinkCard}
              >
                <span className={styles.crossLinkIcon} aria-hidden="true">⚡</span>
                <div>
                  <strong className={styles.crossLinkName}>{t.crossLinks.tmb.name}</strong>
                  <p className={styles.crossLinkDesc}>{t.crossLinks.tmb.desc}</p>
                </div>
                <span className={styles.crossLinkArrow} aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${lang}/calculadora-calorias`}
                className={styles.crossLinkCard}
              >
                <span className={styles.crossLinkIcon} aria-hidden="true">🥗</span>
                <div>
                  <strong className={styles.crossLinkName}>{t.crossLinks.calories.name}</strong>
                  <p className={styles.crossLinkDesc}>{t.crossLinks.calories.desc}</p>
                </div>
                <span className={styles.crossLinkArrow} aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
