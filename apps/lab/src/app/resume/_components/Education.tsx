'use client'
import { Card, CardContent } from '@/components/ui/card'
import { getRandomGradient } from '@/utils/colors'
import { motion } from 'framer-motion'

const education = [
  {
    degree: 'Master of Computer Science',
    school: 'Tokyo Institute of Technology',
    period: '2019 - 2021',
    description: 'Specialized in Distributed Systems and Cloud Computing',
    achievements: [
      'Published 2 papers on distributed systems',
      'Teaching Assistant for Advanced Web Development',
      'GPA: 3.8/4.0',
    ],
  },
  {
    degree: 'Bachelor of Engineering',
    school: 'University of Tokyo',
    period: '2015 - 2019',
    description: 'Major in Computer Science and Engineering',
    achievements: [
      'Graduated with Honors',
      'Led University Programming Club',
      'Completed internship at major tech company',
    ],
  },
]

export default function Education() {
  return (
    <section className='py-20'>
      <motion.h2
        className='mb-16 text-center text-3xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Education
      </motion.h2>

      <div className='mx-auto max-w-4xl px-4'>
        <div className='grid gap-8 md:grid-cols-2'>
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className='h-full border-none pt-0 overflow-hidden'>
                <div
                  className='h-2 w-full'
                  style={{ background: getRandomGradient(index) }}
                />
                <CardContent className='p-6'>
                  <h3 className='mb-1 text-xl font-bold'>{edu.degree}</h3>
                  <p className='text-primary mb-1 font-medium'>{edu.school}</p>
                  <p className='text-muted-foreground mb-4 text-sm'>
                    {edu.period}
                  </p>
                  <p className='text-muted-foreground mb-4'>
                    {edu.description}
                  </p>
                  <ul className='space-y-2'>
                    {edu.achievements.map((achievement, i) => (
                      <motion.li
                        key={achievement}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className='flex items-start gap-2'
                      >
                        <span className='bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full' />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
