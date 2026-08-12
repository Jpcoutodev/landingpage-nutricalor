import Spotlight from './Spotlight'
import { IconMapPin, IconMessage, IconShieldCheck } from './icons'
import type { FeaturesDict } from '@/dictionaries/types'
import styles from './SectionFeatures.module.css'

type SectionFeaturesProps = {
  dict: FeaturesDict
}

export default function SectionFeatures({ dict }: SectionFeaturesProps) {
  const features = [
    { Icon: IconMapPin, title: dict.items[0].title, description: dict.items[0].description },
    { Icon: IconMessage, title: dict.items[1].title, description: dict.items[1].description },
    { Icon: IconShieldCheck, title: dict.items[2].title, description: dict.items[2].description },
  ]

  return (
    <section className={`section--lg ${styles.features}`} aria-labelledby="features-title" id="diferenciais">
      <div className={styles.backdrop} aria-hidden="true">
        <div className="tech-grid" />
      </div>

      <div className="container">
        <header className={styles.header} data-reveal>
          <p className="eyebrow">{dict.badge}</p>
          <h2 id="features-title" className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </header>

        <Spotlight className={styles.grid}>
          {features.map(({ Icon, title, description }, i) => (
            <article
              key={title}
              className={styles.card}
              data-spotlight
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <span className={styles.iconTile} aria-hidden="true">
                <Icon size={20} />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{description}</p>
            </article>
          ))}
        </Spotlight>
      </div>
    </section>
  )
}
