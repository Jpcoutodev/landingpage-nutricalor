import AppCTA from './AppCTA'
import { IconSparkle } from './icons'
import type { CommonDict, CtaDict } from '@/dictionaries/types'
import styles from './SectionCTA.module.css'

type SectionCTAProps = {
  dict: CtaDict
  ctaDict: CommonDict
}

export default function SectionCTA({ dict, ctaDict }: SectionCTAProps) {
  return (
    <section className={`section--lg ${styles.cta}`} aria-labelledby="cta-title" id="cta-final">
      <div className="container">
        {/* Painel escuro: único momento de alto contraste da página */}
        <div className={styles.panel} data-reveal>
          <div className={styles.panelBackdrop} aria-hidden="true">
            <div className={styles.panelGrid} />
            <div className={styles.glowA} />
            <div className={styles.glowB} />
          </div>

          <div className={styles.panelContent}>
            <p className={styles.eyebrow}>
              <IconSparkle size={13} />
              {dict.eyebrow}
            </p>

            <h2 id="cta-title" className={styles.title}>
              {dict.titlePart1}{' '}
              <span className={styles.highlight}>{dict.titlePart2}</span>
            </h2>

            <p className={styles.subtitle}>{dict.subtitle}</p>

            <div className={styles.actions}>
              <AppCTA variant="block" tone="dark" dict={ctaDict} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
