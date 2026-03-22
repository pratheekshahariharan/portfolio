import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './Contact.module.css'

const CONTACTS = [
  {
    label: 'Email',
    value: 'pratheekshahariharan05@gmail.com',
    href: 'mailto:pratheekshahariharan05@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: '#6ee7f7',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/pratheeksha-hariharan',
    href: 'https://linkedin.com/in/pratheeksha-hariharan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#a78bfa',
  },
  {
    label: 'GitHub',
    value: 'github.com/pratheekshahariharan',
    href: 'https://github.com/pratheekshahariharan',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    color: '#f472b6',
  },
  {
    label: 'Phone',
    value: '+91 63797 90942',
    href: 'tel:+916379790942',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    color: '#4ade80',
  },
]

export default function Contact() {
  const [ref, inView] = useInView(0.1)

  return (
    <section className={styles.section} id="contact" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <div className={styles.header}>
            <span className="section-label">// contact</span>
            <h2 className="section-title">Let's <span className="glow-text">Connect</span></h2>
            <p className={styles.sub}>
              Have a project, opportunity, or just want to say hello?<br />
              Drop me a message — I respond quickly.
            </p>
          </div>

          <div className={styles.grid}>
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                className={styles.card}
                style={{ '--cc': c.color }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.cardGlow} />
                <div className={styles.icon} style={{ color: c.color }}>{c.icon}</div>
                <span className={styles.cardLabel}>{c.label}</span>
                <span className={styles.cardValue}>{c.value}</span>
                <span className={styles.arrow}>→</span>
              </motion.a>
            ))}
          </div>

        </motion.div>

      </div>

      <footer className={styles.footer}>
        <p>Built with React + Framer Motion · © 2025 Pratheeksha H</p>
      </footer>
    </section>
  )
}
