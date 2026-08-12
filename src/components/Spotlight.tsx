'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type SpotlightProps = {
  children: ReactNode
  className?: string
}

/**
 * Escopo de brilho que segue o cursor.
 *
 * Escreve `--mx` / `--my` (posição do ponteiro relativa ao card, em %) nos
 * descendentes marcados com `data-spotlight`. O gradiente em si é desenhado no
 * CSS do card, então os cards continuam sendo server components.
 */
export default function Spotlight({ children, className }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Ponteiros grosseiros (toque) não têm hover — o efeito só custaria bateria.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-spotlight]'))
    if (cards.length === 0) return

    let frame = 0
    let last: PointerEvent | null = null

    const apply = () => {
      frame = 0
      const event = last
      if (!event) return
      for (const card of cards) {
        const rect = card.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mx', `${x}%`)
        card.style.setProperty('--my', `${y}%`)
      }
    }

    const onMove = (event: PointerEvent) => {
      last = event
      if (!frame) frame = requestAnimationFrame(apply)
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
