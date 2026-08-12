/**
 * Ícones de linha do Nutricalor.
 *
 * Traçado de 1.5px, viewBox 24, `currentColor` — herdam cor e tamanho do
 * contexto. Substituem os emojis usados antes nas seções da home.
 */

type IconProps = {
  className?: string
  size?: number
}

function base(size: number, className?: string) {
  return {
    className,
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
  }
}

/** Câmera — capturar o prato */
export function IconCamera({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 8.8A2.5 2.5 0 0 1 5.5 6.3h1.6a1 1 0 0 0 .83-.44l.93-1.39a1 1 0 0 1 .83-.44h4.58a1 1 0 0 1 .83.44l.93 1.39a1 1 0 0 0 .83.44h1.6A2.5 2.5 0 0 1 21 8.8v7.4a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.2z" />
      <circle cx="12" cy="12.4" r="3.3" />
    </svg>
  )
}

/** Chip — o modelo de visão computacional */
export function IconCpu({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="5" y="5" width="14" height="14" rx="2.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9.5 2.5v2.5M14.5 2.5v2.5M9.5 19v2.5M14.5 19v2.5M2.5 9.5H5M2.5 14.5H5M19 9.5h2.5M19 14.5h2.5" />
    </svg>
  )
}

/** Sliders — ajustar porções */
export function IconSliders({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3 6.5h3.2M10.8 6.5H21" />
      <circle cx="8.5" cy="6.5" r="2.3" />
      <path d="M3 12h9.7M17.3 12H21" />
      <circle cx="15" cy="12" r="2.3" />
      <path d="M3 17.5h2.2M9.8 17.5H21" />
      <circle cx="7.5" cy="17.5" r="2.3" />
    </svg>
  )
}

/** Pino de mapa — feito daqui, para a comida daqui */
export function IconMapPin({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20 10.3c0 5.3-6.2 10.4-7.6 11.5a.65.65 0 0 1-.8 0C10.2 20.7 4 15.6 4 10.3a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.1" r="2.8" />
    </svg>
  )
}

/** Balão de fala — entende como você fala */
export function IconMessage({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20.5 11.7c0 4.4-3.8 8-8.5 8a9.4 9.4 0 0 1-2.9-.45L4 21l1.6-4.2a7.7 7.7 0 0 1-1.6-5.1c0-4.4 3.8-8 8.5-8s8 3.6 8 8Z" />
      <path d="M8.7 11.7h.01M12 11.7h.01M15.3 11.7h.01" strokeWidth="2" />
    </svg>
  )
}

/** Escudo com check — teste grátis sem cartão */
export function IconShieldCheck({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 2.8 4.8 5.7v5.5c0 4.5 3 8.6 7.2 9.9 4.2-1.3 7.2-5.4 7.2-9.9V5.7z" />
      <path d="M9.1 12.1 11.2 14.2 15 10" />
    </svg>
  )
}

/** Raio — velocidade da análise */
export function IconZap({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M13.4 2.5 4.8 13.3h6.2L10.6 21.5l8.6-10.8h-6.2z" />
    </svg>
  )
}

/** Brilho — sinal de IA */
export function IconSparkle({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M11 3.2 12.7 8 17.5 9.7 12.7 11.4 11 16.2 9.3 11.4 4.5 9.7 9.3 8z" />
      <path d="M17.8 15.2 18.6 17.3 20.7 18.1 18.6 18.9 17.8 21 17 18.9 14.9 18.1 17 17.3z" />
    </svg>
  )
}

/** Camadas — base de alimentos */
export function IconLayers({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m12 2.8 8.5 4.4-8.5 4.4-8.5-4.4z" />
      <path d="m3.5 12 8.5 4.4 8.5-4.4" />
      <path d="m3.5 16.6 8.5 4.4 8.5-4.4" />
    </svg>
  )
}

/** Seta — links e CTAs secundários */
export function IconArrowRight({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4.5 12h14.2" />
      <path d="m13.2 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  )
}

/** Check — listas de confirmação */
export function IconCheck({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m4.5 12.5 4.8 4.8L19.5 7" />
    </svg>
  )
}

/** Chevron — dropdown do header */
export function IconChevronDown({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m6 9.5 6 5.5 6-5.5" />
    </svg>
  )
}

/** Ciclo — múltiplas formas de registrar */
export function IconRefresh({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9L3.5 15.6" />
      <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9l2.4 2.3" />
      <path d="M20.5 4.2v4.2h-4.2M3.5 19.8v-4.2h4.2" />
    </svg>
  )
}

/** Lápis — registro manual */
export function IconPencil({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M16.4 3.6a2.3 2.3 0 0 1 3.3 3.3L8.2 18.4l-4.3 1 1-4.3z" />
      <path d="M14.6 5.4 18 8.8" />
    </svg>
  )
}

/** Lupa — busca por nome */
export function IconSearch({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.2 16.2 4.3 4.3" />
    </svg>
  )
}

/** Celular — registro pelo app */
export function IconSmartphone({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3M11 18.4h2" />
    </svg>
  )
}

/** Alvo — metas diárias */
export function IconTarget({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.4" />
    </svg>
  )
}

/** Lâmpada — nota honesta */
export function IconBulb({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M9.3 17.2a6.3 6.3 0 1 1 5.4 0" />
      <path d="M9.3 17.2h5.4M10 20.4h4" />
    </svg>
  )
}

/** Chama — gasto calórico */
export function IconFlame({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 2.7c3.2 3 4.8 5.6 4.8 7.9 0 1.3-.5 2.3-1.4 3 .3-1.6-.4-3-2-4.3.2 3.3-1 5-2.2 6.2-.9.9-1.4 1.8-1.4 2.9a3.3 3.3 0 0 0 1.5 2.8 5.6 5.6 0 0 1-4.6-5.6c0-2 .8-3.8 2.3-5.4C10.9 7.7 12 5.3 12 2.7Z" />
      <path d="M12 21.3a5.6 5.6 0 0 0 5.6-5.6c0-1.1-.3-2.1-.8-3" />
    </svg>
  )
}

/** Folha — nutrição e macros */
export function IconLeaf({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M4.5 19.5c-1.6-6 1.6-11.4 8.2-12.6 2.6-.5 4.6-1.4 6-2.6.9 8.6-3.3 15-9.5 15.6-2 .2-3.5-.1-4.7-.4Z" />
      <path d="M4 20.5c1.2-4.4 4-8 8.4-10.2" />
    </svg>
  )
}

/** Medidor — taxa metabólica */
export function IconGauge({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3.6 17.5a9 9 0 1 1 16.8 0" />
      <path d="M12 17.5 15.8 11" />
      <circle cx="12" cy="17.6" r="1.5" />
    </svg>
  )
}

/** Rosca — distribuição de macros */
export function IconPieChart({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 3.4a8.6 8.6 0 1 0 8.6 8.6H12z" />
      <path d="M15.4 2.4a8.6 8.6 0 0 1 6.2 6.2h-6.2z" />
    </svg>
  )
}

/** Balança — peso e IMC */
export function IconScale({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M12 4.4v15.2M7 19.6h10M4.6 6.6h14.8" />
      <path d="M4.6 6.6 2 13.2a2.9 2.9 0 0 0 5.2 0z" />
      <path d="M19.4 6.6 22 13.2a2.9 2.9 0 0 1-5.2 0z" />
      <circle cx="12" cy="4" r="1.4" />
    </svg>
  )
}

/** Envelope — contato */
export function IconMail({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.5" />
      <path d="m3.6 7.2 7.2 5a2 2 0 0 0 2.4 0l7.2-5" />
    </svg>
  )
}

/** Alerta — avisos de segurança */
export function IconAlert({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M10.6 3.9 2.5 17.8a1.6 1.6 0 0 0 1.4 2.4h16.2a1.6 1.6 0 0 0 1.4-2.4L13.4 3.9a1.6 1.6 0 0 0-2.8 0Z" />
      <path d="M12 9.4v4.2M12 17.1h.01" strokeWidth="2" />
    </svg>
  )
}

/** Tendência de queda — déficit */
export function IconTrendingDown({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m3 7.5 6.4 6.4 3.6-3.6 5.5 5.5" />
      <path d="M21 11.3v4.5h-4.5" />
    </svg>
  )
}

/** Tendência de alta — ganho de massa */
export function IconTrendingUp({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="m3 16.5 6.4-6.4 3.6 3.6 5.5-5.5" />
      <path d="M21 12.7V8.2h-4.5" />
    </svg>
  )
}

/** Mira de enquadramento — o app "olhando" para o prato */
export function IconViewfinder({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size, className)}>
      <path d="M3.5 8.5V6a2.5 2.5 0 0 1 2.5-2.5h2.5" />
      <path d="M15.5 3.5H18A2.5 2.5 0 0 1 20.5 6v2.5" />
      <path d="M20.5 15.5V18a2.5 2.5 0 0 1-2.5 2.5h-2.5" />
      <path d="M8.5 20.5H6A2.5 2.5 0 0 1 3.5 18v-2.5" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  )
}
