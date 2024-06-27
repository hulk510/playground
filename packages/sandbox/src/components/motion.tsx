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
        className='rounded-lg bg-blue-500 p-4 font-bold text-white shadow-lg'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 3 }}
        exit={{ opacity: 0 }}
      >
        <h1>Please Hover!!</h1>
      </motion.div>
      <motion.div
        className='rounded-lg bg-red-500 p-4 font-bold text-white shadow-lg'
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
      <div className='mt-4 flex flex-col items-center justify-center'>
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
        <p className='text-xl font-bold'>テスト</p>
      </motion.div>
      <div className='mt-6 flex flex-col items-center gap-4'>
        <motion.div
          className='h-20 w-20 rounded-full bg-purple-500'
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
