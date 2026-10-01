import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import {
  aboutPortrait,
  brands,
  certificates,
  cvFile,
  heroPortrait,
  journey,
  latestWork,
  profile,
  projectTimeline,
  projects,
  skillGroups,
  tools,
  type MediaAsset,
  type Project,
  type ProjectSlug,
} from './portfolio'

type Page = 'home' | 'projects' | 'contact'
type Route = Page | ProjectSlug
type LightboxState = { items: MediaAsset[]; index: number } | null

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function pageForRoute(route: Route): Page {
  if (route === 'home') return 'home'
  if (route === 'contact') return 'contact'
  return 'projects'
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

function imageUrl(id: string, width: 480 | 960 | 1600, format: 'webp' | 'avif' = 'webp') {
  return `/assets/portfolio/${id}-${width}.${format}`
}

function ResponsiveImage({
  asset,
  className = '',
  priority = false,
  sizes = '(max-width: 720px) 94vw, (max-width: 1100px) 70vw, 900px',
}: {
  asset: MediaAsset
  className?: string
  priority?: boolean
  // Display width hint for srcset; full-bleed images pass a wider one so they are not upscaled.
  sizes?: string
}) {
  return (
    <picture className={`responsive-image ${className}`} style={{ aspectRatio: asset.ratio ?? '4 / 3' }}>
      <source
        type="image/avif"
        srcSet={`${imageUrl(asset.id, 480, 'avif')} 480w, ${imageUrl(asset.id, 960, 'avif')} 960w, ${imageUrl(asset.id, 1600, 'avif')} 1600w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${imageUrl(asset.id, 480)} 480w, ${imageUrl(asset.id, 960)} 960w, ${imageUrl(asset.id, 1600)} 1600w`}
        sizes={sizes}
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

function MagneticLink({
  href,
  children,
  variant = 'primary',
  download,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  download?: string
}) {
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
      download={download}
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
  // Project list under "Projects": opens on hover (desktop) or with the chevron button (keyboard, touch, mobile menu).
  const [dropOpen, setDropOpen] = useState(false)
  const activePage = pageForRoute(route)
  useEffect(() => setDropOpen(false), [route])
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDropOpen(false)
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

  const closeMenu = () => {
    setMenuOpen(false)
    setDropOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a className="monogram" href="#home" onClick={closeMenu} aria-label="Quynh Van — home">
          QV<span>.</span>
        </a>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item, index) => {
            const link = (
              <a
                key={item.id}
                className={`site-nav__link${activePage === item.id ? ' is-active' : ''}`}
                href={`#${item.id}`}
                aria-current={activePage === item.id && route === item.id ? 'page' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            )
            if (item.id !== 'projects') return link
            return (
              <div className="nav-drop" data-open={dropOpen} key={item.id} onMouseLeave={() => setDropOpen(false)}>
                <div className="nav-drop__row">
                  {link}
                  <button
                    type="button"
                    className="nav-drop__toggle"
                    aria-expanded={dropOpen}
                    aria-controls="nav-projects"
                    aria-label={dropOpen ? 'Hide the project list' : 'Show the project list'}
                    onClick={() => setDropOpen((open) => !open)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" /></svg>
                  </button>
                </div>
                <ul className="nav-drop__menu" id="nav-projects">
                  <li className="nav-drop__back">
                    <button type="button" onClick={() => setDropOpen(false)}>
                      <Arrow direction="left" /> Projects
                    </button>
                  </li>
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <a href={`#project-${project.slug}`} aria-current={route === project.slug ? 'page' : undefined} onClick={closeMenu}>
                        {project.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
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

function ProjectCard({ project, wide = false, numbered = true }: { project: Project; wide?: boolean; numbered?: boolean }) {
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
      className={`project-card project-card--${project.accent}${wide ? ' project-card--wide' : ''}`}
      href={`#project-${project.slug}`}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      data-reveal
    >
      <div className="project-card__image">
        <ResponsiveImage asset={project.cover} sizes={wide ? '(max-width: 960px) 92vw, 60vw' : undefined} />
        {project.draft && <span className="project-card__soon">Coming soon</span>}
        <span className="project-card__open">Open case study <Arrow /></span>
      </div>
      <div className="project-card__content">
        {numbered && <span className="project-card__number">{project.index}</span>}
        <div>
          <p>{project.category}</p>
          <h3>{project.title}</h3>
          <span>{project.role === project.title ? project.org : project.org && !project.role.includes(project.org) ? `${project.role} · ${project.org}` : project.role}</span>
          {project.period && <small className="project-card__period">{project.period}</small>}
        </div>
        <span className="project-card__arrow"><Arrow direction="up" /></span>
      </div>
    </a>
  )
}

function SectionIntro({ title, lead, copy }: { title: string; lead?: string; copy?: string }) {
  return (
    <div className="section-intro" data-reveal>
      <h2><span aria-hidden="true">✦</span>{title}</h2>
      {lead && <p className="section-intro__lead">{lead}</p>}
      {copy && <p className="section-intro__copy">{copy}</p>}
    </div>
  )
}

/**
 * Auto-scrolling horizontal strip. Children must contain the item set `copies` times so the scroll
 * position can wrap seamlessly. Hovering pauses it and lets visitors drag (mouse) or swipe/scroll
 * (touch, trackpad) sideways; it resumes from wherever they leave it.
 */
function Marquee({
  children,
  className = '',
  speed = 40,
  copies = 2,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  copies?: number
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const state = useRef({ hovering: false, dragging: false, touching: false, focused: false, moved: false, startX: 0, startScroll: 0, pos: 0 })

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const s = state.current
    const autoplay = !prefersReducedMotion()
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      const setWidth = el.scrollWidth / copies
      const paused = s.hovering || s.dragging || s.touching || s.focused || !autoplay
      // While paused, follow whatever the visitor did (drag, wheel, swipe); otherwise advance.
      s.pos = paused ? el.scrollLeft : s.pos + speed * dt
      if (setWidth > 0) {
        if (s.pos >= setWidth) {
          s.pos -= setWidth
          s.startScroll -= setWidth
        } else if (s.pos < 0) {
          s.pos += setWidth
          s.startScroll += setWidth
        }
      }
      if (Math.abs(el.scrollLeft - s.pos) >= 0.5) el.scrollLeft = s.pos
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [copies, speed])

  const endDrag = () => {
    state.current.dragging = false
    viewportRef.current?.classList.remove('is-dragging')
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const s = state.current
    if (event.pointerType !== 'mouse') {
      s.touching = true
      return
    }
    if (event.button !== 0) return
    // Stops the browser starting a native link/image drag or text selection, which would swallow
    // the pointer events that follow. Clicks still fire (and are suppressed only after a real drag).
    event.preventDefault()
    s.dragging = true
    s.moved = false
    s.startX = event.clientX
    s.startScroll = event.currentTarget.scrollLeft
    event.currentTarget.classList.add('is-dragging')
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const s = state.current
    if (!s.dragging) return
    const dx = event.clientX - s.startX
    if (Math.abs(dx) > 4) s.moved = true
    event.currentTarget.scrollLeft = s.startScroll - dx
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') {
      // Let touch momentum settle before the strip starts moving again.
      window.setTimeout(() => { state.current.touching = false }, 1200)
      return
    }
    endDrag()
  }

  return (
    <div
      ref={viewportRef}
      className={`marquee ${className}`}
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') state.current.hovering = true }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') { state.current.hovering = false; endDrag() } }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onFocus={() => { state.current.focused = true }}
      onBlur={() => { state.current.focused = false }}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        // A drag that ends over a card must not open it.
        if (state.current.moved) {
          event.preventDefault()
          event.stopPropagation()
          state.current.moved = false
        }
      }}
      data-reveal
    >
      <div className="marquee__track">{children}</div>
    </div>
  )
}

function JourneyAccordion() {
  // Each item opens and closes on its own; opening one leaves the others as they are.
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]))
  const toggle = (index: number) => setOpenItems((current) => {
    const next = new Set(current)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    return next
  })

  return (
    <ol className="journey-list">
      {journey.map((item, index) => {
        const isOpen = openItems.has(index)
        const panelId = `journey-panel-${index}`
        return (
          // Open state lives in data-open, not className: re-rendering className would wipe the
          // is-visible class the scroll-reveal observer adds, hiding the item.
          <li className="journey-item" data-open={isOpen} key={item.role} data-reveal>
            <span className="journey-item__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className="journey-item__panel">
              <h3>
                <button
                  className="journey-item__toggle"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="journey-item__label">{item.kind}</span>
                  <span className="journey-item__title">{item.role}</span>
                  <span className="journey-item__place">{item.place}</span>
                  <span className="journey-item__date">{item.date}</span>
                  <span className="journey-item__chevron" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                  </span>
                </button>
              </h3>
              <div className="journey-item__body" id={panelId} aria-hidden={!isOpen}>
                <div>
                  <ul>
                    {item.highlights.map((highlight) => {
                      const [first, ...rest] = highlight.split('\n')
                      return (
                        <li key={highlight}>
                          <i aria-hidden="true">✓</i>
                          {rest.length ? <span>{first}<ul className="journey-item__sub">{rest.map((line) => <li key={line}>{line}</li>)}</ul></span> : highlight}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function ToolOrbit() {
  return (
    <div className="orbit">
      {(['outer', 'inner'] as const).map((ring) => {
        const items = tools.filter((tool) => tool.ring === ring)
        return (
          <ul className={`orbit__ring orbit__ring--${ring}`} key={ring} style={{ '--count': items.length } as CSSProperties}>
            {items.map((tool, index) => (
              <li className="orbit__item" style={{ '--i': index } as CSSProperties} key={tool.name}>
                <span className="orbit__badge">
                  <img src={tool.logo} alt={tool.name} loading="lazy" decoding="async" width={200} height={200} />
                  <em aria-hidden="true">{tool.name}</em>
                </span>
              </li>
            ))}
          </ul>
        )
      })}
      <div className="orbit__core" aria-hidden="true">
        <strong>{tools.length}</strong>
        <span>tools in<br />my toolkit</span>
      </div>
    </div>
  )
}

function HomePage() {
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const moveHero = (event: PointerEvent<HTMLElement>) => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    event.currentTarget.style.setProperty('--hero-x', `${x}`)
    event.currentTarget.style.setProperty('--hero-y', `${y}`)
  }

  return (
    <main id="main-content" className="has-glows">
      <Glows set="home" />
      <section className="hero" id="home" onPointerMove={moveHero}>
        <div className="hero__paper-grid" aria-hidden="true" />
        <div className="hero__copy">
          <p className="hero__hello"><span>Hi there!</span> I’m</p>
          <h1>Quỳnh <em>Vân.</em></h1>
          <p className="hero__headline">{profile.headline}</p>
          <div className="hero__actions">
            <MagneticLink href="#latest-work">Explore my work</MagneticLink>
            <MagneticLink href="#contact" variant="ghost">Let’s connect</MagneticLink>
          </div>
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
      </section>

      <section className="section about" id="about">
        <div className="about__grid">
          <div className="about__copy">
            <SectionIntro title="About me" lead="Curious by nature. Responsible by choice." />
            <div className="about__text" data-reveal>
              {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="about__portrait" data-reveal>
            <ResponsiveImage asset={{ ...aboutPortrait, ratio: '4 / 5' }} />
          </div>
        </div>
      </section>

      <section className="section journey" id="journey">
        <SectionIntro
          title="My journey"
          lead="Learning in the classroom. Growing in the real world."
          copy="From leading student programmes to growing real audiences, these are the milestones that shaped how I approach marketing."
        />
        <JourneyAccordion />
        <div className="journey__cv" data-reveal>
          <div>
            <h3>Still curious about me? ✦</h3>
            <p>My CV has the rest of the story, from skills and tools to the little wins along the way.</p>
          </div>
          <MagneticLink href={cvFile.href} download={cvFile.downloadName}>Download my CV here</MagneticLink>
        </div>
      </section>

      <section className="section skills" id="skills">
        <SectionIntro title="Skills & tools" lead="Strategy in my head. Creativity in my hands." />
        <div className="skills__grid">
          <div className="skills__lists">
            {skillGroups.map((group, groupIndex) => (
              <article className="skill-card" key={group.title} data-reveal>
                <header>
                  <span>0{groupIndex + 1}</span>
                  <h3>{group.title}</h3>
                </header>
                <ul className="skill-card__list">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <article className="skill-card skill-card--tools" data-reveal>
            <header>
              <span>0{skillGroups.length + 1}</span>
              <h3>Tools</h3>
            </header>
            <div className="skill-card__orbit"><ToolOrbit /></div>
            <ul className="skill-card__legend" aria-hidden="true">
              {tools.map((tool) => <li key={tool.name}>{tool.name}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="section latest" id="latest-work">
        <SectionIntro
          title="My latest work"
          lead="Ideas are nice. Impact is better."
          copy="Hover to pause, or pick any project to open its full case study."
        />
        <Marquee className="latest__marquee" speed={42}>
            {[...latestWork, ...latestWork].map((work, index) => {
              const isClone = index >= latestWork.length
              const content = (
                <>
                  <div className="latest-card__image">
                    <ResponsiveImage asset={work.cover} />
                    <span className="latest-card__number">{String((index % latestWork.length) + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="latest-card__content">
                    <p>{work.category}</p>
                    <h3>{work.title}</h3>
                    <span>{work.role}</span>
                  </div>
                  <span className="latest-card__open">{work.href ? <>View project <Arrow /></> : 'Case study coming soon'}</span>
                </>
              )
              const shared = {
                className: `latest-card latest-card--${work.accent}${work.href ? '' : ' latest-card--soon'}`,
                'aria-hidden': isClone || undefined,
              }
              return work.href ? (
                <a {...shared} href={work.href} key={`${work.key}-${index}`} tabIndex={isClone ? -1 : undefined}>{content}</a>
              ) : (
                <div {...shared} key={`${work.key}-${index}`}>{content}</div>
              )
            })}
        </Marquee>
        <div className="latest__more" data-reveal>
          <MagneticLink href="#projects" variant="ghost">See all projects</MagneticLink>
        </div>
      </section>

      <section className="section brands" id="brands">
        <SectionIntro
          title="Brands"
          lead="Brands I’ve had the chance to explore."
          copy="From my internship to competitions and practice briefs, these are the brands I’ve researched and built ideas for."
        />
        <Marquee className="brands__marquee" speed={30}>
          {[...brands, ...brands].map((brand, index) => {
            const isClone = index >= brands.length
            const className = `brand-tile${brand.fill ? ' brand-tile--fill' : ''}`
            const logo = brand.logo
              ? <img src={brand.logo} alt={isClone ? '' : brand.name} loading="lazy" decoding="async" draggable={false} />
              : <strong>{brand.name}</strong>
            const key = `${brand.name}-${index}`
            return brand.href ? (
              <a className={className} href={brand.href} target="_blank" rel="noreferrer" title={brand.name} key={key} aria-hidden={isClone || undefined} tabIndex={isClone ? -1 : undefined}>{logo}</a>
            ) : (
              <div className={className} title={brand.name} key={key} aria-hidden={isClone || undefined}>{logo}</div>
            )
          })}
        </Marquee>
      </section>

      <section className="section certificates" id="certificates">
        <SectionIntro
          title="Certificates"
          lead="Always learning, always levelling up."
          copy="Select a certificate to view it in full screen."
        />
        <div className="certificates__grid">
          {certificates.map((certificate, index) => (
            <button
              className="certificate-card"
              type="button"
              key={certificate.image.id}
              onClick={() => setLightbox({ items: certificates.map((item) => item.image), index })}
              aria-label={`Open certificate: ${certificate.title}`}
              data-reveal
            >
              <div className="certificate-card__image">
                <ResponsiveImage asset={certificate.image} />
                <span>View <Arrow direction="up" /></span>
              </div>
              <div className="certificate-card__content">
                <p>{certificate.issuer}</p>
                <h3>{certificate.title}</h3>
                {certificate.note && <span>{certificate.note}</span>}
              </div>
            </button>
          ))}
        </div>
      </section>
      {lightbox && <Lightbox state={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </main>
  )
}

function SiteFooter() {
  const backToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.hash !== '#home') return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <footer className="site-footer" id="connect">
      <div className="site-footer__cta" data-reveal>
        <p className="eyebrow eyebrow--light"><span>✦</span>Let’s connect</p>
        <h2>I’d love to hear <em>from you.</em></h2>
        <MagneticLink href={`mailto:${profile.email}`}>Send me an email</MagneticLink>
      </div>
      <div className="site-footer__columns">
        <div className="site-footer__brand">
          <a className="monogram monogram--light" href="#home" onClick={backToTop}>QV<span>.</span></a>
          <p>Digital Marketing student crafting content, campaigns and communities.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h3>Explore</h3>
          <a href="#about">About me</a>
          <a href="#journey">My journey</a>
          <a href="#skills">Skills & tools</a>
          <a href="#latest-work">Latest work</a>
          <a href="#certificates">Certificates</a>
          <a href="#projects">All projects</a>
        </nav>
        <div>
          <h3>Contact</h3>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
          <span>Thu Duc, Ho Chi Minh City</span>
        </div>
        <div>
          <h3>Elsewhere</h3>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={cvFile.href} download={cvFile.downloadName}>Download CV ↓</a>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Mai Quynh Van. Made with curiosity, care and a little bit of pink.</p>
        <a href="#home" onClick={backToTop}>Back to top ↑</a>
      </div>
    </footer>
  )
}

function ProjectsPage() {
  const bySlug = (slug: ProjectSlug) => projects.find((project) => project.slug === slug)!
  return (
    <main id="main-content" className="has-glows">
      <Glows set="projects" />
      <section className="section work" id="work">
        <h1 className="visually-hidden" tabIndex={-1}>Projects</h1>
        <SectionIntro
          title="Selected work"
          lead="Ideas are nice. Impact is better."
          copy={`${projects.length} projects that show how I lead, create, research and learn through practice.`}
        />
        {/* Branching timeline: one spine, year markers, cards alternating left and right. */}
        <ol className="timeline">
          {(() => {
            let side = 0
            return projectTimeline.map((group) => (
              <li className="timeline__year" key={group.year}>
                <h2 data-reveal><span>{group.year}</span></h2>
                <ol>
                  {group.slugs.map((slug) => {
                    const project = projects.find((item) => item.slug === slug)!
                    side += 1
                    return (
                      <li className={`timeline__item timeline__item--${side % 2 ? 'left' : 'right'}`} key={slug}>
                        <ProjectCard project={project} wide numbered={false} />
                      </li>
                    )
                  })}
                </ol>
              </li>
            ))
          })()}
        </ol>
      </section>
    </main>
  )
}

function ContactPage() {
  const [copied, setCopied] = useState(false)

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
      <section className="contact" id="contact">
        <div className="contact__orb contact__orb--one" />
        <div className="contact__orb contact__orb--two" />
        <div className="contact__heading" data-reveal>
          <p className="eyebrow"><span>✦</span>Get in touch</p>
          <h1><span>I’d be grateful for a chance to</span> <em>work together.</em></h1>
          <p>I’m eager to learn, open to feedback and ready to take my first step into the professional world.</p>
        </div>
        <div className="contact__links" data-reveal>
          <a href={`mailto:${profile.email}`}><span>Email</span><strong>{profile.email}</strong><Arrow direction="up" /></a>
          <a href={`tel:${profile.phoneHref}`}><span>Phone</span><strong>{profile.phone}</strong><Arrow direction="up" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><strong>Let’s connect</strong><Arrow direction="up" /></a>
          <button type="button" onClick={copyEmail} aria-live="polite"><span>Quick action</span><strong>{copied ? 'Copied!' : 'Copy my email'}</strong><span className="copy-icon">{copied ? '✓' : '⧉'}</span></button>
        </div>
        <footer>
          <a className="monogram" href="#home">QV<span>.</span></a>
          <p>Made with curiosity, care and a little bit of pink.</p>
          <a href="#home">Back to home ↑</a>
        </footer>
      </section>
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

/**
 * Video with its cover image and a large centred play button. The whole frame starts playback;
 * the native controls appear only once it is playing, and the cover returns when it ends.
 */
function VideoPlayer({ src, poster, label, className = '' }: { src: string; poster: string; label: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const play = () => {
    const video = videoRef.current
    if (!video) return
    setStarted(true)
    void video.play()
  }
  return (
    <div className={`player${started ? ' is-started' : ''} ${className}`}>
      <video ref={videoRef} controls={started} playsInline preload="none" poster={poster} aria-label={label} onEnded={() => setStarted(false)}>
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <button type="button" className="player__start" onClick={play} aria-label={`Play video: ${label}`}>
          <span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg></span>
        </button>
      )}
    </div>
  )
}

/** Sticky, centred list of the page's sections; the one in view is highlighted. */
function JumpNav({ items, label }: { items: { id: string; name: string; badge?: string }[]; label: string }) {
  const listRef = useRef<HTMLUListElement>(null)
  const sentinelRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(items[0]?.id)
  // Stuck once the spot just above the nav scrolls under the site header; the nav then gets a solid backdrop.
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const offset = parseFloat(getComputedStyle(sentinel.nextElementSibling ?? sentinel).top) || 96
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < offset),
      { rootMargin: `-${offset + 1}px 0px 0px 0px` },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    items.forEach((item) => { const section = document.getElementById(item.id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [items])
  // Keep the active chip visible when the list scrolls sideways on small screens.
  useEffect(() => {
    const list = listRef.current
    const chip = list?.querySelector<HTMLElement>('[aria-current="true"]')
    if (list && chip && list.scrollWidth > list.clientWidth) list.scrollTo({ left: chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])
  return (
    <>
    <span className="jump__sentinel" ref={sentinelRef} aria-hidden="true" />
    <nav className="jump" aria-label={label} data-stuck={stuck}>
      <ul ref={listRef}>
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              aria-current={active === item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
            >
              <small>{String(index + 1).padStart(2, '0')}</small>
              {item.name}
              {item.badge && <strong>{item.badge}</strong>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    </>
  )
}

/**
 * Soft blurred colour glows scattered down a page. Positions are percentages of the page height,
 * so they stay sparse however long the page is.
 */
type Glow = { top: string; side: 'left' | 'right'; color: 'pink' | 'aqua' | 'lavender' | 'gold'; size?: number }
const glowSets: Record<'home' | 'projects' | 'case', Glow[]> = {
  home: [
    { top: '9%', side: 'right', color: 'aqua', size: 460 },
    { top: '27%', side: 'left', color: 'lavender' },
    { top: '46%', side: 'right', color: 'pink' },
    { top: '66%', side: 'left', color: 'aqua', size: 420 },
    { top: '86%', side: 'right', color: 'gold', size: 380 },
  ],
  projects: [
    { top: '4%', side: 'right', color: 'pink', size: 440 },
    { top: '38%', side: 'left', color: 'aqua' },
    { top: '72%', side: 'right', color: 'lavender' },
  ],
  case: [
    { top: '3%', side: 'left', color: 'pink', size: 420 },
    { top: '24%', side: 'right', color: 'aqua' },
    { top: '48%', side: 'left', color: 'lavender' },
    { top: '72%', side: 'right', color: 'pink', size: 400 },
    { top: '92%', side: 'left', color: 'aqua', size: 380 },
  ],
}
function Glows({ set }: { set: keyof typeof glowSets }) {
  return (
    <div className="glows" aria-hidden="true">
      {glowSets[set].map((glow) => (
        <span
          key={glow.top}
          className={`glow glow--${glow.color} glow--${glow.side}`}
          style={{ top: glow.top, '--glow-size': `${glow.size ?? 500}px` } as CSSProperties}
        />
      ))}
    </div>
  )
}

/** Swipeable slide deck: scroll-snap track with previous / next buttons and a counter. */
function SlideDeck({ slides, label, onOpen }: { slides: MediaAsset[]; label: string; onOpen: (index: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  // Button presses queue up from the slide being scrolled to, so quick repeated clicks all count.
  const target = useRef({ index: 0, pending: false })
  const go = (step: number) => {
    const track = trackRef.current
    if (!track) return
    const index = (target.current.index + step + slides.length) % slides.length
    target.current = { index, pending: true }
    track.scrollTo({ left: index * track.clientWidth, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  const onScroll = (track: HTMLDivElement) => {
    const index = Math.round(track.scrollLeft / track.clientWidth)
    setCurrent(index)
    // A swipe moves the target along; a button scroll keeps its target until it arrives.
    if (!target.current.pending) target.current.index = index
    else if (index === target.current.index) target.current.pending = false
  }
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1) }
  }
  return (
    <div className="deck" role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        className="deck__track"
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={(event) => onScroll(event.currentTarget)}
      >
        {slides.map((slide, index) => (
          <button type="button" className="deck__slide" key={slide.id} onClick={() => onOpen(index)} aria-label={`Open slide ${index + 1} of ${slides.length} full screen`}>
            <ResponsiveImage asset={slide} sizes="(max-width: 960px) 92vw, 58vw" />
          </button>
        ))}
      </div>
      <div className="deck__bar">
        <button type="button" onClick={() => go(-1)} aria-label="Previous slide"><Arrow direction="left" /></button>
        <span aria-live="polite">{current + 1} / {slides.length}</span>
        <button type="button" onClick={() => go(1)} aria-label="Next slide"><Arrow /></button>
        <button type="button" className="deck__expand" onClick={() => onOpen(current)} aria-label="View slides full screen">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
        </button>
      </div>
    </div>
  )
}

/** One paragraph per line; consecutive lines starting with "- " become a bullet list. */
function Paragraphs({ text }: { text: string }) {
  const blocks: (string | string[])[] = []
  for (const line of text.split('\n')) {
    const last = blocks[blocks.length - 1]
    if (!line.startsWith('- ')) blocks.push(line)
    else if (Array.isArray(last)) last.push(line.slice(2))
    else blocks.push([line.slice(2)])
  }
  return (
    <>
      {blocks.map((block, index) => (Array.isArray(block)
        ? <ul key={index}>{block.map((item) => <li key={item}><RichText text={item} /></li>)}</ul>
        : <p key={index}><RichText text={block} /></p>))}
    </>
  )
}

/** Renders text with **double-asterisk** segments as <strong>. */
function RichText({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : part))}</>
}

function ProjectPage({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  // Role duties open and close independently, like the journey list on the home page.
  const [openDuties, setOpenDuties] = useState<Set<number>>(() => new Set([0]))
  const toggleDuty = (dutyIndex: number) => setOpenDuties((current) => {
    const next = new Set(current)
    if (next.has(dutyIndex)) next.delete(dutyIndex)
    else next.add(dutyIndex)
    return next
  })
  const photos = project.photos ?? [project.cover, ...project.gallery]
  const documents = project.documents ?? []
  const story = project.story ?? [project.intro, ...project.overview]
  const done = project.done ?? project.metrics.map((metric) => `**${metric.value}** ${metric.label}`)
  const [heroPhoto, ...moments] = photos as [MediaAsset | undefined, ...MediaAsset[]]
  const tags = [...project.category.split(' · '), ...(project.org ? [project.org] : [])]
  const jumpItems = useMemo(
    () => project.competitions?.map((comp, compIndex) => ({ id: `comp-${compIndex}`, name: comp.name, badge: comp.badge }))
      ?? project.showcases?.map((show, showIndex) => ({ id: `show-${showIndex}`, name: show.client ?? show.name })),
    [project],
  )
  const thumb = (item: Project) => ({ ...item.cover, ratio: '4 / 3' })
  const ratioValue = (ratio = '3 / 2') => { const [w, h] = ratio.split('/').map(Number); return w / h }
  // Reel frames run a touch wider than each photo, trimming the thin sponsor-logo strip along the top.
  const reelRatio = (ratio?: string) => String(ratioValue(ratio) * 1.07)
  // Square or portrait lead photos sit beside the title instead of spanning the page.
  const splitHero = heroPhoto !== undefined && ratioValue(heroPhoto.ratio) < 1.3
  // The organiser already has its own field, so "X at Organiser" is shortened to "X".
  const roleTitle = project.org ? project.role.replace(` at ${project.org}`, '') : project.role

  return (
    <main className={`case-study case-study--${project.accent} has-glows`} id="main-content">
      <Glows set="case" />
      <ScrollProgress />
      <div className="case-shell">
        <nav className="case-topbar" aria-label="Case study" data-reveal>
          <a href="#projects"><Arrow direction="left" /> Back to selected work</a>
          <span>{project.index} / {String(projects.length).padStart(2, '0')}</span>
        </nav>

        <header className={`case-hero${splitHero ? ' case-hero--split' : ''}${heroPhoto ? '' : ' case-hero--center'}`}>
          {heroPhoto && (
            <button type="button" className="case-hero__media" onClick={() => setLightbox({ items: photos, index: 0 })} aria-label={`Open image: ${heroPhoto.alt}`} data-reveal>
              <ResponsiveImage asset={heroPhoto} priority sizes="92vw" />
            </button>
          )}
          <div className="case-hero__text">
          <ul className="case-hero__tags" aria-label="Project tags" data-reveal>
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          <h1 tabIndex={-1} data-reveal>{project.title}</h1>
          <div className="case-hero__copy" data-reveal>
            <div className="case-hero__lead">
              {story.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph.split('\n').map((line, lineIndex) => <span key={line}>{lineIndex > 0 && <br />}<RichText text={line} /></span>)}
                </p>
              ))}
            </div>
            {!project.hideMeta && (
              <dl className="case-hero__meta">
                <div><dt>Role</dt><dd>{roleTitle}</dd></div>
                {project.org && <div><dt>Organiser</dt><dd>{project.org}</dd></div>}
                <div><dt>When</dt><dd>{project.period}</dd></div>
              </dl>
            )}
          </div>
          </div>
        </header>

        {project.metrics.length > 0 && (
          <ul className="case-stats" aria-label="Key numbers">
            {project.metrics.map((metric) => (
              <li key={metric.label} data-reveal><strong>{metric.value}</strong><span>{metric.label}</span></li>
            ))}
          </ul>
        )}

        {done.length > 0 && (
        <section className="case-section case-done" aria-labelledby="case-done-title">
          <div className="case-done__head" data-reveal>
            <h2 className="case-heading" id="case-done-title">{project.doneHeading ?? 'What was done?'}</h2>
            {project.doneSubheading && <p className="case-subheading">{project.doneSubheading}</p>}
          </div>
          <ol className="case-steps">
            {done.map((item, itemIndex) => (
              <li key={item} data-reveal><span aria-hidden="true">{String(itemIndex + 1).padStart(2, '0')}</span><p><RichText text={item} /></p></li>
            ))}
          </ol>
        </section>
        )}

        {project.draft && (
          <section className="case-section draft" aria-label="Content coming soon">
            <p className="draft__note" data-reveal>This case study is being written, so the frames below show what each section will hold.</p>
            <div className="draft__grid">
              {[
                { name: 'Cover photo', hint: 'One wide photo or visual for the top of the page', wide: true },
                { name: 'Key numbers', hint: 'Three or four headline results' },
                { name: 'What was done?', hint: 'The main tasks, with the results in bold' },
                { name: 'Photos & visuals', hint: 'Screenshots, posts, videos or a slide deck', wide: true },
                { name: 'My role', hint: 'Responsibilities, each with a short description' },
                { name: 'Documents & links', hint: 'Plans, reports or dashboards with their links' },
                { name: 'What I learned', hint: 'A short reflection to close the page', wide: true },
              ].map((frame) => (
                <div className={`draft__frame${frame.wide ? ' draft__frame--wide' : ''}`} key={frame.name} data-reveal>
                  <strong>{frame.name}</strong>
                  <span>{frame.hint}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.showcases && (
          <>
            {jumpItems && <JumpNav items={jumpItems} label="Projects on this page" />}
            {project.recognition && (
              <section className="case-section case-recognition" aria-labelledby="case-recognition-title">
                <h2 className="case-sentence case-sentence--center" id="case-recognition-title" data-reveal>{project.recognition.intro}</h2>
                <ul style={{ gridTemplateColumns: project.recognition.images.map((image) => `${ratioValue(image.ratio)}fr`).join(' ') }}>
                  {project.recognition.images.map((image, imageIndex, images) => (
                    <li key={image.id} data-reveal>
                      <button type="button" onClick={() => setLightbox({ items: images, index: imageIndex })} aria-label={`Open image: ${image.alt}`}>
                        <ResponsiveImage asset={image} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {project.showcases.map((show, showIndex) => {
              const doneCard = (
                <div className="show__card" data-reveal>
                  <h3>{show.doneTitle ?? 'What was done?'}</h3>
                  <ul className="show__timeline">
                    {show.done.map((group) => (
                      <li key={group.title ?? group.points[0]}>
                        {group.title && <strong>{group.title}</strong>}
                        {group.points.length === 1 && !group.title ? <p>{group.points[0]}</p> : (
                          <ul>{group.points.map((point) => <li key={point}>{point}</li>)}</ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )
              const deck = show.deck && <SlideDeck slides={show.deck} label={`${show.name}${show.client ? ` for ${show.client}` : ''} slides`} onOpen={(index) => setLightbox({ items: show.deck!, index })} />
              return (
                <section className="case-section comp-block show" id={`show-${showIndex}`} aria-labelledby={`show-title-${showIndex}`} key={show.name}>
                  {show.lead && <p className="case-sentence show__lead" data-reveal><RichText text={show.lead} /></p>}
                  <header className="comp-block__head" data-reveal>
                    <span className="comp-block__index" aria-hidden="true">{String(showIndex + 1).padStart(2, '0')}</span>
                    <div className="comp-block__title">
                      <p>{show.kicker}</p>
                      <h2 id={`show-title-${showIndex}`}>{show.name}{show.client && <> <span>for {show.client}</span></>}</h2>
                    </div>
                  </header>
                  <p className="show__brief" data-reveal><strong>Brief:</strong> {show.brief}</p>
                  <div className={`show__main${show.deck ? ' show__main--deck' : ''}${show.stacked ? ' show__main--stack' : ''}${show.deck?.[0] && ratioValue(show.deck[0].ratio) < 1 ? ' show__main--portrait' : ''}`}>
                    {show.deck ? (
                      <>
                        <div data-reveal>
                          {deck}
                          {(show.caption || show.downloads) && (
                            <div className="show__below">
                              {show.caption && <p className="show__caption"><RichText text={show.caption} /></p>}
                              {show.downloads?.map((file) => (
                                <a className="show__download" href={file.href} download key={file.href}>
                                  <span className="show__download-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                                  </span>
                                  <span><strong>{file.label}</strong><small>{file.note}</small></span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        {show.brandKit ? (
                          <aside className="show__kit" aria-label={`${show.client ?? show.name} brand kit`} data-reveal>
                            <div className="show__logos">
                              {show.brandKit.logos.map((logo) => <ResponsiveImage asset={logo} key={logo.id} />)}
                            </div>
                            <ul className="show__colors">
                              {show.brandKit.colors.map((color) => <li key={color} style={{ background: color, color: parseInt(color.slice(1, 3), 16) > 200 ? 'var(--ink)' : 'white' }}>{color}</li>)}
                            </ul>
                            <ul className="show__fonts">
                              {show.brandKit.fonts.map((font) => <li key={font.name}><strong>{font.name}</strong><span lang="vi">{font.use}</span></li>)}
                            </ul>
                          </aside>
                        ) : doneCard}
                      </>
                    ) : (
                      <>
                        {doneCard}
                        {show.feature && (
                          <div className={`show__side${show.featureScreen ? ' show__side--screen' : ''}`} data-reveal>
                            <button type="button" className="show__feature" onClick={() => setLightbox({ items: [show.feature!], index: 0 })} aria-label={`Open image: ${show.feature.alt}`}>
                              <ResponsiveImage asset={show.feature} sizes="(max-width: 960px) 92vw, 45vw" />
                            </button>
                            {/* The brand's own links sit right under its main visual. */}
                            {show.links && (
                              <div className="show__links">
                                {show.links.map((link) => (
                                  <a className="case-pill" href={link.href} target="_blank" rel="noreferrer" key={link.href} title={link.note}>{link.label} <i aria-hidden="true">▶</i></a>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  {show.deck && show.brandKit && (
                    <div className="show__pair">
                      {doneCard}
                      {show.learned && (
                        <div className="show__card" data-reveal>
                          <h3>What I learned?</h3>
                          <ul className="show__timeline">{show.learned.map((item) => <li key={item}><p>{item}</p></li>)}</ul>
                        </div>
                      )}
                    </div>
                  )}
                  {show.videos && (
                    <ul className="show__videos" aria-label={`${show.client ?? show.name} videos`}>
                      {show.videos.map((video) => (
                        <li key={video.src} data-reveal>
                          <VideoPlayer src={video.src} poster={video.poster} label={video.label} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {show.gallery && (
                    <ul className={`show__gallery${show.galleryFrame ? ' show__gallery--framed' : ''}`} style={show.galleryFrame ? { '--frame': show.galleryFrame } as CSSProperties : undefined}>
                      {show.gallery.map((item) => (
                        <li key={item.asset.id} className={item.screen ? 'is-screen' : undefined} data-reveal>
                          {item.href ? (
                            <a className="show__media" href={item.href} target="_blank" rel="noreferrer">
                              <ResponsiveImage asset={item.asset} sizes="(max-width: 960px) 92vw, 45vw" />
                              <span className="case-pill case-pill--pink">{item.label} <i aria-hidden="true">▶</i></span>
                            </a>
                          ) : (
                            <button type="button" className="show__media" onClick={() => setLightbox({ items: [item.asset], index: 0 })} aria-label={`Open image: ${item.asset.alt}`}>
                              <ResponsiveImage asset={item.asset} sizes="(max-width: 960px) 92vw, 45vw" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {show.links && !show.feature && (
                    <div className="show__links" data-reveal>
                      {show.links.map((link) => (
                        <a className="case-pill" href={link.href} target="_blank" rel="noreferrer" key={link.href} title={link.note}>{link.label} <i aria-hidden="true">▶</i></a>
                      ))}
                    </div>
                  )}
                </section>
              )
            })}
          </>
        )}

        {project.competitions && (
          <>
            {jumpItems && <JumpNav items={jumpItems} label="Competitions on this page" />}
            {project.competitions.map((comp, compIndex) => (
              <section className="case-section comp-block" id={`comp-${compIndex}`} aria-labelledby={`comp-title-${compIndex}`} key={comp.name}>
                <header className="comp-block__head" data-reveal>
                  <span className="comp-block__index" aria-hidden="true">{String(compIndex + 1).padStart(2, '0')}</span>
                  <div className="comp-block__title">
                    <p>{comp.organiser} · Proposal for {comp.brand}</p>
                    <h2 id={`comp-title-${compIndex}`}>{comp.name}</h2>
                  </div>
                  {comp.badge && (
                    <p className="comp-badge">
                      <strong>{comp.badge}</strong>
                      {comp.badgeNote && <span>{comp.badgeNote}</span>}
                    </p>
                  )}
                </header>
                <div className="comp">
                  <div className="comp__intro" data-reveal>
                    {comp.intro.map((paragraph) => <p key={paragraph}><RichText text={paragraph} /></p>)}
                  </div>
                  <div className="comp__work" data-reveal>
                    <SlideDeck slides={comp.slides} label={`${comp.name} proposal slides`} onOpen={(index) => setLightbox({ items: comp.slides, index })} />
                    <div className="comp__roles">
                      <h3>My role</h3>
                      <ul>{comp.roles.map((role) => <li key={role}><i aria-hidden="true">✓</i>{role}</li>)}</ul>
                    </div>
                  </div>
                  <div className="comp__reflect" data-reveal>
                    {comp.reflection.lead && <p className="comp__lead">{comp.reflection.lead}</p>}
                    {comp.reflection.points && <ul>{comp.reflection.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                    {comp.reflection.text?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {comp.score && (
                    <figure className="comp__score" data-reveal>
                      <figcaption><RichText text={comp.score.text} /></figcaption>
                      <button type="button" onClick={() => setLightbox({ items: [comp.score!.image], index: 0 })} aria-label={`Open image: ${comp.score.image.alt}`}>
                        <ResponsiveImage asset={comp.score.image} sizes="(max-width: 960px) 92vw, 80vw" />
                      </button>
                    </figure>
                  )}
                  {comp.feedback && (
                    <a className="case-pill case-pill--pink comp__feedback" href={comp.feedback.href} target="_blank" rel="noreferrer" title={comp.feedback.note} data-reveal>
                      {comp.feedback.label} <i aria-hidden="true">▶</i>
                    </a>
                  )}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      {moments.length > 0 && (
        <Marquee className="case-reel" speed={36}>
          {[...moments, ...moments].map((asset, photoIndex) => {
            const isClone = photoIndex >= moments.length
            return (
              <button
                type="button"
                className="case-reel__item"
                key={`${asset.id}-${photoIndex}`}
                style={{ aspectRatio: reelRatio(asset.ratio) }}
                onClick={() => setLightbox({ items: photos, index: (photoIndex % moments.length) + 1 })}
                aria-label={`Open image: ${asset.alt}`}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}
              >
                <ResponsiveImage asset={asset} />
              </button>
            )
          })}
        </Marquee>
      )}

      <div className="case-shell">
        {project.programs && (
          <section className="case-section case-programs" aria-labelledby="case-programs-title">
            <h2 className="case-sentence" id="case-programs-title" data-reveal>{project.programs.intro}</h2>
            <ul className="case-programs__list">
              {project.programs.items.map((program, programIndex, items) => (
                <li key={program.name} data-reveal>
                  <button type="button" onClick={() => setLightbox({ items: items.map((item) => item.poster), index: programIndex })} aria-label={`Open poster: ${program.poster.alt}`}>
                    <ResponsiveImage asset={program.poster} />
                  </button>
                  <div className="case-programs__info">
                  <span className="case-programs__index" aria-hidden="true">{String(programIndex + 1).padStart(2, '0')}</span>
                  <h3>{program.name}</h3>
                  <p>{program.description}</p>
                  {program.stats && (
                    <dl>
                      {program.stats.map((stat) => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
                    </dl>
                  )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.works && (
          <section className="case-section case-works" aria-labelledby="case-works-title">
            <div className="case-works__head" data-reveal>
              <h2 className="case-sentence" id="case-works-title">{project.works.intro}</h2>
              <p>{project.works.note} <i aria-hidden="true">▶</i></p>
            </div>
            {project.works.groups.map((group) => {
              if (group.videos) {
                return (
                  <div className="case-works__group" key={group.title}>
                    <h3 data-reveal>{group.title}</h3>
                    {group.intro && <p className="case-works__lead" data-reveal><RichText text={group.intro} /></p>}
                    <ul className="show__videos case-works__videos" aria-label={group.title}>
                      {group.videos.map((video) => (
                        <li key={video.src} data-reveal>
                          <VideoPlayer src={video.src} poster={video.poster} label={video.label} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }
              const items = group.items ?? []
              // Every card in a group shares the tallest post's frame so the row lines up.
              const frame = group.frame ?? String(Math.min(...items.map((item) => ratioValue(item.asset.ratio))))
              const assets = items.map((item) => item.asset)
              return (
                <div className="case-works__group" key={group.title}>
                  <h3 data-reveal>{group.title}</h3>
                  {group.intro && <p className="case-works__lead" data-reveal><RichText text={group.intro} /></p>}
                  {/* Up to six per row, spread evenly over as few rows as needed. */}
                  <ul style={{ '--cols': Math.ceil(items.length / Math.ceil(items.length / 6)) } as CSSProperties}>
                    {items.map((item, itemIndex) => {
                      const image = <ResponsiveImage asset={{ ...item.asset, ratio: frame }} />
                      return (
                        <li key={item.asset.id} data-reveal>
                          {item.href && item.label ? (
                            // Labelled links (e.g. channels): the image and a button beneath it both open the page.
                            <div className="case-works__linked">
                              <a className="case-works__card" href={item.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">{image}</a>
                              <a className="case-pill case-pill--pink" href={item.href} target="_blank" rel="noreferrer">{item.label} <i aria-hidden="true">▶</i></a>
                            </div>
                          ) : item.href ? (
                            <a className="case-works__card" href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.asset.alt} (opens on Facebook)`}>
                              {image}
                              <span className="case-works__cta" aria-hidden="true">View post<i><Arrow direction="up" /></i></span>
                            </a>
                          ) : (
                            <button className="case-works__card" type="button" onClick={() => setLightbox({ items: assets, index: itemIndex })} aria-label={`Open image: ${item.asset.alt}`}>
                              {image}
                            </button>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
            {project.works.links && (
              <div className="case-works__links" data-reveal>
                {project.works.links.map((link) => (
                  <a className="case-pill" href={link.href} target="_blank" rel="noreferrer" key={link.href} title={link.note}>{link.label} <i aria-hidden="true">▶</i></a>
                ))}
              </div>
            )}
          </section>
        )}

        {project.social && (
          <section className="case-section case-social" aria-labelledby="case-social-title">
            <h2 className="case-sentence case-sentence--center" id="case-social-title" data-reveal>{project.social.intro}</h2>
            <ul className="case-social__posts">
              {project.social.posts.map((post, postIndex, posts) => (
                <li key={post.id} data-reveal>
                  <button type="button" onClick={() => setLightbox({ items: posts, index: postIndex })} aria-label={`Open post: ${post.alt}`}>
                    <ResponsiveImage asset={post} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(project.responsibilities.length > 0 || project.teams) && (
          <section className="case-section case-role" aria-labelledby="case-role-title">
            <div className="case-role__intro">
              <div data-reveal>
                <h2 className="case-heading" id="case-role-title">So, what was my role?</h2>
                <p className="case-subheading">As a {project.role}</p>
              </div>
              {project.teams && (
                <figure className="case-org" aria-label={`${project.role} leading ${project.teams.length} teams`} data-reveal>
                  <p className="case-org__lead"><small>Me</small>{project.role}</p>
                  <ul>{project.teams.map((team) => <li key={team}>{team}</li>)}</ul>
                </figure>
              )}
            </div>
            <ol className="journey-list case-duties">
              {project.responsibilities.map((item, dutyIndex) => {
                const isOpen = openDuties.has(dutyIndex)
                const panelId = `duty-panel-${dutyIndex}`
                return (
                  // Open state lives in data-open so re-renders keep the scroll-reveal is-visible class.
                  <li className="journey-item" data-open={isOpen} key={item.title} data-reveal>
                    <span className="journey-item__index" aria-hidden="true">{String(dutyIndex + 1).padStart(2, '0')}</span>
                    <div className="journey-item__panel">
                      <h3>
                        <button className="journey-item__toggle" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggleDuty(dutyIndex)}>
                          <span className="journey-item__title">{item.title}</span>
                          <span className="journey-item__chevron" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                          </span>
                        </button>
                      </h3>
                      <div className="journey-item__body" id={panelId} aria-hidden={!isOpen}>
                        <div><p><RichText text={item.body} /></p></div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )}

        {project.bigIdea && (
          <section className="case-section case-idea" aria-labelledby="case-idea-title">
            <h2 className="case-heading" id="case-idea-title" data-reveal>Big idea</h2>
            <blockquote className="case-idea__statement" lang="vi" data-reveal><p>{project.bigIdea.statement}</p></blockquote>
            <div className="case-idea__name">
              <div data-reveal>
                <h3>The program name</h3>
                <p className="case-idea__title" lang="vi">“{project.bigIdea.name}”</p>
              </div>
              <ul className="case-idea__meaning" lang="vi" data-reveal>
                {project.bigIdea.meaning.map((item) => <li key={item}><RichText text={item} /></li>)}
              </ul>
            </div>
          </section>
        )}

        {project.video && (
          <section className="case-section case-video" aria-label="Event video">
            <div data-reveal><VideoPlayer src={project.video.src} poster={project.video.poster} label={project.video.label} className="player--wide" /></div>
          </section>
        )}

        {project.quote && (
          <figure className="case-section case-quote" data-reveal>
            <div className="case-quote__card">
              <span className="case-quote__mark" aria-hidden="true">“</span>
              <figcaption>
                <span className="case-quote__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3ZM5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                </span>
                {project.quote.intro}
              </figcaption>
              <blockquote lang="vi"><p>{project.quote.text}</p></blockquote>
            </div>
          </figure>
        )}

        {(documents.length > 0 || project.links.length > 0) && (
          <section className="case-section case-docs" aria-labelledby="case-docs-title">
            <h2 className="case-heading" id="case-docs-title" data-reveal>How it was planned</h2>
            {documents.length > 0 ? (
              <div className="case-docs__grid">
                {documents.map((asset, documentIndex) => {
                  const href = asset.link
                  const card = (
                    <>
                      <span className="case-docs__chrome" aria-hidden="true"><i /><i /><i /></span>
                      <ResponsiveImage asset={asset} />
                      {href && <span className="case-docs__cta">More details here<i aria-hidden="true"><Arrow direction="up" /></i></span>}
                    </>
                  )
                  return (
                    <figure key={asset.id} data-reveal>
                      {href ? (
                        <a className="case-docs__card" href={href} target="_blank" rel="noreferrer" aria-label={`${asset.caption ?? asset.alt}: more details (opens in a new tab)`}>{card}</a>
                      ) : (
                        <button className="case-docs__card" type="button" onClick={() => setLightbox({ items: documents, index: documentIndex })} aria-label={`Open document: ${asset.alt}`}>{card}</button>
                      )}
                      {asset.caption && <figcaption><strong>{asset.caption}</strong>{asset.note && <span>{asset.note}</span>}</figcaption>}
                    </figure>
                  )
                })}
              </div>
            ) : (
              <div className="case-docs__links" data-reveal>
                {project.links.map((link) => (
                  <a className="case-pill" href={link.href} target="_blank" rel="noreferrer" key={link.href} title={link.note}>
                    {link.label} <i aria-hidden="true">▶</i>
                  </a>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {project.learning && (
      <section className="case-learned case-shell" aria-labelledby="case-learned-title">
        <h2 className="case-heading" id="case-learned-title" data-reveal>{project.learnedHeading ?? 'And here’s what I learned…'}</h2>
        <div className="case-learned__card" data-reveal>
          <span className="case-learned__mark" aria-hidden="true">“</span>
          <div className="case-learned__text">
            <Paragraphs text={project.learning} />
          </div>
        </div>
      </section>
      )}

      <nav className="case-more" aria-labelledby="case-more-title">
        <div className="case-shell">
          <h2 className="case-heading" id="case-more-title" data-reveal>Explore all projects</h2>
          <ul>
            {projects.map((item) => {
              const isCurrent = item.slug === project.slug
              return (
                <li key={item.slug} data-reveal>
                  <a href={`#project-${item.slug}`} data-current={isCurrent} aria-current={isCurrent ? 'page' : undefined}>
                    <ResponsiveImage asset={thumb(item)} />
                    <span className="case-more__index" aria-hidden="true">{item.index}</span>
                    <strong>{item.shortTitle}</strong>
                    <span className="case-more__role">{isCurrent ? 'You are here' : item.role === item.title ? item.org : item.role}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="case-more__home" data-reveal>
            <a className="case-pill case-pill--pink" href="#home"><Arrow direction="left" /> Back to home page</a>
          </div>
        </div>
      </nav>
      {lightbox && <Lightbox state={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </main>
  )
}

function routeFromHash(hash: string): Route {
  const slug = hash.replace(/^#project-/, '')
  if (hash.startsWith('#project-') && projects.some((project) => project.slug === slug)) return slug as ProjectSlug
  const clean = hash.replace('#', '')
  if (clean === 'projects') return 'projects'
  if (clean === 'contact') return 'contact'
  return 'home'
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
        const isProjectDetail = nextRoute !== 'home' && nextRoute !== 'projects' && nextRoute !== 'contact'
        if (isProjectDetail) {
          window.scrollTo({ top: 0, behavior: 'auto' })
          window.setTimeout(() => document.querySelector<HTMLElement>('.case-hero h1')?.focus({ preventScroll: true }), 250)
          return
        }
        if (nextRoute === 'home') {
          const hash = window.location.hash.replace('#', '')
          if (hash && hash !== 'home' && hash !== 'page-0') {
            const target = document.getElementById(hash)
            if (target) {
              target.scrollIntoView({ behavior: !smooth || prefersReducedMotion() ? 'auto' : 'smooth' })
              return
            }
          }
        }
        window.scrollTo({ top: 0, behavior: !smooth || prefersReducedMotion() ? 'auto' : 'smooth' })
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
    } else if (route === 'projects') {
      document.title = 'Projects — Quynh Van Portfolio'
    } else if (route === 'contact') {
      document.title = 'Contact — Quynh Van Portfolio'
    } else {
      document.title = 'Quynh Van — Marketing Portfolio'
    }
  }, [project, route])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader route={route} />
      {project ? (
        <>
          <ProjectPage project={project} />
          <SiteFooter />
        </>
      ) : route === 'projects' ? (
        <>
          <ProjectsPage />
          <SiteFooter />
        </>
      ) : route === 'contact' ? (
        <ContactPage />
      ) : (
        <>
          <HomePage />
          <SiteFooter />
        </>
      )}
    </div>
  )
}

export default App
