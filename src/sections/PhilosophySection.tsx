import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const text1Ref = useRef<HTMLParagraphElement>(null)
  const text2Ref = useRef<HTMLParagraphElement>(null)
  const text3Ref = useRef<HTMLParagraphElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = [headingRef, text1Ref, text2Ref, text3Ref, quoteRef]
    const triggers: ScrollTrigger[] = []

    elements.forEach((ref, i) => {
      if (!ref.current) return
      gsap.set(ref.current, { opacity: 0, y: 25 })
      const anim = gsap.to(ref.current, {
        opacity: 1, y: 0, duration: 0.8, delay: i * 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reset',
        },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    return () => { triggers.forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={sectionRef} id="philosophy" className="relative w-full">
      <div className="relative w-full" style={{ height: '70vh', minHeight: '400px' }}>
        <img
          src="./images/photo2.jpg"
          alt="越公子"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#d4af37]/40" />
            <span className="text-xs text-[#d4af37]/60 tracking-[0.3em] uppercase">Aesthetic Philosophy</span>
            <div className="w-8 h-px bg-[#d4af37]/40" />
          </div>
          <h2
            ref={headingRef}
            className="font-serif-sc text-3xl md:text-5xl lg:text-6xl text-[#f4f4f4] text-center max-w-4xl leading-tight"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            冷感只是外壳，柔情藏在判断里
          </h2>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-4xl mx-auto">
        <div className="flex flex-col gap-7">
          <p ref={text1Ref} className="font-sans-sc text-base md:text-lg text-[#f4f4f4]/80 leading-relaxed">
            越公子的气质很容易让人记住。他说话不绕，判断也快，常常一句话就能指出一张脸最大的问题：不是鼻子不够高，也不是下巴不够尖，而是面部空间没有被打开，轮廓没有形成秩序，气场被一些细碎的不协调削弱了。
          </p>
          <p ref={text2Ref} className="font-sans-sc text-base md:text-lg text-[#f4f4f4]/80 leading-relaxed">
            但他并不是一个只追求锋利的人。相反，他对"过度用力"的警惕很深。太满会钝，太尖会假，太冷会失去人味。真正高级的脸，不是每一个角度都强势，而是在强势之外仍然保留一点柔软，一点生活感，一点别人靠近时能感受到的温度。
          </p>
          <p ref={text3Ref} className="font-sans-sc text-base md:text-lg text-[#f4f4f4]/80 leading-relaxed">
            他擅长的是面部空间美学设计：把骨相、轮廓、五官、比例、留白和表情放进一个整体里看。一个人要变酷，不一定要变得更冷；一个人要有气场，也不一定要牺牲柔情。越公子想做的，是让每张脸都拥有自己的空间秩序。
          </p>
        </div>
      </div>

      <div ref={quoteRef} className="pb-16 md:pb-24 flex justify-center px-6">
        <div className="glass-surface px-8 py-5 md:px-12 md:py-6 rounded-sm max-w-2xl">
          <p className="font-serif-sc text-base md:text-xl text-[#d4af37] text-center leading-relaxed">
            "脸的高级感，先来自空间秩序"
          </p>
        </div>
      </div>
    </section>
  )
}
