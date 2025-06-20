'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getRandomGradient } from '@/utils/colors'

const technologies = {
  Frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Go', 'Clean Architecture', 'REST APIs'],
  'Tools & Others': ['Git', 'Docker', 'Bun', 'Hono', 'Prisma'],
}

function CategorySection({
  category,
  skills,
  index,
}: {
  category: string
  skills: string[]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className='min-w-[300px] flex-1'
    >
      <h3 className='text-primary mb-4 text-center text-xl font-semibold'>
        {category}
      </h3>
      <div className='grid grid-cols-2 gap-3'>
        {skills.map((skill, skillIndex) => (
          <SkillCard key={skill} name={skill} index={skillIndex} />
        ))}
      </div>
    </motion.div>
  )
}

function SkillCard({ name, index }: { name: string; index: number }) {
  const [gradient, setGradient] = useState('')

  useEffect(() => {
    setGradient(getRandomGradient(index))
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
      className='relative'
    >
      <Card className='p-4 border-none backdrop-blur-sm'>
        <div
          className='absolute inset-0 rounded-lg opacity-80'
          style={{ background: gradient }}
        />
        <div className='relative z-10'>
          <h4 className='text-sm font-medium text-white'>{name}</h4>
        </div>
      </Card>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section className='relative py-20'>
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='bg-primary/5 -top-250 -right-250 absolute h-[500px] w-[500px] rounded-full blur-3xl' />
        <div className='bg-primary/5 -bottom-250 -left-250 absolute h-[500px] w-[500px] rounded-full blur-3xl' />
      </div>

      <motion.h2
        className='mb-12 text-center text-3xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Tech Stack
      </motion.h2>

      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex flex-wrap justify-center gap-8'>
          {Object.entries(technologies).map(([category, skills], index) => (
            <CategorySection
              key={category}
              category={category}
              skills={skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
