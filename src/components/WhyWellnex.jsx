import { useEffect, useRef } from 'react'

const WhyWellnex = ({ data }) => {
  const whyWellnexRef = useRef(null)
  const bubblesRef = useRef([])

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // WhyWellnex section animations
      gsap.fromTo(whyWellnexRef.current.querySelector('.why-title'), 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyWellnexRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      gsap.fromTo(whyWellnexRef.current.querySelector('.why-subtitle'), 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: whyWellnexRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Features animation
      gsap.fromTo(whyWellnexRef.current.querySelectorAll('.feature-card'), 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: whyWellnexRef.current.querySelector('.features-grid'),
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // CTA section animation
      gsap.fromTo('.cta-section',
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
          delay: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: '.cta-section',
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
      whyWellnexRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -20,
        x: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      })

      // Feature icons floating animation
      gsap.to('.feature-icon', {
        y: -10,
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
        whyWellnexRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, whyWellnexRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="why-wellnex" ref={whyWellnexRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/10 z-0"></div>
      
      {/* Interactive Bubbles */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Blue Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-md top-1/4 left-12 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-sm top-3/4 left-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-30 h-30 rounded-full bg-gradient-to-br from-[#125FFD]/40 to-[#125FFD]/25 blur-md top-1/2 right-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Green Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-1/3 right-14 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-sm top-2/3 right-24 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#1E9A4D]/45 to-[#1E9A4D]/30 blur-md top-4/5 left-24 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Small Mixed Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#125FFD]/25 to-[#1E9A4D]/20 blur-sm top-1/6 left-32 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#1E9A4D]/30 to-[#125FFD]/25 blur-sm top-3/5 right-32 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="why-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="why-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group bg-white/85 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#1E9A4D]/20 relative overflow-hidden"
            >
              {/* Animated background gradient with theme colors */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? '#125FFD' : '#1E9A4D'}08, ${index % 2 === 0 ? '#1E9A4D' : '#125FFD'}08)`
                }}
              ></div>
              
              {/* Icon with CSS animation */}
              <div className="relative z-10">
                <div 
                  className="feature-icon text-6xl mb-6 transition-colors duration-300"
                  style={{ color: index % 2 === 0 ? '#125FFD' : '#1E9A4D' }}
                >
                  {feature.icon}
                </div>
                
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-gray-800"
                >
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect border with theme colors */}
              <div 
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-30 transition-all duration-300"
                style={{ 
                  borderImage: index % 2 === 0 ? 
                    'linear-gradient(135deg, #125FFD, #1E9A4D) 1' : 
                    'linear-gradient(135deg, #1E9A4D, #125FFD) 1'
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA with Image */}
        <div className="cta-section text-center mt-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#1E9A4D]/20 relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Wellness Journey"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#125FFD]/80 via-[#1E9A4D]/70 to-[#125FFD]/80"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Experience the Difference?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who have transformed their wellness journey with Wellnex's innovative platform.
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('early-access')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-white text-[#125FFD] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:bg-gray-50"
              >
                Start Your Journey Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}

export default WhyWellnex