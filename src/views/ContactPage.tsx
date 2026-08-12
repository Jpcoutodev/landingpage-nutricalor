import { CONTACT_EMAIL } from '@/lib/constants'
import { IconMail } from '@/components/icons'
import type { ContactDict } from '@/dictionaries/types'
import styles from './ContactPage.module.css'

type ContactPageProps = {
  content: ContactDict
}

export default function ContactPage({ content }: ContactPageProps) {
  return (
    <div className={styles.page}>
      <div className="container container--narrow">
        <section className={styles.content} aria-labelledby="contact-title">
          <span className={styles.icon} aria-hidden="true">
            <IconMail size={24} />
          </span>
          <h1 id="contact-title" className={styles.title}>
            {content.title}
          </h1>
          <p className={styles.description}>{content.description}</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email} id="contact-email">
            {CONTACT_EMAIL}
          </a>
        </section>
      </div>
    </div>
  )
}
