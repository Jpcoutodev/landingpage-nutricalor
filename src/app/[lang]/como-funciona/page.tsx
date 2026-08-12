import type { Metadata } from 'next'
import { getDictionary } from '@/dictionaries'
import Reveal from '@/components/Reveal'
import {
  IconBulb,
  IconCamera,
  IconPencil,
  IconRefresh,
  IconSearch,
  IconSliders,
  IconSmartphone,
  IconSparkle,
  IconTarget,
} from '@/components/icons'
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

  const methods = [
    { Icon: IconPencil, item: content.section3.methods[0] },
    { Icon: IconSearch, item: content.section3.methods[2] },
    { Icon: IconSmartphone, item: content.section3.methods[1] },
    { Icon: IconSparkle, item: content.section3.methods[3] },
  ]

  return (
    <Reveal>
      <div className={styles.page}>
        <header className={styles.intro}>
          <div className={styles.introBackdrop} aria-hidden="true">
            <div className="tech-grid" />
          </div>
          <div className="container">
            <p className="eyebrow">{APP_NAME}</p>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.lead}>{content.lead}</p>
          </div>
        </header>

        <section className={styles.block} aria-labelledby="sec-foto">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={styles.blockIcon} aria-hidden="true">
                <IconCamera size={20} />
              </span>
              <span className={styles.blockIndex}>01</span>
              <h2 id="sec-foto" className={styles.blockTitle}>
                {content.section1.title}
              </h2>
            </div>
            <p>{content.section1.text}</p>
          </div>
        </section>

        <section className={`${styles.block} ${styles.blockAlt}`} aria-labelledby="sec-controle">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={styles.blockIcon} aria-hidden="true">
                <IconSliders size={20} />
              </span>
              <span className={styles.blockIndex}>02</span>
              <h2 id="sec-controle" className={styles.blockTitle}>
                {content.section2.title}
              </h2>
            </div>
            <p>{content.section2.text}</p>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="sec-metodos">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={styles.blockIcon} aria-hidden="true">
                <IconRefresh size={20} />
              </span>
              <span className={styles.blockIndex}>03</span>
              <h2 id="sec-metodos" className={styles.blockTitle}>
                {content.section3.title}
              </h2>
            </div>
            <p>{content.section3.text}</p>

            <div className={styles.methodsGrid}>
              {methods.map(({ Icon, item }) => (
                <div key={item.title} className={styles.methodCard}>
                  <span className={styles.methodIcon} aria-hidden="true">
                    <Icon size={17} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span className={styles.methodDash}> — </span>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.blockAlt}`} aria-labelledby="sec-metas">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={styles.blockIcon} aria-hidden="true">
                <IconTarget size={20} />
              </span>
              <span className={styles.blockIndex}>04</span>
              <h2 id="sec-metas" className={styles.blockTitle}>
                {content.section4.title}
              </h2>
            </div>
            <p>{content.section4.text}</p>
          </div>
        </section>

        <section className={`${styles.block} ${styles.honestNote}`} aria-labelledby="sec-nota">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={`${styles.blockIcon} ${styles.noteIcon}`} aria-hidden="true">
                <IconBulb size={20} />
              </span>
              <h2 id="sec-nota" className={styles.blockTitle}>
                {content.section5.title}
              </h2>
            </div>
            <p>{content.section5.text}</p>
          </div>
        </section>
      </div>
    </Reveal>
  )
}
