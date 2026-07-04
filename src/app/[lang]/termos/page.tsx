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
    title: dict.terms.meta.title,
    description: dict.terms.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/termos`,
      languages: {
        'pt-BR': `${SITE_URL}/pt/termos`,
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'pt' ? 'pt_BR' : lang,
      siteName: APP_NAME,
      title: dict.terms.meta.title,
      description: dict.terms.meta.description,
      url: `${SITE_URL}/${lang}/termos`,
    },
  }
}

export default async function TermosPage({ params }: PageProps) {
  const lang = (await params).lang
  return (
    <div className={styles.page}>
      <div className={`container container--narrow`}>
        {/* REVISÃO JURÍDICA PENDENTE — O texto abaixo é placeholder estruturado.
            Deve ser revisado por profissional jurídico antes da publicação. */}

        <header className={styles.header}>
          <h1 className={styles.title}>Termos de Uso</h1>
          <p className={styles.lastUpdated}>
            Última atualização: <time dateTime="2026-07-03">3 de julho de 2026</time>
          </p>
        </header>

        <article className={styles.content}>
          <section aria-labelledby="termos-aceitacao">
            <h2 id="termos-aceitacao">Aceitação</h2>
            <p>
              Ao usar o {APP_NAME}, você concorda com estes Termos de Uso. Caso
              não concorde, não utilize o serviço.
            </p>
          </section>

          <section aria-labelledby="termos-servico">
            <h2 id="termos-servico">O serviço</h2>
            <p>
              O {APP_NAME} é uma ferramenta de estimativa nutricional que utiliza
              fotografia por inteligência artificial e outros métodos de registro
              (texto, código de barras, busca manual) para ajudar você a
              acompanhar sua alimentação.
            </p>
          </section>

          <section aria-labelledby="termos-nao-medico">
            <h2 id="termos-nao-medico">Não é conselho médico</h2>
            <p>
              <strong>
                O {APP_NAME} fornece estimativas, não diagnóstico, prescrição ou
                tratamento.
              </strong>{' '}
              Consulte um profissional de saúde — médico ou nutricionista — para
              decisões sobre dieta, saúde ou condicionamento físico. O{' '}
              {APP_NAME} não substitui orientação profissional.
            </p>
          </section>

          <section aria-labelledby="termos-precisao">
            <h2 id="termos-precisao">Precisão</h2>
            <p>
              As estimativas de calorias, macronutrientes e porções são
              aproximadas e podem conter erros. Use-as como referência para
              acompanhar seus hábitos, não como verdade absoluta. Nenhum app de
              foto substitui uma medição laboratorial.
            </p>
          </section>

          <section aria-labelledby="termos-conta">
            <h2 id="termos-conta">Conta</h2>
            <p>
              Você é responsável por manter seus dados de acesso seguros. Não
              compartilhe suas credenciais. Notifique-nos imediatamente caso
              suspeite de uso não autorizado da sua conta.
            </p>
          </section>

          <section aria-labelledby="termos-assinatura">
            <h2 id="termos-assinatura">Assinatura e pagamento</h2>
            <p>
              O {APP_NAME} pode oferecer planos de assinatura. Os preços,
              períodos de cobrança e condições de renovação são exibidos com
              clareza antes da contratação.{' '}
              <em>[Detalhes de cobrança e cancelamento — a definir.]</em>
            </p>
          </section>

          <section aria-labelledby="termos-uso-aceitavel">
            <h2 id="termos-uso-aceitavel">Uso aceitável</h2>
            <p>
              Ao usar o {APP_NAME}, você concorda em não utilizá-lo para fins
              ilegais, fraudulentos ou que violem estes Termos. Reservamo-nos o
              direito de suspender ou encerrar contas que violem estas
              condições.
            </p>
          </section>

          <section aria-labelledby="termos-limitacao">
            <h2 id="termos-limitacao">Limitação de responsabilidade</h2>
            <p>
              <em>
                [Cláusula de limitação de responsabilidade — a ser definida com
                assessoria jurídica.]
              </em>
            </p>
            <p>
              O {APP_NAME} é fornecido &ldquo;como está&rdquo;, sem garantias de
              precisão absoluta. Não nos responsabilizamos por decisões tomadas
              com base exclusiva nas informações fornecidas pelo aplicativo.
            </p>
          </section>

          <section aria-labelledby="termos-alteracoes">
            <h2 id="termos-alteracoes">Alterações e contato</h2>
            <p>
              Podemos atualizar estes Termos periodicamente. Mudanças relevantes
              serão comunicadas dentro do aplicativo. Para dúvidas ou
              solicitações, entre em contato pelo e-mail{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
