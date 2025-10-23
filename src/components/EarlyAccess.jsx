import { useState, useEffect, useRef } from 'react'

const EarlyAccess = ({ data }) => {
  const earlyAccessRef = useRef(null)
  const formRef = useRef(null)
  const bubblesRef = useRef([])
  const [formData, setFormData] = useState({
    email: '',
    userType: 'individual',
    firstName: '',
    lastName: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  // Function to add bubble to ref array
  const addBubbleToRef = (el, index) => {
    bubblesRef.current[index] = el
  }

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.early-title',
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
            trigger: '.early-title',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Subtitle animation
      gsap.fromTo('.early-subtitle',
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
            trigger: '.early-subtitle',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Form animation
      gsap.fromTo(formRef.current,
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
            trigger: formRef.current,
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
      earlyAccessRef.current?.addEventListener('mouseleave', handleMouseLeave)

      // Bubbles floating animation
      gsap.to('.bubble', {
        y: -20,
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

      // Benefits animation
      gsap.fromTo('.benefit-item',
        {
          y: 30,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: '.benefits-section',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Cleanup
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        earlyAccessRef.current?.removeEventListener('mouseleave', handleMouseLeave)
      }

    }, earlyAccessRef)

    return () => ctx.revert()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form
      setFormData({
        email: '',
        userType: 'individual',
        firstName: '',
        lastName: ''
      })
      setErrors({})
      setIsSuccess(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <section id="early-access" ref={earlyAccessRef} className="py-20 relative overflow-hidden cursor-pointer">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F8F8] via-white to-[#1E9A4D]/10 z-0"></div>
      
      {/* Interactive Bubbles */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Blue Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 0)}
          className="bubble absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#125FFD]/30 to-[#125FFD]/15 blur-md top-1/6 left-8 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 1)}
          className="bubble absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#125FFD]/25 to-[#125FFD]/10 blur-sm top-3/4 left-12 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 2)}
          className="bubble absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#125FFD]/35 to-[#125FFD]/20 blur-md top-1/2 right-10 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        
        {/* Green Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 3)}
          className="bubble absolute w-22 h-22 rounded-full bg-gradient-to-br from-[#1E9A4D]/35 to-[#1E9A4D]/20 blur-md top-1/4 right-8 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 4)}
          className="bubble absolute w-18 h-18 rounded-full bg-gradient-to-br from-[#1E9A4D]/30 to-[#1E9A4D]/15 blur-sm top-2/3 right-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 5)}
          className="bubble absolute w-26 h-26 rounded-full bg-gradient-to-br from-[#1E9A4D]/40 to-[#1E9A4D]/25 blur-md top-4/5 left-16 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>

        {/* Small Mixed Bubbles */}
        <div 
          ref={el => addBubbleToRef(el, 6)}
          className="bubble absolute w-14 h-14 rounded-full bg-gradient-to-br from-[#125FFD]/20 to-[#1E9A4D]/15 blur-sm top-1/3 left-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div 
          ref={el => addBubbleToRef(el, 7)}
          className="bubble absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#1E9A4D]/25 to-[#125FFD]/20 blur-sm top-3/5 right-20 cursor-pointer hover:scale-110 transition-transform duration-300"
          style={{ pointerEvents: 'auto' }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="early-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.title}
          </h2>
          <p className="early-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {data.subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8 text-center animate-bounce-slow">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-semibold">Success! You've been added to our early access program.</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div ref={formRef} className="bg-white/85 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-[#1E9A4D]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
                    errors.firstName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#125FFD]'
                  } focus:outline-none`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
                    errors.lastName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-[#125FFD]'
                  } focus:outline-none`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors duration-200 ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500' 
                    : 'border-gray-200 focus:border-[#125FFD]'
                } focus:outline-none`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                I am a: *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.userTypes.map((type, index) => (
                  <label
                    key={type.id}
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                      formData.userType === type.id
                        ? `border-[#125FFD] ${index % 2 === 0 ? 'bg-[#125FFD]10' : 'bg-[#1E9A4D]10'}`
                        : 'border-gray-200 hover:border-[#125FFD]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      value={type.id}
                      checked={formData.userType === type.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-600">{type.description}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.userType === type.id
                        ? `border-[#125FFD] ${index % 2 === 0 ? 'bg-[#125FFD]' : 'bg-[#1E9A4D]'}`
                        : 'border-gray-300'
                    }`}>
                      {formData.userType === type.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#125FFD] to-[#1E9A4D] text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Join Early Access Program'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="benefits-section mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Early Access Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="benefit-item text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Priority Access</h4>
              <p className="text-gray-600">Be the first to try new features and updates</p>
            </div>
            <div className="benefit-item text-center">
              <div className="text-4xl mb-4">💬</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Direct Feedback</h4>
              <p className="text-gray-600">Help shape the platform with your input</p>
            </div>
            <div className="benefit-item text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Special Pricing</h4>
              <p className="text-gray-600">Exclusive discounts and offers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  )
}

export default EarlyAccess