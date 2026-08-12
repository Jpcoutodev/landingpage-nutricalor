import Link from 'next/link'
import AppCTA from '@/components/AppCTA'
import CaloriesCalculator from '@/components/CaloriesCalculator'
import DeficitCalculator from '@/components/DeficitCalculator'
import ImcCalculator from '@/components/ImcCalculator'
import MacrosCalculator from '@/components/MacrosCalculator'
import TmbCalculator from '@/components/TmbCalculator'
import {
  IconArrowRight,
  IconFlame,
  IconGauge,
  IconLeaf,
  IconPieChart,
  IconScale,
} from '@/components/icons'
import { pathFor, type Locale, type PageKey } from '@/lib/routes'
import type { CalculatorKey, Dictionary } from '@/dictionaries/types'
import styles from './CalculatorPage.module.css'

type CalculatorPageProps = {
  calcKey: CalculatorKey
  locale: Locale
  dict: Dictionary
}

/** Ícone de cada calculadora — o mesmo em toda referência a ela no site. */
const CALC_ICON = {
  tmbCalculator: IconGauge,
  deficitCalculator: IconFlame,
  caloriesCalculator: IconLeaf,
  imcCalculator: IconScale,
  macrosCalculator: IconPieChart,
} as const

/**
 * Cada calculadora tem um formato próprio de `form`/`result`, então o switch
 * é o que permite passar as props corretamente tipadas sem recorrer a `any`.
 */
function Calculator({ calcKey, dict }: { calcKey: CalculatorKey; dict: Dictionary }) {
  switch (calcKey) {
    case 'tmbCalculator': {
      const t = dict.tmbCalculator
      return <TmbCalculator dict={{ form: t.form, result: t.result }} />
    }
    case 'deficitCalculator': {
      const t = dict.deficitCalculator
      return <DeficitCalculator dict={{ form: t.form, result: t.result }} />
    }
    case 'caloriesCalculator': {
      const t = dict.caloriesCalculator
      return <CaloriesCalculator dict={{ form: t.form, result: t.result }} />
    }
    case 'imcCalculator': {
      const t = dict.imcCalculator
      return <ImcCalculator dict={{ form: t.form, result: t.result }} />
    }
    case 'macrosCalculator': {
      const t = dict.macrosCalculator
      return <MacrosCalculator dict={{ form: t.form, result: t.result }} />
    }
  }
}

export default function CalculatorPage({ calcKey, locale, dict }: CalculatorPageProps) {
  const t = dict[calcKey]

  return (
    <>
      {/* Calculadora no topo — é o que a pessoa veio fazer */}
      <div className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <header className={styles.intro}>
            <h1 className={styles.title}>{t.h1}</h1>
            <p className={styles.subtitle}>{t.subtitle}</p>
          </header>
          <Calculator calcKey={calcKey} dict={dict} />
        </div>
      </div>

      <section className={styles.ctaSection} aria-label={t.cta.title}>
        <div className={`container container--narrow ${styles.ctaInner}`}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t.cta.title}</h2>
            <p className={styles.ctaText}>{t.cta.text}</p>
            <div className={styles.ctaBadge}>
              <AppCTA variant="block" dict={dict.common} />
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo de apoio (SEO) */}
      <article className={styles.article}>
        <div className="container container--narrow">
          {t.seo.blocks.map((block, i) => (
            <section key={block.title} className={styles.seoBlock} aria-labelledby={`sec-${i}`}>
              <h2 id={`sec-${i}`} className={styles.seoTitle}>
                {block.title}
              </h2>
              {block.text.split('\n\n').map((paragraph, j) => (
                <p key={j} className={paragraph.startsWith('•') ? styles.formulaBlock : undefined}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className={styles.faqSection} aria-labelledby="sec-faq">
            <h2 id="sec-faq" className={styles.seoTitle}>
              {t.faq.title}
            </h2>
            <dl className={styles.faqList}>
              {t.faq.items.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <dt className={styles.faqQuestion}>{item.question}</dt>
                  <dd className={styles.faqAnswer}>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.crossLinksSection} aria-labelledby="sec-cross-links">
            <h2 id="sec-cross-links" className={styles.seoTitle}>
              {t.crossLinks.title}
            </h2>
            <div className={styles.crossLinksGrid}>
              {t.crossLinks.items.map((item) => {
                const Icon = CALC_ICON[item.to as CalculatorKey]
                return (
                  <Link
                    key={item.to}
                    href={pathFor(item.to as PageKey, locale)}
                    className={styles.crossLinkCard}
                  >
                    <span className={styles.crossLinkIcon} aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <strong className={styles.crossLinkName}>{item.name}</strong>
                      <p className={styles.crossLinkDesc}>{item.desc}</p>
                    </div>
                    <IconArrowRight size={18} className={styles.crossLinkArrow} />
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
