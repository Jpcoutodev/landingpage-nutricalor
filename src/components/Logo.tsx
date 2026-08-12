type LogoProps = {
  className?: string
  size?: number
}

/**
 * Marca do Nutricalor: colchetes de enquadramento + tigela.
 *
 * Redesenhado para bater com o ícone do app (`src/app/icon.png`) — antes o
 * header exibia um símbolo completamente diferente do favicon.
 */
export default function Logo({ className, size = 30 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Colchetes de enquadramento — o app "olhando" para o prato */}
      <g
        stroke="url(#nc-verde)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="logoBrackets"
      >
        <path d="M4 11.5V7.5A3.5 3.5 0 0 1 7.5 4h4" />
        <path d="M20.5 4h4A3.5 3.5 0 0 1 28 7.5v4" />
        <path d="M28 20.5v4a3.5 3.5 0 0 1-3.5 3.5h-4" />
        <path d="M11.5 28h-4A3.5 3.5 0 0 1 4 24.5v-4" />
      </g>

      {/* Vapor / domo do prato */}
      <path
        d="M10.4 17.6a5.6 5.6 0 0 1 11.2 0"
        stroke="url(#nc-laranja)"
        strokeWidth="2.1"
      />

      {/* Tigela */}
      <path d="M8.2 17.6h15.6a7.8 7.8 0 0 1-15.6 0Z" fill="url(#nc-verde)" />

      {/* Ponto de leitura */}
      <circle cx="21.6" cy="10.4" r="1.2" fill="url(#nc-verde)" />

      <defs>
        <linearGradient id="nc-verde" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA47A" />
          <stop offset="1" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id="nc-laranja" x1="10.4" y1="17.6" x2="21.6" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0A020" />
          <stop offset="1" stopColor="#EA6C0B" />
        </linearGradient>
      </defs>
    </svg>
  )
}
