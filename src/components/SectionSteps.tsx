import { IconCamera, IconCpu, IconSliders } from './icons'
import type { StepsDict } from '@/dictionaries/types'
import styles from './SectionSteps.module.css'

type SectionStepsProps = {
  dict: StepsDict
}

export default function SectionSteps({ dict }: SectionStepsProps) {
  const steps = [
    { number: '01', Icon: IconCamera, title: dict.items[0].title, description: dict.items[0].description },
    { number: '02', Icon: IconCpu, title: dict.items[1].title, description: dict.items[1].description },
    { number: '03', Icon: IconSliders, title: dict.items[2].title, description: dict.items[2].description },
  ]

  return (
    <section className={`section ${styles.steps}`} aria-labelledby="steps-title" id="como-funciona-resumo">
      <div className="container">
        <header className={styles.header} data-reveal>
          <p className="eyebrow">{dict.badge}</p>
          <h2 id="steps-title" className={styles.title}>{dict.title}</h2>
          <p className={styles.subtitle}>{dict.subtitle}</p>
        </header>

        <ol className={styles.grid}>
          {steps.map(({ number, Icon, title, description }, i) => (
            <li
              key={number}
              className={styles.step}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              {/* Trilho: número + linha de conexão */}
              <div className={styles.rail}>
                <span className={styles.number}>{number}</span>
                <span className={styles.railLine} aria-hidden="true" />
              </div>

              <span className={styles.iconTile} aria-hidden="true">
                <Icon size={20} />
              </span>

              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepDesc}>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
