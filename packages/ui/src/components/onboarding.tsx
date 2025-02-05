import { CheckCircledIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

export function Onboarding() {
  return (
    <div className='ui-flex ui-items-center ui-gap-2'>
      <motion.div
        animate={{
          // x: [0, 0, 0, 50],
          scale: [1, 0.8, 1, 1],
          rotate: [0, 15, 90, 360],
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          times: [0, 0.1, 0.2, 0.6],
        }}
      >
        <CheckCircledIcon className='ui-w-8 ui-h-8 lg:ui-w-16 lg:ui-h-16 ui-text-primary' />
      </motion.div>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 1.6,
          ease: 'easeInOut',
        }}
      >
        <h1 className='ui-text-5xl ui-font-bold ui-drop-shadow-md lg:ui-text-[6rem]'>
          Playground
        </h1>
      </motion.div>
    </div>
  )
}
