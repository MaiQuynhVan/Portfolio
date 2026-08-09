import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import {
  aboutPortrait,
  education,
  experience,
  heroPortrait,
  profile,
  projects,
  skills,
  tools,
  visualPlayground,
  type MediaAsset,
  type Project,
  type ProjectSlug,
} from './portfolio'

type Route = 'home' | ProjectSlug
type LightboxState = { items: MediaAsset[]; index: number } | null

const homeSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

function imageUrl(id: string, width: 480 | 960 | 1600, format: 'webp' | 'avif' = 'webp') {
  return `/assets/portfolio/${id}-${width}.${format}`
}

function ResponsiveImage({
  asset,
  className = '',
  priority = false,
}: {
  asset: MediaAsset
  className?: string
  priority?: boolean
}) {
  return (
    <picture className={`responsive-image ${className}`} style={{ aspectRatio: asset.ratio ?? '4 / 3' }}>
      <source
        type="image/avif"
        srcSet={`${imageUrl(asset.id, 480, 'avif')} 480w, ${imageUrl(asset.id, 960, 'avif')} 960w, ${imageUrl(asset.id, 1600, 'avif')} 1600w`}
        sizes="(max-width: 720px) 94vw, (max-width: 1100px) 70vw, 900px"
      />
      <source
        type="image/webp"
        srcSet={`${imageUrl(asset.id, 480)} 480w, ${imageUrl(asset.id, 960)} 960w, ${imageUrl(asset.id, 1600)} 1600w`}
        sizes="(max-width: 720px) 94vw, (max-width: 1100px) 70vw, 900px"
      />
      <img
        src={imageUrl(asset.id, 960)}
        alt={asset.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: asset.position ?? 'center' }}
      />
    </picture>
  )
}

function Arrow({ direction = 'right' }: { direction?: 'right' | 'left' | 'up' }) {
  const rotation = direction === 'left' ? 180 : direction === 'up' ? -45 : 0
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" style={{ transform: `rotate(${rotation}deg)` }}>
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" viewBox="0 0 64 64">
      <path d="M32 2c2 20 10 28 30 30-20 2-28 10-30 30C30 42 22 34 2 32 22 30 30 22 32 2Z" fill="currentColor" />
    </svg>
  )
}

function MagneticLink({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'ghost' }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    event.currentTarget.style.setProperty('--magnetic-x', `${x * 0.12}px`)
    event.currentTarget.style.setProperty('--magnetic-y', `${y * 0.18}px`)
  }

  const reset = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--magnetic-x', '0px')
    event.currentTarget.style.setProperty('--magnetic-y', '0px')
  }

  const addRipple = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ripple = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top }
    setRipples((current) => [...current, ripple])
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 620)
  }

  return (
    <a
      className={`button button--${variant}`}
      href={href}
      onClick={addRipple}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      <span className="button__label">{children}</span>
      <span className="button__icon"><Arrow /></span>
      {ripples.map((ripple) => (
        <i className="button__ripple" key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />
      ))}
    </a>
  )
}

function SiteHeader({ route }: { route: Route }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (route !== 'home') return
    const sections = ['about', 'experience', 'work', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -62%', threshold: [0, 0.15, 0.45] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [route])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('menu-is-open')
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a className="monogram" href="#page-0" onClick={closeMenu} aria-label="Quynh Van — home">
          QV<span>.</span>
        </a>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {homeSections.map((item) => (
            <a
              key={item.id}
              className={route === 'home' && activeSection === item.id ? 'is-active' : ''}
              href={`#${item.id}`}
              onClick={closeMenu}
            >
              <span>0{homeSections.indexOf(item) + 1}</span>{item.label}
            </a>
          ))}
          <a className="site-nav__mobile-social" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow direction="up" /></a>
        </nav>
        <a className="header-cta" href="#contact" onClick={closeMenu}>Let’s talk <span>↗</span></a>
        <button
          ref={toggleRef}
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <i /><i />
        </button>
      </div>
      {menuOpen && <button className="nav-backdrop" type="button" onClick={closeMenu} aria-label="Close navigation" />}
    </header>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    event.currentTarget.style.setProperty('--rotate-y', `${x * 4}deg`)
    event.currentTarget.style.setProperty('--rotate-x', `${y * -4}deg`)
    event.currentTarget.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    event.currentTarget.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  }

  const reset = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--rotate-y', '0deg')
    event.currentTarget.style.setProperty('--rotate-x', '0deg')
  }

  return (
    <a
      className={`project-card project-card--${project.accent} ${featured ? 'project-card--featured' : ''}`}
      href={`#project-${project.slug}`}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      data-reveal
    >
      <div className="project-card__image">
        <ResponsiveImage asset={project.cover} />
        <span className="project-card__open">Open case study <Arrow /></span>
      </div>
      <div className="project-card__content">
        <span className="project-card__number">{project.index}</span>
        <div>
          <p>{project.category}</p>
          <h3>{project.title}</h3>
          <span>{project.role}</span>
        </div>
        <span className="project-card__arrow"><Arrow direction="up" /></span>
      </div>
    </a>
  )
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow"><span>✦</span>{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

function HomePage() {
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  const [copied, setCopied] = useState(false)

  const moveHero = (event: PointerEvent<HTMLElement>) => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty('--hero-x', `${x}`)
    event.currentTarget.style.setProperty('--hero-y', `${y}`)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <main id="main-content">
      <section className="hero" id="home" onPointerMove={moveHero}>
        <div className="hero__paper-grid" aria-hidden="true" />
        <div className="hero__copy">
          <p className="hero__hello"><span>Hi there!</span> I’m</p>
          <h1>Quynh <em>Van.</em></h1>
          <p className="hero__headline">{profile.headline}</p>
          <div className="hero__actions">
            <MagneticLink href="#work">Explore my work</MagneticLink>
            <MagneticLink href="#contact" variant="ghost">Let’s connect</MagneticLink>
          </div>
          <p className="hero__note"><i /> Ready for my first professional step</p>
        </div>
        <div className="hero__visual">
          <div className="hero__blob" />
          <ResponsiveImage asset={heroPortrait} className="hero__portrait" priority />
          <span className="floating-tag floating-tag--marketing">Marketing</span>
          <span className="floating-tag floating-tag--branding">Branding</span>
          <span className="floating-tag floating-tag--social">Social Media</span>
          <span className="floating-tag floating-tag--copy">Copywriting</span>
          <Sparkle className="hero__sparkle hero__sparkle--one" />
          <Sparkle className="hero__sparkle hero__sparkle--two" />
        </div>
        <a className="scroll-cue" href="#about"><span>Scroll to know me</span><i><Arrow /></i></a>
      </section>

      <section className="section about" id="about">
        <SectionIntro eyebrow="About me" title="Curious by nature. Responsible by choice." />
        <div className="about__grid">
          <div className="about__portrait" data-reveal>
            <ResponsiveImage asset={aboutPortrait} />
            <span className="photo-sticker">A little bit<br />about me ↗</span>
          </div>
          <div className="about__copy" data-reveal>
            {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <blockquote>“Responsibility and a strong growth mindset guide my learning journey.”</blockquote>
          </div>
          <div className="about__facts" data-reveal>
            <article><strong>3rd</strong><span>year Digital Marketing student</span></article>
            <article><strong>8.60</strong><span>cumulative GPA out of 10</span></article>
            <article><strong>2027</strong><span>expected graduation year</span></article>
          </div>
        </div>
      </section>

      <section className="section journey" id="experience">
        <SectionIntro
          eyebrow="My journey"
          title="Learning in the classroom. Growing in the real world."
          copy="A mix of leadership, hands-on media work and continuous learning has shaped how I approach marketing."
        />
        <div className="journey__grid">
          <article className="journey-card journey-card--experience" data-reveal>
            <div className="journey-card__heading"><span>01</span><h3>Experience</h3></div>
            <ol className="timeline">
              {experience.map((item) => (
                <li key={item.place}>
                  <time>{item.date}</time>
                  <strong>{item.role}</strong>
                  <span>{item.place}</span>
                </li>
              ))}
            </ol>
          </article>
          <article className="journey-card journey-card--education" data-reveal>
            <div className="journey-card__heading"><span>02</span><h3>Education</h3></div>
            <div className="education-list">
              {education.map((item) => (
                <div key={item.title}>
                  <time>{item.meta}</time>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="journey-card journey-card--certification" data-reveal>
            <div className="journey-card__heading"><span>03</span><h3>Recognition</h3></div>
            <p>Academic encouragement scholarship for outstanding achievements in Youth Union activities and student movements.</p>
            <p>Excellent in the QCC Mastery Hub Social Media Starter Course.</p>
          </article>
        </div>
      </section>

      <section className="section capability" id="skills">
        <SectionIntro eyebrow="Skills & tools" title="Strategy in my head. Creativity in my hands." />
        <div className="capability__panel" data-reveal>
          <div className="skill-cloud">
            {skills.map((skill, index) => <span style={{ '--i': index } as CSSProperties} key={skill}>{skill}</span>)}
          </div>
          <div className="tool-marquee" aria-label={`Tools: ${tools.join(', ')}`}>
            <div>{[...tools, ...tools].map((tool, index) => <span key={`${tool}-${index}`}>{tool}<i>✦</i></span>)}</div>
          </div>
        </div>
      </section>

      <section className="section work" id="work">
        <SectionIntro
          eyebrow="Selected work"
          title="Ideas are nice. Impact is better."
          copy="Five projects that show how I lead, create, research and learn through practice."
        />
        <div className="work-group">
          <div className="work-group__label" data-reveal><span>01</span><p>Leadership & real-world impact</p></div>
          <div className="featured-grid">
            {projects.slice(0, 2).map((project) => <ProjectCard project={project} featured key={project.slug} />)}
          </div>
        </div>
        <div className="work-group work-group--compact">
          <div className="work-group__label" data-reveal><span>02</span><p>Marketing thinking & execution</p></div>
          <div className="project-grid">
            {projects.slice(2).map((project) => <ProjectCard project={project} key={project.slug} />)}
          </div>
        </div>
      </section>

      <section className="section playground" id="playground">
        <SectionIntro
          eyebrow="Visual playground"
          title="The little things that catch my eye."
          copy="A small archive of photography and visual moments from everyday life."
        />
        <div className="playground__grid">
          {visualPlayground.map((asset, index) => (
            <button
              className={`playground__item playground__item--${(index % 5) + 1}`}
              type="button"
              key={asset.id}
              onClick={() => setLightbox({ items: visualPlayground, index })}
              aria-label={`Open image: ${asset.alt}`}
              data-reveal
            >
              <ResponsiveImage asset={asset} />
              <span><i>{String(index + 1).padStart(2, '0')}</i> View image <Arrow direction="up" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact__orb contact__orb--one" />
        <div className="contact__orb contact__orb--two" />
        <div className="contact__heading" data-reveal>
          <p className="eyebrow eyebrow--light"><span>✦</span>Get in touch</p>
          <h2>I’d be grateful for a chance to <em>work together.</em></h2>
          <p>I’m eager to learn, open to feedback and ready to take my first step into the professional world.</p>
        </div>
        <div className="contact__links" data-reveal>
          <a href={`mailto:${profile.email}`}><span>Email</span><strong>{profile.email}</strong><Arrow direction="up" /></a>
          <a href={`tel:${profile.phoneHref}`}><span>Phone</span><strong>{profile.phone}</strong><Arrow direction="up" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Let’s connect</strong><Arrow direction="up" /></a>
          <button type="button" onClick={copyEmail} aria-live="polite"><span>Quick action</span><strong>{copied ? 'Copied!' : 'Copy my email'}</strong><span className="copy-icon">{copied ? '✓' : '⧉'}</span></button>
        </div>
        <footer>
          <a className="monogram monogram--light" href="#page-0">QV<span>.</span></a>
          <p>Made with curiosity, care and a little bit of pink.</p>
          <a href="#home">Back to top ↑</a>
        </footer>
      </section>
      {lightbox && <Lightbox state={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </main>
  )
}

function Lightbox({ state, onClose, onChange }: { state: NonNullable<LightboxState>; onClose: () => void; onChange: (state: LightboxState) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const stateRef = useRef(state)
  const onCloseRef = useRef(onClose)
  const onChangeRef = useRef(onChange)
  const item = state.items[state.index]

  stateRef.current = state
  onCloseRef.current = onClose
  onChangeRef.current = onChange

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement
    closeRef.current?.focus()
    document.body.classList.add('lightbox-is-open')
    const onKeyDown = (event: KeyboardEvent) => {
      const current = stateRef.current
      if (event.key === 'Escape') onCloseRef.current()
      if (event.key === 'ArrowRight') onChangeRef.current({ ...current, index: (current.index + 1) % current.items.length })
      if (event.key === 'ArrowLeft') onChangeRef.current({ ...current, index: (current.index - 1 + current.items.length) % current.items.length })
      if (event.key === 'Tab') {
        const controls = Array.from(document.querySelectorAll<HTMLElement>('.lightbox button'))
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('lightbox-is-open')
      previousFocus.current?.focus()
    }
  }, [])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image gallery">
      <button className="lightbox__backdrop" type="button" onClick={onClose} aria-label="Close gallery" />
      <div className="lightbox__panel">
        <div className="lightbox__top">
          <span>{String(state.index + 1).padStart(2, '0')} / {String(state.items.length).padStart(2, '0')}</span>
          <p>{item.alt}</p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close gallery">Close <i>×</i></button>
        </div>
        <ResponsiveImage asset={item} priority />
        {state.items.length > 1 && (
          <div className="lightbox__nav">
            <button type="button" onClick={() => onChange({ ...state, index: (state.index - 1 + state.items.length) % state.items.length })} aria-label="Previous image"><Arrow direction="left" /></button>
            <button type="button" onClick={() => onChange({ ...state, index: (state.index + 1) % state.items.length })} aria-label="Next image"><Arrow /></button>
          </div>
        )}
      </div>
    </div>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  return <div className="reading-progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>
}

function ProjectPage({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const previous = projects[(index - 1 + projects.length) % projects.length]

  return (
    <main className={`case-study case-study--${project.accent}`} id="main-content">
      <ScrollProgress />
      <section className="case-hero">
        <div className="case-hero__meta" data-reveal>
          <a href="#work"><Arrow direction="left" /> Back to selected work</a>
          <span>{project.index} / 05</span>
        </div>
        <div className="case-hero__heading" data-reveal>
          <p>{project.category}</p>
          <h1 tabIndex={-1}>{project.title}</h1>
          <div><strong>{project.role}</strong><span>{project.period}</span></div>
        </div>
        <button className="case-hero__image" type="button" onClick={() => setLightbox({ items: [project.cover, ...project.gallery], index: 0 })} aria-label={`Open ${project.title} cover image`} data-reveal>
          <ResponsiveImage asset={project.cover} priority />
          <span>Click to expand <Arrow direction="up" /></span>
        </button>
      </section>

      <section className="case-summary section">
        <p className="case-kicker" data-reveal>Project overview</p>
        <div className="case-summary__copy" data-reveal>
          <h2>{project.intro}</h2>
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="metric-grid">
          {project.metrics.map((metric) => (
            <article key={metric.label} data-reveal><strong>{metric.value}</strong><span>{metric.label}</span></article>
          ))}
        </div>
      </section>

      <section className="case-role section">
        <SectionIntro eyebrow="My contribution" title="What I brought to the table." />
        <div className="responsibility-list">
          {project.responsibilities.map((item, itemIndex) => (
            <article key={item.title} data-reveal>
              <span>{String(itemIndex + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="deliverable-strip" data-reveal>
          <p>Key deliverables</p>
          <div>{project.deliverables.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="case-gallery section">
        <SectionIntro eyebrow="Behind the work" title="A closer look at the process." copy="Select any image to view it in full screen." />
        <div className="case-gallery__grid">
          {project.gallery.map((asset, galleryIndex) => (
            <button
              type="button"
              key={`${asset.id}-${galleryIndex}`}
              onClick={() => setLightbox({ items: project.gallery, index: galleryIndex })}
              aria-label={`Open image: ${asset.alt}`}
              data-reveal
            >
              <ResponsiveImage asset={asset} />
              <span>{String(galleryIndex + 1).padStart(2, '0')} <Arrow direction="up" /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="case-evidence section">
        <div className="case-evidence__learning" data-reveal>
          <p className="case-kicker">What I learned</p>
          <blockquote>“{project.learning}”</blockquote>
        </div>
        <div className="case-evidence__links" data-reveal>
          <p className="case-kicker">Project evidence</p>
          {project.links.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
              <span>{link.note}</span><strong>{link.label}</strong><Arrow direction="up" />
            </a>
          ))}
        </div>
      </section>

      <nav className="case-pagination" aria-label="Project navigation">
        <a href={`#project-${previous.slug}`} data-reveal><span><Arrow direction="left" /> Previous</span><strong>{previous.shortTitle}</strong></a>
        <a href={`#project-${next.slug}`} data-reveal><span>Next <Arrow /></span><strong>{next.shortTitle}</strong></a>
      </nav>
      <div className="case-contact">
        <p>Like what you see?</p>
        <h2>Let’s make something meaningful together.</h2>
        <MagneticLink href={`mailto:${profile.email}`}>Send me an email</MagneticLink>
      </div>
      {lightbox && <Lightbox state={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </main>
  )
}

function routeFromHash(hash: string): Route {
  const match = hash.match(/^#project-(upvise|xuan-ai|media|competitions|hypothetical)$/)
  return match ? match[1] as ProjectSlug : 'home'
}

function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash(window.location.hash))
  const project = useMemo(() => projects.find((item) => item.slug === route), [route])

  useEffect(() => {
    let observer: IntersectionObserver | undefined
    const reveal = () => {
      const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')
      if (prefersReducedMotion()) {
        targets.forEach((target) => target.classList.add('is-visible'))
        return
      }
      const currentObserver = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            currentObserver.unobserve(entry.target)
          }
        }),
        { rootMargin: '0px 0px -10%', threshold: 0.08 },
      )
      observer = currentObserver
      targets.forEach((target) => currentObserver.observe(target))
      return observer
    }
    const frame = window.requestAnimationFrame(reveal)
    return () => {
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [route])

  useEffect(() => {
    const navigate = (smooth: boolean) => {
      const nextRoute = routeFromHash(window.location.hash)
      setRoute(nextRoute)
      window.requestAnimationFrame(() => {
        if (nextRoute !== 'home') {
          window.scrollTo({ top: 0, behavior: 'auto' })
          window.setTimeout(() => document.querySelector<HTMLElement>('.case-hero h1')?.focus({ preventScroll: true }), 250)
          return
        }
        const hash = window.location.hash.replace('#', '')
        const targetId = hash === '' || hash === 'page-0' ? 'home' : hash
        document.getElementById(targetId)?.scrollIntoView({ behavior: !smooth || prefersReducedMotion() ? 'auto' : 'smooth' })
      })
    }
    const onHashChange = () => navigate(true)
    window.addEventListener('hashchange', onHashChange)
    if (window.location.hash && route === 'home') window.setTimeout(() => navigate(false), 80)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [route])

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Quynh Van Portfolio`
    } else {
      document.title = 'Quynh Van — Marketing Portfolio'
    }
  }, [project])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader route={route} />
      {project ? <ProjectPage project={project} /> : <HomePage />}
    </div>
  )
}

export default App
