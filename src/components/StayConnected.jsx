import { useState, useEffect, useRef } from 'react'

const StayConnected = ({ data }) => {
  const stayConnectedRef = useRef(null)
  const bubblesRef = useRef([])
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.stay-title',
        {
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.stay-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Subtitle animation
      gsap.fromTo('.stay-subtitle',
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.stay-subtitle',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Newsletter form animation
      gsap.fromTo('.newsletter-form',
        {
          y: 50,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.4,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: '.newsletter-form',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Stats animation
      gsap.fromTo('.stat-item',
        {
          y: 30,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: '.stats-grid',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Social media animation
      gsap.fromTo('.social-icon',
        {
          y: 20,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.social-section',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // BUBBLES INTERACTION - Mouse move effect
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const bubbles = bubblesRef.current
        
        bubbles.forEach((bubble, index) => {
          if (!bubble) return
          
          const bubbleRect = bubble.getBoundingClientRect()
          const bubbleX = bubbleRect.left + bubbleRect.width / 2
          const bubbleY = bubbleRect.top + bubbleRect.height / 2
          
          const distanceX = clientX - bubbleX
          const distanceY = clientY - bubbleY
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
          
          // Only affect bubbles within 200px of mouse
          if (distance < 200) {
            const force = (200 - distance) / 200
            const moveX = (distanceX / distance) * force * 50
            const moveY = (distanceY / distance) * force * 50
            
            gsap.to(bubble, {
              x: `+=${moveX}`,
              y: `+=${moveY}`,
              duration: 0.8,
              ease: "power2.out"
            })
          }
        })
      }

      // Mouse leave - reset bubbles position
      const handleMouseLeave = () => {
        bubblesRef.current.forEach(bubble => {
          if (bubble) {
            gsap.to(bubble, {
              x: 0,
              y: 0,
              duration: 1,
              ease: "elastic.out(1, 0.5)"
            })
          }
        })
      }

      // Add event listeners for bubbles
      document.addEventListener('mousemove', handleMouseMove)
      stayConnectedRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -15,
        x: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      })

      // Stats icons floating animation
      gsap.to('.stat-icon', {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 1.5,
          from: "random"
        }
      })

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        stayConnectedRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, stayConnectedRef)

    return () => ctx.revert()
  }, [])

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setEmail('')
      setIsSuccess(true)
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 4000)
      
    } catch (error) {
      console.error('Error submitting newsletter:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="stay-connected" ref={stayConnectedRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/10 z-0"></div>
      
      {/* Interactive Bubbles */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Blue Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-md top-1/6 left-6 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#125FFD]/25 to-[#125FFD]/10 blur-sm top-3/4 left-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-md top-1/2 right-8 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Green Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-md top-1/4 right-6 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#1E9A4D]/30 to-[#1E9A4D]/15 blur-sm top-2/3 right-12 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-4/5 left-12 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Small Mixed Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#125FFD]/20 to-[#1E9A4D]/15 blur-sm top-1/3 left-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#1E9A4D]/25 to-[#125FFD]/20 blur-sm top-3/5 right-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="stay-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="stay-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {data.subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

     
        {/* Newsletter Signup with Image */}
<div className="newsletter-form rounded-3xl overflow-hidden shadow-2xl border border-[#1E9A4D]/20 mb-16 relative">
  {/* Background Image with Gradient Overlay */}
  <div className="absolute inset-0">
    <img 
      src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
      alt="Wellness Community"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#125FFD]/80 via-[#1E9A4D]/70 to-[#125FFD]/80"></div>
  </div>
  
  {/* Content */}
  <div className="relative z-10 p-12">
    <h3 className="text-3xl font-bold text-white mb-4">
      Get Wellness Tips & Updates
    </h3>
    <p className="text-white/90 text-lg mb-8">
      Subscribe to our newsletter for the latest wellness insights, platform updates, and exclusive content.
    </p>

    {/* Success Message */}
    {isSuccess && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6 text-center animate-bounce-slow">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold">Successfully subscribed!</span>
        </div>
      </div>
    )}

    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 px-6 py-4 rounded-xl border-2 border-white/30 bg-white/20 text-white placeholder-white/70 focus:border-white focus:outline-none transition-colors duration-200 focus:bg-white/30 backdrop-blur-sm"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-white text-[#125FFD] hover:shadow-xl hover:scale-105 hover:bg-gray-50'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-[#125FFD] border-t-transparent rounded-full animate-spin"></div>
            <span>Subscribing...</span>
          </div>
        ) : (
          'Subscribe'
        )}
      </button>
    </form>
  </div>
</div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {data.stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item text-center bg-white/85 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#1E9A4D]/20"
            >
              <div 
                className="stat-icon text-5xl mb-4 transition-colors duration-300"
                style={{ color: index % 2 === 0 ? '#125FFD' : '#1E9A4D' }}
              >
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="social-section text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Follow Us on Social Media
          </h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://facebook.com/wellnex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-12 h-12 bg-[#125FFD] text-white rounded-full flex items-center justify-center hover:bg-[#125FFD]/90 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/wellnex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-12 h-12 bg-[#125FFD] text-white rounded-full flex items-center justify-center hover:bg-[#125FFD]/90 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/wellnex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-12 h-12 bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/company/wellnex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-12 h-12 bg-[#125FFD] text-white rounded-full flex items-center justify-center hover:bg-[#125FFD]/90 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com/wellnex" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon w-12 h-12 bg-[#1E9A4D] text-white rounded-full flex items-center justify-center hover:bg-[#1E9A4D]/90 hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}

export default StayConnected