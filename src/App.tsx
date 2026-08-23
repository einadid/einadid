import { type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent, useEffect, useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Code2,
  Command,
  Copy,
  Database,
  ExternalLink,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MoveUpRight,
  Quote,
  Radar,
  Send,
  Share2,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from 'lucide-react'

type ProjectFilter = 'all' | 'product' | 'interface' | 'systems'
type Service = { title: string; description: string; number: string; tone: string }
type Testimonial = { quote: string; name: string; role: string; image: string }

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
  image: string
  featured?: boolean
}

type Capability = { name: string; detail: string; level: number }
type LinkItem = { label: string; detail: string; url: string; icon: LucideIcon }
type CommandAction = { label: string; hint: string; icon: LucideIcon; action: () => void }

type HeroPoint = { x: number; y: number; tiltX: number; tiltY: number }

const emailAddress = 'einadid0123@gmail.com'
const profileEmailAddress = 'ein.nadid@gmail.com'
const phoneNumber = '+8801678791177'
const roles = ['Full-stack developer', 'Graphic designer', 'MERN stack enthusiast', 'Problem solver', 'Open-source contributor']

const projects: Project[] = [
  {
    id: 'ticketbari', index: '01', name: 'Ticketbari',
    description: 'A travel booking project focused on making route discovery and ticket decisions feel simple.',
    type: 'Product / booking platform', category: 'product', year: '2024',
    stack: ['React', 'Node.js', 'MongoDB'], href: 'https://github.com/einadid/ticketbari-project-client',
    image: '/images/ticketbari-cover.png', featured: true,
  },
  {
    id: 'homehero', index: '02', name: 'HomeHero',
    description: 'A service marketplace foundation designed around trust, clarity, and a faster path to help.',
    type: 'Systems / service marketplace', category: 'systems', year: '2024',
    stack: ['Express', 'REST API', 'AWS'], href: 'https://github.com/einadid/homehero-server-v2',
    image: '/images/homehero-cover.png', featured: true,
  },
  {
    id: 'quickmed', index: '03', name: 'QuickMed',
    description: 'A human-first healthcare concept for finding the right care without unnecessary friction.',
    type: 'Interface / healthcare', category: 'interface', year: '2023',
    stack: ['TypeScript', 'React', 'Figma'], href: 'https://github.com/einadid/quickmed',
    image: '/images/quickmed-cover.png',
  },
  {
    id: 'pharmacy', index: '04', name: 'Pharmacy management',
    description: 'A university lab project exploring pharmacy workflows with Python Tkinter and MSSQL.',
    type: 'Systems / university lab project', category: 'systems', year: '2023',
    stack: ['Python', 'Tkinter', 'MSSQL'], href: 'https://youtu.be/I9FfRpiCjVA?si=oQxQ83xxTSyPf9qN',
    image: '/images/pharmacy-cover.png',
  },
  {
    id: 'portfolio', index: '05', name: 'Portfolio',
    description: 'A living space for experiments, visual systems, and the work behind the work.',
    type: 'Interface / personal site', category: 'interface', year: '2026',
    stack: ['TypeScript', 'CSS', 'Vite'], href: 'https://github.com/einadid/portfolio',
    image: '/images/hero-abstract.png',
  },
]

const capabilities: Capability[] = [
  { name: 'Product thinking', detail: 'strategy / systems', level: 92 },
  { name: 'Frontend craft', detail: 'react / typescript', level: 96 },
  { name: 'Backend architecture', detail: 'node / APIs', level: 84 },
  { name: 'Visual design', detail: 'UI / interaction', level: 88 },
]

const stackGroups = [
  { label: 'Languages', values: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'Java'] },
  { label: 'Frontend', values: ['HTML', 'CSS', 'React', 'Next.js'] },
  { label: 'Backend', values: ['Node.js', 'Express', 'REST APIs'] },
  { label: 'Databases', values: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { label: 'Tools', values: ['Git', 'GitHub', 'Windows', 'AWS', 'VS Code', 'Figma'] },
]

const codingProfiles: LinkItem[] = [
  { label: 'LeetCode', detail: 'Problem-solving practice', url: 'https://leetcode.com/einadid', icon: Code2 },
  { label: 'Codeforces', detail: 'Competitive programming', url: 'https://codeforces.com/profile/einadid', icon: Radar },
  { label: 'HackerRank', detail: 'Skill verification', url: 'https://www.hackerrank.com/profile/einadid', icon: Terminal },
]

const socialLinks: LinkItem[] = [
  { label: 'Portfolio', detail: 'Live site', url: 'https://einadid.github.io/portfolio/', icon: Globe2 },
  { label: 'GitHub', detail: '@einadid', url: 'https://github.com/einadid', icon: Code2 },
  { label: 'LinkedIn', detail: '/in/einadid', url: 'https://linkedin.com/in/einadid', icon: AtSign },
  { label: 'X / Twitter', detail: '@einadid', url: 'https://x.com/einadid', icon: Share2 },
  { label: 'Facebook', detail: '/einadid', url: 'https://facebook.com/einadid', icon: MessageCircle },
  { label: 'Instagram', detail: '@ein.nadid', url: 'https://instagram.com/ein.nadid', icon: Sparkles },
  { label: 'YouTube', detail: '@einadid', url: 'https://youtube.com/@einadid', icon: MoveUpRight },
  { label: 'Discord', detail: 'emamulnadid', url: 'https://discord.com/users/emamulnadid', icon: MessageCircle },
]

const activityCells = Array.from({ length: 84 }, (_, index) => (index * 7 + 3) % 5)

const services: Service[] = [
  { number: '01', title: 'Logo & branding design', description: 'Building memorable identities with a clear visual point of view.', tone: 'tone-lime' },
  { number: '02', title: 'Illustration', description: 'Turning concepts and ideas into visual stories with character.', tone: 'tone-lavender' },
  { number: '03', title: 'Website making', description: 'Thoughtful, responsive websites shaped around real users.', tone: 'tone-sky' },
  { number: '04', title: 'T-shirt design', description: 'Eye-catching graphics built with color, composition, and energy.', tone: 'tone-coral' },
  { number: '05', title: 'Image editing', description: 'Retouching, color, and visual effects that elevate an image.', tone: 'tone-orange' },
  { number: '06', title: 'Packaging design', description: 'Functional visual systems that help products stand out and communicate value.', tone: 'tone-ink' },
]

const testimonials: Testimonial[] = [
  { quote: 'He absolutely nailed the design and was super easy to work with. Quick turnaround, great communication, and amazing design sense!', name: 'Rajib Chowdhury', role: 'Content Creator', image: '/images/testimonials/rajib.jpg' },
  { quote: 'His understanding of modern design trends and minimal aesthetics really stood out. We have received so many compliments on our new look.', name: 'MD Nuruzzaman Tamim', role: 'Founder', image: '/images/testimonials/tamim.jpg' },
  { quote: 'The colors, the balance, the concept — everything was on point. His professionalism made the entire process smooth and enjoyable.', name: 'Hasnat Mahmud Zihad', role: 'Brand Owner, POOSH', image: '/images/testimonials/zihad.jpg' },
  { quote: 'He matched the color theme perfectly and added a modern touch that made our page feel more professional. Highly recommended!', name: 'Partha Sinha', role: 'Marketing Manager', image: '/images/testimonials/partho.jpg' },
  { quote: 'His creative vision, attention to detail, and ability to understand exactly what we needed made the process smooth and enjoyable.', name: 'Raisul Alam Raihan', role: 'Designer & Founder', image: '/images/testimonials/raihan.jpg' },
]

function App() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroPoint, setHeroPoint] = useState<HeroPoint>({ x: 50, y: 50, tiltX: 0, tiltY: 0 })

  const visibleProjects = activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter)

  useEffect(() => {
    const roleTimer = window.setInterval(() => setRoleIndex((index) => (index + 1) % roles.length), 2600)
    const testimonialTimer = window.setInterval(() => setTestimonialIndex((index) => (index + 1) % testimonials.length), 6200)
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
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

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    onScroll()
    return () => {
      window.clearInterval(roleTimer)
      window.clearInterval(testimonialTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

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
    const email = String(formData.get('email') || '')
    const brief = String(formData.get('brief') || '')
    const subject = encodeURIComponent(`Project enquiry from ${name}`)
    const body = encodeURIComponent(`Reply to: ${email}\n\n${brief}`)
    setSubmitted(true)
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`
  }

  const handleHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    setHeroPoint({ x: x * 100, y: y * 100, tiltX: (x - 0.5) * 5, tiltY: (0.5 - y) * 5 })
  }

  const resetHeroPointer = () => setHeroPoint({ x: 50, y: 50, tiltX: 0, tiltY: 0 })
  const activeTestimonial = testimonials[testimonialIndex]
  const showPreviousTestimonial = () => setTestimonialIndex((index) => (index - 1 + testimonials.length) % testimonials.length)
  const showNextTestimonial = () => setTestimonialIndex((index) => (index + 1) % testimonials.length)

  const commandActions: CommandAction[] = [
    { label: 'View selected work', hint: 'Projects', icon: Layers3, action: () => scrollTo('work') },
    { label: 'Explore the stack', hint: 'Tools', icon: Terminal, action: () => scrollTo('stack') },
    { label: 'Open coding profiles', hint: 'Practice', icon: Radar, action: () => scrollTo('profiles') },
    { label: 'Explore design services', hint: 'Services', icon: Sparkles, action: () => scrollTo('services') },
    { label: 'Start a conversation', hint: 'Contact', icon: MessageCircle, action: () => scrollTo('contact') },
    { label: 'Copy email address', hint: 'Clipboard', icon: Copy, action: copyEmail },
  ]

  const heroStyle = {
    '--mouse-x': `${heroPoint.x}%`,
    '--mouse-y': `${heroPoint.y}%`,
    '--tilt-x': `${heroPoint.tiltX}deg`,
    '--tilt-y': `${heroPoint.tiltY}deg`,
  } as CSSProperties

  return (
    <div className="site-shell">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Nadid home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">N</span>
          <span className="brand-name">Emamul Islam Nadid</span>
        </a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo('about')}>About</button>
          <button type="button" onClick={() => scrollTo('work')}>Work</button>
          <button type="button" onClick={() => scrollTo('stack')}>Stack</button>
          <button type="button" onClick={() => scrollTo('services')}>Services</button>
          <button type="button" onClick={() => scrollTo('profiles')}>Profiles</button>
          <button type="button" onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <div className="topbar-actions">
          <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Open command menu"><Command size={15} /><span>Quick find</span><kbd>⌘ K</kbd></button>
          <a className="header-cta" href={`mailto:${emailAddress}`}>Let’s talk <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero page-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /><span className="role-rotator" key={roles[roleIndex]}>{roles[roleIndex]}</span><span className="eyebrow-divider" /><span>Bangladesh</span></div>
            <h1>Digital products,<br /><em>built with intent.</em></h1>
            <p className="hero-lede">I’m Nadid — a full-stack developer who turns complex ideas into calm, capable digital experiences.</p>
            <div className="hero-actions"><button className="button button-dark" type="button" onClick={() => scrollTo('work')}>See selected work <ArrowDown size={16} /></button><button className="text-button" type="button" onClick={() => scrollTo('contact')}>Start a conversation <ArrowRight size={16} /></button></div>
            <div className="hero-meta"><div><strong>16</strong><span>Happy clients</span></div><div><strong>10</strong><span>Projects</span></div><div><strong>03+</strong><span>Years design</span></div><div><strong>222</strong><span>Hours support</span></div></div>
          </div>
          <div className="hero-art" style={heroStyle} onPointerMove={handleHeroPointerMove} onPointerLeave={resetHeroPointer} aria-label="Abstract 3D Nadid studio artwork" role="img">
            <img className="hero-image" src="/images/hero-abstract.png" alt="Abstract graphite orb floating over an off-white grid" />
            <div className="hero-image-wash" />
            <div className="hero-art-ring ring-one" /><div className="hero-art-ring ring-two" />
            <div className="art-label art-label-top"><span>Spatial study</span><span>01 — 04</span></div>
            <div className="art-coordinates">23°48' N<br />90°24' E</div>
            <div className="hero-stamp"><span>N</span><small>visual<br />identity</small></div>
            <div className="hero-profile-card"><img src="/images/nadid-about.jpg" alt="Emamul Islam Nadid" /><div><strong>Emamul Islam Nadid</strong><span>Developer + designer</span></div><ArrowUpRight size={15} /></div>
            <div className="orbital-dot dot-one" /><div className="orbital-dot dot-two" />
            <div className="art-label art-label-bottom"><span>Surface / 001</span><span>Move your cursor ↗</span></div>
          </div>
        </section>

        <section className="marquee-band" aria-label="Areas of expertise"><div className="marquee-track">{['Web application development', 'System design & architecture', 'UI / UX & visual design', 'Problem solving', 'Open-source contribution', 'Web application development'].map((item, index) => <span key={`${item}-${index}`}>{item} <b>✳</b></span>)}</div></section>

        <section className="intro-section page-section" id="about">
          <div className="section-kicker"><span>01</span><span>About the practice</span></div>
          <div className="intro-grid"><h2>Good technology<br />should feel <em>obvious.</em></h2><div className="intro-text"><p>I care about the space where engineering meets a clear point of view. My work is equal parts structure and sensitivity: building systems that perform beautifully, and interfaces that make people feel oriented.</p><p>Based in Bangladesh, I’m currently completing my BSc in Computer Science & Engineering while building scalable applications and contributing to open-source projects.</p><button className="inline-link" type="button" onClick={() => scrollTo('profiles')}>See the full profile <ArrowUpRight size={16} /></button></div></div>
          <div className="principle-row"><div className="principle"><span>01</span><strong>Make it clear</strong><p>Remove the noise. Keep the signal.</p></div><div className="principle"><span>02</span><strong>Make it useful</strong><p>Craft with the real person in mind.</p></div><div className="principle"><span>03</span><strong>Make it last</strong><p>Small details, resilient foundations.</p></div></div>
          <div className="profile-ledger"><div className="ledger-topline"><span>Profile / 2026</span><span>Identity system</span></div><div className="ledger-grid"><LedgerItem icon={BriefcaseBusiness} label="Role" value="Full Stack Developer" /><LedgerItem icon={GraduationCap} label="Education" value="BSc in Computer Science & Engineering" /><LedgerItem icon={BookOpen} label="University" value="Port City International University" /><LedgerItem icon={MapPin} label="Location" value="Bangladesh" /></div><div className="ledger-bottom"><div><span className="ledger-label">Languages</span><div className="ledger-chips"><span>Bengali</span><span>English</span></div></div><div><span className="ledger-label">Expected graduation</span><strong>2026</strong></div></div></div>
          <div className="profile-story"><img src="/images/nadid-profile.jpg" alt="Emamul Islam Nadid in a formal jacket" /><div><div className="section-kicker"><span>01 / 02</span><span>Beyond the code</span></div><h3>Graphic design and<br /><em>junior web development.</em></h3><p>As a freelance graphic designer with over three years of experience, I bring the same care for composition, color, and storytelling into every interface I build.</p><a className="inline-link" href="#services">Explore design services <ArrowUpRight size={16} /></a></div></div>
          <div className="education-strip"><div className="education-label"><GraduationCap size={17} /><span>Education path</span></div><div className="education-item"><strong>2023 — Present</strong><span>BSc in Computer Science</span><small>Port City International University, Chittagong</small></div><div className="education-item"><strong>2019 — 2021</strong><span>Higher Secondary Certificate</span><small>Hajigonj Model GOVT College, Chandpur</small></div></div>
        </section>

        <section className="work-section page-section" id="work">
          <div className="section-heading"><div><div className="section-kicker"><span>02</span><span>Selected work</span></div><h2>Things I’ve<br /><em>shipped.</em></h2></div><p>A selection of products, platforms, and experiments from my GitHub. Each one is an exercise in making the complex feel considered.</p></div>
          <div className="filter-row" role="tablist" aria-label="Filter projects">{(['all', 'product', 'interface', 'systems'] as ProjectFilter[]).map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)} role="tab" aria-selected={activeFilter === filter}>{filter === 'all' ? 'All work' : filter}</button>)}<span className="filter-count">{String(visibleProjects.length).padStart(2, '0')} projects</span></div>
          <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </section>

        <section className="profiles-section page-section" id="profiles">
          <div className="section-heading"><div><div className="section-kicker"><span>03</span><span>Practice & presence</span></div><h2>Still learning.<br /><em>Always building.</em></h2></div><p>The work continues outside the shipped projects: solving problems, studying patterns, and staying close to the people and communities that make the web interesting.</p></div>
          <div className="profiles-layout"><div className="profiles-panel"><div className="panel-topline"><span>Coding profiles</span><span>Open in new tab ↗</span></div>{codingProfiles.map((profile) => <LinkRow item={profile} key={profile.label} />)}<div className="practice-note"><Activity size={16} /><span>Problem solving is part of the craft, not a separate box.</span></div></div><div className="focus-panel"><div className="focus-heading"><Sparkles size={17} /><span>Current focus</span></div><ul><li>Building scalable applications</li><li>Writing clean, maintainable code</li><li>Contributing to open-source projects</li></ul><div className="interest-block"><span>Interests</span><div>{['Web application development', 'System design & architecture', 'Problem solving', 'UI/UX & visual design'].map((interest) => <span key={interest}>{interest}</span>)}</div></div></div></div>
          <div className="social-rail"><span className="social-rail-label">Find me around the web</span>{socialLinks.map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={13} /></a>)}</div>
        </section>

        <section className="services-section page-section" id="services"><div className="section-heading"><div><div className="section-kicker"><span>04</span><span>Design services</span></div><h2>Make it<br /><em>memorable.</em></h2></div><p>The visual side of the practice: clear identities, expressive graphics, and digital surfaces that give good ideas a sharper presence.</p></div><div className="service-grid">{services.map((service) => <ServiceCard service={service} key={service.title} />)}</div><TestimonialCarousel testimonial={activeTestimonial} index={testimonialIndex} onPrevious={showPreviousTestimonial} onNext={showNextTestimonial} /></section>

        <section className="signal-section page-section"><div className="section-kicker"><span>05</span><span>Open-source signal</span></div><div className="signal-card"><div className="signal-copy"><div className="signal-micro"><Code2 size={15} /> GitHub / @einadid</div><h2>Keep the loop<br /><em>open.</em></h2><p>From coding profiles to project repositories, the practice stays visible, iterative, and always in motion.</p><a className="button button-dark" href="https://github.com/einadid" target="_blank" rel="noreferrer">Open GitHub <ExternalLink size={15} /></a></div><div className="activity-visual"><div className="activity-topline"><span>Contribution rhythm</span><span>Public profile / 01</span></div><div className="activity-grid" aria-label="Abstract contribution activity visual">{activityCells.map((level, index) => <span className={`activity-cell level-${level}`} key={index} />)}</div><div className="activity-bottom"><span>less</span><i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /><span>more</span></div><div className="activity-mark">✳</div></div></div></section>

        <section className="stack-section page-section" id="stack">
          <div className="section-heading stack-heading"><div><div className="section-kicker"><span>06</span><span>Capabilities & tools</span></div><h2>Tools are<br /><em>only the start.</em></h2></div><p>Technology is a means, not the headline. I choose tools that keep teams moving and leave room for the work to evolve.</p></div>
          <div className="stack-layout"><div className="capability-panel"><div className="panel-topline"><span>Capability index</span><span>Updated / 2026</span></div>{capabilities.map((capability) => <div className="capability" key={capability.name}><div className="capability-label"><strong>{capability.name}</strong><span>{capability.detail}</span></div><div className="capability-meter"><span style={{ '--level': `${capability.level}%` } as CSSProperties} /></div><b>{capability.level}</b></div>)}<div className="panel-foot"><CircleDot size={14} /> Open to learning the next useful thing</div></div><div className="stack-list">{stackGroups.map((group, groupIndex) => <div className="stack-group" key={group.label}><span className="stack-index">0{groupIndex + 1}</span><span className="stack-label">{group.label}</span><div className="stack-values">{group.values.map((value) => <span key={value}>{value}</span>)}</div></div>)}<div className="tool-note"><Database size={17} /><span>Currently learning <b>Next.js</b> and sharpening the foundations that make products last.</span></div></div></div>
        </section>

        <section className="process-section page-section"><div className="section-kicker"><span>07</span><span>Working rhythm</span></div><div className="process-header"><h2>A simple path<br />to <em>better work.</em></h2><p>No theatre. Just a thoughtful loop of asking, making, testing, and refining.</p></div><div className="process-grid"><ProcessStep number="01" title="Find the signal" text="Align on the problem, the people, and the one thing that matters most." icon={AtSign} /><ProcessStep number="02" title="Build the shape" text="Turn the idea into a flexible system with a point of view." icon={Layers3} /><ProcessStep number="03" title="Make it real" text="Ship, observe, and keep making the product more useful." icon={MoveUpRight} /></div></section>

        <section className="contact-section page-section" id="contact"><div className="contact-card"><div className="contact-art" aria-hidden="true"><div className="contact-ring ring-a" /><div className="contact-ring ring-b" /><span>✳</span></div><div className="contact-copy"><div className="section-kicker"><span>08</span><span>Have a good one?</span></div><h2>Let’s make<br /><em>something useful.</em></h2><p>Tell me a little about what you’re building, where you are in the process, and what would make this a great collaboration.</p><div className="contact-details"><a href={`mailto:${emailAddress}`}>{emailAddress}</a><a href={`mailto:${profileEmailAddress}`}>{profileEmailAddress}</a><a href={`tel:${phoneNumber}`}>{phoneNumber}</a><span>South Khulshii, Chattogram, Bangladesh</span></div><button className="button button-light" type="button" onClick={copyEmail}>{copied ? <><Check size={16} /> Email copied</> : <><Copy size={16} /> Copy my email</>}</button></div><form className="contact-form" onSubmit={handleContact}><label><span>Your name</span><input name="name" type="text" placeholder="A thoughtful human" required /></label><label><span>Email address</span><input name="email" type="email" placeholder="you@company.com" required /></label><label><span>Project brief</span><textarea name="brief" rows={3} placeholder="A few words about the idea..." required /></label><button className="submit-button" type="submit">{submitted ? 'Opening your email client' : 'Send an enquiry'} <Send size={15} /></button></form></div></section>
      </main>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">N</span><span>Built with intent, from Bangladesh.</span></div><div className="footer-links"><a href="https://github.com/einadid" target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a><a href="https://linkedin.com/in/einadid" target="_blank" rel="noreferrer"><AtSign size={16} /> LinkedIn</a><a href={`mailto:${emailAddress}`}><Mail size={16} /> Email</a></div><div className="footer-end"><span>© 2026 Nadid</span><button type="button" onClick={() => scrollTo('top')}>Back to top <ArrowUpRight size={14} /></button></div></footer>
      {paletteOpen && <CommandPalette actions={commandActions} onClose={() => setPaletteOpen(false)} />}
    </div>
  )
}

function LedgerItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <div className="ledger-item"><Icon size={16} /><div><span>{label}</span><strong>{value}</strong></div></div>
}

function LinkRow({ item }: { item: LinkItem }) {
  const Icon = item.icon
  return <a className="profile-row" href={item.url} target="_blank" rel="noreferrer"><span className="profile-icon"><Icon size={16} /></span><span><strong>{item.label}</strong><small>{item.detail}</small></span><ExternalLink size={15} /></a>
}

function ServiceCard({ service }: { service: Service }) {
  return <article className={`service-card ${service.tone}`}><div className="service-card-top"><span>{service.number}</span><ArrowUpRight size={17} /></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-orb" aria-hidden="true" /></article>
}

function TestimonialCarousel({ testimonial, index, onPrevious, onNext }: { testimonial: Testimonial; index: number; onPrevious: () => void; onNext: () => void }) {
  return <div className="testimonial-card"><div className="testimonial-aside"><div className="section-kicker"><span>Client notes</span><span>From the old portfolio</span></div><Quote size={31} /><span className="testimonial-count">0{index + 1} / 05</span></div><div className="testimonial-content"><blockquote>“{testimonial.quote}”</blockquote><div className="testimonial-person"><img src={testimonial.image} alt={testimonial.name} /><div><strong>{testimonial.name}</strong><span>{testimonial.role}</span></div><div className="testimonial-controls"><button type="button" onClick={onPrevious} aria-label="Previous testimonial"><ChevronLeft size={16} /></button><button type="button" onClick={onNext} aria-label="Next testimonial"><ChevronRight size={16} /></button></div></div></div></div>
}

function ProjectCard({ project }: { project: Project }) {
  return <article className={`project-card ${project.featured ? 'featured' : ''}`}><div className="project-visual"><img className="project-cover" src={project.image} alt={`${project.name} project visual`} /><div className="project-image-overlay" /><div className="visual-topline"><span>{project.index} / {project.type}</span><span>{project.year}</span></div><a className="project-link" href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}><ArrowUpRight size={19} /></a></div><div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.name}</h3></div><ArrowUpRight className="project-arrow" size={19} /><p>{project.description}</p><div className="project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></article>
}

function ProcessStep({ number, title, text, icon: Icon }: { number: string; title: string; text: string; icon: LucideIcon }) {
  return <div className="process-step"><div className="process-step-top"><span>{number}</span><Icon size={19} /></div><h3>{title}</h3><p>{text}</p><ChevronRight size={18} className="process-chevron" /></div>
}

function CommandPalette({ actions, onClose }: { actions: CommandAction[]; onClose: () => void }) {
  return <div className="palette-backdrop" role="presentation" onMouseDown={onClose}><div className="command-palette" role="dialog" aria-modal="true" aria-label="Quick find" onMouseDown={(event) => event.stopPropagation()}><div className="palette-input"><Command size={17} /><input autoFocus placeholder="What are you looking for?" /><kbd>ESC</kbd></div><div className="palette-list">{actions.map(({ label, hint, icon: Icon, action }) => <button type="button" key={label} onClick={action}><span className="palette-icon"><Icon size={17} /></span><span>{label}</span><small>{hint}</small><ArrowRight size={15} /></button>)}</div><div className="palette-footer"><span><Globe2 size={13} /> Navigate the portfolio</span><span>↵ select</span></div></div></div>
}

export default App
