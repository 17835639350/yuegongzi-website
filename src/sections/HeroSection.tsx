import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const strokeRef = useRef<SVGTextElement>(null)
  const fillRef = useRef<SVGTextElement>(null)
  const glowRef = useRef<SVGGElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bgEl = bgRef.current
    if (!bgEl) return

    gsap.to(bgEl, {
      y: 120, ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top', end: 'bottom top', scrub: true,
      },
    })

    const STROKE_LEN = 380
    if (strokeRef.current) {
      gsap.set(strokeRef.current, {
        strokeDasharray: STROKE_LEN,
        strokeDashoffset: STROKE_LEN,
        opacity: 1,
      })
      gsap.to(strokeRef.current, {
        strokeDashoffset: 0, duration: 2.2, delay: 0.4,
        ease: 'power2.inOut',
      })
    }

    if (fillRef.current) {
      gsap.fromTo(fillRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, delay: 2, ease: 'power2.out' }
      )
    }

    if (glowRef.current) {
      gsap.fromTo(glowRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 2, delay: 2.5, ease: 'power2.out' }
      )
      gsap.to(glowRef.current, {
        opacity: 0.3, duration: 3, repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: 3.5,
      })
    }

    if (infoRef.current) {
      gsap.fromTo(infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 3, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full flex flex-col items-center justify-center"
      style={{ height: '100dvh', minHeight: '500px' }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 w-full"
        style={{ height: '120%', top: '-10%', willChange: 'transform' }}
      >
        <img src="./images/photo5.jpg" alt="越公子" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 w-full text-center px-4">
        <svg
          viewBox="0 0 500 130"
          className="w-[80vw] max-w-[550px] mx-auto"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a84c" />
              <stop offset="40%" stopColor="#d4af37" />
              <stop offset="70%" stopColor="#e8c54d" />
              <stop offset="100%" stopColor="#b8941f" />
            </linearGradient>
            <filter id="txtGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g ref={glowRef} style={{ opacity: 0 }}>
            <text x="250" y="100" textAnchor="middle" fill="url(#goldGrad)" filter="url(#txtGlow)"
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '130px' }}>
              YUE
            </text>
          </g>

          <text ref={strokeRef} x="250" y="100" textAnchor="middle"
            fill="none" stroke="#d4af37" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: '130px', opacity: 0 }}>
            YUE
          </text>

          <text ref={fillRef} x="250" y="100" textAnchor="middle" fill="url(#goldGrad)"
            style={{ fontFamily: "'Great Vibes', cursive", fontSize: '130px', opacity: 0 }}>
            YUE
          </text>

          <line x1="130" y1="118" x2="370" y2="118"
            stroke="#d4af37" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      <div
        ref={infoRef}
        className="absolute bottom-6 md:bottom-10 left-0 right-0 z-10 flex flex-col items-center gap-1"
        style={{ opacity: 0 }}
      >
        <p className="font-serif-sc text-sm md:text-base text-[#f4f4f4]/70 tracking-widest">
          面部美学设计师
        </p>
        <p className="font-sans-sc text-[10px] md:text-xs text-[#8a8a8a]/50 tracking-[0.2em] uppercase">
          Sharp enough to be seen, soft enough to be felt.
        </p>
      </div>
    </section>
  )
}
