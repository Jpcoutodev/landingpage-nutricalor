import type { TickerDict } from '@/dictionaries/types'
import styles from './SectionTicker.module.css'

type SectionTickerProps = {
  dict: TickerDict
}

/**
 * Faixa rolante com pratos brasileiros — reforça o posicionamento e dá
 * movimento contínuo entre o hero e as seções seguintes.
 */
export default function SectionTicker({ dict }: SectionTickerProps) {
  const items = dict.items
  if (items.length === 0) return null

  return (
    <section className={styles.ticker} aria-label={dict.label}>
      <div className={styles.label}>
        <span className={styles.labelText}>{dict.label}</span>
      </div>

      <div className={styles.viewport}>
        {/* Duas cópias da lista dão o loop contínuo; a segunda é decorativa. */}
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul key={copy} className={styles.list} aria-hidden={copy === 1}>
              {items.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.dot} />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
