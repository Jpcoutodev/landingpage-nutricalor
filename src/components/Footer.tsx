'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
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
    imcCalculator?: string
    macrosCalculator?: string
  }
}

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'pt'

  const tools = [
    { href: `/${locale}/calculadora-tmb`, label: dict.tmbCalculator },
    { href: `/${locale}/calculadora-deficit-calorico`, label: dict.deficitCalculator },
    { href: `/${locale}/calculadora-calorias`, label: dict.caloriesCalculator },
    { href: `/${locale}/calculadora-imc`, label: dict.imcCalculator },
    { href: `/${locale}/calculadora-macros`, label: dict.macrosCalculator },
  ].filter((tool) => Boolean(tool.label))

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href={`/${locale}`} className={styles.logo}>
              <Logo size={26} />
              <span className={styles.logoText}>Nutricalor</span>
            </Link>
            <p className={styles.tagline}>{dict.tagline}</p>
          </div>

          <nav className={styles.links} aria-label="Rodapé">
            <div className={styles.linkGroup}>
              <h2 className={styles.linkTitle}>Legal</h2>
              <Link href={`/${locale}/privacidade`}>{dict.privacy}</Link>
              <Link href={`/${locale}/termos`}>{dict.terms}</Link>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.linkTitle}>{dict.contact}</h2>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <Link href={`/${locale}/contato`}>Formulário</Link>
            </div>

            {dict.tools && tools.length > 0 && (
              <div className={styles.linkGroup}>
                <h2 className={styles.linkTitle}>{dict.tools}</h2>
                {tools.map((tool) => (
                  <Link key={tool.href} href={tool.href}>
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {currentYear} Nutricalor. {dict.rights}
          </p>
          <p className={styles.madeIn}>
            <span className={styles.madeDot} />
            Feito no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}
