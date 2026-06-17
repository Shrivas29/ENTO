import { SmoothScroll } from '@/components/SmoothScroll'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Manifesto } from '@/components/Manifesto'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'
import { Founder } from '@/components/Founder'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Work />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
