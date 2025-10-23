import { useRef, useEffect } from 'react'

const Footer = ({ data, socialMedia }) => {
  const footerRef = useRef(null)

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(footerRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Links animation
      gsap.fromTo('.footer-link',
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Social icons animation
      gsap.fromTo('.social-icon',
        {
          scale: 0,
          opacity: 0,
          rotation: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Newsletter card animation
      gsap.fromTo('.newsletter-card',
        {
          scale: 0.9,
          opacity: 0,
          y: 30
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: '.newsletter-card',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="bg-gradient-to-br from-[#125FFD] via-[#1E9A4D] to-[#0D4BC2] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#F8F8F8]"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-[#F8F8F8]"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full bg-[#F8F8F8]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-[#F8F8F8]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <button 
              onClick={scrollToTop}
              className="text-3xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E8F4FF] bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 mb-4"
            >
              {data.company.name}
            </button>
            <p className="text-[#F8F8F8]/80 mb-6 leading-relaxed">
              {data.company.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#F8F8F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-[#F8F8F8]/80">{data.company.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#F8F8F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-[#F8F8F8]/80">{data.company.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-[#F8F8F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-[#F8F8F8]/80">{data.company.email}</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#F8F8F8]">Product</h3>
            <ul className="space-y-3">
              {data.links.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="footer-link text-[#F8F8F8]/80 hover:text-[#F8F8F8] transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#F8F8F8]">Company</h3>
            <ul className="space-y-3">
              {data.links.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="footer-link text-[#F8F8F8]/80 hover:text-[#F8F8F8] transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#F8F8F8]">Support</h3>
            <ul className="space-y-3">
              {data.links.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="footer-link text-[#F8F8F8]/80 hover:text-[#F8F8F8] transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup with Image */}
        <div className="newsletter-card bg-gradient-to-r from-[#125FFD]/30 to-[#1E9A4D]/30 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-[#F8F8F8]/20 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#125FFD]/20 to-[#1E9A4D]/20 rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4 text-[#F8F8F8]">Stay Updated</h3>
              <p className="text-[#F8F8F8]/80 mb-6 leading-relaxed">
                Get the latest wellness tips, platform updates, and exclusive content delivered to your inbox. Join our community of health enthusiasts today!
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-[#F8F8F8]/30 bg-[#125FFD]/20 text-white placeholder-[#F8F8F8]/60 focus:border-[#F8F8F8] focus:outline-none transition-colors duration-200 focus:bg-[#125FFD]/30"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#F8F8F8] to-[#E8F4FF] text-[#125FFD] rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-[#F8F8F8]/25 whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </form>
              <p className="text-[#F8F8F8]/60 text-sm mt-4">
                No spam ever. Unsubscribe anytime.
              </p>
            </div>

            {/* Image Section */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64">
                {/* Main Image */}
                <img 
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&w=600"
                  alt="Wellness Community"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[#F8F8F8]/20"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-[#1E9A4D] to-[#125FFD] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-[#F8F8F8]/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] rounded-full border-2 border-[#F8F8F8]"></div>
                      <div className="w-6 h-6 bg-gradient-to-r from-[#1E9A4D] to-[#125FFD] rounded-full border-2 border-[#F8F8F8]"></div>
                      <div className="w-6 h-6 bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] rounded-full border-2 border-[#F8F8F8]"></div>
                    </div>
                    <span className="text-[#125FFD] text-sm font-semibold">2K+ Joined</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-[#F8F8F8]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a 
                href={socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 bg-[#F8F8F8] text-[#125FFD] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#F8F8F8]/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href={socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 bg-[#F8F8F8] text-[#125FFD] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#F8F8F8]/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href={socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-[#F8F8F8] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#1E9A4D]/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98z"/>
                </svg>
              </a>
              <a 
                href={socialMedia.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 bg-[#F8F8F8] text-[#125FFD] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#F8F8F8]/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href={socialMedia.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 bg-[#F8F8F8] text-[#1E9A4D] rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#F8F8F8]/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-[#F8F8F8]/80 text-sm">
                © 2024 {data.company.name}. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2">
                {data.links.legal.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    className="text-[#F8F8F8]/80 hover:text-[#F8F8F8] text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Effect */}
      <div className="relative h-4 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0">
          <svg 
            className="w-full h-8" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-[#125FFD]"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-[#1E9A4D]"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-[#F8F8F8]"
            ></path>
          </svg>
        </div>
      </div>
    </footer>
  )
}

export default Footer