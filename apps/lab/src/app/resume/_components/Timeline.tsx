'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { getRandomGradient } from '@/utils/colors'

const experiences = [
  {
    year: '2023',
    title: 'Senior Full Stack Engineer',
    company: 'Tech Company A',
    description:
      'Leading development of modern web applications using Next.js and Go',
    icon: '🚀',
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    company: 'Tech Company B',
    description: 'Implemented clean architecture in Go backend services',
    icon: '✨',
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    company: 'Tech Company C',
    description: 'Specialized in React and TypeScript development',
    icon: '💫',
  },
  {
    year: '2020',
    title: 'Software Engineering Intern',
    company: 'Tech Company D',
    description: 'Developed internal tools using Node.js and React',
    icon: '🌟',
  },
  {
    year: '2019',
    title: 'Web Developer',
    company: 'Tech Company E',
    description: 'Built websites and web applications using Vue.js',
    icon: '🌠',
  },
]

function TimelineNode({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  const nodeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ['start end', 'center center'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05])
  const gradient = useMemo(() => getRandomGradient(index), [index])

  return (
    <motion.div
      ref={nodeRef}
      style={{ y, opacity, scale }}
      className='mb-24 last:mb-0'
    >
      <Card className='bg-background/40 relative overflow-hidden border-none backdrop-blur-sm'>
        <div
          className='absolute inset-0 opacity-10'
          style={{
            background: gradient,
          }}
        />
        <div className='relative p-8'>
          <div className='flex items-start gap-6'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 0.5 }}
              className='relative'
            >
              <div
                className='h-16 w-16 rounded-2xl p-0.5'
                style={{
                  background: gradient,
                }}
              >
                <div className='bg-background flex h-full w-full items-center justify-center rounded-2xl text-3xl'>
                  {experience.icon}
                </div>
              </div>
              <motion.div
                className='absolute inset-0 rounded-2xl'
                style={{
                  background: gradient,
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            <div className='flex-1'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className='mb-2 flex items-baseline gap-4'>
                  <h3
                    className='text-4xl font-bold'
                    style={{
                      background: gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {experience.year}
                  </h3>
                  <h4 className='text-2xl font-semibold'>{experience.title}</h4>
                </div>
                <p
                  className='mb-2 text-lg'
                  style={{
                    color: gradient,
                  }}
                >
                  {experience.company}
                </p>
                <p className='text-muted-foreground'>
                  {experience.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section className='relative py-20'>
      <motion.h2
        className='mb-16 text-center text-3xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Experience
      </motion.h2>

      <div className='mx-auto max-w-3xl px-4'>
        {experiences.map((exp, index) => (
          <TimelineNode key={exp.year} experience={exp} index={index} />
        ))}
      </div>
    </section>
  )
}
