import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const qaList = [
  { q: '你为什么会强调"面部空间美学"？', a: '因为脸不是单个部位的集合。很多人以为问题在鼻子、下巴或者苹果肌，但真正影响气质的，往往是空间关系。哪里太挤，哪里太散，哪里没有支撑，哪里没有呼吸，这些都会改变一个人的气场。我更关心的是整体秩序。' },
  { q: '你的风格常被说成酷拽，你自己怎么看？', a: '酷只是外面那一层。我的确不喜欢太甜、太满、太讨好的设计，但我也不希望一张脸冷到没有情绪。我觉得真正有力量的脸，应该有边界，也有温度；有锋芒，也有柔软的余地。' },
  { q: '你最不喜欢什么样的面部设计？', a: '我不喜欢过度解释的脸。每个部位都在用力，每一处都想证明自己做过，最后反而没有气质。好的设计应该是干净的，有判断的。它不是把所有技术都摆在脸上，而是让人感觉这个人更完整了。' },
  { q: '你会如何保护一个人的辨识度？', a: '先找出她最不能丢的东西。有人是眼神，有人是脸型里的钝感，有人是嘴角的情绪，有人是某种不对称带来的真实。设计不是消灭这些东西，而是让它们在更好的空间里成立。' },
  { q: '你希望来到这里的人获得什么？', a: '我希望她离开的时候，不只是觉得自己变好看了，而是觉得自己更有力量了。不是被改造成别人喜欢的样子，而是更敢站在自己的气场里。美应该让人更自由，而不是更焦虑。' },
]

const FRAGMENT_COUNT = 120

interface Fragment {
  mesh: THREE.Mesh
  rotSpeed: THREE.Vector3
  driftSpeed: THREE.Vector3
  initialPos: THREE.Vector3
  phase: number
  isGold: boolean
}

export default function DialogueSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const qaRefs = useRef<(HTMLDivElement | null)[]>([])
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameIdRef = useRef<number>(0)

  useEffect(() => {
    const section = sectionRef.current
    const canvasContainer = canvasContainerRef.current
    if (!section || !canvasContainer) return
    const triggers: ScrollTrigger[] = []

    qaRefs.current.forEach((qa, index) => {
      if (!qa) return
      gsap.set(qa, { opacity: 0, y: 30 })
      const anim = gsap.to(qa, {
        opacity: 1, y: 0, duration: 0.7, delay: index * 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: qa, start: 'top 92%', toggleActions: 'play none none reset' },
      })
      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger)
    })

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer
    const fragments: Fragment[] = []
    let time = 0

    const init = () => {
      const w = canvasContainer.clientWidth
      const h = canvasContainer.clientHeight
      if (w === 0 || h === 0) return false

      scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0006)

      camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 2500)
      camera.position.z = 180

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      renderer.domElement.style.display = 'block'
      canvasContainer.appendChild(renderer.domElement)
      rendererRef.current = renderer

      const geometries = [
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.ConeGeometry(0.5, 1.8, 3),
        new THREE.OctahedronGeometry(0.7, 0),
        new THREE.IcosahedronGeometry(0.6, 0),
        new THREE.DodecahedronGeometry(0.7, 0),
      ]

      for (let i = 0; i < FRAGMENT_COUNT; i++) {
        const geo = geometries[i % geometries.length]
        const isGold = i % 2 === 0
        const scale = 1.2 + Math.random() * 5.5

        const material = new THREE.MeshBasicMaterial({
          color: isGold ? 0xd4af37 : 0x555555,
          transparent: true, opacity: isGold ? 0.4 : 0.15,
          wireframe: true,
        })
        const mesh = new THREE.Mesh(geo, material)

        const x = (Math.random() - 0.5) * 500
        const y = (Math.random() - 0.5) * 450
        const z = (Math.random() - 0.5) * 250 - 30

        mesh.position.set(x, y, z)
        mesh.scale.set(scale, scale, scale)
        mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
        scene.add(mesh)

        const edgesGeo = new THREE.EdgesGeometry(geo)
        const edgeMat = new THREE.LineBasicMaterial({
          color: isGold ? 0xe8c54d : 0x444444,
          transparent: true, opacity: isGold ? 0.4 : 0.15,
        })
        const edges = new THREE.LineSegments(edgesGeo, edgeMat)
        edges.position.copy(mesh.position)
        edges.scale.copy(mesh.scale)
        edges.rotation.copy(mesh.rotation)
        scene.add(edges)

        fragments.push({
          mesh, rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.006,
            (Math.random() - 0.5) * 0.006,
            (Math.random() - 0.5) * 0.006
          ),
          driftSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            (Math.random() - 0.5) * 0.15,
            (Math.random() - 0.5) * 0.08
          ),
          initialPos: new THREE.Vector3(x, y, z),
          phase: Math.random() * Math.PI * 2,
          isGold,
        })
      }

      const pGeo = new THREE.BufferGeometry()
      const pCount = 200
      const positions = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount * 3; i++) positions[i] = (Math.random() - 0.5) * 700
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const pMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 1.5, transparent: true, opacity: 0.35 })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      return true
    }

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)
      time += 0.01

      fragments.forEach((frag) => {
        frag.mesh.rotation.x += frag.rotSpeed.x
        frag.mesh.rotation.y += frag.rotSpeed.y
        frag.mesh.rotation.z += frag.rotSpeed.z

        frag.mesh.position.x = frag.initialPos.x + Math.sin(time + frag.phase) * frag.driftSpeed.x * 25
        frag.mesh.position.y = frag.initialPos.y + Math.cos(time * 0.7 + frag.phase) * frag.driftSpeed.y * 25
        frag.mesh.position.z = frag.initialPos.z + Math.sin(time * 0.5 + frag.phase) * frag.driftSpeed.z * 12

        const mat = frag.mesh.material as THREE.MeshBasicMaterial
        const base = frag.isGold ? 0.35 : 0.12
        mat.opacity = base + Math.sin(time * 2.5 + frag.phase) * 0.12
      })

      camera.position.x = Math.sin(time * 0.12) * 12
      camera.position.y = Math.cos(time * 0.1) * 10
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }

    if (init()) animate()

    const handleResize = () => {
      if (!rendererRef.current || !camera || !canvasContainer) return
      const w = canvasContainer.clientWidth
      const h = canvasContainer.clientHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameIdRef.current)
      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current = null
      }
      if (canvasContainer && canvasContainer.firstChild) {
        canvasContainer.removeChild(canvasContainer.firstChild)
      }
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="dialogue" className="relative w-full py-16 md:py-24 overflow-hidden">
      <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />
      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#8a8a8a]/40" />
            <span className="text-xs text-[#8a8a8a] tracking-[0.3em] uppercase">The Dialogue</span>
          </div>
          <h2 className="font-serif-sc text-3xl md:text-5xl text-[#f4f4f4] leading-tight">与越公子对话</h2>
          <p className="font-sans-sc text-sm text-[#8a8a8a] mt-2 tracking-wide">关于空间、气场与柔情</p>
        </div>

        <div className="max-w-4xl space-y-5 md:space-y-6">
          {qaList.map((qa, index) => (
            <div key={index} ref={el => { qaRefs.current[index] = el }} className="group">
              <div className="glass-surface p-4 md:p-6 rounded-sm transition-all duration-500 group-hover:bg-[rgba(255,255,255,0.05)]">
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-serif-sc text-sm text-[#d4af37] shrink-0 mt-0.5">Q</span>
                  <h3 className="font-serif-sc text-sm md:text-base text-[#f4f4f4] leading-snug">{qa.q}</h3>
                </div>
                <div className="w-full h-px bg-[#8a8a8a]/15 mb-3" />
                <div className="flex items-start gap-3">
                  <span className="font-serif-sc text-sm text-[#8a8a8a] shrink-0 mt-0.5">A</span>
                  <p className="font-sans-sc text-sm text-[#f4f4f4]/70 leading-relaxed">{qa.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
