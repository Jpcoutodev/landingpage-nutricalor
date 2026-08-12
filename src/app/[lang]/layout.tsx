import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { APP_NAME, SITE_URL } from '@/lib/constants'
import { getDictionary } from '@/dictionaries'
import { HREFLANG, LOCALES, OG_LOCALE, alternatesFor, isLocale } from '@/lib/routes'
import '../globals.css'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.home.meta.title,
      template: `%s — ${APP_NAME}`,
    },
    description: dict.home.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: alternatesFor('home', SITE_URL),
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      siteName: APP_NAME,
      title: dict.home.meta.title,
      description: dict.home.meta.description,
      url: `${SITE_URL}/${lang}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.home.meta.title,
      description: dict.home.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <html lang={HREFLANG[lang]} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          {dict.common.skipToContent}
        </a>
        <Header locale={lang} dict={dict.nav} ctaDict={dict.common} />
        <main id="main-content">{children}</main>
        <Footer locale={lang} dict={dict.footer} />
      </body>
    </html>
  )
}
