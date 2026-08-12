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
import { APP_NAME } from '@/lib/constants'
import type { HowItWorksDict } from '@/dictionaries/types'
import styles from './HowItWorksPage.module.css'

type HowItWorksPageProps = {
  content: HowItWorksDict
}

export default function HowItWorksPage({ content }: HowItWorksPageProps) {
  const methods = [
    { Icon: IconPencil, item: content.section3.methods[0] },
    { Icon: IconSearch, item: content.section3.methods[2] },
    { Icon: IconSmartphone, item: content.section3.methods[1] },
    { Icon: IconSparkle, item: content.section3.methods[3] },
  ]

  const blocks = [
    { Icon: IconCamera, index: '01', section: content.section1, alt: false },
    { Icon: IconSliders, index: '02', section: content.section2, alt: true },
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

        {blocks.map(({ Icon, index, section, alt }) => (
          <section
            key={index}
            className={`${styles.block} ${alt ? styles.blockAlt : ''}`}
            aria-labelledby={`sec-${index}`}
          >
            <div className="container container--narrow" data-reveal>
              <div className={styles.blockHeader}>
                <span className={styles.blockIcon} aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className={styles.blockIndex}>{index}</span>
                <h2 id={`sec-${index}`} className={styles.blockTitle}>
                  {section.title}
                </h2>
              </div>
              <p>{section.text}</p>
            </div>
          </section>
        ))}

        <section className={styles.block} aria-labelledby="sec-03">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={styles.blockIcon} aria-hidden="true">
                <IconRefresh size={20} />
              </span>
              <span className={styles.blockIndex}>03</span>
              <h2 id="sec-03" className={styles.blockTitle}>
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

        <section className={`${styles.block} ${styles.blockAlt}`} aria-labelledby="sec-04">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={styles.blockIcon} aria-hidden="true">
                <IconTarget size={20} />
              </span>
              <span className={styles.blockIndex}>04</span>
              <h2 id="sec-04" className={styles.blockTitle}>
                {content.section4.title}
              </h2>
            </div>
            <p>{content.section4.text}</p>
          </div>
        </section>

        <section className={`${styles.block} ${styles.honestNote}`} aria-labelledby="sec-note">
          <div className="container container--narrow" data-reveal>
            <div className={styles.blockHeader}>
              <span className={`${styles.blockIcon} ${styles.noteIcon}`} aria-hidden="true">
                <IconBulb size={20} />
              </span>
              <h2 id="sec-note" className={styles.blockTitle}>
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
