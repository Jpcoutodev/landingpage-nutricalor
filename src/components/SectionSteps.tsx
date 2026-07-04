import styles from './SectionSteps.module.css'

type SectionStepsProps = {
  dict: any
}

export default function SectionSteps({ dict }: SectionStepsProps) {
  const stepsData = [
    {
      number: '1',
      emoji: '📷',
      title: dict.items[0].title,
      description: dict.items[0].description,
      accent: 'var(--cor-primario)',
    },
    {
      number: '2',
      emoji: '🤖',
      title: dict.items[1].title,
      description: dict.items[1].description,
      accent: 'var(--cor-gordura)',
    },
    {
      number: '3',
      emoji: '✏️',
      title: dict.items[2].title,
      description: dict.items[2].description,
      accent: 'var(--cor-acao)',
    },
  ]

  return (
    <section className={`section ${styles.steps}`} aria-labelledby="steps-title" id="como-funciona-resumo">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.badge}>{dict.badge}</span>
          <h2 id="steps-title" className={styles.title}>
            {dict.title}
          </h2>
          <p className={styles.subtitle}>
            {dict.subtitle}
          </p>
        </div>

        <ol className={styles.grid}>
          {stepsData.map((step, i) => (
            <li
              key={step.number}
              className={`${styles.card} animate-fade-in-up animate-delay-${i + 1}`}
            >
              <div className={styles.cardAccent} style={{ background: step.accent }} />
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <span className={styles.number} style={{ background: step.accent }}>{step.number}</span>
                  <span className={styles.emoji}>{step.emoji}</span>
                </div>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Connector line (desktop) */}
        <div className={styles.connector} aria-hidden="true">
          <div className={styles.connectorLine} />
        </div>
      </div>
    </section>
  )
}
