import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import styles from './page.module.css'
import { SITE_URL, APP_NAME } from '@/lib/constants'

type PageProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return {
    title: dict.howItWorks.meta.title,
    description: dict.howItWorks.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/como-funciona`,
      languages: {
        'pt-BR': `${SITE_URL}/pt/como-funciona`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
      siteName: APP_NAME,
      title: dict.howItWorks.meta.title,
      description: dict.howItWorks.meta.description,
      url: `${SITE_URL}/${lang}/como-funciona`,
    },
  }
}

export default async function ComoFuncionaPage({ params }: PageProps) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)
  const content = dict.howItWorks

  return (
    <div className={styles.page}>
      <header className={`container ${styles.intro}`}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.lead}>{content.lead}</p>
      </header>

      <section className={styles.block} aria-labelledby="sec-foto">
        <div className={`container container--narrow`}>
          <div className={styles.blockHeader}>
            <span className={styles.blockEmoji} aria-hidden="true">📷</span>
            <h2 id="sec-foto" className={styles.blockTitle}>
              {content.section1.title}
            </h2>
          </div>
          <p>{content.section1.text}</p>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockAlt}`} aria-labelledby="sec-controle">
        <div className={`container container--narrow`}>
          <div className={styles.blockHeader}>
            <span className={styles.blockEmoji} aria-hidden="true">🛠️</span>
            <h2 id="sec-controle" className={styles.blockTitle}>
              {content.section2.title}
            </h2>
          </div>
          <p>{content.section2.text}</p>
        </div>
      </section>

      <section className={styles.block} aria-labelledby="sec-metodos">
        <div className={`container container--narrow`}>
          <div className={styles.blockHeader}>
            <span className={styles.blockEmoji} aria-hidden="true">🔄</span>
            <h2 id="sec-metodos" className={styles.blockTitle}>
              {content.section3.title}
            </h2>
          </div>
          <p>{content.section3.text}</p>

          <div className={styles.methodsGrid}>
            <div className={styles.methodCard}>
              <span className={styles.methodEmoji}>✍️</span>
              <div>
                <strong>{content.section3.methods[0].title}</strong> <span className={styles.methodDash}>—</span>{' '}
                {content.section3.methods[0].description}
              </div>
            </div>
            <div className={styles.methodCard}>
              <span className={styles.methodEmoji}>🔍</span>
              <div>
                <strong>{content.section3.methods[2].title}</strong> <span className={styles.methodDash}>—</span>{' '}
                {content.section3.methods[2].description}
              </div>
            </div>
            <div className={styles.methodCard}>
              <span className={styles.methodEmoji}>📱</span>
              <div>
                <strong>{content.section3.methods[1].title}</strong> <span className={styles.methodDash}>—</span>{' '}
                {content.section3.methods[1].description}
              </div>
            </div>
            <div className={styles.methodCard}>
              <span className={styles.methodEmoji}>🧠</span>
              <div>
                <strong>{content.section3.methods[3].title}</strong> <span className={styles.methodDash}>—</span>{' '}
                {content.section3.methods[3].description}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.block} ${styles.blockAlt}`} aria-labelledby="sec-metas">
        <div className={`container container--narrow`}>
          <div className={styles.blockHeader}>
            <span className={styles.blockEmoji} aria-hidden="true">🎯</span>
            <h2 id="sec-metas" className={styles.blockTitle}>
              {content.section4.title}
            </h2>
          </div>
          <p>{content.section4.text}</p>
        </div>
      </section>

      <section className={`${styles.block} ${styles.honestNote}`} aria-labelledby="sec-nota">
        <div className={`container container--narrow`}>
          <div className={styles.blockHeader}>
            <span className={styles.blockEmoji} aria-hidden="true">💡</span>
            <h2 id="sec-nota" className={styles.blockTitle}>
              {content.section5.title}
            </h2>
          </div>
          <p>{content.section5.text}</p>
        </div>
      </section>
    </div>
  )
}
