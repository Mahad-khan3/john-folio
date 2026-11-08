import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import AboutSection from './AboutSection.jsx'
import AboutLast from './AboutLast.jsx'
import './work.css'
import WhatIBring from './WhatIBring.jsx'
import Cta from './Cta.jsx'
import Testimonials from './Testimonials.jsx'
import BrandHeading from './BrandHeading.jsx'
import FaqSection from './FaqSection.jsx'
import Hero from './Hero.jsx'

gsap.registerPlugin(ScrollTrigger, SplitText)

const Icon = ({ d, className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
)

const NAV_ITEMS = [
  { label: 'Home', target: '#home', icon: 'M12 3l8 3v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3z' },
  { label: 'About me', target: '#about', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6' },
  { label: 'Projects', target: '#crafted', icon: 'M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7l-2-2H5a2 2 0 0 0-2 2z' },
  { label: 'What I Bring', target: '#overview', icon: 'M12 2l2.3 6.5 6.9.5-5.3 4.5 1.7 6.7-5.6-3.9-5.6 3.9 1.7-6.7L2.8 9l6.9-.5z' },
  { label: 'Services', target: '#services', icon: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z' },
  { label: 'Testimonials', target: '#testimonials', icon: 'M7.5 4C6 4 4.8 5.2 4.8 6.7c0 1.5 1.2 2.7 2.7 2.7H9c0 1.8-1.2 3.2-3 3.6l.8 1.9c3.1-.8 5.1-3.6 5.1-6.9V4H7.5zm10 0c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7h1.5c0 1.8-1.2 3.2-3 3.6l.8 1.9c3.1-.8 5.1-3.6 5.1-6.9V4H17.5z' },
  { label: 'FAQ', target: '#faq', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01' },
]

/* Kept out of NAV_ITEMS on purpose: these two leave the page instead of scrolling
   to a section, so they must not feed activeNav (it drives the teal pill that
   tracks whichever section is in view) and must not be counted in the "Links"
   header. Same address the hero panel uses. */
const CONTACT_ITEMS = [
  { label: 'Gmail', href: 'mailto:johnsmith@gmail.com', icon: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6' },
]

const useScrollY = () => {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}

const PROJECTS = [
  {
    num: '01',
    tag: 'Web App',
    title: 'Nova Drive',
    description: 'A cloud storage web app with upload, folder navigation, and shareable links built on a React and Node.js stack.',
    url: 'https://nova-drive-three.vercel.app/',
    image: '/projects/nova-drive.png',
  },
  {
    num: '02',
    tag: 'Fitness App',
    title: 'FitPulse',
    description: 'A fitness tracking web app with secure login, user dashboards, and progress data stored on a live backend.',
    url: 'https://fitness-nu-ebon.vercel.app/login',
    image: '/projects/fitpulse.png',
  },
  {
    num: '03',
    tag: 'E-commerce',
    title: 'Max Me Beauty',
    description: 'A beauty brand storefront with product pages, cart and checkout flow, tuned to stay fast on mobile.',
    url: 'https://maxmebeauty.com/',
    image: '/projects/max-me-beauty.png',
  },
  {
    num: '04',
    tag: 'Business Site',
    title: 'Welcom Optical',
    description: 'A clean storefront-style site for an optical brand, built around product browsing and a smooth contact flow.',
    url: 'https://welcom-optical.vercel.app/',
    image: '/projects/welcom-optical.png',
  },
  {
    num: '05',
    tag: 'Business Site',
    title: 'Miral Co',
    description: 'A corporate site with clear service pages and a structured enquiry path for new leads.',
    url: 'https://miral-co.com/',
    image: '/projects/miral-co.png',
  },
  {
    num: '06',
    tag: 'E-commerce',
    title: 'Modila',
    description: 'An online store with category-based browsing, product detail pages, and a simplified ordering flow.',
    url: 'https://modila.pk/',
    image: '/projects/modila.png',
  },
  {
    num: '07',
    tag: 'Web App',
    title: 'Blyncc',
    description: 'A platform-style site with dynamic sections and responsive layouts built to scale with content.',
    url: 'https://blyncc.com/',
    image: '/projects/blyncc.png',
  },
  {
    num: '08',
    tag: 'Business Site',
    title: 'Sajadah',
    description: 'A brand site built with a lightweight stack, fast load times, and a mobile-first layout.',
    url: 'https://sajadaah.com/',
    image: '/projects/sajadaah.png',
  },
]

const ProjectCard = ({ p }) => (
  <article className="card group relative h-[58vh] lg:h-[64vh] shrink-0 overflow-hidden rounded-3xl border border-white/10">
    <img
      src={p.image}
      alt={`${p.title} website preview`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
    />

    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

    <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-10">
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-[#00a896] px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-black">
          {p.tag}
        </span>
        <span className="text-sm font-black tracking-widest text-white/70" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>{p.num}</span>
      </div>

      <div>
        <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">{p.title}</h3>
        <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-white/80 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">{p.description}</p>

        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00a896] px-5 py-2.5 text-sm font-extrabold text-black transition hover:bg-[#00c4ae]"
        >
          Visit Website
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M4 2h8v8M12 2 2.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </article>
)

function CraftSection({ ref }) {
  const trackRef = useRef(null)
  const counterRef = useRef(null)

  useLayoutEffect(() => {
    const section = ref.current
    const track = trackRef.current
    const counter = counterRef.current
    if (!section || !track) return

    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      gsap.set(section, { xPercent: 100 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.closest('.pin-wrap'),
          start: 'top top',
          end: () => '+=' + (window.innerHeight + dist()),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate() {
            if (!counter) return
            const scrolled = -gsap.getProperty(track, 'x')
            const p = Math.min(1, Math.max(0, scrolled / dist()))
            const i = Math.min(PROJECTS.length - 1, Math.round(p * (PROJECTS.length - 1)))
            counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(PROJECTS.length).padStart(2, '0')}`
          },
        },
      })

      // Work slides in from the right over the pinned About screen, then the
      // project cards scroll horizontally, all scrubbed to one pin distance
      tl.to(section, { xPercent: 0, ease: 'none', duration: 1 })
        .to(track, { x: () => -dist(), ease: 'none', duration: () => dist() / window.innerHeight })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="crafted" ref={ref} className="work will-change-transform">
      <div className="work-inner">
        <div className="absolute top-6 right-6 sm:right-10 flex items-center gap-4">
          <span className="rounded-full bg-[#00a896] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-black">MERN Stack</span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Projects</span>
        </div>

        <div className="px-6 sm:px-10 lg:pl-[380px] lg:pr-16">
          <h2 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight text-white" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>
            Built to Work.
            <br />
            Built to Last.
          </h2>
        </div>

        <div ref={trackRef} className="track mt-8">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6 px-6 sm:px-10 lg:pl-[380px] lg:pr-16">
          <span ref={counterRef} className="text-sm font-black tracking-widest text-white/40" style={{ fontFamily: '"Tr 3 A", Arial, sans-serif' }}>
            01 / 08
          </span>
          <span className="h-px w-16 bg-white/20" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const aboutRef = useRef(null)
  const craftRef = useRef(null)
  const y = useScrollY()
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  useEffect(() => {
    const mark = vh * 0.4
    const sections = [
      { ref: aboutRef, label: 'About me' },
      { ref: craftRef, label: 'Projects' },
      { id: 'overview', label: 'What I Bring' },
      { id: 'cta', label: 'CTA' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'faq', label: 'FAQ' },
    ]
    let active = 'Home'
    for (const { ref, id, label } of sections) {
      const el = ref ? ref.current : document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= mark) active = label
    }
    setActiveNav((prev) => (prev === active ? prev : active))
  }, [y, vh])

  useEffect(() => {
    if (!document.fonts?.ready) return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])


  return (
    <div className="min-h-screen bg-white overflow-x-clip">

      {/* hero renders its own fixed layers: page bg (z-0), header layer
          (z-2 -> z-100) and the hero main layer (z-20) */}
      <Hero photo="/mahad.deskop.png" photoMobile="/mahad.png" />

      {/* everything below the hero lives in one z-20 flow, so the fixed hero
          layers can never cover the sections any more */}
      <main className="relative z-[20]">
        <AboutSection ref={aboutRef} />
        <div className="pin-wrap">
          <AboutLast />
          <CraftSection ref={craftRef} />
        </div>
        <WhatIBring />
        <Cta />
        <BrandHeading />
        <Testimonials />
        <FaqSection />
      </main>

      <div className="sm:hidden fixed top-3 left-3 right-3 z-[999] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 rounded-sm bg-[#00a896] px-3 py-2 shadow-lg shadow-black/30">
          <span className="font-black text-black text-sm tracking-tight">JOHNSMITH</span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-black font-black text-[9px] leading-none text-black">K</span>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="relative z-[1001] flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-black shadow-lg shadow-black/30 active:scale-95"
        >
          <span className="grid grid-cols-2 gap-1.5">
            {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
              <span
                key={pos}
                className={`h-1.5 w-1.5 rounded-full bg-white transition-all duration-300 ${
                  menuOpen
                    ? pos === "top-left"
                      ? "scale-0"
                      : pos === "bottom-right"
                        ? "scale-0"
                        : "translate-x-[7.5px] -translate-y-[7.5px]"
                    : ""
                }`}
              />
            ))}
          </span>
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-[3px]" onClick={() => setMenuOpen(false)} />
          <div className="sm:hidden menu-in fixed top-[4.25rem] left-3 right-3 z-[1010] flex max-h-[72vh] flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl">
            <div className="flex shrink-0 items-center justify-between px-5 py-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/50">Menu</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{NAV_ITEMS.length} Links</span>
            </div>

            <nav className="flex min-h-0 flex-col gap-0.5 overflow-y-auto px-2">
              {NAV_ITEMS.map(({ label, icon, target }) => {
                const isActive = activeNav === label
                return (
                  <a
                    key={label}
                    href={target}
                    onClick={() => {
                      setActiveNav(label)
                      setMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3.5 transition duration-200 active:scale-[0.99] ${
                      isActive ? 'bg-[#00a896] text-black' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <span className={isActive ? 'text-black' : 'text-[#00a896]'}>
                      <Icon d={icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="text-[15px] font-bold">{label}</span>
                  </a>
                )
              })}
            </nav>

            {/* contact row — Gmail, above Book a Call.
                shrink-0 so the nav above keeps the leftover height and scrolls. */}
            <div className="flex shrink-0 gap-2 px-2 pb-1">
              {CONTACT_ITEMS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : null)}
                  onClick={() => setMenuOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 py-2.5 text-[13px] font-bold text-white/80 transition active:scale-[0.99]"
                >
                  <span className="text-[#00a896]"><Icon d={icon} className="h-[17px] w-[17px]" /></span>
                  {label}
                </a>
              ))}
            </div>

            {/* Book a Call now leaves the page — it dials, it does not scroll, so
                it must not be a NAV_ITEMS target either. tel: in +1 form so it
                still dials from outside the US, where the local form would not
                resolve. */}
            <a
              href="tel:+15551234567"
              onClick={() => setMenuOpen(false)}
              className="mx-2 mb-[max(0.625rem,env(safe-area-inset-bottom))] mt-1 shrink-0 rounded-xl border border-white/15 py-3 text-center text-[13px] font-bold text-white/80 transition active:scale-[0.99]"
            >
              Book a Call
            </a>
          </div>
        </>
      )}
    </div>

  )
}

export default App
