'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AppCTA from './AppCTA'
import styles from './Header.module.css'

type HeaderProps = {
  dict: {
    home: string
    howItWorks: string
    contact: string
    tmbCalculator?: string
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
  const pathname = usePathname()
  
  // Extract locale from pathname to build correct links
  const locale = pathname.split('/')[1] || 'pt'
  const isHome = pathname === `/${locale}` || pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href={`/${locale}`} className={styles.logo} onClick={closeMenu}>
          Nutricalor <span className={styles.dot}>.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Menu principal">
          <Link
            href={`/${locale}/como-funciona`}
            className={pathname.includes('/como-funciona') ? styles.active : ''}
          >
            {dict.howItWorks}
          </Link>
          {dict.tmbCalculator && (
            <Link
              href={`/${locale}/calculadora-tmb`}
              className={pathname.includes('/calculadora-tmb') ? styles.active : ''}
            >
              {dict.tmbCalculator}
            </Link>
          )}
          <Link
            href={`/${locale}/contato`}
            className={pathname.includes('/contato') ? styles.active : ''}
          >
            {dict.contact}
          </Link>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.ctaWrapper}>
            <AppCTA dict={ctaDict} />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menu"
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`} />
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <div
          className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className={styles.mobileNavLinks}>
            <Link
              href={`/${locale}`}
              onClick={closeMenu}
              className={isHome ? styles.active : ''}
            >
              {dict.home}
            </Link>
            <Link
              href={`/${locale}/como-funciona`}
              onClick={closeMenu}
              className={pathname.includes('/como-funciona') ? styles.active : ''}
            >
              {dict.howItWorks}
            </Link>
            {dict.tmbCalculator && (
              <Link
                href={`/${locale}/calculadora-tmb`}
                onClick={closeMenu}
                className={pathname.includes('/calculadora-tmb') ? styles.active : ''}
              >
                {dict.tmbCalculator}
              </Link>
            )}
            <Link
              href={`/${locale}/contato`}
              onClick={closeMenu}
              className={pathname.includes('/contato') ? styles.active : ''}
            >
              {dict.contact}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

