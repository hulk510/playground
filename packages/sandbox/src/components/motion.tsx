import { motion } from 'framer-motion';

export function MotionExample() {
  return (
    <motion.div
      className='bg-blue-500 font-bold'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>motion</h1>
    </motion.div>
  );
}
