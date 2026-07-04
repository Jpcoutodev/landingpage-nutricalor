import AppCTA from './AppCTA'
import styles from './SectionHero.module.css'

type SectionHeroProps = {
  dict: any
  ctaDict: any
}

export default function SectionHero({ dict, ctaDict }: SectionHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" id="hero">
      {/* Decorative blobs */}
      <div className={styles.blobWrap} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            {dict.pill}
          </div>
          <h1 id="hero-title" className={styles.title}>
            {dict.titlePart1}{' '}
            <span className={styles.highlight}>{dict.titlePart2}</span>
          </h1>
          <p className={styles.subtitle}>
            {dict.subtitle}
          </p>
          <div className={styles.ctaWrapper}>
            <AppCTA variant="block" dict={ctaDict} />
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.phoneGlow} />
          <div className={styles.phone}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              {/* Photo area */}
              <div className={styles.photoArea}>
                <div className={styles.photoGrad} />
                <span className={styles.cameraIcon}>📸</span>
                <span className={styles.photoLabel}>{dict.photoLabel}</span>
              </div>

              {/* Macro bars */}
              <div className={styles.macroSection}>
                <div className={styles.calorieRow}>
                  <span className={styles.calorieNum}>487</span>
                  <span className={styles.calorieUnit}>kcal</span>
                </div>

                <div className={styles.macroRow}>
                  <div className={styles.macroItem}>
                    <div className={styles.macroBar}>
                      <div className={styles.macroFill} style={{ background: 'var(--cor-proteina)', width: '72%' }} />
                    </div>
                    <span className={styles.macroLabel}>{dict.protein}</span>
                    <span className={styles.macroValue}>32g</span>
                  </div>
                  <div className={styles.macroItem}>
                    <div className={styles.macroBar}>
                      <div className={styles.macroFill} style={{ background: 'var(--cor-carbo)', width: '85%' }} />
                    </div>
                    <span className={styles.macroLabel}>{dict.carbs}</span>
                    <span className={styles.macroValue}>58g</span>
                  </div>
                  <div className={styles.macroItem}>
                    <div className={styles.macroBar}>
                      <div className={styles.macroFill} style={{ background: 'var(--cor-gordura)', width: '45%' }} />
                    </div>
                    <span className={styles.macroLabel}>{dict.fat}</span>
                    <span className={styles.macroValue}>18g</span>
                  </div>
                </div>
              </div>

              {/* Food items */}
              <div className={styles.foodList}>
                <div className={styles.foodItem}>
                  <span>🍚</span> <span>{dict.food1}</span> <span className={styles.foodGrams}>150g</span>
                </div>
                <div className={styles.foodItem}>
                  <span>🫘</span> <span>{dict.food2}</span> <span className={styles.foodGrams}>80g</span>
                </div>
                <div className={styles.foodItem}>
                  <span>🍗</span> <span>{dict.food3}</span> <span className={styles.foodGrams}>120g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className={`${styles.floatingBadge} ${styles.badgeTop}`}>
            <span>✨</span> {dict.badge1}
          </div>
          <div className={`${styles.floatingBadge} ${styles.badgeBottom}`}>
            <span>⚡</span> 2.3s
          </div>
        </div>
      </div>
    </section>
  )
}
