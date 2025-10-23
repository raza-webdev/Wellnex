import { useEffect, useRef } from 'react'

const Testimonials = ({ data }) => {
  const testimonialsRef = useRef(null)
  const cardsRef = useRef(null)
  const titleRef = useRef(null)
  const statsRef = useRef(null)
  const bubblesRef = useRef([])

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // TITLE ANIMATION - Smooth fade in with subtle scale
      gsap.fromTo(titleRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // TESTIMONIAL CARDS - Smooth entrance without rotation
      const testimonialCards = gsap.utils.toArray('.testimonial-card')
      
      testimonialCards.forEach((card, index) => {
        // Set initial state - cards hidden below
        gsap.set(card, {
          y: 150,
          opacity: 0,
          scale: 0.9
        })

        // Entrance animation - cards slide up smoothly
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        })

        // Hover effect - Only subtle lift and shadow
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(18, 95, 253, 0.15)",
            duration: 0.4,
            ease: "power2.out"
          })

          // Avatar subtle scale with theme border
          gsap.to(card.querySelector('.user-avatar'), {
            scale: 1.1,
            borderColor: index % 2 === 0 ? "#125FFD" : "#1E9A4D",
            duration: 0.3,
            ease: "back.out(2)"
          })

          // Stars subtle bounce
          const stars = card.querySelectorAll('.star')
          gsap.to(stars, {
            scale: 1.2,
            y: -2,
            duration: 0.2,
            stagger: 0.05,
            ease: "back.out(3)"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          })

          gsap.to(card.querySelector('.user-avatar'), {
            scale: 1,
            borderColor: "#e5e7eb",
            duration: 0.4,
            ease: "power2.out"
          })

          gsap.to(card.querySelectorAll('.star'), {
            scale: 1,
            y: 0,
            duration: 0.3
          })
        })
      })

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
      testimonialsRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -25,
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

      // STATS COUNTER ANIMATION
      const stats = gsap.utils.toArray('.stat-number')
      stats.forEach(stat => {
        const targetValue = parseInt(stat.textContent)
        const suffix = stat.textContent.replace(/[0-9]/g, '')
        
        gsap.fromTo(stat,
          { textContent: "0" },
          {
            textContent: targetValue,
            duration: 2.5,
            snap: { textContent: 1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              stat.textContent = Math.floor(this.targets()[0].textContent) + suffix
            }
          }
        )
      })

      // QUOTE MARKS ANIMATION - Subtle fade in with theme colors
      const quotes = gsap.utils.toArray('blockquote')
      quotes.forEach((quote, index) => {
        // Add quotation marks with theme colors
        const openQuote = document.createElement('span')
        openQuote.className = 'absolute -top-4 -left-2 text-6xl font-serif'
        openQuote.style.color = index % 2 === 0 ? '#125FFD' : '#1E9A4D'
        openQuote.style.opacity = '0.15'
        openQuote.textContent = '"'
        
        const closeQuote = document.createElement('span')
        closeQuote.className = 'absolute -bottom-8 -right-2 text-6xl font-serif'
        closeQuote.style.color = index % 2 === 0 ? '#1E9A4D' : '#125FFD'
        closeQuote.style.opacity = '0.15'
        closeQuote.textContent = '"'
        
        quote.style.position = 'relative'
        quote.appendChild(openQuote)
        quote.appendChild(closeQuote)

        // Animate quotation marks fade in
        gsap.fromTo([openQuote, closeQuote],
          {
            scale: 0,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 0.15,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quote,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // BACKGROUND GRADIENT ANIMATION with theme colors
      const gradientBg = document.createElement('div')
      gradientBg.className = 'absolute inset-0 pointer-events-none'
      gradientBg.style.background = 'linear-gradient(45deg, rgba(18, 95, 253, 0.03) 0%, rgba(30, 154, 77, 0.03) 100%)'
      testimonialsRef.current.appendChild(gradientBg)

      gsap.to(gradientBg, {
        backgroundPosition: '200% 200%',
        duration: 20,
        repeat: -1,
        ease: "none"
      })

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        testimonialsRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, testimonialsRef)

    return () => ctx.revert()
  }, [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star text-lg transition-all duration-300 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ⭐
      </span>
    ))
  }

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/10 z-0"></div>
      
      {/* Interactive Bubbles */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Blue Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-md top-1/6 left-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#125FFD]/25 to-[#125FFD]/10 blur-sm top-3/4 left-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-md top-1/2 right-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Green Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-md top-1/4 right-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#1E9A4D]/30 to-[#1E9A4D]/15 blur-sm top-2/3 right-28 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-4/5 left-28 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Small Mixed Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#125FFD]/20 to-[#1E9A4D]/15 blur-sm top-1/3 left-36 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#1E9A4D]/25 to-[#125FFD]/20 blur-sm top-3/5 right-36 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real feedback from our community members across Pakistan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card bg-white/85 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#1E9A4D]/20"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-lg relative">
                "{testimonial.text}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="user-avatar w-12 h-12 rounded-full object-cover border-2 border-gray-200 transition-all duration-300"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div ref={statsRef} className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="stat-number text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="stat-number text-4xl font-bold text-gray-900 mb-2">4</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="stat-number text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials