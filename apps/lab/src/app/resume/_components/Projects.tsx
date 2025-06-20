'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getRandomGradient, gradients } from '@/utils/colors'
import { motion } from 'framer-motion'
import { Github, Link } from 'lucide-react'

const projects = [
  {
    title: 'E-commerce Platform',
    description:
      'Built a full-stack e-commerce platform with Next.js, handling 10K+ daily users',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
    links: {
      github: 'https://github.com/username/project',
      live: 'https://project.com',
    },
    highlights: [
      'Implemented real-time inventory management',
      'Integrated multiple payment providers',
      'Achieved 99.9% uptime',
    ],
  },
  {
    title: 'AI-Powered Chat Application',
    description:
      'Developed a real-time chat application with AI-powered features',
    tech: ['React', 'Node.js', 'Socket.io', 'OpenAI', 'MongoDB'],
    links: {
      github: 'https://github.com/username/project',
      live: 'https://project.com',
    },
    highlights: [
      'Implemented WebSocket for real-time communication',
      'Integrated OpenAI for smart responses',
      'Handled 1000+ concurrent users',
    ],
  },
  {
    title: 'Developer Portfolio Generator',
    description: 'Created an automated portfolio generator for developers',
    tech: ['Vue.js', 'GraphQL', 'GitHub API', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/username/project',
      live: 'https://project.com',
    },
    highlights: [
      'Automated portfolio generation from GitHub data',
      'Implemented custom theming system',
      'Used by 500+ developers',
    ],
  },
]

function Tag({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className='inline-block rounded-full px-3 py-1 text-sm font-medium text-white'
      style={{
        background: getRandomGradient(index),
      }}
    >
      {name}
    </motion.span>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const gradientPair = gradients[index % gradients.length] ?? [
    '#000000',
    '#ffffff',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      <Card className='bg-background/40 h-full overflow-hidden pt-0 border-none backdrop-blur-sm'>
        <div
          className='h-15 w-full'
          style={{
            background: `linear-gradient(to right, ${gradientPair[0]}, ${gradientPair[1]})`,
          }}
        />
        <CardContent className='p-6'>
          <h3 className='mb-2 text-xl font-bold'>{project.title}</h3>
          <p className='text-muted-foreground mb-4'>{project.description}</p>

          <div className='mb-4 flex flex-wrap gap-2'>
            {project.tech.map((tech) => (
              <Tag key={tech} name={tech} index={index} />
            ))}
          </div>

          <ul className='mb-4 space-y-2'>
            {project.highlights.map((highlight, i) => (
              <motion.li
                key={highlight}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className='flex items-start gap-2'
              >
                <span
                  className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full'
                  style={{ backgroundColor: gradientPair[0] }}
                />
                <span className='text-sm'>{highlight}</span>
              </motion.li>
            ))}
          </ul>

          <div className='flex gap-2'>
            <Button variant='outline' size='sm' className='gap-2'>
              <Github className='h-4 w-4' />
              Code
            </Button>
            <Button variant='outline' size='sm' className='gap-2'>
              <Link className='h-4 w-4' />
              Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className='py-20'>
      <motion.h2
        className='mb-16 text-center text-3xl font-bold'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Featured Projects
      </motion.h2>

      <div className='mx-auto max-w-6xl px-4'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
