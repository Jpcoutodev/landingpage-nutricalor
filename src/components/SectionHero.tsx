import Link from 'next/link'
import AppCTA from './AppCTA'
import CountUp from './CountUp'
import PlateScan from './PlateScan'
import { IconArrowRight, IconCpu, IconZap } from './icons'
import { pathFor, type Locale } from '@/lib/routes'
import type { CommonDict, HeroDict } from '@/dictionaries/types'
import styles from './SectionHero.module.css'

type SectionHeroProps = {
  dict: HeroDict
  ctaDict: CommonDict
  locale: Locale
}

export default function SectionHero({ dict, ctaDict, locale }: SectionHeroProps) {
  const stats = dict.stats

  return (
    <section className={styles.hero} aria-labelledby="hero-title" id="hero">
      {/* Fundo: grid técnico + aurora */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className="tech-grid" />
        <div className={styles.auroraA} />
        <div className={styles.auroraB} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>
            <span className={styles.liveDot} />
            {dict.pill}
          </p>

          <h1 id="hero-title" className={styles.title}>
            {dict.titlePart1}{' '}
            <span className={styles.highlight}>{dict.titlePart2}</span>
          </h1>

          <p className={styles.subtitle}>{dict.subtitle}</p>

          <div className={styles.actions}>
            <AppCTA variant="block" dict={ctaDict} />
            <Link href={pathFor('howItWorks', locale)} className={styles.secondaryCta}>
              {dict.secondaryCta}
              <IconArrowRight size={16} className={styles.secondaryIcon} />
            </Link>
          </div>

          {stats.length > 0 && (
            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className={styles.visual}>
          <div className={styles.deviceGlow} aria-hidden="true" />

          <figure className={styles.device}>
            {/* Barra de status do app */}
            <div className={styles.deviceBar}>
              <span className={styles.deviceBrand}>
                <IconCpu size={13} />
                nutricalor
              </span>
              <span className={styles.deviceStatus}>
                <span className={styles.liveDot} />
                {dict.scanLabel}
              </span>
            </div>

            {/* Área de captura com detecções */}
            <PlateScan dict={dict} />

            {/* Leitura nutricional */}
            <figcaption className={styles.readout}>
              <div className={styles.calorieRow}>
                <span className={styles.calorieNum}>
                  <CountUp value={487} />
                </span>
                <span className={styles.calorieUnit}>kcal</span>
                <span className={styles.confidence}>
                  <IconZap size={12} />
                  2.1s
                </span>
              </div>

              <div className={styles.macros}>
                {[
                  { label: dict.protein, value: '32g', pct: 72, color: 'var(--cor-proteina)' },
                  { label: dict.carbs, value: '58g', pct: 88, color: 'var(--cor-carbo)' },
                  { label: dict.fat, value: '18g', pct: 44, color: 'var(--cor-gordura)' },
                ].map((macro, i) => (
                  <div key={macro.label} className={styles.macro}>
                    <div className={styles.macroHead}>
                      <span className={styles.macroLabel}>{macro.label}</span>
                      <span className={styles.macroValue}>{macro.value}</span>
                    </div>
                    <div className={styles.macroTrack}>
                      <span
                        className={styles.macroFill}
                        style={{
                          background: macro.color,
                          width: `${macro.pct}%`,
                          animationDelay: `${0.9 + i * 0.12}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </figcaption>
          </figure>

          {/* Chips flutuantes */}
          <div className={`${styles.chip} ${styles.chipA}`} aria-hidden="true">
            <IconCpu size={14} className={styles.chipIcon} />
            {dict.badge1}
          </div>
        </div>
      </div>
    </section>
  )
}
