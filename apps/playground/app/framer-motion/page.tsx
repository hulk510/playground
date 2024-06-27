'use client';
import {
  FloatAnimation,
  MotionExample,
  MotionExample2,
  MotionExample3,
} from '@repo/sandbox';

export default function Page(): JSX.Element {
  return (
    <div className='flex h-[100vh] flex-col items-center justify-center gap-4'>
      <h1>Playground</h1>
      <MotionExample />
      <MotionExample2 />
      <MotionExample3 />
      <FloatAnimation />
    </div>
  );
}
