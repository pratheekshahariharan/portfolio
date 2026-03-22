import { motion } from 'framer-motion'
import styles from './Loader.module.css'

export default function Loader({ onComplete }) {
  return (
    <motion.div
      className={styles.loaderArea}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.logoBox}
          initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
        >
          <span className={styles.accent}>P</span>
          <span className={styles.base}>H</span>
        </motion.div>
        <motion.div
          className={styles.progressLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  )
}
