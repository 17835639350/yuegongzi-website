import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './sections/HeroSection'
import PhilosophySection from './sections/PhilosophySection'
import GallerySection from './sections/GallerySection'
import NotesSection from './sections/NotesSection'
import DialogueSection from './sections/DialogueSection'
import AudienceSection from './sections/AudienceSection'
import ClosingSection from './sections/ClosingSection'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0 })
    }
  }

  const navItems = [
    { id: 'hero', label: '首屏' },
    { id: 'philosophy', label: '主张' },
    { id: 'gallery', label: '叙事' },
    { id: 'notes', label: '札记' },
    { id: 'dialogue', label: '对话' },
    { id: 'audience', label: '适合' },
    { id: 'closing', label: '尾声' },
  ]

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 md:py-4 bg-[#0a0a0a]/50 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button onClick={() => scrollTo('hero')} className="font-serif-sc text-base md:text-lg text-[#d4af37] hover:text-[#e8c54d] transition-colors">
            越公子
          </button>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.slice(1).map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-xs text-[#8a8a8a] hover:text-[#f4f4f4] tracking-wider transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="菜单">
            <span className={`w-5 h-px bg-[#f4f4f4] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`w-5 h-px bg-[#f4f4f4] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
        <div className={`md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left text-sm text-[#8a8a8a] hover:text-[#f4f4f4] py-2 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <HeroSection />
        <PhilosophySection />
        <GallerySection />
        <NotesSection />
        <DialogueSection />
        <AudienceSection />
        <ClosingSection />
      </main>
    </div>
  )
}
