import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const quotes = [
  { text: '酷不是冷漠', sub: '是不再讨好' },
  { text: '真正有气场的脸', sub: '有锋芒，也有温度' },
  { text: '设计不是把脸填满', sub: '而是让空间重新成立' },
  { text: '该锋利的地方锋利', sub: '该柔软的地方柔软' },
]

export default function ClosingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLParagraphElement>(null)
  const text2Ref = useRef<HTMLParagraphElement>(null)
  const quoteRef = useRef<HTMLHeadingElement>(null)
  const artWallRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    if (quoteRef.current) {
      const text = quoteRef.current.textContent || ''
      quoteRef.current.innerHTML = ''
      const chars: HTMLSpanElement[] = []
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span')
        span.textContent = text[i]
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(20px)'
        if (text[i] === ' ') span.style.width = '0.3em'
        quoteRef.current.appendChild(span)
        chars.push(span)
      }
      gsap.to(chars, {
        opacity: 1, y: 0, stagger: 0.035, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 85%', toggleActions: 'play none none reset' },
      })
    }

    ;[text1Ref, text2Ref].forEach((ref) => {
      if (!ref.current) return
      gsap.set(ref.current, { opacity: 0, y: 25 })
      const anim = gsap.to(ref.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none reset' },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    if (artWallRef.current) {
      const items = artWallRef.current.querySelectorAll('.art-item')
      gsap.set(items, { opacity: 0, y: 25 })
      const anim = gsap.to(items, {
        opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: artWallRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    if (footerRef.current) {
      gsap.set(footerRef.current, { opacity: 0 })
      const anim = gsap.to(footerRef.current, {
        opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%', toggleActions: 'play none none reset' },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    return () => { triggers.forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={sectionRef} id="closing" className="relative w-full">
      <div className="relative w-full" style={{ height: '60vh', minHeight: '350px' }}>
        <img
          src="./images/photo1.jpg"
          alt="越公子"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#d4af37]/40" />
            <span className="text-xs text-[#d4af37]/60 tracking-[0.3em] uppercase">Epilogue</span>
          </div>
          <p ref={text1Ref} className="font-sans-sc text-base md:text-lg text-[#f4f4f4]/90 leading-relaxed mb-5" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            越公子相信，一张脸真正动人的地方，不只是漂亮，而是有态度。它可以锋利，可以冷静，可以不讨好，但它不能失去人的温度。
          </p>
          <p ref={text2Ref} className="font-sans-sc text-sm md:text-base text-[#f4f4f4]/70 leading-relaxed" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            有些改变是为了更清晰，有些改变是为了更松弛，有些改变是为了让一个人终于敢承认：我不需要被所有人喜欢，我只需要成为更完整的自己。
          </p>
        </div>
      </div>

      <div className="flex justify-center py-14 md:py-20 px-6">
        <h2
          ref={quoteRef}
          className="font-serif-sc text-xl md:text-3xl lg:text-4xl text-[#f4f4f4] text-center leading-tight max-w-3xl"
          style={{ perspective: '1000px' }}
        >
          锋芒不是为了刺人，而是为了让自己不再模糊。
        </h2>
      </div>

      <div ref={artWallRef} className="relative px-6 md:px-12 lg:px-24 pb-14 md:pb-20">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/25 to-transparent hidden md:block" />
        <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/15 to-transparent md:hidden" />

        <div className="space-y-6 md:space-y-0 max-w-3xl mx-auto">
          {quotes.map((quote, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={index} className={`art-item relative md:flex md:items-start ${index > 0 ? 'md:-mt-3' : ''}`}>
                <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:order-last'}`}>
                  <p className="font-serif-sc text-xl md:text-2xl text-[#d4af37] leading-snug">{quote.text}</p>
                  <p className="font-sans-sc text-xs md:text-sm text-[#8a8a8a]/60 mt-1 tracking-wider">{quote.sub}</p>
                </div>
                <div className="hidden md:flex md:justify-center md:w-0 relative z-10">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" style={{ boxShadow: '0 0 10px rgba(212,175,55,0.5)' }} />
                </div>
                <div className="md:hidden pl-7">
                  <div className="absolute left-[10px] top-2 w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
                  <p className="font-serif-sc text-lg text-[#d4af37] leading-snug">{quote.text}</p>
                  <p className="font-sans-sc text-xs text-[#8a8a8a]/50 mt-0.5 tracking-wider">{quote.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <footer ref={footerRef} className="border-t border-[#8a8a8a]/15 px-6 md:px-12 lg:px-24 pt-6 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="font-serif-sc text-lg text-[#f4f4f4]">越公子</span>
            <span className="text-xs text-[#8a8a8a] tracking-wider">面部美学设计师</span>
          </div>
          <div className="text-xs text-[#8a8a8a]/50 tracking-wider text-center">
            Sharp enough to be seen, soft enough to be felt.
          </div>
        </div>
      </footer>
    </section>
  )
}
