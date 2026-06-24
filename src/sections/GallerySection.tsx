import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    label: '立骨',
    labelEn: 'Build Structure',
    description: '一张脸要有气场，首先要有支撑感。越公子会观察面部骨相的起伏、转折和承重点，判断哪里需要被加强，哪里只需要被梳理。',
    image: './images/photo3.jpg',
  },
  {
    label: '开阔',
    labelEn: 'Open Space',
    description: '面部空间不只是立体度，也包括视觉呼吸。额面、眉眼、中面部、下庭之间的关系，会影响一个人的气质是局促还是舒展。',
    image: './images/photo4.jpg',
  },
  {
    label: '收锋',
    labelEn: 'Sharpen Gently',
    description: '酷感来自锋芒，但锋芒不能乱长。线条太散，气场会弱；线条太狠，又会显得攻击性过强。让轮廓更明确，让五官更有方向。',
    image: './images/photo5.jpg',
  },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const coverRef = useRef<HTMLDivElement>(null)
  const coverTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    itemRefs.current.forEach((item, index) => {
      if (!item) return
      const img = item.querySelector('img')
      if (img) {
        gsap.set(img, { y: index % 2 === 0 ? -20 : 20 })
        const anim = gsap.to(img, {
          y: index % 2 === 0 ? 20 : -20, ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
      }
      gsap.set(item, { opacity: 0, y: 40 })
      const anim = gsap.to(item, {
        opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reset' },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    if (coverRef.current) {
      const bg = coverRef.current.querySelector('.cover-bg')
      if (bg) {
        const anim = gsap.fromTo(bg,
          { y: -30, scale: 1.1 },
          { y: 30, scale: 1.1, ease: 'none',
            scrollTrigger: { trigger: coverRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        )
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
      }
    }

    if (coverTextRef.current) {
      const children = coverTextRef.current.children
      gsap.set(children, { opacity: 0, y: 25 })
      const anim = gsap.to(children, {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: coverTextRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    }

    return () => { triggers.forEach(t => t.kill()) }
  }, [])

  return (
    <>
      <section ref={sectionRef} id="gallery" className="relative w-full pt-16 md:pt-24">
        <div className="px-6 md:px-12 lg:px-24 mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#8a8a8a]/40" />
            <span className="text-xs text-[#8a8a8a] tracking-[0.3em] uppercase">Four Actions</span>
          </div>
          <h2 className="font-serif-sc text-3xl md:text-5xl text-[#f4f4f4] leading-tight">审美主张</h2>
          <p className="font-sans-sc text-sm text-[#8a8a8a] mt-2 tracking-wide">面部空间美学的四个设计动作</p>
        </div>

        <div className="px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={item.label}
                ref={el => { itemRefs.current[index] = el }}
                className={`${index === 1 ? 'md:mt-12' : index === 2 ? 'md:mt-6' : ''}`}
              >
                <div className="relative overflow-hidden rounded-sm group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/20 transition-all duration-500" />
                  <div className="absolute top-4 left-4 glass-surface px-5 py-2.5 rounded-sm">
                    <span className="font-serif-sc text-lg md:text-xl text-[#f4f4f4]">{item.label}</span>
                    <span className="text-xs md:text-sm text-[#8a8a8a] ml-2">{item.labelEn}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent">
                    <p className="font-sans-sc text-sm text-[#f4f4f4]/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={coverRef}
        className="relative w-full overflow-hidden mt-16 md:mt-24"
        style={{ height: '80vh', minHeight: '450px' }}
      >
        <div className="cover-bg absolute inset-0 w-full h-[120%] -top-[10%]" style={{ willChange: 'transform' }}>
          <img
            src="./images/photo6.jpg"
            alt="留情"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/50" />

        <div ref={coverTextRef} className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="font-serif-sc text-3xl md:text-5xl text-[#d4af37]">留情</span>
              <span className="text-sm md:text-base text-[#8a8a8a] tracking-wider">Keep Softness</span>
            </div>
            <div className="w-16 h-px bg-[#d4af37]/40 mb-5" />
            <p className="font-sans-sc text-base md:text-xl text-[#f4f4f4]/95 leading-relaxed">
              这是他风格里最重要的一点。再酷的脸，也需要一点柔情。笑起来不能僵，眼神不能空，脸上不能只剩设计痕迹。
            </p>
            <p className="font-sans-sc text-sm md:text-base text-[#f4f4f4]/70 leading-relaxed mt-3">
              留情，是保留一个人的故事、脆弱和真实感，让她或他在变强之后，仍然像一个活生生的人。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
