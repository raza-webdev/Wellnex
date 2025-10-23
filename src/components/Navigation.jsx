import { useState, useEffect } from 'react'

const Navigation = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#F8F8F8]/95 backdrop-blur-md shadow-lg' 
        : 'bg-[#1E9A4D]/20 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`text-2xl font-bold hover:scale-105 transition-transform duration-200 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] bg-clip-text text-transparent'
                  : 'text-white'
              }`}
            >
              {data.company.name}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-[#125FFD]'
                    : 'text-white hover:text-[#125FFD]'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('apps')}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-[#125FFD]'
                    : 'text-white hover:text-[#125FFD]'
                }`}
              >
                Apps
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-[#125FFD]'
                    : 'text-white hover:text-[#125FFD]'
                }`}
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('early-access')}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-[#125FFD]'
                    : 'text-white hover:text-[#125FFD]'
                }`}
              >
                Early Access
              </button>
              <button 
                onClick={() => scrollToSection('early-access')}
                className="bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-200 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#125FFD]'
                  : 'text-white hover:text-[#125FFD]'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#F8F8F8]/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-[#1E9A4D]/10">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-[#125FFD] block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('apps')}
                className="text-gray-700 hover:text-[#125FFD] block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                Apps
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-[#125FFD] block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('early-access')}
                className="text-gray-700 hover:text-[#125FFD] block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
                Early Access
              </button>
              <button 
                onClick={() => scrollToSection('early-access')}
                className="bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 w-full mt-4 shadow-md"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation