import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './Cursor.module.css'

export default function Cursor() {
  const [isMobile, setIsMobile] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Check if device is touch based
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true)
      return
    }

    const mouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', mouseMove)
    return () => window.removeEventListener('mousemove', mouseMove)
  }, [cursorX, cursorY])

  if (isMobile) return null

  return (
    <>
      {/* Small exact dot */}
      <motion.div 
        className={styles.dot}
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Spring trailing ring */}
      <motion.div
        className={styles.ring}
        style={{ x: smoothX, y: smoothY }}
      />
    </>
  )
}
