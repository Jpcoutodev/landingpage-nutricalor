'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AppCTA from './AppCTA'
import Logo from './Logo'
import styles from './Header.module.css'

type HeaderProps = {
  dict: {
    home: string
    howItWorks: string
    contact: string
    calculators?: string
    tmbCalculator?: string
    deficitCalculator?: string
    caloriesCalculator?: string
    imcCalculator?: string
    macrosCalculator?: string
  }
  ctaDict: {
    comingSoon: string
    available: string
    googlePlay: string
  }
}

export default function Header({ dict, ctaDict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  
  const locale = pathname.split('/')[1] || 'pt'
  const isHome = pathname === `/${locale}` || pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href={`/${locale}`} className={styles.logo} onClick={closeMenu}>
          <Logo className={styles.logoIcon} />
          <span className={styles.logoText}>Nutricalor</span>
        </Link>

        {/* Navigation */}
        <nav
          className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}
          aria-label="Menu principal"
        >
          <ul className={styles.navList}>
            <li className={styles.navItemMobileOnly}>
              <Link
                href={`/${locale}`}
                onClick={closeMenu}
                className={`${styles.navLink} ${isHome ? styles.active : ''}`}
              >
                {dict.home}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                href={`/${locale}/como-funciona`}
                onClick={closeMenu}
                className={`${styles.navLink} ${pathname.includes('/como-funciona') ? styles.active : ''}`}
              >
                {dict.howItWorks}
              </Link>
            </li>

            {/* Calculators Dropdown */}
            {dict.calculators && (
              <li 
                className={styles.navItem} 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button 
                  className={`${styles.navLink} ${styles.dropdownTrigger} ${pathname.includes('/calculadora-') ? styles.active : ''}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                >
                  {dict.calculators}
                  <span className={styles.chevron}>▾</span>
                </button>
                
                <ul className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.dropdownOpen : ''}`}>
                  {dict.tmbCalculator && (
                    <li>
                      <Link
                        href={`/${locale}/calculadora-tmb`}
                        onClick={closeMenu}
                        className={`${styles.dropdownLink} ${pathname.includes('/calculadora-tmb') ? styles.active : ''}`}
                      >
                        {dict.tmbCalculator}
                      </Link>
                    </li>
                  )}
                  {dict.deficitCalculator && (
                    <li>
                      <Link
                        href={`/${locale}/calculadora-deficit-calorico`}
                        onClick={closeMenu}
                        className={`${styles.dropdownLink} ${pathname.includes('/calculadora-deficit') ? styles.active : ''}`}
                      >
                        {dict.deficitCalculator}
                      </Link>
                    </li>
                  )}
                  {dict.caloriesCalculator && (
                    <li>
                      <Link
                        href={`/${locale}/calculadora-calorias`}
                        onClick={closeMenu}
                        className={`${styles.dropdownLink} ${pathname.includes('/calculadora-calorias') ? styles.active : ''}`}
                      >
                        {dict.caloriesCalculator}
                      </Link>
                    </li>
                  )}
                  {dict.imcCalculator && (
                    <li>
                      <Link
                        href={`/${locale}/calculadora-imc`}
                        onClick={closeMenu}
                        className={`${styles.dropdownLink} ${pathname.includes('/calculadora-imc') ? styles.active : ''}`}
                      >
                        {dict.imcCalculator}
                      </Link>
                    </li>
                  )}
                  {dict.macrosCalculator && (
                    <li>
                      <Link
                        href={`/${locale}/calculadora-macros`}
                        onClick={closeMenu}
                        className={`${styles.dropdownLink} ${pathname.includes('/calculadora-macros') ? styles.active : ''}`}
                      >
                        {dict.macrosCalculator}
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}

            <li className={styles.navItem}>
              <Link
                href={`/${locale}/contato`}
                onClick={closeMenu}
                className={`${styles.navLink} ${pathname.includes('/contato') ? styles.active : ''}`}
              >
                {dict.contact}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.ctaWrapper}>
            <AppCTA variant="header" dict={ctaDict} />
          </div>

          <button
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.menuOpen : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu"
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

