import { useEffect, useRef } from 'react'

const FuturePlatform = ({ data }) => {
  const futureRef = useRef(null)
  const timelineRef = useRef(null)
  const bubblesRef = useRef([])

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // MIND-BLOWING TITLE ANIMATION - Holographic text effect with theme colors
      const title = futureRef.current.querySelector('.future-title')
      const originalText = title.textContent
      title.innerHTML = ''
      
      // Create holographic layers with theme colors
      for (let i = 0; i < 1; i++) {
        const layer = document.createElement('span')
        layer.className = `hologram-layer hologram-layer-${i} absolute inset-0`
        layer.textContent = originalText
        layer.style.cssText = `
          opacity: ${i === 0 ? 1 : 0.4};
          color: ${i === 0 ? '#1f2937' : i === 1 ? '#125FFD' : '#1E9A4D'};
          filter: blur(${i * 0.5}px);
          transform: translateZ(${i * 10}px);
        `
        title.style.position = 'relative'
        title.appendChild(layer)
      }

      gsap.fromTo('.hologram-layer',
        {
          y: 100,
          opacity: 0,
          rotationX: 90
        },
        {
          y: 0,
          opacity: (i) => i === 0 ? 1 : 0.4,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // SUBTITLE - Liquid morph animation
      gsap.fromTo('.future-subtitle',
        {
          y: 50,
          opacity: 0,
          scaleY: 0
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: '.future-subtitle',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // TIMELINE ANIMATIONS - Next level effects
      const timelineLine = timelineRef.current.querySelector('.timeline-line')
      const timelineDots = timelineRef.current.querySelectorAll('.timeline-dot')
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item')

      // Animate timeline line drawing
      gsap.fromTo(timelineLine,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineLine,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      )

      // Timeline dots - Pulse with glow effect
      timelineDots.forEach((dot, index) => {
        gsap.fromTo(dot,
          {
            scale: 0,
            opacity: 0,
            rotation: 180
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1,
            delay: index * 0.3,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Continuous glow animation with theme colors
        gsap.to(dot, {
          boxShadow: `0 0 20px 5px ${index % 2 === 0 ? 'rgba(18, 95, 253, 0.6)' : 'rgba(30, 154, 77, 0.6)'}`,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })

      // Timeline items - 3D cascade effect
      timelineItems.forEach((item, index) => {
        const card = item.querySelector('.timeline-card')
        const isEven = index % 2 === 0

        // Set initial state - cards in 3D formation
        gsap.set(card, {
          x: isEven ? -200 : 200,
          y: 100,
          rotationY: isEven ? -45 : 45,
          opacity: 0,
          scale: 0.8
        })

        // Entrance animation - cards fly in from sides
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        })

        // Hover effect - 3D depth with parallax
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            rotationY: isEven ? -5 : 5,
            scale: 1.02,
            z: 50,
            duration: 0.4,
            ease: "power2.out"
          })

          // Feature dots animation with theme colors
          const featureDots = card.querySelectorAll('.feature-dot')
          gsap.to(featureDots, {
            scale: 1.5,
            backgroundColor: index % 2 === 0 ? "#125FFD" : "#1E9A4D",
            duration: 0.3,
            stagger: 0.1,
            ease: "back.out(3)"
          })

          // Status badge glow with theme colors
          gsap.to(card.querySelector('.status-badge'), {
            boxShadow: `0 0 15px ${index % 2 === 0 ? 'rgba(18, 95, 253, 0.4)' : 'rgba(30, 154, 77, 0.4)'}`,
            duration: 0.3
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotationY: 0,
            scale: 1,
            z: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)"
          })

          const featureDots = card.querySelectorAll('.feature-dot')
          gsap.to(featureDots, {
            scale: 1,
            backgroundColor: index % 2 === 0 ? "#125FFD" : "#1E9A4D",
            duration: 0.3
          })

          gsap.to(card.querySelector('.status-badge'), {
            boxShadow: "none",
            duration: 0.3
          })
        })

        // Continuous subtle floating
        gsap.to(card, {
          y: -5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
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
      futureRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -25,
        x: "random(-15, 15)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 3,
          from: "random"
        }
      })

      // CTA SECTION - Magnetic field effect
      const ctaSection = futureRef.current.querySelector('.cta-section')
      const ctaButton = futureRef.current.querySelector('.cta-button')

      gsap.fromTo(ctaSection,
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // CTA Button magnetic effect
      ctaButton.addEventListener('mousemove', (e) => {
        const rect = ctaButton.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const angleX = (y - centerY) / 15
        const angleY = (centerX - x) / 15
        
        gsap.to(ctaButton, {
          rotationX: angleX,
          rotationY: angleY,
          transformPerspective: 500,
          duration: 0.5,
          ease: "power2.out"
        })
      })
      
      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        })
      })

      // WAVE DISTORTION EFFECT on scroll
      gsap.to('.timeline-card', {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true
        },
        y: (i, target) => Math.sin(i * 0.5) * 20,
        rotationY: (i, target) => Math.sin(i * 0.5) * 5,
        ease: "none"
      })

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        futureRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, futureRef)

    return () => ctx.revert()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-blue-500'
      case 'planned':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'in-progress':
        return 'In Progress'
      case 'planned':
        return 'Planned'
      default:
        return 'Planned'
    }
  }

  return (
    <section id="future-platform" ref={futureRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/10 z-0"></div>
      
      {/* Interactive Bubbles */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Blue Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-md top-1/6 left-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-sm top-3/4 left-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#125FFD]/40 to-[#125FFD]/25 blur-md top-1/2 right-18 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Green Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-1/4 right-14 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-sm top-2/3 right-26 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-30 h-30 rounded-full bg-gradient-to-br from-[#1E9A4D]/45 to-[#1E9A4D]/30 blur-md top-4/5 left-26 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Small Mixed Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#125FFD]/25 to-[#1E9A4D]/20 blur-sm top-1/3 left-34 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#1E9A4D]/30 to-[#125FFD]/25 blur-sm top-3/5 right-34 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#125FFD]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1E9A4D]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="future-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <br />
          <br />
          <br />
          <br />
          <p className="future-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="timeline relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#125FFD] to-[#1E9A4D] transform md:-translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {data.timeline.map((item, index) => (
              <div 
                key={index}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-[#125FFD] rounded-full transform md:-translate-x-1/2 z-10"></div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="timeline-card bg-white/85 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-[#1E9A4D]/20 transform-style-3d group" style={{transformStyle: 'preserve-3d'}}>
                    {/* Status badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="status-badge text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300"
                        style={{ 
                          color: index % 2 === 0 ? '#125FFD' : '#1E9A4D',
                          backgroundColor: index % 2 === 0 ? '#125FFD15' : '#1E9A4D15'
                        }}
                      >
                        {item.quarter}
                      </span>
                      <span className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-gray-800"
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2">
                      {item.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div 
                            className="feature-dot w-2 h-2 rounded-full transition-all duration-300"
                            style={{ backgroundColor: index % 2 === 0 ? '#125FFD' : '#1E9A4D' }}
                          ></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA with Image */}
        <div className="cta-section text-center mt-16">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#1E9A4D]/20 relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                alt="Future Technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#125FFD]/80 via-[#1E9A4D]/70 to-[#125FFD]/80"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Be Part of the Future
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Get early access to these exciting features and help shape the future of wellness technology.
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('early-access')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="cta-button bg-white text-[#125FFD] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:bg-gray-50"
                style={{transformStyle: 'preserve-3d'}}
              >
                Join Early Access Program
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .hologram-layer {
          pointer-events: none;
        }
        .particle {
          filter: blur(1px);
        }
      `}</style>
    </section>
  )
}

export default FuturePlatform