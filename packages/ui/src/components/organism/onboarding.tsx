import { motion } from 'framer-motion';
import Image from 'next/image';
import checkIcon from '../../../public/assets/check.svg';

export function Onboarding() {
  return (
    <div className='flex items-center justify-center h-[100vh] flex-col gap-4'>
      <div className='flex items-center gap-2'>
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
          <Image
            src={checkIcon}
            priority
            alt='check icon.'
            width={80}
            height={80}
          />
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
          <h1 className='text-[6rem] font-bold drop-shadow-md'>Playground</h1>
        </motion.div>
      </div>
      {/* <p>Hello My New Playground!!</p> */}
    </div>
  );
}
