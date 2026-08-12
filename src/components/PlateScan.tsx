import type { HeroDict } from '@/dictionaries/types'
import styles from './PlateScan.module.css'

type PlateScanProps = {
  dict: HeroDict
}

/**
 * Área de captura do mock: prato desenhado em SVG, caixas de detecção com
 * rótulos mono e uma linha de varredura em loop. Substitui o emoji 📸 que
 * ocupava esse espaço antes.
 */
export default function PlateScan({ dict }: PlateScanProps) {
  const detections = [
    { label: dict.food1, grams: '150g', className: styles.boxRice },
    { label: dict.food3, grams: '120g', className: styles.boxChicken },
    { label: dict.food2, grams: '80g', className: styles.boxBeans },
  ]

  return (
    <div className={styles.capture}>
      <svg
        className={styles.plate}
        viewBox="0 0 400 300"
        role="img"
        aria-label={dict.photoLabel}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="plateClip">
            <circle cx="200" cy="150" r="103" />
          </clipPath>
          <radialGradient id="plateFace" cx="36%" cy="26%" r="84%">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E7ECF3" />
          </radialGradient>
          <linearGradient id="riceFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FCFAF4" />
            <stop offset="1" stopColor="#E8E2D2" />
          </linearGradient>
          <linearGradient id="beanFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6B4A3A" />
            <stop offset="1" stopColor="#4A3226" />
          </linearGradient>
          <linearGradient id="chickenFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#DCAA65" />
            <stop offset="1" stopColor="#BE8038" />
          </linearGradient>
        </defs>

        {/* Sombra e corpo do prato */}
        <ellipse cx="200" cy="268" rx="108" ry="13" fill="rgba(10,16,32,0.10)" />
        <circle cx="200" cy="150" r="112" fill="url(#plateFace)" />
        <circle cx="200" cy="150" r="112" fill="none" stroke="rgba(10,16,32,0.16)" strokeWidth="1.4" />
        <circle cx="200" cy="150" r="103" fill="none" stroke="rgba(10,16,32,0.10)" strokeWidth="1" />

        {/* Porções */}
        <g clipPath="url(#plateClip)">
          <ellipse cx="158" cy="140" rx="63" ry="53" transform="rotate(-18 158 140)" fill="url(#riceFill)" />
          <ellipse cx="238" cy="114" rx="49" ry="37" transform="rotate(14 238 114)" fill="url(#chickenFill)" />
          <ellipse cx="228" cy="198" rx="53" ry="39" transform="rotate(-8 228 198)" fill="url(#beanFill)" />

          {/* Textura: grãos e feijões */}
          <g fill="rgba(120,104,74,0.22)">
            <ellipse cx="140" cy="126" rx="7" ry="3" transform="rotate(-30 140 126)" />
            <ellipse cx="166" cy="150" rx="7" ry="3" transform="rotate(20 166 150)" />
            <ellipse cx="146" cy="162" rx="7" ry="3" transform="rotate(-8 146 162)" />
            <ellipse cx="176" cy="124" rx="7" ry="3" transform="rotate(48 176 124)" />
            <ellipse cx="128" cy="148" rx="7" ry="3" transform="rotate(12 128 148)" />
            <ellipse cx="158" cy="172" rx="7" ry="3" transform="rotate(-36 158 172)" />
            <ellipse cx="152" cy="112" rx="7" ry="3" transform="rotate(8 152 112)" />
          </g>
          <g fill="rgba(255,255,255,0.16)">
            <ellipse cx="214" cy="190" rx="9" ry="6" transform="rotate(-16 214 190)" />
            <ellipse cx="240" cy="204" rx="9" ry="6" transform="rotate(24 240 204)" />
            <ellipse cx="226" cy="214" rx="9" ry="6" transform="rotate(-4 226 214)" />
          </g>
          {/* Marcas de grelha no frango */}
          <g stroke="rgba(90,52,14,0.35)" strokeWidth="3" strokeLinecap="round">
            <path d="M214 104 254 96" />
            <path d="M220 120 260 112" />
          </g>
        </g>
      </svg>

      {/* Caixas de detecção */}
      {detections.map((item, i) => (
        <div
          key={item.label}
          className={`${styles.box} ${item.className}`}
          style={{ animationDelay: `${0.85 + i * 0.22}s` }}
          aria-hidden="true"
        >
          <span className={styles.boxLabel}>
            {item.label}
            <span className={styles.boxGrams}>{item.grams}</span>
          </span>
        </div>
      ))}

      {/* Linha de varredura */}
      <div className={styles.scan} aria-hidden="true" />

      {/* Cantos de enquadramento */}
      <div className={styles.brackets} aria-hidden="true">
        <span /> <span /> <span /> <span />
      </div>
    </div>
  )
}
