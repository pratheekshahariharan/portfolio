import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Achievements.module.css'

const ACHIEVEMENTS = [
  {
    icon: '🏆',
    category: 'Hackathon',
    title: 'Smart India Hackathon',
    desc: 'Successfully shortlisted for national-level SIH submission by securing top rank in a highly competitive internal screening across multiple project teams.',
    color: '#facc15',
  },
  {
    icon: '🥇',
    category: 'Hackathon',
    title: 'Axios Inter-College Tech Hackathon',
    desc: 'Rapidly designed and implemented a real-time web solution, collaborating with a cross-functional team to deliver a fully functional and scalable prototype.',
    color: '#f472b6',
  },
  {
    icon: '📜',
    category: 'Certification',
    title: 'Learn C++ Programming – Beginner to Advance',
    desc: 'Completed comprehensive C++ course covering advanced OOP, STL, templates, memory management, and competitive programming patterns.',
    color: '#6ee7f7',
    platform: 'Udemy',
  },
  {
    icon: '💻',
    category: 'Bootcamp',
    title: 'Software Engineering Bootcamp',
    desc: 'Industry-oriented intensive covering scalable architectures, RESTful backend APIs, and real-world engineering lifecycle practices.',
    color: '#4ade80',
    platform: 'NoviTech R&D',
  },
]

export default function Achievements() {
  const [ref, inView] = useInView(0.1)

  return (
    <section className={styles.section} id="achievements" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// achievements</span>
          <h2 className="section-title">Certifications &<br /><span className="glow-text">Milestones</span></h2>
        </motion.div>

        <div className={styles.grid}>
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              className={styles.card}
              style={{ '--ac': a.color }}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.05, filter: 'brightness(1.1)' }}
            >
              <div className={styles.glow} />
              <div className={styles.topRow}>
                <span className={styles.iconWrap}>{a.icon}</span>
                <span className={styles.catTag} style={{ color: a.color, borderColor: `${a.color}33`, background: `${a.color}11` }}>
                  {a.platform || a.category}
                </span>
              </div>
              <span className={styles.cat}>{a.category}</span>
              <h3 className={styles.title}>{a.title}</h3>
              <p className={styles.desc}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
