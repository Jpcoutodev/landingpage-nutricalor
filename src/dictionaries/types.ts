/**
 * Tipos do dicionário, derivados do próprio `pt.json`.
 *
 * `import type` é totalmente apagado na compilação, então nenhum componente
 * carrega o JSON só para se tipar. Adicionar uma chave em `pt.json` propaga o
 * tipo automaticamente — e remover uma que ainda está em uso vira erro de build.
 */
import type ptDictionary from './pt.json'

export type Dictionary = typeof ptDictionary

export type CommonDict = Dictionary['common']
export type NavDict = Dictionary['nav']
export type FooterDict = Dictionary['footer']

export type HeroDict = Dictionary['home']['hero']
export type TickerDict = Dictionary['home']['ticker']
export type StepsDict = Dictionary['home']['steps']
export type FeaturesDict = Dictionary['home']['features']
export type CtaDict = Dictionary['home']['cta']
