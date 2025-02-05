import { Button } from '@repo/ui/ui/button'
import { Card, CardContent } from '@repo/ui/ui/card'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { Lightbulb, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function FallingCard() {
  const [isVisible, setIsVisible] = useState(true)
  const controls = useAnimation()

  const handleClick = async () => {
    await controls.start({
      y: 1000,
      rotate: 720,
      scale: 0,
      transition: { duration: 1.5, type: 'spring' },
    })
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <motion.div
      animate={controls}
      initial={{ y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 0px 8px rgba(255,255,255,0.5)',
      }}
      onClick={handleClick}
      className='cursor-pointer'
    >
      <Card className='w-64 bg-gradient-to-br from-pink-500 to-purple-500'>
        <CardContent className='p-6 text-white'>
          <h3 className='mb-2 text-lg font-semibold'>Click me!</h3>
          <p>I'll fall and disappear 👋</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LightBulb() {
  const [isOn, setIsOn] = useState(false)

  return (
    <div className='relative'>
      <motion.div
        className='absolute inset-0 bg-yellow-300 blur-3xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: isOn ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOn(!isOn)}
        className={`rounded-full p-8 ${
          isOn ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-700 text-gray-300'
        }`}
      >
        <Lightbulb size={48} />
      </motion.button>
    </div>
  )
}

function TrafficLight() {
  const [activeLight, setActiveLight] = useState<'red' | 'yellow' | 'green'>(
    'red',
  )

  useEffect(() => {
    const sequence = ['red', 'green', 'yellow'] as const
    const currentIndex = sequence.indexOf(activeLight)
    const timer = setTimeout(() => {
      setActiveLight(sequence[(currentIndex + 1) % sequence.length])
    }, 3000)
    return () => clearTimeout(timer)
  }, [activeLight])

  return (
    <div className='space-y-6 rounded-3xl bg-gray-800 p-6 shadow-lg'>
      {(['red', 'yellow', 'green'] as const).map((color) => (
        <motion.div
          key={color}
          className={`h-20 w-20 rounded-full ${
            color === 'red'
              ? 'bg-red-500'
              : color === 'yellow'
                ? 'bg-yellow-400'
                : 'bg-green-500'
          }`}
          initial={{ opacity: 0.3 }}
          animate={{
            opacity: activeLight === color ? 1 : 0.3,
            scale: activeLight === color ? 1.1 : 1,
            boxShadow: activeLight === color ? `0 0 20px ${color}` : 'none',
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  )
}

function DodgingButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const button = buttonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const buttonCenterX = rect.x + rect.width / 2
      const buttonCenterY = rect.y + rect.height / 2

      const deltaX = e.clientX - buttonCenterX
      const deltaY = e.clientY - buttonCenterY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < 100) {
        const angle = Math.atan2(deltaY, deltaX)
        const newX = Math.cos(angle + Math.PI) * 50
        const newY = Math.sin(angle + Math.PI) * 50
        x.set(newX)
        y.set(newY)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <motion.div style={{ x, y }}>
      <Button
        ref={buttonRef}
        className='rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-white shadow-lg'
      >
        Try to catch me!
      </Button>
    </motion.div>
  )
}

function ElectricityEffect() {
  return (
    <div className='relative h-64 w-64'>
      <svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
        <title>Electricity Effect</title>
        <defs>
          <filter id='electricity'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.01'
              numOctaves='3'
              result='noise'
            />
            <feDisplacementMap
              in='SourceGraphic'
              in2='noise'
              scale='10'
              xChannelSelector='R'
              yChannelSelector='G'
              result='displacement'
            />
          </filter>
        </defs>
        <rect width='100%' height='100%' filter='url(#electricity)' />
      </svg>
      <motion.div
        className='absolute inset-0 flex items-center justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <Zap size={64} className='text-yellow-400' />
      </motion.div>
    </div>
  )
}

export default function PlayfulComponents() {
  return (
    <section className='py-20'>
      <motion.h2
        className='mb-16 text-center text-3xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Interactive Elements
      </motion.h2>

      <div className='mx-auto max-w-4xl px-4'>
        <div className='grid grid-cols-1 place-items-center gap-16 md:grid-cols-2'>
          <FallingCard />
          <LightBulb />
          <TrafficLight />
          <DodgingButton />
          <ElectricityEffect />
        </div>
      </div>
    </section>
  )
}
