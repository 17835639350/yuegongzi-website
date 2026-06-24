import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const audienceItems = [
  '你想要更强的面部气场，但不想被做得僵硬、尖锐或失去人味。',
  '你觉得自己的脸不算差，但总少一点清晰度、空间感和辨识度。',
  '你喜欢酷感、冷感、利落感，却仍然希望保留一点柔软和真实。',
  '你不想只改某一个部位，而是希望有人从整体空间关系帮你判断。',
  '你想摆脱被流行审美牵着走的状态，建立属于自己的面部秩序。',
]

export default function AudienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 0, y: 30 })
      const anim = gsap.to(imageRef.current, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    itemRefs.current.forEach((item, index) => {
      if (!item) return
      gsap.set(item, { opacity: 0, x: -20 })
      const anim = gsap.to(item, {
        opacity: 1, x: 0, duration: 0.6, delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reset',
        },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    return () => { triggers.forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={sectionRef} id="audience" className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#8a8a8a]/40" />
          <span className="text-xs text-[#8a8a8a] tracking-[0.3em] uppercase">For You</span>
        </div>
        <h2 className="font-serif-sc text-3xl md:text-5xl text-[#f4f4f4] max-w-3xl leading-tight">
          适合来到这里的人
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div ref={imageRef} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src="./images/photo4.jpg"
              alt="适合来到这里的人"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-3 -left-3 w-16 h-16 border border-[#d4af37]/20 rounded-sm hidden md:block" />
          <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#d4af37]/10 rounded-sm hidden md:block" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="space-y-5">
            {audienceItems.map((item, index) => (
              <div
                key={index}
                ref={el => { itemRefs.current[index] = el }}
                className="group flex items-start gap-3 md:gap-4"
              >
                <div className="shrink-0 w-6 h-6 rounded-full border border-[#d4af37]/40 flex items-center justify-center mt-0.5 group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                  <span className="text-xs text-[#d4af37]">{index + 1}</span>
                </div>
                <p className="font-sans-sc text-sm md:text-base text-[#f4f4f4]/80 leading-relaxed group-hover:text-[#f4f4f4] transition-colors duration-300">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="glass-surface inline-flex items-center gap-3 px-5 py-3 rounded-sm cursor-pointer hover:bg-[rgba(255,255,255,0.06)] transition-colors duration-300">
              <span className="font-serif-sc text-sm text-[#d4af37]">开始你的面部空间之旅</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#d4af37]">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
