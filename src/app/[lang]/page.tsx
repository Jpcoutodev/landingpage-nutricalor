import { notFound } from 'next/navigation'
import SectionHero from '@/components/SectionHero'
import SectionTicker from '@/components/SectionTicker'
import SectionSteps from '@/components/SectionSteps'
import SectionFeatures from '@/components/SectionFeatures'
import SectionCTA from '@/components/SectionCTA'
import Reveal from '@/components/Reveal'
import { getDictionary } from '@/dictionaries'
import { isLocale } from '@/lib/routes'

type PageProps = {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <Reveal>
      <SectionHero dict={dict.home.hero} ctaDict={dict.common} locale={lang} />
      <SectionTicker dict={dict.home.ticker} />
      <SectionSteps dict={dict.home.steps} />
      <SectionFeatures dict={dict.home.features} />
      <SectionCTA dict={dict.home.cta} ctaDict={dict.common} />
    </Reveal>
  )
}
