import 'server-only'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/routes'
import type { Dictionary } from './types'

/**
 * Carregadores por idioma.
 *
 * O tipo `Dictionary` vem do português, então qualquer chave faltando ou a mais
 * em `en.json` / `es.json` vira erro de compilação — é o que impede um idioma
 * de sair do ar por uma tradução incompleta.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import('./pt.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  const key: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  return dictionaries[key]()
}
