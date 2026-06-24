import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const notes = [
  {
    title: '札记一：面部空间决定第一眼气场',
    content: '有些脸不是不美，而是空间关系混乱。五官都在，却没有主次；轮廓都有，却没有方向。越公子认为，设计的第一步不是增加，而是整理。空间被理顺之后，一个人的脸会突然变得清楚。',
  },
  {
    title: '札记二：酷感不是冷漠',
    content: '真正的酷，不是把人做得无法靠近。酷是一种清醒，是边界感，是不需要讨好所有人的姿态。但如果脸上只剩冷，就会失去生命力。越公子喜欢在冷感里留一点温度，让锋芒不刺人，让强势不失真。',
  },
  {
    title: '札记三：不要把所有留白都填满',
    content: '面部设计里最容易犯的错，是看见空就想填。可有些空，是气质的呼吸。有些平，不是缺陷，而是让整体更高级的缓冲。越公子会判断哪些地方需要被撑起来，哪些地方应该被留下。',
  },
]

export default function NotesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const noteRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    noteRefs.current.forEach((note, index) => {
      if (!note) return

      gsap.set(note, { opacity: 0, y: 40 })
      const anim = gsap.to(note, {
        opacity: 1, y: 0, duration: 0.8, delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: note,
          start: 'top 88%',
          toggleActions: 'play none none reset',
        },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    return () => { triggers.forEach(t => t.kill()) }
  }, [])

  return (
    <section ref={sectionRef} id="notes" className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#8a8a8a]/40" />
          <span className="text-xs text-[#8a8a8a] tracking-[0.3em] uppercase">Aesthetic Notes</span>
        </div>
        <h2 className="font-serif-sc text-3xl md:text-5xl text-[#f4f4f4] max-w-3xl leading-tight">
          美学札记
        </h2>
        <p className="font-sans-sc text-sm md:text-base text-[#8a8a8a] mt-3 tracking-wide">
          空间、锋芒与温柔
        </p>
      </div>

      <div className="max-w-5xl space-y-6 md:space-y-8">
        {notes.map((note, index) => (
          <div
            key={index}
            ref={el => { noteRefs.current[index] = el }}
            className="group relative"
          >
            <div className="glass-surface p-5 md:p-8 rounded-sm transition-all duration-500 group-hover:border-[rgba(212,175,55,0.2)]">
              <div className="flex items-start gap-4 md:gap-6">
                <span className="font-serif-sc text-3xl md:text-5xl text-[#d4af37]/20 leading-none shrink-0">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-serif-sc text-base md:text-xl text-[#f4f4f4] mb-3 leading-snug">
                    {note.title}
                  </h3>
                  <p className="font-sans-sc text-sm md:text-base text-[#8a8a8a] leading-relaxed">
                    {note.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
