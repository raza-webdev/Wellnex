// App.jsx
import { useEffect } from 'react'
import data from './data.json'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Show from './components/Show'
import Testimonials from './components/Testimonials'
import WhyWellnex from './components/WhyWellnex'
import FuturePlatform from './components/FuturePlatform'
import EarlyAccess from './components/EarlyAccess'
import StayConnected from './components/StayConnected'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger)
    }
  }, [])

  return (
    < >
      <Navigation data={data} />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Show data={data.apps} />
      <Testimonials data={data.testimonials} />
      <WhyWellnex data={data.whyWellnex} />
      <FuturePlatform data={data.futurePlatform} />
      <EarlyAccess data={data.earlyAccess} />
      <StayConnected data={data.stayConnected} />
      <Footer data={data.footer} socialMedia={data.socialMedia} />
    </>
  )
}

export default App