import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Skills.module.css'

const SKILLS = [
  { name: 'Python', color: '#3b82f6', icon: 'python' },
  { name: 'C++', color: '#6ee7f7', icon: 'cpp' },
  { name: 'Java', color: '#f97316', icon: 'java' },
  { name: 'JavaScript', color: '#facc15', icon: 'js' },
  { name: 'React.js', color: '#38bdf8', icon: 'react' },
  { name: 'Node.js', color: '#4ade80', icon: 'nodejs' },
  { name: 'Express.js', color: '#a3a3a3', icon: 'express' },
  { name: 'MongoDB', color: '#4ade80', icon: 'mongodb' },
  { name: 'MySQL', color: '#38bdf8', icon: 'mysql' },
  { name: 'Tailwind CSS', color: '#22d3ee', icon: 'tailwind' },
  { name: 'HTML5', color: '#fb923c', icon: 'html' },
  { name: 'CSS3', color: '#fb923c', icon: 'css' },
  { name: 'Scikit-learn', color: '#f97316', icon: 'sklearn' },
  { name: 'NumPy', color: '#38bdf8', icon: 'numpy' },
  { name: 'Matplotlib', color: '#f472b6', icon: 'matlab' },
  { name: 'Git', color: '#f97316', icon: 'git' },
  { name: 'GitHub', color: '#e2e8f0', icon: 'github' },
  { name: 'Postman', color: '#f97316', icon: 'postman' },
]

const row1 = SKILLS.slice(0, 9)
const row2 = SKILLS.slice(9)

function SkillCard({ skill }) {
  return (
    <div className={styles.skillCard} style={{ '--skill-color': skill.color, padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img src={`https://skillicons.dev/icons?i=${skill.icon}`} alt={skill.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
      <span className={styles.skillName}>{skill.name}</span>
    </div>
  )
}

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.4 } }
}

function MarqueeRow({ skills, reverse, inView }) {
  const doubled = [...skills, ...skills]
  return (
    <div className={styles.marqueeWrap}>
      <motion.div 
        className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ''}`}
        variants={staggerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {doubled.map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <SkillCard skill={s} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView(0.1)

  return (
    <section className={styles.section} id="skills" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// tech stack</span>
          <h2 className="section-title">Skills & <span className="glow-text">Technologies</span></h2>
          <p className={styles.sub}>Technologies I use to build, ship, and scale.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        <MarqueeRow skills={row1} reverse={false} inView={inView} />
        <div style={{ height: '1rem' }} />
        <MarqueeRow skills={row2} reverse={true} inView={inView} />
      </motion.div>
    </section>
  )
}
