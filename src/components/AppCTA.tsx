import { APP_STATUS, PLAY_STORE_URL } from '@/lib/constants'
import styles from './AppCTA.module.css'

type AppCTAProps = {
  variant?: 'inline' | 'block' | 'header'
  /** `dark` inverte o botão para uso sobre painéis escuros. */
  tone?: 'light' | 'dark'
  dict: {
    comingSoon: string
    available: string
    googlePlay: string
  }
}

/**
 * Ícone do Google Play.
 *
 * Construído a partir da geometria real do símbolo: três vértices
 * (topo-esquerda, ponta direita, base-esquerda) com a dobra no ponto central,
 * o que gera as quatro faces coloridas.
 */
function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d="M3.4 1.9 13.6 12 3.4 22.1a1.5 1.5 0 0 1-.4-1V2.9a1.5 1.5 0 0 1 .4-1Z" fill="#00A0FF" />
      <path d="M3.4 1.9 17 8.5 13.6 12Z" fill="#00D26A" />
      <path d="M17 8.5 20.5 10.6a1.65 1.65 0 0 1 0 2.8L17 15.5 13.6 12Z" fill="#FFCE00" />
      <path d="M13.6 12 17 15.5 3.4 22.1Z" fill="#FF3A44" />
    </svg>
  )
}

export default function AppCTA({ variant = 'inline', tone = 'light', dict }: AppCTAProps) {
  const isAvailable = APP_STATUS === 'available'
  const text = isAvailable ? dict.available : dict.comingSoon

  const content = (
    <>
      <span className={styles.icon}>
        <PlayGlyph />
      </span>
      <span className={styles.ctaText}>
        <span className={styles.ctaSmall}>{text}</span>
        <span className={styles.ctaMain}>{dict.googlePlay}</span>
      </span>
    </>
  )

  const className = [
    styles.cta,
    variant !== 'inline' ? styles[variant] : '',
    tone === 'dark' ? styles.onDark : '',
    !isAvailable ? styles.comingSoon : '',
  ]
    .filter(Boolean)
    .join(' ')

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
