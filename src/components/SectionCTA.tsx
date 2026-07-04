import AppCTA from './AppCTA'
import styles from './SectionCTA.module.css'

type SectionCTAProps = {
  dict: any
  ctaDict: any
}

export default function SectionCTA({ dict, ctaDict }: SectionCTAProps) {
  return (
    <section className={`section--lg ${styles.cta}`} aria-labelledby="cta-title" id="cta-final">
      {/* Animated gradient orbs */}
      <div className={styles.orbWrap} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <div className={`container ${styles.inner}`}>
        <span className={styles.eyebrow}>{dict.eyebrow}</span>
        <h2 id="cta-title" className={styles.title}>
          {dict.titlePart1}{' '}
          <span className={styles.highlight}>{dict.titlePart2}</span>
        </h2>
        <p className={styles.subtitle}>
          {dict.subtitle}
        </p>
        <div className={styles.ctaWrapper}>
          <AppCTA variant="block" dict={ctaDict} />
        </div>
      </div>
    </section>
  )
}
