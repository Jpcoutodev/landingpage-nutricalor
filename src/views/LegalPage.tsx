import { Fragment, type ReactNode } from 'react'
import { APP_NAME, CONTACT_EMAIL } from '@/lib/constants'
import type { LegalDict } from '@/dictionaries/types'
import styles from '@/app/legal.module.css'

type LegalPageProps = {
  content: LegalDict
}

/**
 * Renderiza o texto legal do dicionário.
 *
 * Convenções do texto: `{app}` vira o nome do app, `{email}` vira o link de
 * contato, `**negrito**` vira `<strong>` e `[trecho entre colchetes]` vira
 * `<em>` — os colchetes marcam o que ainda depende de definição jurídica.
 */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Um único regex cobre os quatro marcadores, preservando a ordem no texto.
  const pattern = /(\{app\}|\{email\}|\*\*[^*]+\*\*|\[[^\]]+\])/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]

    if (token === '{app}') {
      nodes.push(APP_NAME)
    } else if (token === '{email}') {
      nodes.push(
        <a key={key++} href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      )
    } else if (token.startsWith('**')) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else {
      nodes.push(<em key={key++}>{token}</em>)
    }

    last = match.index + token.length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export default function LegalPage({ content }: LegalPageProps) {
  return (
    <div className={styles.page}>
      <div className="container container--narrow">
        <header className={styles.header}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.lastUpdated}>
            {content.lastUpdatedLabel}:{' '}
            <time dateTime={content.lastUpdatedDate}>{content.lastUpdatedText}</time>
          </p>
        </header>

        <p className={styles.reviewNotice}>{content.reviewNotice}</p>

        <article className={styles.content}>
          {content.sections.map((section, i) => {
            // Id posicional: só precisa ser único e estável para o aria-labelledby.
            const id = `sec-${i}`
            return (
              <section key={section.title} aria-labelledby={id}>
                <h2 id={id}>{section.title}</h2>
                {section.blocks.map((block, j) => (
                  <Fragment key={j}>
                    {block.type === 'p' && <p>{renderInline(block.text ?? '')}</p>}
                    {block.type === 'ul' && (
                      <ul>
                        {(block.items ?? []).map((item, k) => (
                          <li key={k}>{renderInline(item)}</li>
                        ))}
                      </ul>
                    )}
                  </Fragment>
                ))}
              </section>
            )
          })}
        </article>
      </div>
    </div>
  )
}
