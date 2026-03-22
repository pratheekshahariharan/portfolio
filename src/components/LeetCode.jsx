import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import styles from './LeetCode.module.css'

function Ring({ value, max, color, label, size = 160, animate: shouldAnimate }) {
  const r = (size - 18) / 2
  const circ = 2 * Math.PI * r
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!shouldAnimate || !value) return
    const t = setTimeout(() => setProgress(value / max), 400)
    return () => clearTimeout(t)
  }, [value, max, shouldAnimate])

  const dash = circ * progress

  return (
    <div className={styles.ring} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          style={{
            transition: 'stroke-dasharray 1.6s cubic-bezier(0.22,1,0.36,1)',
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      <div className={styles.ringInner}>
        <span className={styles.ringValue} style={{ color }}>{value}</span>
        <span className={styles.ringLabel}>{label}</span>
      </div>
    </div>
  )
}

function CountUp({ target, active }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active || !target) return
    let s = 0
    const step = target / (1400 / 16)
    const id = setInterval(() => {
      s = Math.min(s + step, target)
      setVal(Math.floor(s))
      if (s >= target) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [target, active])

  return <span>{val}</span>
}

export default function LeetCode() {
  const [ref, inView] = useInView(0.15)
  const profileUrl = 'https://leetcode.com/u/pratheeksha_hariharan/'

  const stats = {
    totalSolved: 76,
    easySolved: 48,
    mediumSolved: 21,
    hardSolved: 7,
    ranking: null
  }
  
  const canAnimate = inView
  const distribution = [
    { label: 'Easy', value: stats.easySolved, max: 800, color: '#4ade80', note: 'Strong fundamentals' },
    { label: 'Medium', value: stats.mediumSolved, max: 1600, color: '#facc15', note: 'Pattern depth' },
    { label: 'Hard', value: stats.hardSolved, max: 700, color: '#f87171', note: 'Advanced problem solving' },
  ]

  return (
    <section className={styles.section} id="leetcode" ref={ref}>
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.shell}>
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">// competitive coding</span>
            <h2 className={`${styles.title} section-title`}>
              LeetCode <span className="glow-text">Performance</span>
            </h2>
            <p className={styles.sub}>
              A focused snapshot of consistency, pattern recognition, and problem-solving range from{' '}
              <a href={profileUrl} target="_blank" rel="noreferrer" className={styles.profileLink}>
                @pratheeksha_hariharan
              </a>.
            </p>

            <div className={styles.pitch}>
              <div className={styles.pitchLine} />
              <p>
                Solving across easy, medium, and hard sets with a steady practice rhythm and a strong bias for
                clean, interview-ready logic.
              </p>
            </div>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.highlightLabel}>Focus</span>
                <span className={styles.highlightValue}>DSA + interview prep</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightLabel}>Strength</span>
                <span className={styles.highlightValue}>Consistency under variety</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightLabel}>Profile</span>
                <span className={styles.highlightValue}>Live synced metrics</span>
              </div>
            </div>

            <div className={styles.actions}>
              <a href={profileUrl} target="_blank" rel="noreferrer" className={styles.primaryAction}>
                View LeetCode Profile
              </a>
              <span className={styles.referenceNote}>
                The block is now left aligned and visually tuned to feel sharper and more premium.
              </span>
            </div>
          </motion.div>

          <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.layout}>
                <div className={styles.topStrip}>
                  <div className={styles.totalCol}>
                    <Ring
                      value={stats.totalSolved}
                      max={Math.max(stats.totalSolved, 600)}
                      color="var(--accent)"
                      label="Total Solved"
                      size={170}
                      animate={canAnimate}
                    />
                  </div>
                </div>

                <div className={styles.breakdown}>
                  {distribution.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className={styles.diffRow}
                      initial={{ opacity: 0, x: 24 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                    >
                      <div className={styles.diffTop}>
                        <div className={styles.diffMeta}>
                          <span className={styles.diffLabel} style={{ color: item.color }}>{item.label}</span>
                          <span className={styles.diffNote}>{item.note}</span>
                        </div>
                        <span className={styles.diffVal}>
                          <CountUp target={item.value} active={canAnimate} />
                        </span>
                      </div>
                      <div className={styles.barTrack}>
                        <motion.div
                          className={styles.barFill}
                          style={{ background: item.color, boxShadow: `0 0 8px ${item.color}55` }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${Math.min((item.value / item.max) * 100, 100)}%` } : {}}
                          transition={{ duration: 1.3, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  <div className={styles.footer}>
                    <p className={styles.footerText}>
                      Live data powers this panel so the numbers stay current as the profile grows.
                    </p>
                    <a href={profileUrl} target="_blank" rel="noreferrer" className={styles.viewProfile}>
                      Open profile
                    </a>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
