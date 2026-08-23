import { type CSSProperties, type FormEvent, useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Command,
  Copy,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  Plus,
  Send,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from 'lucide-react'

type ProjectFilter = 'all' | 'product' | 'interface' | 'systems'
type ProjectVisual = 'ticket' | 'home' | 'health' | 'portfolio'

type Project = {
  id: string
  index: string
  name: string
  description: string
  type: string
  category: Exclude<ProjectFilter, 'all'>
  year: string
  stack: string[]
  href: string
  visual: ProjectVisual
  featured?: boolean
}

type Capability = {
  name: string
  detail: string
  level: number
}

type CommandAction = {
  label: string
  hint: string
  icon: LucideIcon
  action: () => void
}

const emailAddress = 'ein.nadid@gmail.com'

const projects: Project[] = [
  {
    id: 'ticketbari',
    index: '01',
    name: 'Ticketbari',
    description: 'A considered booking experience that makes complicated travel logistics feel effortless.',
    type: 'Product / booking platform',
    category: 'product',
    year: '2024',
    stack: ['React', 'Node.js', 'MongoDB'],
    href: 'https://github.com/einadid/ticketbari-project-client',
    visual: 'ticket',
    featured: true,
  },
  {
    id: 'homehero',
    index: '02',
    name: 'HomeHero',
    description: 'A service marketplace foundation built around trust, clarity, and a faster path to help.',
    type: 'Systems / service marketplace',
    category: 'systems',
    year: '2024',
    stack: ['Express', 'REST API', 'AWS'],
    href: 'https://github.com/einadid/homehero-server-v2',
    visual: 'home',
    featured: true,
  },
  {
    id: 'quickmed',
    index: '03',
    name: 'QuickMed',
    description: 'A human-first healthcare interface for finding the right care without the friction.',
    type: 'Interface / healthcare',
    category: 'interface',
    year: '2023',
    stack: ['TypeScript', 'React', 'Figma'],
    href: 'https://github.com/einadid/quickmed',
    visual: 'health',
  },
  {
    id: 'portfolio',
    index: '04',
    name: 'Nadid / portfolio',
    description: 'A living space for experiments, visual systems, and the work behind the work.',
    type: 'Interface / personal site',
    category: 'interface',
    year: '2026',
    stack: ['TypeScript', 'CSS', 'Vite'],
    href: 'https://github.com/einadid/portfolio',
    visual: 'portfolio',
  },
]

const capabilities: Capability[] = [
  { name: 'Product thinking', detail: 'strategy / systems', level: 92 },
  { name: 'Frontend craft', detail: 'react / typescript', level: 96 },
  { name: 'Backend architecture', detail: 'node / APIs', level: 84 },
  { name: 'Visual design', detail: 'UI / interaction', level: 88 },
]

const stackGroups = [
  { label: 'Languages', values: ['TypeScript', 'JavaScript', 'Python', 'C++'] },
  { label: 'Build', values: ['React', 'Next.js', 'Node.js', 'Express'] },
  { label: 'Data + cloud', values: ['MongoDB', 'PostgreSQL', 'AWS', 'REST APIs'] },
  { label: 'Workflow', values: ['Git', 'Figma', 'VS Code', 'Vercel'] },
]

function App() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const visibleProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
    setPaletteOpen(false)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${emailAddress}`
    }
  }

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || 'there')
    const brief = String(formData.get('brief') || '')
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(brief)
    setSubmitted(true)
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const commandActions: CommandAction[] = [
    { label: 'View selected work', hint: 'Projects', icon: Layers3, action: () => scrollTo('work') },
    { label: 'Explore the stack', hint: 'Tools', icon: Terminal, action: () => scrollTo('stack') },
    { label: 'Start a conversation', hint: 'Contact', icon: MessageCircle, action: () => scrollTo('contact') },
    { label: 'Copy email address', hint: 'Clipboard', icon: Copy, action: copyEmail },
  ]

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nadid home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">N<span>/</span>N</span>
          <span className="brand-name">Emamul Islam Nadid</span>
        </a>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo('about')}>About</button>
          <button type="button" onClick={() => scrollTo('work')}>Work</button>
          <button type="button" onClick={() => scrollTo('stack')}>Stack</button>
          <button type="button" onClick={() => scrollTo('contact')}>Contact</button>
        </nav>

        <div className="topbar-actions">
          <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Open command menu">
            <Command size={15} />
            <span>Quick find</span>
            <kbd>⌘ K</kbd>
          </button>
          <a className="header-cta" href={`mailto:${emailAddress}`}>
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero page-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Available for select projects <span className="eyebrow-divider" /> Dhaka, BD</div>
            <h1>Digital products,<br /><em>built with intent.</em></h1>
            <p className="hero-lede">I’m Nadid — a full-stack developer who turns complex ideas into calm, capable digital experiences.</p>
            <div className="hero-actions">
              <button className="button button-dark" type="button" onClick={() => scrollTo('work')}>See selected work <ArrowDown size={16} /></button>
              <button className="text-button" type="button" onClick={() => scrollTo('contact')}>Start a conversation <ArrowRight size={16} /></button>
            </div>
            <div className="hero-meta">
              <div><strong>04</strong><span>Selected projects</span></div>
              <div><strong>03+</strong><span>Years building</span></div>
              <div><strong>∞</strong><span>Curiosity level</span></div>
            </div>
          </div>

          <div className="hero-art" aria-label="Abstract 3D Nadid monogram" role="img">
            <div className="art-label art-label-top"><span>Spatial study</span><span>01 — 04</span></div>
            <div className="art-coordinates">23°48' N<br />90°24' E</div>
            <div className="orbital orbital-one" />
            <div className="orbital orbital-two" />
            <div className="orbital orbital-three" />
            <div className="orbital-dot dot-one" />
            <div className="orbital-dot dot-two" />
            <div className="hero-orb">
              <div className="orb-highlight" />
              <div className="orb-letter">N</div>
              <span className="orb-caption">NADID<br /><small>digital / 26</small></span>
            </div>
            <div className="art-label art-label-bottom"><span>Surface / 001</span><span>Scroll to explore ↓</span></div>
          </div>
        </section>

        <section className="marquee-band" aria-label="Areas of expertise">
          <div className="marquee-track">
            {['Product engineering', 'Interface systems', 'Thoughtful motion', 'Scalable foundations', 'Product engineering', 'Interface systems'].map((item, index) => (
              <span key={`${item}-${index}`}>{item} <b>✳</b></span>
            ))}
          </div>
        </section>

        <section className="intro-section page-section" id="about">
          <div className="section-kicker"><span>01</span><span>About the practice</span></div>
          <div className="intro-grid">
            <h2>Good technology<br />should feel <em>obvious.</em></h2>
            <div className="intro-text">
              <p>I care about the space where engineering meets a clear point of view. My work is equal parts structure and sensitivity: building systems that perform beautifully, and interfaces that make people feel oriented.</p>
              <p>Based in Bangladesh, I’m currently completing my BSc in Computer Science & Engineering while partnering on ambitious web products.</p>
              <button className="inline-link" type="button" onClick={() => scrollTo('contact')}>More about my approach <ArrowUpRight size={16} /></button>
            </div>
          </div>
          <div className="principle-row">
            <div className="principle"><span>01</span><strong>Make it clear</strong><p>Remove the noise. Keep the signal.</p></div>
            <div className="principle"><span>02</span><strong>Make it useful</strong><p>Craft with the real person in mind.</p></div>
            <div className="principle"><span>03</span><strong>Make it last</strong><p>Small details, resilient foundations.</p></div>
          </div>
        </section>

        <section className="work-section page-section" id="work">
          <div className="section-heading">
            <div><div className="section-kicker"><span>02</span><span>Selected work</span></div><h2>Things I’ve<br /><em>shipped.</em></h2></div>
            <p>A selection of products, platforms, and experiments. Each one is an exercise in making the complex feel considered.</p>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter projects">
            {(['all', 'product', 'interface', 'systems'] as ProjectFilter[]).map((filter) => (
              <button key={filter} type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} role="tab" aria-selected={activeFilter === filter}>
                {filter === 'all' ? 'All work' : filter}
              </button>
            ))}
            <span className="filter-count">{String(visibleProjects.length).padStart(2, '0')} projects</span>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        </section>

        <section className="stack-section page-section" id="stack">
          <div className="section-heading stack-heading">
            <div><div className="section-kicker"><span>03</span><span>Capabilities & tools</span></div><h2>Tools are<br /><em>only the start.</em></h2></div>
            <p>Technology is a means, not the headline. I choose tools that keep teams moving and leave room for the work to evolve.</p>
          </div>
          <div className="stack-layout">
            <div className="capability-panel">
              <div className="panel-topline"><span>Capability index</span><span>Updated / 2026</span></div>
              {capabilities.map((capability) => (
                <div className="capability" key={capability.name}>
                  <div className="capability-label"><strong>{capability.name}</strong><span>{capability.detail}</span></div>
                  <div className="capability-meter"><span style={{ '--level': `${capability.level}%` } as CSSProperties} /></div>
                  <b>{capability.level}</b>
                </div>
              ))}
              <div className="panel-foot"><CircleDot size={14} /> Open to learning the next useful thing</div>
            </div>
            <div className="stack-list">
              {stackGroups.map((group, groupIndex) => (
                <div className="stack-group" key={group.label}>
                  <span className="stack-index">0{groupIndex + 1}</span>
                  <span className="stack-label">{group.label}</span>
                  <div className="stack-values">{group.values.map((value) => <span key={value}>{value}</span>)}</div>
                </div>
              ))}
              <div className="tool-note"><Sparkles size={17} /><span>Currently exploring <b>Next.js</b> and more expressive ways to build for the web.</span></div>
            </div>
          </div>
        </section>

        <section className="process-section page-section">
          <div className="section-kicker"><span>04</span><span>Working rhythm</span></div>
          <div className="process-header"><h2>A simple path<br />to <em>better work.</em></h2><p>No theatre. Just a thoughtful loop of asking, making, testing, and refining.</p></div>
          <div className="process-grid">
            <ProcessStep number="01" title="Find the signal" text="Align on the problem, the people, and the one thing that matters most." icon={AtSign} />
            <ProcessStep number="02" title="Build the shape" text="Turn the idea into a flexible system with a point of view." icon={Layers3} />
            <ProcessStep number="03" title="Make it real" text="Ship, observe, and keep making the product more useful." icon={MoveUpRight} />
          </div>
        </section>

        <section className="contact-section page-section" id="contact">
          <div className="contact-card">
            <div className="contact-art" aria-hidden="true"><div className="contact-ring ring-a" /><div className="contact-ring ring-b" /><span>✳</span></div>
            <div className="contact-copy"><div className="section-kicker"><span>05</span><span>Have a good one?</span></div><h2>Let’s make<br /><em>something useful.</em></h2><p>Tell me a little about what you’re building, where you are in the process, and what would make this a great collaboration.</p><button className="button button-light" type="button" onClick={copyEmail}>{copied ? <><Check size={16} /> Email copied</> : <><Copy size={16} /> Copy my email</>}</button></div>
            <form className="contact-form" onSubmit={handleContact}>
              <label><span>Your name</span><input name="name" type="text" placeholder="A thoughtful human" required /></label>
              <label><span>Email address</span><input name="email" type="email" placeholder="you@company.com" required /></label>
              <label><span>Project brief</span><textarea name="brief" rows={3} placeholder="A few words about the idea..." required /></label>
              <button className="submit-button" type="submit">{submitted ? 'Opening your email client' : 'Send an enquiry'} <Send size={15} /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><span className="brand-mark">N<span>/</span>N</span><span>Built with intent, from Bangladesh.</span></div>
        <div className="footer-links"><a href="https://github.com/einadid" target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a><a href="https://linkedin.com/in/einadid" target="_blank" rel="noreferrer"><AtSign size={16} /> LinkedIn</a><a href={`mailto:${emailAddress}`}><Mail size={16} /> Email</a></div>
        <div className="footer-end"><span>© 2026 Nadid</span><button type="button" onClick={() => scrollTo('top')}>Back to top <ArrowUpRight size={14} /></button></div>
      </footer>

      {paletteOpen && <CommandPalette actions={commandActions} onClose={() => setPaletteOpen(false)} />}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className={`project-visual visual-${project.visual}`}>
        <div className="visual-topline"><span>{project.index} / {project.type}</span><span>{project.year}</span></div>
        <ProjectVisual type={project.visual} />
        <a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}><ArrowUpRight size={19} /></a>
      </div>
      <div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.name}</h3></div><ArrowUpRight className="project-arrow" size={19} /><p>{project.description}</p><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
    </article>
  )
}

function ProjectVisual({ type }: { type: ProjectVisual }) {
  if (type === 'ticket') {
    return <div className="ticket-visual"><div className="ticket-window"><div className="window-dots"><i /><i /><i /></div><div className="ticket-nav"><span>ticketbari</span><small>Find your route</small></div><div className="route-line"><b>DAC</b><span /><i>✈</i><span /><b>CGP</b></div><div className="ticket-card-row"><div /><div /><div /></div></div><div className="float-chip chip-one">✦ 4.9 rating</div><div className="float-chip chip-two">✈ 2h 40m</div></div>
  }
  if (type === 'home') {
    return <div className="home-visual"><div className="home-cube cube-main"><div className="cube-face face-top" /><div className="cube-face face-front"><span>H</span></div><div className="cube-face face-side" /></div><div className="home-signal signal-one" /><div className="home-signal signal-two" /><div className="home-label">HOMEHERO <span>service / system</span></div></div>
  }
  if (type === 'health') {
    return <div className="health-visual"><div className="health-card"><div className="health-card-head"><span>Good morning</span><i>•••</i></div><div className="health-profile"><div className="profile-avatar">+</div><div><b>Find your care</b><small>Specialists near you</small></div></div><div className="health-bars"><span /><span /><span /></div><div className="health-button">Book appointment <ArrowRight size={13} /></div></div><div className="health-orb"><Plus size={20} /></div></div>
  }
  return <div className="portfolio-visual"><div className="portfolio-word">NADID</div><div className="portfolio-grid-lines" /><div className="portfolio-tag">/ 2026<br /><span>Selected works</span></div><div className="portfolio-orb-small" /></div>
}

function ProcessStep({ number, title, text, icon: Icon }: { number: string; title: string; text: string; icon: LucideIcon }) {
  return <div className="process-step"><div className="process-step-top"><span>{number}</span><Icon size={19} /></div><h3>{title}</h3><p>{text}</p><ChevronRight size={18} className="process-chevron" /></div>
}

function CommandPalette({ actions, onClose }: { actions: CommandAction[]; onClose: () => void }) {
  return <div className="palette-backdrop" role="presentation" onMouseDown={onClose}><div className="command-palette" role="dialog" aria-modal="true" aria-label="Quick find" onMouseDown={(event) => event.stopPropagation()}><div className="palette-input"><Command size={17} /><input autoFocus placeholder="What are you looking for?" /><kbd>ESC</kbd></div><div className="palette-list">{actions.map(({ label, hint, icon: Icon, action }) => <button type="button" key={label} onClick={action}><span className="palette-icon"><Icon size={17} /></span><span>{label}</span><small>{hint}</small><ArrowRight size={15} /></button>)}</div><div className="palette-footer"><span><Globe2 size={13} /> Navigate the portfolio</span><span>↵ select</span></div></div></div>
}

export default App

