/**
 * Idiomas e rotas do Nutricalor.
 *
 * Cada página tem um slug próprio por idioma — `/en/bmr-calculator` em vez de
 * `/en/calculadora-tmb` — porque a palavra-chave na URL pesa em ranqueamento e
 * CTR. Este arquivo é a fonte única desse mapa: rotas, navegação, sitemap e
 * hreflang derivam todos daqui.
 */

export const LOCALES = ['pt', 'en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Valor de `hreflang` e do atributo `lang` do documento. */
export const HREFLANG: Record<Locale, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es-419',
}

/** Valor de `og:locale`. */
export const OG_LOCALE: Record<Locale, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  es: 'es_419',
}

/** Nome de cada idioma no próprio idioma, para o seletor. */
export const LOCALE_LABEL: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
}

/** Rótulo curto para o botão do seletor. */
export const LOCALE_SHORT: Record<Locale, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
}

/**
 * Páginas com rota própria. A chave também é a chave do dicionário, exceto
 * `home`, que vive na raiz do idioma.
 */
export type PageKey =
  | 'howItWorks'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'tmbCalculator'
  | 'deficitCalculator'
  | 'caloriesCalculator'
  | 'imcCalculator'
  | 'macrosCalculator'

export const PAGE_KEYS: PageKey[] = [
  'howItWorks',
  'contact',
  'privacy',
  'terms',
  'tmbCalculator',
  'deficitCalculator',
  'caloriesCalculator',
  'imcCalculator',
  'macrosCalculator',
]

/**
 * Slug de cada página por idioma.
 *
 * Português e espanhol coincidem em vários slugs (TMB e IMC são as mesmas
 * siglas nos dois idiomas); isso não conflita porque o idioma já separa o
 * caminho.
 */
export const SLUGS: Record<PageKey, Record<Locale, string>> = {
  howItWorks: {
    pt: 'como-funciona',
    en: 'how-it-works',
    es: 'como-funciona',
  },
  contact: {
    pt: 'contato',
    en: 'contact',
    es: 'contacto',
  },
  privacy: {
    pt: 'privacidade',
    en: 'privacy-policy',
    es: 'privacidad',
  },
  terms: {
    pt: 'termos',
    en: 'terms-of-use',
    es: 'terminos',
  },
  tmbCalculator: {
    pt: 'calculadora-tmb',
    en: 'bmr-calculator',
    es: 'calculadora-tmb',
  },
  deficitCalculator: {
    pt: 'calculadora-deficit-calorico',
    en: 'calorie-deficit-calculator',
    es: 'calculadora-deficit-calorico',
  },
  caloriesCalculator: {
    pt: 'calculadora-calorias',
    en: 'calorie-calculator',
    es: 'calculadora-calorias',
  },
  imcCalculator: {
    pt: 'calculadora-imc',
    en: 'bmi-calculator',
    es: 'calculadora-imc',
  },
  macrosCalculator: {
    pt: 'calculadora-macros',
    en: 'macro-calculator',
    es: 'calculadora-macros',
  },
}

/** Chaves das cinco calculadoras, na ordem em que aparecem na navegação. */
export const CALCULATOR_KEYS = [
  'tmbCalculator',
  'deficitCalculator',
  'caloriesCalculator',
  'imcCalculator',
  'macrosCalculator',
] as const satisfies readonly PageKey[]

/** Caminho absoluto de uma página num idioma. */
export function pathFor(key: PageKey, locale: Locale): string {
  return `/${locale}/${SLUGS[key][locale]}`
}

/** Caminho da home de um idioma. */
export function homePath(locale: Locale): string {
  return `/${locale}`
}

/** Resolve um slug para a página correspondente, ou `null` se não existir. */
export function pageKeyForSlug(locale: Locale, slug: string): PageKey | null {
  for (const key of PAGE_KEYS) {
    if (SLUGS[key][locale] === slug) return key
  }
  return null
}

/**
 * Mapa de `hreflang` para uma página — todos os idiomas mais `x-default`,
 * que aponta para o idioma padrão.
 */
export function alternatesFor(key: PageKey | 'home', siteUrl: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of LOCALES) {
    const path = key === 'home' ? homePath(locale) : pathFor(key, locale)
    languages[HREFLANG[locale]] = `${siteUrl}${path}`
  }
  languages['x-default'] =
    `${siteUrl}${key === 'home' ? homePath(DEFAULT_LOCALE) : pathFor(key, DEFAULT_LOCALE)}`
  return languages
}
