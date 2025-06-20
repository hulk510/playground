'use client'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import { useEffect, useRef } from 'react'

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particlesArray = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
    }))

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particlesArray) {
        particle.x += particle.dx
        particle.y += particle.dy

        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className='pointer-events-none fixed inset-0 -z-10 opacity-40'
    />
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.section
      ref={ref}
      className='relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden py-20'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ParticlesBackground />

      <motion.div
        className='relative z-10 px-4 text-center'
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='mb-6'
        >
          <h1 className='mb-2 text-3xl font-bold md:text-4xl'>Haruka Daddy</h1>
          <h2 className='text-primary mb-4 text-4xl font-bold md:text-6xl'>
            Full Stack Engineer
          </h2>
          <div className='text-muted-foreground mb-4 flex items-center justify-center gap-2'>
            <MapPin className='h-4 w-4' />
            <span>Tokyo, Japan</span>
          </div>
        </motion.div>

        <motion.div
          className='text-muted-foreground mb-8 flex flex-col items-center gap-2'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className='flex items-center gap-2'>
            <Mail className='h-4 w-4' />
            <span>contact@haruka.dad</span>
          </div>
          <div className='flex items-center gap-2'>
            <Phone className='h-4 w-4' />
            <span>+81 90-XXXX-XXXX</span>
          </div>
        </motion.div>

        <motion.p
          className='text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I'm a full stack engineer based in Tokyo, Japan. I specialize in
          building high-quality web applications with a focus on performance and
          user experience.
        </motion.p>

        <motion.div
          className='flex flex-wrap justify-center gap-4'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Twitter, href: '#', label: 'Twitter' },
            { icon: Globe, href: '#', label: 'Website' },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant='outline'
                size='icon'
                className='group relative overflow-hidden border-none'
                aria-label={item.label}
              >
                <motion.div
                  className='from-primary/20 to-primary/10 absolute inset-0 bg-gradient-to-r'
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <item.icon className='relative z-10 h-5 w-5' />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
