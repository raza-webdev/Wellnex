import { useEffect, useRef } from 'react'

const About = ({ data }) => {
  const aboutRef = useRef(null)
  const cardsRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const parallaxRef = useRef(null)
  const bannerTextRef = useRef(null)
  const bubblesRef = useRef([])

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.about-title', 
        {
          y: 100,
          opacity: 0,
          rotationX: 90
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.about-title',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Description animation
      gsap.fromTo('.about-description',
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.about-description',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Trust indicators cards
      gsap.fromTo('.trust-card',
        {
          y: 80,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: "center"
          },
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Parallax image effect
      gsap.fromTo('.parallax-image',
        {
          y: 100,
          scale: 1.1
        },
        {
          y: -100,
          scale: 1,
          duration: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      )

      // Banner text animation
      gsap.fromTo('.banner-text',
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bannerTextRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -30,
        x: "random(-20, 20)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 3,
          from: "random"
        }
      })

      // Mouse move interaction for bubbles
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

      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove)
      aboutRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        aboutRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, aboutRef)

    return () => ctx.revert()
  }, [])

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  return (
    <section id="about" ref={aboutRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/15 z-0"></div>
      
      {/* Interactive Bubbles - Now in front layer */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Large Visible Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#125FFD]/40 to-[#125FFD]/25 blur-md top-1/4 left-5 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#1E9A4D]/45 to-[#1E9A4D]/30 blur-md top-3/4 left-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-36 h-36 rounded-full bg-gradient-to-br from-[#125FFD]/50 to-[#125FFD]/35 blur-md top-1/2 right-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-20 right-1/3 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Medium Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#125FFD]/45 to-[#125FFD]/30 blur-sm top-2/3 right-5 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#1E9A4D]/50 to-[#1E9A4D]/35 blur-sm top-1/4 right-1/4 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#125FFD]/40 to-[#125FFD]/25 blur-sm top-3/4 left-1/3 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#1E9A4D]/45 to-[#1E9A4D]/30 blur-sm top-1/3 left-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Small Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 8)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-sm top-10 left-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 9)}
          className="bubble absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-sm top-60 right-32 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 10)}
          className="bubble absolute w-12 h-12 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-sm top-80 left-40 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 11)}
          className="bubble absolute w-10 h-10 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-sm top-40 right-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Extra Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 12)}
          className="bubble absolute w-15 h-15 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-sm top-2/4 left-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 13)}
          className="bubble absolute w-13 h-13 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-sm top-1/5 right-40 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="about-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p ref={descriptionRef} className="about-description text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {data.trustIndicators.map((indicator, index) => (
            <div 
              key={index}
              className="trust-card bg-white/90 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#1E9A4D]/20 transform-style-preserve-3d"
            >
              <div className="text-5xl mb-4 transform-style-preserve-3d" style={{ color: index % 2 === 0 ? '#125FFD' : '#1E9A4D' }}>
                {indicator.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transform-style-preserve-3d">
                {indicator.title}
              </h3>
              <p className="text-gray-600 leading-relaxed transform-style-preserve-3d">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>

        {/* Parallax Image Section */}
        <div ref={parallaxRef} className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
          <div 
            className="parallax-image absolute inset-0 bg-cover bg-center bg-no-repeat rounded-3xl opacity-90"
            style={{ backgroundImage: `url(${data.parallaxImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[black]/80 to-[gray]/30 to-transparent rounded-3xl"></div>
          </div>
          <div ref={bannerTextRef} className="relative z-10 h-full flex items-start p-8 md:p-12 pt-16 md:pt-20">
            <div className="banner-text text-white max-w-4xl">
              <br />
              <br />
              <br />
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-[#F8F8F8] bg-clip-text text-transparent">
                Experience the Future
              </h3>
              <p className="text-lg md:text-xl opacity-100 leading-relaxed">
              Join thousands of fitness lovers, health seekers, and mindful individuals who have already upgraded their lifestyle through Wellnex — an all-in-one digital ecosystem powered by intelligent AI, cutting-edge HealthTech, and a vision for tomorrow’s wellbeing.
              Track your progress, calm your mind, and unlock your full potential — anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for 3D transforms */}
      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  )
}

export default About