import Link from 'next/link'
import Logo from './Logo'
import { CONTACT_EMAIL } from '@/lib/constants'
import { CALCULATOR_KEYS, homePath, pathFor, type Locale } from '@/lib/routes'
import type { FooterDict } from '@/dictionaries/types'
import styles from './Footer.module.css'

type FooterProps = {
  locale: Locale
  dict: FooterDict
}

/** Rótulo de cada calculadora no rodapé, na ordem do registro de rotas. */
const CALCULATOR_LABEL = {
  tmbCalculator: 'tmbCalculator',
  deficitCalculator: 'deficitCalculator',
  caloriesCalculator: 'caloriesCalculator',
  imcCalculator: 'imcCalculator',
  macrosCalculator: 'macrosCalculator',
} as const satisfies Record<(typeof CALCULATOR_KEYS)[number], keyof FooterDict>

export default function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href={homePath(locale)} className={styles.logo}>
              <Logo size={26} />
              <span className={styles.logoText}>Nutricalor</span>
            </Link>
            <p className={styles.tagline}>{dict.tagline}</p>
          </div>

          <nav className={styles.links} aria-label={dict.navLabel}>
            <div className={styles.linkGroup}>
              <h2 className={styles.linkTitle}>{dict.legal}</h2>
              <Link href={pathFor('privacy', locale)}>{dict.privacy}</Link>
              <Link href={pathFor('terms', locale)}>{dict.terms}</Link>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.linkTitle}>{dict.contact}</h2>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <Link href={pathFor('contact', locale)}>{dict.contactForm}</Link>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.linkTitle}>{dict.tools}</h2>
              {CALCULATOR_KEYS.map((key) => (
                <Link key={key} href={pathFor(key, locale)}>
                  {dict[CALCULATOR_LABEL[key]]}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {currentYear} Nutricalor. {dict.rights}
          </p>
          <p className={styles.madeIn}>
            <span className={styles.madeDot} />
            {dict.madeIn}
          </p>
        </div>
      </div>
    </footer>
  )
}
