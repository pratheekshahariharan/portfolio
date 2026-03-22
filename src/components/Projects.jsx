import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    title: 'Rent Management System',
    desc: 'A comprehensive, scalable web architecture with role-based Admin and User portals for rent management, maintenance tracking, and document handling. Features WhatsApp API–based OTP authentication and real-time rental status updates.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API', 'WhatsApp API'],
    github: 'https://github.com/pratheekshahariharan/RENTAPP',
    color: '#6ee7f7',
    num: '01',
  },
  {
    title: 'Intelligent Intrusion Detection System',
    desc: 'ML-based intrusion detection using CICIDS-2017 dataset with XGBoost-driven feature selection. Achieved 99% accuracy with XGBoost and Random Forest. Integrated Gemini API to auto-generate AI-driven security reports, reducing manual analysis effort by 40%.',
    tech: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'NumPy', 'Gemini API', 'Gradio'],
    github: 'https://github.com/pratheekshahariharan/Intelligent-Intrusion-Detection-System',
    color: '#a78bfa',
    num: '02',
  },
  {
    title: 'Local Meet – LAN Video Conferencing',
    desc: 'A LAN-based video conferencing web app supporting 5+ concurrent users without internet using WebRTC peer-to-peer streaming. Features waiting room, chat, reactions, screen sharing, participant controls, and host-based access management.',
    tech: ['React.js', 'WebRTC', 'Socket.IO', 'Node.js'],
    github: 'https://github.com/pratheekshahariharan/MEET',
    color: '#f472b6',
    num: '03',
  },
]

function ProjectCard({ project, index, inView, onClick }) {
  const cardRef = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg'])

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
      layoutId={project.title}
      ref={cardRef}
      className={styles.card}
      style={{
        '--project-color': project.color,
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        cursor: 'pointer'
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onClick={() => window.open(project.github, "_blank")}
    >
      <div className={styles.cardGlow} />
      <div className={styles.cardTop}>
        <span className={styles.num}>{project.num}</span>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className={styles.ghLink}
          title="View on GitHub"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      </div>

      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.desc}</p>

      <div className={styles.tech}>
        {project.tech.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      <div className={styles.cardFoot}>
        <a href={project.github} target="_blank" rel="noreferrer" className={styles.viewBtn}>
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView(0.1)
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section className={styles.section} id="projects" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// projects</span>
          <h2 className="section-title">Things I've <span className="glow-text">Shipped</span></h2>
          <p className={styles.sub}>Production-ready projects built with real constraints and real goals.</p>
        </motion.div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) =>
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              inView={inView}
              onClick={null}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', padding: '2rem' }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={selectedProject.title}
              style={{ background: '#09090b', border: `1px solid ${selectedProject.color}`, borderRadius: '24px', padding: '3rem', maxWidth: '800px', width: '100%', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProject(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: selectedProject.color, fontFamily: 'var(--font-display)' }}>{selectedProject.title}</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text2)', marginBottom: '2.5rem' }}>{selectedProject.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
                {selectedProject.tech.map(t => <span key={t} style={{ padding: '0.5rem 1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', fontSize: '0.9rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{t}</span>)}
              </div>
              <a href={selectedProject.github} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: selectedProject.color, color: '#000', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                View Full Source <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
