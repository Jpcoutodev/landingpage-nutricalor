import Link from 'next/link'
import { APP_STATUS, PLAY_STORE_URL } from '@/lib/constants'
import styles from './AppCTA.module.css'

type AppCTAProps = {
  variant?: 'inline' | 'block' | 'header'
  dict: {
    comingSoon: string
    available: string
    googlePlay: string
  }
}

export default function AppCTA({ variant = 'inline', dict }: AppCTAProps) {
  const isAvailable = APP_STATUS === 'available'
  const text = isAvailable ? dict.available : dict.comingSoon

  const content = (
    <>
      <span className={styles.icon}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M4.3 1.2c-.2.2-.3.6-.3 1.1v19.4c0 .5.1.9.3 1.1l.1.1 11-11v-.2l-11-11-.1.1z" fill="#4285F4" />
          <path d="M15.3 11.8l3.6 2.1c1.2.7 1.2 1.8 0 2.5l-3.6 2.1-1.3-1.2-9.7-9.7 11 4.2z" fill="#EA4335" />
          <path d="M15.3 12.2l-11-4.2L14 20l1.3-1.2 3.6-2.1c1.2-.7 1.2-1.8 0-2.5l-3.6-2l-1.3 1.2z" fill="#FBBC04" />
          <path d="M15.3 11.8l1.3 1.2-1.3 1.2-11-11.2L14 4l1.3 1.2 3.6 2.1c1.2.7 1.2 1.8 0 2.5l-3.6 2z" fill="#34A853" />
        </svg>
      </span>
      <div className={styles.ctaText}>
        <span className={styles.ctaSmall}>{text}</span>
        <span className={styles.ctaMain}>{dict.googlePlay}</span>
      </div>
    </>
  )

  const className = `${styles.cta} ${variant !== 'inline' ? styles[variant] : ''} ${
    !isAvailable ? styles.comingSoon : ''
  }`

  if (isAvailable) {
    return (
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`${text} ${dict.googlePlay}`}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={className} aria-label={`${text} ${dict.googlePlay}`}>
      {content}
    </div>
  )
}
