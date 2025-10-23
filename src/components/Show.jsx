import { useEffect, useRef } from 'react'

const Show = ({ data }) => {
  const showRef = useRef(null)
  const appsRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const bubblesRef = useRef([])

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // SCROLLTRIGGER CONFIGURATION
      ScrollTrigger.normalizeScroll(true)
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
      })

      // CRAZY TITLE ANIMATION
      const titleChars = titleRef.current.textContent.split('')
      titleRef.current.innerHTML = titleChars.map(char => 
        `<span class="char-magnetic">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')

      gsap.fromTo('.char-magnetic',
        {
          y: 200,
          rotationY: 90,
          rotationX: 45,
          scale: 0,
          opacity: 0,
          filter: "blur(20px)"
        },
        {
          y: 0,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: {
            amount: 1.5,
            from: "random"
          },
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Magnetic hover effect for title
      const chars = gsap.utils.toArray('.char-magnetic')
      chars.forEach(char => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            y: -15,
            rotationY: 15,
            rotationX: 10,
            scale: 1.2,
            color: "#125FFD",
            duration: 0.3,
            ease: "power2.out"
          })
        })
        char.addEventListener('mouseleave', () => {
          gsap.to(char, {
            y: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            color: "#1f2937",
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          })
        })
      })

      // SUBTITLE ANIMATION
      gsap.fromTo(subtitleRef.current,
        {
          y: 100,
          opacity: 0,
          scaleY: 0.5
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            end: "bottom 70%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // NEW CARD ANIMATIONS - NO TILT, BETTER EFFECTS
      const apps = gsap.utils.toArray('.app-card')
      
      // MORPHING GRID ENTRANCE - Cards come from different directions
      gsap.fromTo(apps, 
        {
          x: (index) => index % 2 === 0 ? -200 : 200,
          y: 100,
          scale: 0.8,
          opacity: 0,
          rotationZ: (index) => index % 2 === 0 ? -10 : 10
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          rotationZ: 0,
          duration: 1.2,
          stagger: {
            each: 0.2,
            from: "start",
            grid: "auto"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: appsRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // GLOW PULSE EFFECT - Continuous gentle glow
      apps.forEach((app, index) => {
        // Border glow animation
        gsap.to(app, {
          boxShadow: `0 0 30px ${index % 2 === 0 ? 'rgba(18, 95, 253, 0.3)' : 'rgba(30, 154, 77, 0.3)'}`,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })

        // Floating effect with bounce
        gsap.to(app, {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3
        })

        // HOVER EFFECTS - MODERN GLOW AND SCALE
        app.addEventListener('mouseenter', () => {
          // Card scale with enhanced shadow
          gsap.to(app, {
            scale: 1.03,
            y: -15,
            boxShadow: `0 25px 50px ${index % 2 === 0 ? 'rgba(18, 95, 253, 0.4)' : 'rgba(30, 154, 77, 0.4)'}`,
            duration: 0.4,
            ease: "power2.out"
          })

          // Image zoom with parallax
          gsap.to(app.querySelector('img'), {
            scale: 1.1,
            y: -5,
            duration: 0.4,
            ease: "power2.out"
          })

          // Feature dots animation - Circular motion
          const features = app.querySelectorAll('.feature-dot')
          gsap.to(features, {
            scale: 1.5,
            x: (i) => Math.sin(i) * 5,
            y: (i) => Math.cos(i) * 5,
            backgroundColor: index % 2 === 0 ? "#125FFD" : "#1E9A4D",
            duration: 0.3,
            stagger: 0.1,
            ease: "back.out(1.5)"
          })

          // Content slide up
          gsap.to(app.querySelector('.app-content'), {
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        app.addEventListener('mouseleave', () => {
          // Reset card position
          gsap.to(app, {
            scale: 1,
            y: 0,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          })

          // Reset image
          gsap.to(app.querySelector('img'), {
            scale: 1,
            y: 0,
            duration: 0.4
          })

          // Reset features
          const features = app.querySelectorAll('.feature-dot')
          gsap.to(features, {
            scale: 1,
            x: 0,
            y: 0,
            backgroundColor: index % 2 === 0 ? "#125FFD" : "#1E9A4D",
            duration: 0.3
          })

          // Reset content
          gsap.to(app.querySelector('.app-content'), {
            y: 0,
            duration: 0.3
          })
        })
      })

      // FEATURE DOTS ENTRANCE ANIMATION
      gsap.fromTo('.feature-dot',
        {
          scale: 0,
          opacity: 0,
          rotation: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: appsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // DOWNLOAD BUTTONS - Wave animation
      const downloadBtns = gsap.utils.toArray('.download-btn')
      downloadBtns.forEach((btn, index) => {
        // Continuous wave effect
        gsap.to(btn, {
          backgroundPosition: '200% 0%',
          duration: 3,
          repeat: -1,
          ease: "none"
        })

        // Hover animation - Wave pulse
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.05,
            y: -2,
            boxShadow: `0 15px 35px ${index % 2 === 0 ? 'rgba(18, 95, 253, 0.4)' : 'rgba(30, 154, 77, 0.4)'}`,
            duration: 0.3,
            ease: "power2.out"
          })

          // Button text and icon animation
          gsap.to(btn.querySelector('svg'), {
            x: 5,
            duration: 0.3,
            ease: "power2.out"
          })
        })

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            duration: 0.4,
            ease: "power2.out"
          })

          gsap.to(btn.querySelector('svg'), {
            x: 0,
            duration: 0.3
          })
        })
      })

      // CTA BUTTON - Magnetic gradient effect
      const ctaBtn = document.querySelector('.cta-btn')
      if (ctaBtn) {
        // Continuous gradient flow
        gsap.to(ctaBtn, {
          backgroundPosition: '200% 0%',
          duration: 4,
          repeat: -1,
          ease: "none"
        })

        // Hover scale with glow
        ctaBtn.addEventListener('mouseenter', () => {
          gsap.to(ctaBtn, {
            scale: 1.08,
            y: -3,
            boxShadow: "0 20px 40px rgba(18, 95, 253, 0.5)",
            duration: 0.3,
            ease: "power2.out"
          })
        })

        ctaBtn.addEventListener('mouseleave', () => {
          gsap.to(ctaBtn, {
            scale: 1,
            y: 0,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          })
        })
      }

      // BUBBLES INTERACTION - Optimized
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
          
          if (distance < 150) {
            const force = (150 - distance) / 150
            const moveX = (distanceX / distance) * force * 30
            const moveY = (distanceY / distance) * force * 30
            
            gsap.to(bubble, {
              x: moveX,
              y: moveY,
              duration: 0.5,
              ease: "power1.out"
            })
          }
        })
      }

      const handleMouseLeave = () => {
        bubblesRef.current.forEach(bubble => {
          if (bubble) {
            gsap.to(bubble, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.3)"
            })
          }
        })
      }

      let mouseMoveTimeout
      const throttledMouseMove = (e) => {
        if (!mouseMoveTimeout) {
          mouseMoveTimeout = setTimeout(() => {
            handleMouseMove(e)
            mouseMoveTimeout = null
          }, 16)
        }
      }

      document.addEventListener('mousemove', throttledMouseMove)
      showRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -20,
        x: "random(-15, 15)",
        duration: "random(5, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 4,
          from: "random"
        }
      })

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', throttledMouseMove)
        showRef.current?.removeEventListener('mouseleave', handleMouseLeave)
        clearTimeout(mouseMoveTimeout)
      }

    }, showRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="apps" ref={showRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/10 z-0"></div>
      
      {/* Interactive Bubbles */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Blue Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-md top-1/4 left-8 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#125FFD]/40 to-[#125FFD]/25 blur-md top-3/4 left-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-sm top-1/2 right-24 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Green Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-30 h-30 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-1/3 right-12 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-md top-2/3 right-32 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#1E9A4D]/30 to-[#1E9A4D]/15 blur-sm top-4/5 left-32 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Small Mixed Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#125FFD]/25 to-[#1E9A4D]/20 blur-sm top-1/6 left-40 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#1E9A4D]/25 to-[#125FFD]/20 blur-sm top-3/5 right-40 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#125FFD]/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1E9A4D]/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="show-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p ref={subtitleRef} className="show-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Apps Grid */}
        <div ref={appsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data.apps.map((app, index) => (
            <div 
              key={index}
              className="app-card bg-white/90 backdrop-blur-lg rounded-3xl overflow-hidden shadow-xl border border-gray-200/50 relative"
            >
              {/* App Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={app.image} 
                  alt={app.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {app.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-white">
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1 font-semibold">{app.rating}</span>
                  </div>
                  <span className="text-sm opacity-80">({app.downloads})</span>
                </div>
              </div>

              {/* App Content */}
              <div className="app-content p-8 relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {app.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {app.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {app.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div 
                          className="feature-dot w-2 h-2 rounded-full transition-all duration-300"
                          style={{ backgroundColor: index % 2 === 0 ? '#125FFD' : '#1E9A4D' }}
                        ></div>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <button className="download-btn w-full bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] bg-[length:200%_100%] text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg">
                  <span>Download App</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to transform your wellness journey?
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('early-access')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="cta-btn bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] bg-[length:200%_100%] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        /* Card hover transitions */
        .app-card {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  )
}

export default Show