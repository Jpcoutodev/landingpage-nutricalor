/**
 * Tipos do dicionário, derivados do próprio `pt.json`.
 *
 * `import type` é totalmente apagado na compilação, então nenhum componente
 * carrega o JSON só para se tipar. O português é a referência de formato: os
 * arquivos `en.json` e `es.json` precisam ter exatamente a mesma estrutura, e o
 * `index.ts` verifica isso em tempo de compilação.
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

export type HowItWorksDict = Dictionary['howItWorks']
export type ContactDict = Dictionary['contact']
export type LegalDict = Dictionary['privacy']

/** Chaves das cinco calculadoras dentro do dicionário. */
export type CalculatorKey =
  | 'tmbCalculator'
  | 'deficitCalculator'
  | 'caloriesCalculator'
  | 'imcCalculator'
  | 'macrosCalculator'
