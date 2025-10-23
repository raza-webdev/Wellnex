import { useEffect, useRef } from 'react'

const Hero = ({ data }) => {
  const heroRef = useRef(null)

  useEffect(() => {
    // No animations for Hero component - keeping it simple
  }, [])

  const scrollToEarlyAccess = () => {
    const element = document.getElementById('early-access')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="hero-bg absolute inset-0  bg-no-repeat"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-#125FFD via-#1E9A4D to-#F8F8F8"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="hero-content">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {data.heading}
          </h1>
          <p className="text-xl md:text-2xl text-[#F8F8F8] mb-8 max-w-4xl mx-auto leading-relaxed">
            {data.subheading}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          {data.ctaButtons.map((button, index) => (
            <button
              key={index}
              onClick={scrollToEarlyAccess}
              className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                button.type === 'primary'
                  ? 'bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-white hover:shadow-2xl hover:shadow-[#125FFD]/25 shadow-lg'
                  : 'bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50'
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero