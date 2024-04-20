'use client';
import { MotionExample } from '@repo/sandbox';

export default function Page(): JSX.Element {
  return (
    <div className='flex'>
      <h1>Playground</h1>
      <MotionExample />
    </div>
  );
}
