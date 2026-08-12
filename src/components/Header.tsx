'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AppCTA from './AppCTA'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { IconChevronDown } from './icons'
import { CALCULATOR_KEYS, homePath, pathFor, type Locale } from '@/lib/routes'
import type { CommonDict, NavDict } from '@/dictionaries/types'
import styles from './Header.module.css'

type HeaderProps = {
  locale: Locale
  dict: NavDict
  ctaDict: CommonDict
}

/** Rótulo de cada calculadora no menu, na ordem do registro de rotas. */
const CALCULATOR_LABEL = {
  tmbCalculator: 'tmbCalculator',
  deficitCalculator: 'deficitCalculator',
  caloriesCalculator: 'caloriesCalculator',
  imcCalculator: 'imcCalculator',
  macrosCalculator: 'macrosCalculator',
} as const satisfies Record<(typeof CALCULATOR_KEYS)[number], keyof NavDict>

export default function Header({ locale, dict, ctaDict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === homePath(locale)
  const currentSlug = pathname.split('/').filter(Boolean)[1]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trava a rolagem do fundo enquanto o menu mobile está aberto
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isMobileMenuOpen])

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
  }

  const isCurrent = (slug: string) => currentSlug === slug
  const isCalculatorPage = CALCULATOR_KEYS.some((key) => isCurrent(pathFor(key, locale).split('/')[2]))

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href={homePath(locale)} className={styles.logo} onClick={closeMenu}>
          <Logo className={styles.logoIcon} size={28} />
          <span className={styles.logoText}>Nutricalor</span>
        </Link>

        <nav
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}
          aria-label={dict.mainMenu}
        >
          <ul className={styles.navList}>
            <li className={styles.navItemMobileOnly}>
              <Link
                href={homePath(locale)}
                onClick={closeMenu}
                className={`${styles.navLink} ${isHome ? styles.active : ''}`}
              >
                {dict.home}
              </Link>
            </li>

            <li className={styles.navItem}>
              <Link
                href={pathFor('howItWorks', locale)}
                onClick={closeMenu}
                className={`${styles.navLink} ${
                  isCurrent(pathFor('howItWorks', locale).split('/')[2]) ? styles.active : ''
                }`}
              >
                {dict.howItWorks}
              </Link>
            </li>

            <li
              className={styles.navItem}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`${styles.navLink} ${styles.dropdownTrigger} ${
                  isCalculatorPage ? styles.active : ''
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                {dict.calculators}
                <IconChevronDown size={14} className={styles.chevron} />
              </button>

              <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.dropdownOpen : ''}`}>
                {CALCULATOR_KEYS.map((key) => {
                  const href = pathFor(key, locale)
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className={`${styles.dropdownLink} ${
                          isCurrent(href.split('/')[2]) ? styles.active : ''
                        }`}
                      >
                        {dict[CALCULATOR_LABEL[key]]}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            <li className={styles.navItem}>
              <Link
                href={pathFor('contact', locale)}
                onClick={closeMenu}
                className={`${styles.navLink} ${
                  isCurrent(pathFor('contact', locale).split('/')[2]) ? styles.active : ''
                }`}
              >
                {dict.contact}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher locale={locale} onNavigate={closeMenu} />

          <div className={styles.ctaWrapper}>
            <AppCTA variant="header" dict={ctaDict} />
          </div>

          <button
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={dict.menu}
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </div>
    </header>
  )
}
