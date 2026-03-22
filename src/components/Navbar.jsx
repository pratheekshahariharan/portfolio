import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import styles from './Navbar.module.css'

const links = ['About','Overview','Skills','Projects','LeetCode','Education','Achievements','Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [active, setActive] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
    
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      let current = ''
      for (const l of links) {
        const el = document.getElementById(l.toLowerCase())
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = l
            break
          }
        }
      }
      if (current && current !== active) setActive(current)
    }
    
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [active])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
    >
      <div className={styles.inner}>
        <span className={styles.logo} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <span className={styles.logoAccent}>P</span>H
        </span>

        <ul className={styles.links}>
          {links.map((l, i) => (
            <motion.li key={l}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              style={{ position: 'relative' }}
            >
              <Magnetic strength={20}>
                <button 
                  className={styles.link} 
                  style={{ color: active === l ? 'var(--accent)' : 'inherit' }}
                  onClick={() => scrollTo(l)}
                >
                  {l}
                  {active === l && (
                    <motion.div 
                      layoutId="nav-underline" 
                      style={{ position: 'absolute', bottom: -4, left: '10%', right: '10%', height: 2, background: 'var(--accent)', borderRadius: 2 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              </Magnetic>
            </motion.li>
          ))}
        </ul>

        <div className={styles.rightActions}>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          
          <button className={styles.burger} onClick={() => setOpen(!open)} aria-label="menu">
            <span className={open ? styles.barOpen1 : styles.bar} />
            <span className={open ? styles.barOpen2 : styles.bar} />
            <span className={open ? styles.barOpen3 : styles.bar} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className={styles.mobile}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(l => (
              <button key={l} className={styles.mobileLink} onClick={() => scrollTo(l)}>{l}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
