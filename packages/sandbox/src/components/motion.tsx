'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import './motion.css';

export function MotionExample() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-100, 0, 100], [0.5, 1, 2]); // ポイントでスケールが変わる

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);
  return (
    <>
      <motion.div
        className='bg-blue-500 font-bold text-white p-4 rounded-lg shadow-lg'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 3 }}
        exit={{ opacity: 0 }}
      >
        <h1>Please Hover!!</h1>
      </motion.div>
      <motion.div
        className='bg-red-500 font-bold text-white p-4 rounded-lg shadow-lg'
        whileTap={{ scale: 0.9 }}
        drag='x'
        dragConstraints={{ left: -100, right: 100 }}
      >
        <h1>Tap or Drag</h1>
      </motion.div>
      <motion.div
        // initial={{ x: 0 }}
        // animate={{ x: 100 }}
        whileInView={{ x: 100 }} // スクロールしたら表示とかができる
      >
        while in view
      </motion.div>
      <motion.div drag='x' style={{ x, scale }}>
        Motion Values on Drag x Example
      </motion.div>
      <div className='flex flex-col justify-center items-center mt-4'>
        <button
          type='button'
          className='switch'
          data-ison={isOn}
          onClick={toggleSwitch}
        >
          <motion.div className='handle' layout transition={spring} />
        </button>
        <p className='w-64'>
          This is css flex start and end with framer motion.
          cssが変わる時のアニメーションをlayoutを指定することでつけられる。
        </p>
      </div>
    </>
  );
}

export function MotionExample2() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3 }}
      >
        <p className='font-bold text-xl'>テスト</p>
      </motion.div>
      <div className='flex flex-col items-center gap-4 mt-6'>
        <motion.div
          className='w-20 h-20 bg-purple-500 rounded-full'
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 360],
            borderRadius: ['0%', '0%', '50%', '50%', '20%'],
            x: [0, 0, 100, 100, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        <h2>Repeat and Key Frames Motion</h2>
      </div>
    </>
  );
}

export function MotionExample3() {
  return <div>test</div>;
}

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};
