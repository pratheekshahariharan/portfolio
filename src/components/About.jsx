import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './About.module.css'

const cards = [
  {
    icon: '01',
    title: 'What I Build',
    desc: 'Scalable software architectures, real-time data streaming, and intelligent ML pipelines built for enterprise use.',
    color: 'var(--accent)',
  },
  {
    icon: '02',
    title: 'How I Think',
    desc: 'Analytically and systematically. I break complex problems into clean modules, reliable APIs, and maintainable flows that are easier to scale.',
    color: 'var(--accent2)',
  },
  {
    icon: '03',
    title: 'What Drives Me',
    desc: 'I enjoy difficult engineering problems, product-minded implementation, and the kind of code that stays useful beyond demos and prototypes.',
    color: 'var(--accent3)',
  },
]

const metrics = [
  ['5+', 'Concurrent streams'],
  ['99%', 'ML accuracy'],
  ['End-to-End', 'System Architecture'],
]

export default function About() {
  const [ref, inView] = useInView(0.15)

  return (
    <section className={styles.section} id="about" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <span className="section-label">// about me</span>
          <h2 className={styles.title}>
            Building software that feels <span className="glow-text">clean, scalable, and real</span>
          </h2>
        </motion.div>

        <div className={styles.layout}>
          <motion.div
            className={styles.bio}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div className={styles.bioGlow} />
            <div className={styles.avatarWrap}>
              <motion.div 
                className={styles.avatar}
                initial={{ scale: 0.1, rotate: -45 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className={styles.avatarInner}>PH</div>
                <div className={styles.avatarRing} />
              </motion.div>
              <div className={styles.identity}>
                <h3 className={styles.bioName}>Pratheeksha Hariharan</h3>
                <p className={styles.bioDegree}>Integrated MSc Software Systems</p>
                <p className={styles.bioColl}>Coimbatore Institute of Technology</p>
              </div>
            </div>

            <div className={styles.story}>
              <p className={styles.bioText}>
                I work at the intersection of backend engineering and machine learning, building systems that are
                not only functional but production-minded.
              </p>
              <p className={styles.bioText}>
                From large-scale backend architectures to low-latency LAN video conferencing and ML-assisted security tooling,
                I enjoy turning complex requirements into software that feels stable and purposeful.
              </p>
            </div>

            <div className={styles.bioChips}>
              {['CGPA 8.3/10', 'Coimbatore, India', 'Backend + ML Focus'].map((c, i) => (
                <motion.span 
                  key={c} 
                  className={styles.chip}
                  initial={{ opacity: 0, scale: 0.5, y: 15 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ type: 'spring', bounce: 0.5, delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: 'var(--surface2)' }}
                >
                  {c}
                </motion.span>
              ))}
            </div>

            <div className={styles.metrics}>
              {metrics.map(([value, label], index) => (
                <motion.div
                  key={label}
                  className={styles.metric}
                  initial={{ opacity: 0, scale: 0.8, y: 25 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.6 + index * 0.15 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <span className={styles.metricValue}>{value}</span>
                  <span className={styles.metricLabel}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className={styles.cards}>
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                className={styles.card}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 130, damping: 15, delay: 0.4 + i * 0.2 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardIcon} style={{ '--c': card.color }}>{card.icon}</div>
                  <div className={styles.cardLine} style={{ '--c': card.color }} />
                </div>
                <h4 className={styles.cardTitle}>{card.title}</h4>
                <p className={styles.cardDesc}>{card.desc}</p>
              </motion.div>
            ))}


          </div>
        </div>
      </div>
    </section>
  )
}
