import Image from 'next/image';
import ImageUploader from './image-upload';

type Image = {
  src: string;
  alt: string;
  x: number;
  y: number;
};

type Props = {
  rows: number;
  cols: number;
  images: Image[];
};

export function Grid({ images }: Props) {
  return (
    <div className='overflow-auto'>
      <div className='grid w-[1200px] grid-cols-12'>
        {images.map((image, index) => (
          <div key={index} className='relative'>
            <div className='relative h-0 w-full pb-[100%]'>
              <ImageUploader x={image.x} y={image.y} src={image.src} />
            </div>
            <div className='absolute left-0 top-0 bg-black bg-opacity-50 p-1 text-xs text-white'>
              {`x: ${image.x}, y: ${image.y}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
