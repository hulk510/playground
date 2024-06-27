import { motion } from 'framer-motion';
import Image from 'next/image';
import sticker from './sticker.png';

export function FloatAnimation() {
  return (
    <motion.div
      className='h-32 w-32'
      initial={{ y: 0 }}
      whileInView={{ y: [100, 0, 100] }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 12,
        ease: 'easeInOut',
        type: 'tween',
      }}
    >
      <motion.div
        whileInView={{ scale: [0.89, 1, 0.95], rotate: [10, -5, 10] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <Image src={sticker} priority alt='sticker' className='h-32 w-32' />
      </motion.div>
    </motion.div>
  );
}
