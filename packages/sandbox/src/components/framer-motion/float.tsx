import { motion } from 'framer-motion';
import Image from 'next/image';
import sticker from './sticker.png';

// MEMO: なぜかうまく影が表示できないな。
export function FloatAnimation() {
  return (
    <div className='flex w-120 h-[300px] flex-col'>
      {/* transitionでduration入れてるとwhileTapとかもそれに合わさるみたい。 */}
      <motion.div
        className='w-40 h-40'
        initial={{ y: -50 }}
        whileInView={{ y: [-150, -50, -150] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 12,
          ease: 'easeInOut',
          type: 'tween',
        }}
      >
        <motion.div
          whileInView={{ scale: [0.9, 1, 0.95], rotate: [5, -3, -10] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <Image src={sticker} priority alt='sticker' className='w-40 h-40' />
        </motion.div>
      </motion.div>
      {/* 影を作成 */}
      <motion.div
        className='bg-gray-400 w-16 h-1 rounded-full shadow-lg opacity-80 blur-sm m-auto'
        initial={{ y: -100 }}
        whileInView={{ scaleX: [0.5, 1.4, 0.5], scaleY: [0.5, 1, 0.5] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 12,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
