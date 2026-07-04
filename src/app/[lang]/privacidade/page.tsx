import type { Metadata } from 'next'
import { CONTACT_EMAIL, SITE_URL, APP_NAME } from '@/lib/constants'
import { getDictionary } from '@/dictionaries'
import styles from '../../legal.module.css'

type PageProps = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return {
    title: dict.privacy.meta.title,
    description: dict.privacy.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/privacidade`,
      languages: {
        'pt-BR': `${SITE_URL}/pt/privacidade`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
      siteName: APP_NAME,
      title: dict.privacy.meta.title,
      description: dict.privacy.meta.description,
      url: `${SITE_URL}/${lang}/privacidade`,
    },
  }
}

export default async function PrivacidadePage({ params }: PageProps) {
  const lang = (await params).lang
  return (
    <div className={styles.page}>
      <div className={`container container--narrow`}>
        {/* REVISÃO JURÍDICA PENDENTE — O texto abaixo é placeholder estruturado.
            Deve ser revisado por profissional com conhecimento em LGPD antes da publicação. */}

        <header className={styles.header}>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <p className={styles.lastUpdated}>
            Última atualização: <time dateTime="2026-07-03">3 de julho de 2026</time>
          </p>
        </header>

        <article className={styles.content}>
          <section aria-labelledby="priv-quem">
            <h2 id="priv-quem">Quem somos</h2>
            <p>
              O {APP_NAME} (<em>[razão social / responsável — a preencher]</em>)
              é o controlador dos dados pessoais tratados neste aplicativo e
              site. Para qualquer questão relacionada a dados pessoais, entre em
              contato pelo e-mail{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section aria-labelledby="priv-dados">
            <h2 id="priv-dados">Dados que coletamos</h2>
            <ul>
              <li>
                <strong>Dados de cadastro:</strong> e-mail e autenticação via
                Google.
              </li>
              <li>
                <strong>Dados que você informa:</strong> sexo, idade, altura,
                peso, objetivo e nível de atividade física.
              </li>
              <li>
                <strong>Registros alimentares:</strong> alimentos registrados,
                porções e valores nutricionais.
              </li>
              <li>
                <strong>Registros de peso:</strong> histórico de pesagens.
              </li>
              <li>
                <strong>Dados de uso:</strong> informações sobre como você
                interage com o app (funcionalidades utilizadas, frequência).
              </li>
            </ul>
          </section>

          <section aria-labelledby="priv-fotos">
            <h2 id="priv-fotos">Fotos das refeições</h2>
            <p>
              As imagens que você fotografa são processadas para identificar os
              alimentos e <strong>descartadas em seguida</strong>. Não
              armazenamos suas fotos de comida por padrão.
            </p>
          </section>

          <section aria-labelledby="priv-finalidade">
            <h2 id="priv-finalidade">Finalidade do tratamento</h2>
            <ul>
              <li>Calcular sua meta diária de calorias e macronutrientes.</li>
              <li>Registrar suas refeições e mostrar seu progresso.</li>
              <li>Melhorar a precisão do serviço e a experiência do usuário.</li>
              <li>Comunicar atualizações relevantes sobre o serviço.</li>
            </ul>
          </section>

          <section aria-labelledby="priv-base">
            <h2 id="priv-base">Base legal (LGPD)</h2>
            <p>
              O tratamento de seus dados pessoais é realizado com base no seu{' '}
              <strong>consentimento</strong> e na{' '}
              <strong>execução do serviço</strong> que você contratou, conforme a
              Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </section>

          <section aria-labelledby="priv-compartilhamento">
            <h2 id="priv-compartilhamento">
              Compartilhamento e transferência internacional
            </h2>
            <p>
              Utilizamos serviços de terceiros para processamento de imagem por
              inteligência artificial e infraestrutura em nuvem. Esses serviços
              podem tratar dados fora do Brasil. Adotamos salvaguardas adequadas
              para proteger seus dados nessas transferências, em conformidade com
              a LGPD.
            </p>
          </section>

          <section aria-labelledby="priv-direitos">
            <h2 id="priv-direitos">Seus direitos</h2>
            <p>
              Nos termos da LGPD, você tem direito a:
            </p>
            <ul>
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a exclusão dos seus dados.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
              <li>
                Solicitar a portabilidade dos dados a outro fornecedor de
                serviço.
              </li>
            </ul>
            <p>
              Para exercer qualquer desses direitos, envie um e-mail para{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>

          <section aria-labelledby="priv-seguranca">
            <h2 id="priv-seguranca">Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus
              dados, incluindo acesso restrito e criptografia em trânsito
              (HTTPS/TLS).
            </p>
          </section>

          <section aria-labelledby="priv-menores">
            <h2 id="priv-menores">Menores de idade</h2>
            <p>
              O {APP_NAME} não se destina a menores de{' '}
              <em>[idade a definir — ex.: 13 ou 16 anos]</em>. Não coletamos
              intencionalmente dados de menores.
            </p>
          </section>

          <section aria-labelledby="priv-cookies">
            <h2 id="priv-cookies">Cookies</h2>
            <p>
              O site pode utilizar cookies estritamente necessários para
              funcionamento e análise de uso agregado. Não utilizamos cookies
              para publicidade.
            </p>
          </section>

          <section aria-labelledby="priv-alteracoes">
            <h2 id="priv-alteracoes">Alterações nesta política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente.
              Mudanças relevantes serão comunicadas dentro do aplicativo.
              Recomendamos a leitura periódica desta página.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
