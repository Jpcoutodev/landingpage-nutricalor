import styles from './SectionFeatures.module.css'

type SectionFeaturesProps = {
  dict: any
}

export default function SectionFeatures({ dict }: SectionFeaturesProps) {
  const featuresData = [
    {
      icon: '🇧🇷',
      title: dict.items[0].title,
      description: dict.items[0].description,
      gradient: 'linear-gradient(135deg, #e8f5ee 0%, #f0f7f4 100%)',
    },
    {
      icon: '💬',
      title: dict.items[1].title,
      description: dict.items[1].description,
      gradient: 'linear-gradient(135deg, #f0eef9 0%, #f5f3fc 100%)',
    },
    {
      icon: '💰',
      title: dict.items[2].title,
      description: dict.items[2].description,
      gradient: 'linear-gradient(135deg, #fef3ec 0%, #fff8f4 100%)',
    },
  ]

  return (
    <section className={`section--lg ${styles.features}`} aria-labelledby="features-title" id="diferenciais">
      {/* Background decoration */}
      <div className={styles.bgDecor} aria-hidden="true" />

      <div className="container">
        <div className={styles.header}>
          <span className={styles.badge}>{dict.badge}</span>
          <h2 id="features-title" className={styles.title}>
            {dict.title}
          </h2>
          <p className={styles.subtitle}>
            {dict.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {featuresData.map((feature, i) => (
            <div
              key={feature.title}
              className={`${styles.card} animate-fade-in-up animate-delay-${i + 1}`}
            >
              <div className={styles.iconWrap} style={{ background: feature.gradient }}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
