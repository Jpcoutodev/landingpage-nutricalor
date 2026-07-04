import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { APP_NAME, SITE_URL } from '@/lib/constants'
import { getDictionary } from '@/dictionaries'
import '../globals.css'

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  weight: ['400', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateStaticParams() {
  return [{ lang: 'pt' }]
}

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang
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
      languages: {
        'pt-BR': `${SITE_URL}/pt`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
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
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return (
    <html lang={lang === 'pt' ? 'pt-BR' : lang} className={`${sora.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">
          {dict.common.skipToContent}
        </a>
        <Header dict={dict.nav} ctaDict={dict.common} />
        <main id="main-content">{children}</main>
        <Footer dict={dict.footer} />
      </body>
    </html>
  )
}
