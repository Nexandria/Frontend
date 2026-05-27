import { NavBar } from '../components/NavBar'
import { Hero } from '../components/Hero'
import { SpecsGrid } from '../components/SpecsGrid'
import { FeatureTabs } from '../components/FeatureTabs'
import { Marquee, Footer } from '../components/MarqueeFooter'
//import { Iphone } from '../components/ui/iphone'

export default function Landing() {
  return (
    <>
      <NavBar />
      <Hero />
      <SpecsGrid />
      <FeatureTabs />
      <Marquee />
      <Footer />
    </>
  )
}