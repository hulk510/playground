'use client';
import { MotionExample, MotionExample2, MotionExample3 } from '@repo/sandbox';

export default function Page(): JSX.Element {
  return (
    <div className='flex items-center justify-center h-[100vh] flex-col gap-4'>
      <h1>Playground</h1>
      <MotionExample />
      <MotionExample2 />
      <MotionExample3 />
    </div>
  );
}
