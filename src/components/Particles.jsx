import { useEffect, useRef } from 'react'

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)
    
    // Mouse Interaction
    let mouse = { x: null, y: null, radius: 180 }
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    
    const handleMouseOut = () => {
      mouse.x = null
      mouse.y = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    // Increase particles for global web
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      baseX: 0,
      baseY: 0
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      
      particles.forEach((p) => {
        // Normal movement
        p.x += p.vx
        p.y += p.vy
        
        // Bounce off edges
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        
        // Interaction with mouse (magnetic repulsion/attraction)
        if (mouse.x != null) {
          let dx = mouse.x - p.x
          let dy = mouse.y - p.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < mouse.radius) {
            // Push particles slightly away from mouse
            const forceDirectionX = dx / distance
            const forceDirectionY = dy / distance
            const force = (mouse.radius - distance) / mouse.radius
            const directionX = forceDirectionX * force * 2
            const directionY = forceDirectionY * force * 2
            
            p.x -= directionX
            p.y -= directionY
            
            // Draw spider-web connection directly to the mouse cursor
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(110,231,247,${0.2 * force})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(110,231,247,${p.alpha})`
        ctx.fill()
      })

      // Draw web between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(110,231,247,${0.12 * (1 - d / 140)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        pointerEvents: 'none',
        opacity: 0.6
      }} 
    />
  )
}
