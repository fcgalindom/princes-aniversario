import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

const heartColors = ['#ffd700', '#ffe033', '#ffcc00', '#ffa500', '#ffb300']

class HeartParticle {
  constructor(x, y, isBurst, width, height) {
    this.x = x ?? Math.random() * width
    this.y = y ?? height + Math.random() * 20
    this.size = Math.random() * 14 + 6
    this.color = heartColors[Math.floor(Math.random() * heartColors.length)]
    this.alpha = isBurst ? 1 : Math.random() * 0.7 + 0.3
    this.speedY = isBurst ? (Math.random() - 0.7) * 4 : Math.random() * 1.5 + 0.8
    this.speedX = isBurst ? (Math.random() - 0.5) * 4 : Math.sin(Math.random() * Math.PI) * 0.8
    this.wobble = Math.random() * Math.PI * 2
    this.wobbleSpeed = Math.random() * 0.05 + 0.02
    this.isBurst = isBurst
    this._w = width
    this._h = height
  }

  update() {
    this.y -= this.speedY
    this.wobble += this.wobbleSpeed
    this.x += this.speedX + Math.sin(this.wobble) * 0.5
    if (this.isBurst) {
      this.alpha -= 0.015
    } else if (this.y < -30) {
      this.y = this._h + 20
      this.x = Math.random() * this._w
      this.alpha = Math.random() * 0.7 + 0.3
    }
  }

  draw(ctx, disableBlur = false) {
    if (this.alpha <= 0) return
    ctx.save()
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    if (!disableBlur) {
      ctx.shadowColor = this.color
      ctx.shadowBlur = 12
    }
    const s = this.size
    ctx.beginPath()
    ctx.moveTo(this.x, this.y + s * 0.3)
    ctx.bezierCurveTo(this.x, this.y, this.x - s / 2, this.y, this.x - s / 2, this.y + s * 0.3)
    ctx.bezierCurveTo(this.x - s / 2, this.y + (s + s * 0.3) / 2, this.x, this.y + s, this.x, this.y + s)
    ctx.bezierCurveTo(this.x, this.y + s, this.x + s / 2, this.y + (s + s * 0.3) / 2, this.x + s / 2, this.y + s * 0.3)
    ctx.bezierCurveTo(this.x + s / 2, this.y, this.x, this.y, this.x, this.y + s * 0.3)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}

const HeartsCanvas = forwardRef(function HeartsCanvas(_, ref) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])

  useImperativeHandle(ref, () => ({
    spawnBurst(x, y, count = 20) {
      const canvas = canvasRef.current
      if (!canvas) return
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new HeartParticle(x, y, true, canvas.width, canvas.height))
      }
    },
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let rafId

    const isMobile = window.innerWidth <= 768 || navigator.maxTouchPoints > 0
    const initialCount = isMobile ? 12 : 35

    particlesRef.current = []
    for (let i = 0; i < initialCount; i++) {
      particlesRef.current.push(
        new HeartParticle(Math.random() * width, Math.random() * height, false, width, height)
      )
    }

    const interval = isMobile ? 1000 / 30 : 0
    let lastTime = 0

    function animate(time) {
      if (time - lastTime < interval) { rafId = requestAnimationFrame(animate); return }
      lastTime = time
      ctx.clearRect(0, 0, width, height)
      const list = particlesRef.current
      for (let i = list.length - 1; i >= 0; i--) {
        list[i].update()
        list[i].draw(ctx, isMobile)
        if (list[i].isBurst && list[i].alpha <= 0) list.splice(i, 1)
      }
      rafId = requestAnimationFrame(animate)
    }
    animate(0)

    function handleResize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function handleClick(e) {
      if (e.target.closest('.glass-btn') || e.target.closest('.glass-modal')) return
      for (let i = 0; i < 18; i++) {
        particlesRef.current.push(new HeartParticle(e.clientX, e.clientY, true, width, height))
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleClick)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleClick)
      particlesRef.current = []
    }
  }, [])

  return <canvas ref={canvasRef} id="hearts-canvas" />
})

export default HeartsCanvas
