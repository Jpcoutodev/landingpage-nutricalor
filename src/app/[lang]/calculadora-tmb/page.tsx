import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import { SITE_URL, APP_NAME } from '@/lib/constants'
import TmbCalculator from '@/components/TmbCalculator'
import AppCTA from '@/components/AppCTA'
import styles from './page.module.css'

type PageProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return {
    title: dict.tmbCalculator.meta.title,
    description: dict.tmbCalculator.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/calculadora-tmb`,
      languages: {
        'pt-BR': `${SITE_URL}/pt/calculadora-tmb`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
      siteName: APP_NAME,
      title: dict.tmbCalculator.meta.title,
      description: dict.tmbCalculator.meta.description,
      url: `${SITE_URL}/${lang}/calculadora-tmb`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.tmbCalculator.meta.title,
      description: dict.tmbCalculator.meta.description,
    },
  }
}

export default async function CalculadoraTmbPage({ params }: PageProps) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)
  const t = dict.tmbCalculator

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
          <TmbCalculator dict={{ form: t.form, result: t.result }} />
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
              {t.seo.howCalculatedTitle}
            </h2>
            {t.seo.howCalculatedText.split('\n\n').map((p: string, i: number) => (
              <p key={i} className={p.startsWith('•') ? styles.formulaBlock : undefined}>
                {p}
              </p>
            ))}
          </section>

          <section className={styles.seoBlock} aria-labelledby="sec-difference">
            <h2 id="sec-difference" className={styles.seoTitle}>
              {t.seo.differenceTitle}
            </h2>
            {t.seo.differenceText.split('\n\n').map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          <section className={styles.seoBlock} aria-labelledby="sec-what-to-do">
            <h2 id="sec-what-to-do" className={styles.seoTitle}>
              {t.seo.whatToDoTitle}
            </h2>
            {t.seo.whatToDoText.split('\n\n').map((p: string, i: number) => (
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
        </div>
      </article>
    </>
  )
}
