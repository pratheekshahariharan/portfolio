import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Overview from './components/Overview'
import Skills from './components/Skills'
import Projects from './components/Projects'
import LeetCode from './components/LeetCode'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Particles from './components/Particles'

export default function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  return (
    <>
      <Cursor />
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
          transformOrigin: '0%',
          zIndex: 9998,
        }}
        className="scroll-progress-bar"
      />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Particles />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Overview />
              <Skills />
              <Projects />
              <LeetCode />
              <Education />
              <Achievements />
              <Contact />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
