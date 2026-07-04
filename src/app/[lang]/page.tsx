import SectionHero from '@/components/SectionHero'
import SectionSteps from '@/components/SectionSteps'
import SectionFeatures from '@/components/SectionFeatures'
import SectionCTA from '@/components/SectionCTA'
import { getDictionary } from '@/dictionaries'

type PageProps = {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: PageProps) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)

  return (
    <>
      <SectionHero dict={dict.home.hero} ctaDict={dict.common} />
      <SectionSteps dict={dict.home.steps} />
      <SectionFeatures dict={dict.home.features} />
      <SectionCTA dict={dict.home.cta} ctaDict={dict.common} />
    </>
  )
}
