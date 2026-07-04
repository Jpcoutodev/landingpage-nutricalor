import type { Metadata } from 'next'
import { CONTACT_EMAIL, SITE_URL, APP_NAME } from '@/lib/constants'
import { getDictionary } from '@/dictionaries'
import styles from './page.module.css'

type PageProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return {
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/contato`,
      languages: {
        'pt-BR': `${SITE_URL}/pt/contato`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
      siteName: APP_NAME,
      title: dict.contact.meta.title,
      description: dict.contact.meta.description,
      url: `${SITE_URL}/${lang}/contato`,
    },
  }
}

export default async function ContatoPage({ params }: PageProps) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)
  const content = dict.contact

  return (
    <div className={styles.page}>
      <div className={`container container--narrow`}>
        <section className={styles.content} aria-labelledby="contato-title">
          <span className={styles.icon} aria-hidden="true">✉️</span>
          <h1 id="contato-title" className={styles.title}>{content.title}</h1>
          <p className={styles.description}>
            {content.description}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={styles.email}
            id="contact-email"
          >
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </div>
  )
}
