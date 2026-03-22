import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Overview.module.css'

const STATS = [
  { icon: '🛠', value: '3+', label: 'Projects Built', desc: 'Production-ready apps shipped end-to-end' },
  { icon: '🎯', value: '99%', label: 'ML Accuracy', desc: 'XGBoost on CICIDS-2017 intrusion dataset' },
  { icon: '🎓', value: '8.31', label: 'CGPA', desc: 'Coimbatore Institute of Technology' },
  { icon: '🏆', value: '5+', label: 'Hackathons', desc: 'SIH national level + Axios inter-college' },
  { icon: '⚡', value: '15+', label: 'Technologies', desc: 'Languages, frameworks, tools & APIs' },
  { icon: '💡', value: 'Active', label: 'LeetCode', desc: 'Consistent competitive problem solving' },
]

const EXPERTISE = [
  { area: 'Software Engineering', items: 'Architecture · System Design · REST APIs', color: 'var(--accent)' },
  { area: 'MERN Stack', items: 'MongoDB · Express.js · React.js · Node.js', color: '#38bdf8' },
  { area: 'Machine Learning', items: 'Models · Predictions · Data Science', color: '#a78bfa' },
  { area: 'Data Analyst', items: 'Data Processing · Visualization · Insights', color: '#f472b6' },
  { area: 'Software Testing', items: 'Unit Testing · Integration · Debugging', color: '#facc15' },
]

const SPOKEN_LANGUAGES = [
  { lang: 'Tamil', level: 'Native', color: '#f472b6' },
  { lang: 'English', level: 'Fluent', color: '#38bdf8' },
  { lang: 'Malayalam', level: 'Fluent', color: '#a78bfa' },
  { lang: 'Hindi', level: 'Manageable', color: '#fb923c' },
  { lang: 'Telugu', level: 'Beginner', color: '#6ee7f7' },
]

function OverviewTiltCard({ s, i, inView }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 + i * 0.07 }}
      whileHover={{ scale: 1.05, filter: 'brightness(1.15)', zIndex: 10 }}
    >
      <div className={styles.cardGlow} />
      <div className={styles.icon}>{s.icon}</div>
      <div className={styles.value}>{s.value}</div>
      <div className={styles.label}>{s.label}</div>
      <div className={styles.desc}>{s.desc}</div>
    </motion.div>
  )
}

export default function Overview() {
  const [ref, inView] = useInView(0.08)

  return (
    <section className={styles.section} id="overview" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// overview</span>
          <h2 className="section-title">At a <span className="glow-text">Glance</span></h2>
          <p className={styles.sub}>A quick snapshot of my work, skills, and track record.</p>
        </motion.div>

        <div className={styles.grid}>
          {STATS.map((s, i) => (
            <OverviewTiltCard key={s.label} s={s} i={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className={styles.expertiseBar}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={styles.expertiseTitle}>Core Expertise</div>
          <div className={styles.expertiseGrid}>
            {EXPERTISE.map((e, i) => (
              <motion.div 
                key={e.area} 
                className={styles.expertiseItem}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.03, originX: 0 }}
              >
                <span className={styles.expertiseArea} style={{ color: e.color }}>{e.area}</span>
                <span className={styles.expertiseItems}>{e.items}</span>
              </motion.div>
            ))}
          </div>

          <div className={styles.langGrid}>
            {SPOKEN_LANGUAGES.map((lang, i) => (
              <motion.div
                key={lang.lang}
                className={styles.langChip}
                style={{ '--c': lang.color }}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.8 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.05 }}
              >
                <span className={styles.langName}>{lang.lang}</span>
                <span className={styles.langLevel}>{lang.level}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
