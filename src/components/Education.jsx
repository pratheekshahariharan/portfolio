import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Education.module.css'

const EDUCATION = [
  {
    degree: 'Integrated MSc Software Systems',
    institution: 'Coimbatore Institute of Technology',
    period: '2023 – Present',
    score: 'CGPA: 8.31/10 (Till 5th Sem)',
    desc: 'Pursuing an integrated master\'s program covering software engineering, distributed systems, algorithms, mathematics, and advanced machine learning.',
    color: 'var(--accent)',
    icon: '🎓',
    current: true,
  },
  {
    degree: 'Grade 12 – Science (Computer Science)',
    institution: 'G.R.G Matric Higher Secondary School',
    period: '2021 – 2023',
    score: 'Aggregate: 78.2%',
    desc: 'Completed higher secondary education with a strong foundation in mathematics, computer science, and sciences.',
    color: 'var(--accent2)',
    icon: '📚',
    current: false,
  },
]

export default function Education() {
  const [ref, inView] = useInView(0.1)

  return (
    <section className={styles.section} id="education" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// education</span>
          <h2 className="section-title">Academic <span className="glow-text">Journey</span></h2>
        </motion.div>

        <div className={styles.timeline}>
          {/* Animated line */}
          <motion.div
            className={styles.line}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22,1,0.36,1], delay: 0.3 }}
          />

          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className={styles.item}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.3 + i * 0.2 }}
            >
              <motion.div
                className={styles.node}
                style={{ background: edu.color, boxShadow: `0 0 20px ${edu.color}` }}
                animate={edu.current ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              />

              <motion.div 
                className={styles.card} 
                style={{ '--edu-color': edu.color }}
                whileHover={{ scale: 1.02, y: -5, boxShadow: `0 15px 35px ${edu.color}22` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {edu.current && (
                  <span className={styles.badge}>
                    <span className={styles.badgeDot} />
                    Currently Enrolled
                  </span>
                )}
                <div className={styles.icon}>{edu.icon}</div>
                <div className={styles.period}>{edu.period}</div>
                <h3 className={styles.degree}>{edu.degree}</h3>
                <p className={styles.institution}>{edu.institution}</p>
                <div className={styles.score}>{edu.score}</div>
                <p className={styles.desc}>{edu.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
