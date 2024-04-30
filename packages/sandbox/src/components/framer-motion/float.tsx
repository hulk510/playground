import { motion } from 'framer-motion';
import Image from 'next/image';
import sticker from './sticker.png';

// MEMO: なぜかうまく影が表示できないな。
export function FloatAnimation() {
  return (
    <div className='flex w-120 h-[300px] flex-col'>
      {/* transitionでduration入れてるとwhileTapとかもそれに合わさるみたい。 */}
      <motion.div
        className='w-32 h-32'
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
          <Image src={sticker} priority alt='sticker' className='w-32 h-32' />
        </motion.div>
      </motion.div>
      {/* 影を作成 */}
      <motion.div
        className='bg-gray-400 w-16 h-1 rounded-full shadow-lg opacity-80 blur-sm m-auto mt-28'
        whileInView={{ scaleX: [1.2, 0.7, 1.2], scaleY: [1, 0.6, 1] }}
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
