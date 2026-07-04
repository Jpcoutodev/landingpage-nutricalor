/**
 * Constantes centrais do Nutricalor
 *
 * PLAY_STORE_URL e APP_STATUS controlam o componente AppCTA em todo o site.
 * Quando o app for publicado, basta mudar APP_STATUS para 'available'
 * e colocar a URL real em PLAY_STORE_URL.
 */

/** URL da Play Store — atualizar quando o app for publicado */
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=app.nutricalor'

/** Estado do app: 'coming-soon' exibe botão informativo, 'available' exibe link direto */
export const APP_STATUS: 'coming-soon' | 'available' = 'coming-soon'

/** URL canônica do site */
export const SITE_URL = 'https://nutricalor.app'

/** E-mail de contato */
export const CONTACT_EMAIL = 'contato@nutricalor.app'

/** Nome do app */
export const APP_NAME = 'Nutricalor'
