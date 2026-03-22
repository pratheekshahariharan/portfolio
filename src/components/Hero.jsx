import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

const ROLES = ['Software Engineer', 'Data Scientist', 'ML Engineer', 'Backend Developer']
const stats = [['3+', 'Projects'], ['99%', 'ML Accuracy'], ['5+', 'Hackathons'], ['8.31', 'CGPA']]
const firstName = 'Pratheeksha'
const lastName = 'Hariharan'

// Particles moved to global context

function TypedRole() {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = ROLES[idx]
    let timeout

    if (!deleting && displayed.length < full.length) {
      timeout = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIdx((i) => (i + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, idx])

  return (
    <span className={styles.typedRole}>
      {displayed}<span className={styles.cursor}>|</span>
    </span>
  )
}

function AnimatedWord({ text, accent = false, baseDelay = 0 }) {
  return (
    <span className={`${styles.nameWord} ${accent ? styles.nameAccent : ''}`} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.4em' }}>
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className={styles.wordWrapper} style={{ display: 'inline-flex', overflow: 'hidden' }}>
          {word.split('').map((char, cIdx) => (
            <motion.span
              key={`${word}-${cIdx}`}
              className={styles.letter}
              initial={{ opacity: 0, y: -80, rotate: -15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }}
              whileHover={{ y: -10, scale: 1.2, color: 'var(--accent)', rotate: Math.random() * 10 - 5 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                delay: baseDelay + (wIdx * 5 + cIdx) * 0.05
              }}
              style={{ display: 'inline-block', whiteSpace: 'pre', willChange: 'transform' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  // Parallax Mechanics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 80
    const y = (e.clientY / window.innerHeight - 0.5) * 80
    mouseX.set(x)
    mouseY.set(y)
  }

  const springConfig = { damping: 40, stiffness: 100, mass: 1 }
  const px1 = useSpring(useTransform(mouseX, v => v * 1.2), springConfig)
  const py1 = useSpring(useTransform(mouseY, v => v * 1.2), springConfig)
  const px2 = useSpring(useTransform(mouseX, v => -v * 1.5), springConfig)
  const py2 = useSpring(useTransform(mouseY, v => -v * 1.5), springConfig)
  const px3 = useSpring(useTransform(mouseX, v => v * 0.8), springConfig)
  const py3 = useSpring(useTransform(mouseY, v => v * 0.8), springConfig)

  return (
    <section className={styles.hero} id="home" onMouseMove={handleMouseMove}>
      <div className={styles.grid} />

      {/* Parallax Blobs */}
      <motion.div className={styles.orb1} style={{ x: px1, y: py1 }} />
      <motion.div className={styles.orb2} style={{ x: px2, y: py2 }} />
      <motion.div className={styles.orb3} style={{ x: px3, y: py3 }} />

      {/* Floating Geometric Shape */}
      <motion.div
        className={styles.floatingShape}
        animate={{
          y: [-15, 15, -15],
          rotateX: [0, 10, 0],
          rotateY: [0, 15, 0]
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path d="M50 5L95 30V70L50 95L5 70V30L50 5Z" stroke="url(#paint0_linear)" strokeWidth="2" fill="url(#paint1_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent2)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" stopOpacity="0.1" />
              <stop offset="1" stopColor="var(--accent2)" stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="container" style={{ position: 'relative' }}>
        <div className={styles.shell}>
          <div className={styles.content}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                display: 'block'
              }}
            >
              Hello everyone! I am
            </motion.div>
            <motion.h1
              className={styles.name}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <AnimatedWord text={firstName + " " + lastName} accent baseDelay={0.08} />
            </motion.h1>

            <motion.div
              className={styles.roleRow}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
            >
              <span className={styles.rolePrefix}>I craft software as a </span>
              <TypedRole />
            </motion.div>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
            >
              Designing scalable systems, building intelligent solutions,
              <br className={styles.br} /> and transforming complex problems into clean
              production-ready software.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
            >
              <button className={styles.ctaPrimary} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                <span>View Projects</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <a
                href="/PRATHEEKSHA_H_RESUME.pdf"
                target="_blank"
                rel="noreferrer"
                className={styles.ctaSecondary}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Resume
              </a>
              <button className={styles.ctaGhost} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact Me
              </button>
            </motion.div>

            <motion.div
              className={styles.stats}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.68 }}
            >
              {stats.map(([n, l], index) => (
                <motion.div
                  key={l}
                  className={styles.stat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.78 + index * 0.08 }}
                >
                  <span className={styles.statNum}>{n}</span>
                  <span className={styles.statLabel}>{l}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      <motion.div
        className={styles.scrollHint}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </motion.div>
    </section>
  )
}
