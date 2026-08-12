import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/routes'

/**
 * Escolhe o idioma a partir do cabeçalho `Accept-Language`.
 *
 * Compara só a subtag primária, então `pt-PT`, `en-GB` e `es-MX` caem nos
 * idiomas certos. Sem correspondência, usa o padrão.
 */
function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language')
  if (!header) return DEFAULT_LOCALE

  const preferences = header
    .split(',')
    .map((part) => {
      const [tag, quality] = part.trim().split(';q=')
      return { tag: tag.trim().toLowerCase(), q: quality ? Number(quality) : 1 }
    })
    .filter((item) => item.tag && !Number.isNaN(item.q))
    .sort((a, b) => b.q - a.q)

  for (const { tag } of preferences) {
    const primary = tag.split('-')[0]
    const match = LOCALES.find((locale) => locale === primary)
    if (match) return match
  }

  return DEFAULT_LOCALE
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (hasLocale) return

  const locale = detectLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Ignora caminhos internos (_next), rotas de API e arquivos estáticos
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
