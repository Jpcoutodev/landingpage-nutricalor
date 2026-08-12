'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { IconChevronDown, IconGlobe } from './icons'
import {
  LOCALES,
  LOCALE_LABEL,
  LOCALE_SHORT,
  homePath,
  pageKeyForSlug,
  pathFor,
  type Locale,
} from '@/lib/routes'
import styles from './LanguageSwitcher.module.css'

type LanguageSwitcherProps = {
  locale: Locale
  onNavigate?: () => void
}

/**
 * Troca de idioma preservando a página.
 *
 * Como cada idioma tem slug próprio, não basta trocar o prefixo: `/en/bmr-calculator`
 * precisa virar `/pt/calculadora-tmb`. Por isso o slug atual é resolvido para a
 * chave da página antes de remontar o caminho no idioma de destino.
 */
export default function LanguageSwitcher({ locale, onNavigate }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const currentSlug = pathname.split('/').filter(Boolean)[1]
  const pageKey = currentSlug ? pageKeyForSlug(locale, currentSlug) : null

  const hrefFor = (target: Locale) => (pageKey ? pathFor(pageKey, target) : homePath(target))

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={LOCALE_LABEL[locale]}
      >
        <IconGlobe size={15} className={styles.globe} />
        <span className={styles.short}>{LOCALE_SHORT[locale]}</span>
        <IconChevronDown size={13} className={styles.chevron} />
      </button>

      <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`} role="menu">
        {LOCALES.map((item) => (
          <li key={item} role="none">
            <Link
              href={hrefFor(item)}
              hrefLang={item}
              role="menuitem"
              className={`${styles.item} ${item === locale ? styles.itemActive : ''}`}
              onClick={() => {
                setIsOpen(false)
                onNavigate?.()
              }}
            >
              <span className={styles.itemShort}>{LOCALE_SHORT[item]}</span>
              {LOCALE_LABEL[item]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
