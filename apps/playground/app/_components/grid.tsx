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

export function Grid({ rows, cols, images }: Props) {
  return (
    <div className={`grid grid-rows-${rows} grid-cols-${cols}`}>
      {images.map((image, index) => (
        <div key={index} className='relative'>
          {/* TODO: ここにuploaderとimageがあった場合の表示 */}
          <ImageUploader
            // height={250}
            // width={250}
            srcUrl={image.src}
            // alt={image.alt}
          />
          <div className='absolute left-0 top-0 bg-black bg-opacity-50 p-1 text-xs text-white'>
            {`x: ${image.x}, y: ${image.y}`}
          </div>
        </div>
      ))}
    </div>
  );
}
