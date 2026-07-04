'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_EMAIL } from '@/lib/constants'
import styles from './Footer.module.css'

type FooterProps = {
  dict: {
    tagline: string
    privacy: string
    terms: string
    contact: string
    rights: string
    tools?: string
    tmbCalculator?: string
    deficitCalculator?: string
    caloriesCalculator?: string
  }
}

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'pt'

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href={`/${locale}`} className={styles.logo}>
              Nutricalor <span className={styles.dot}>.</span>
            </Link>
            <p className={styles.tagline}>{dict.tagline}</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>Legal</h3>
              <Link href={`/${locale}/privacidade`}>{dict.privacy}</Link>
              <Link href={`/${locale}/termos`}>{dict.terms}</Link>
            </div>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>{dict.contact}</h3>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <Link href={`/${locale}/contato`}>Formulário</Link>
            </div>
            {dict.tools && (
              <div className={styles.linkGroup}>
                <h3 className={styles.linkTitle}>{dict.tools}</h3>
                {dict.tmbCalculator && (
                  <Link href={`/${locale}/calculadora-tmb`}>{dict.tmbCalculator}</Link>
                )}
                {dict.deficitCalculator && (
                  <Link href={`/${locale}/calculadora-deficit-calorico`}>{dict.deficitCalculator}</Link>
                )}
                {dict.caloriesCalculator && (
                  <Link href={`/${locale}/calculadora-calorias`}>{dict.caloriesCalculator}</Link>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {currentYear} Nutricalor. {dict.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

