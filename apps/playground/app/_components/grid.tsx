import Image from 'next/image';
import ImageUploader from './image-upload';

type Image = {
  src: string;
  alt: string;
  x: number;
  y: number;
};

type Props = {
  images: Image[];
};

export function Grid({ images }: Props) {
  return (
    <div className='overflow-auto'>
      <div className='grid-cols-24 grid w-[1200px] lg:w-[2400px]'>
        {images.map((image, index) => (
          <div key={index} className='relative'>
            <div className='relative h-0 w-full pb-[100%]'>
              <ImageUploader x={image.x} y={image.y} src={image.src} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
