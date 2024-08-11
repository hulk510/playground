import { useToast } from '@repo/ui/shadcn/hooks/use-toast';
import Image from 'next/image';
import { UploadImage } from './grid';

export default function ImageUploader({
  src,
  x,
  y,
  onImageUpload,
}: {
  src: string;
  x: number;
  y: number;
  onImageUpload: (image: UploadImage) => void;
}): JSX.Element {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const response = await fetch(
        `/api/images?filename=${file.name}&x=${x}&y=${y}`,
        {
          method: 'POST',
          body: file,
        },
      );

      const data = (await response.json()) as UploadImage;
      onImageUpload(data);
    } catch (error) {
      toast({
        title: `${error}`,
      });
    }
  };

  const { toast } = useToast();

  return (
    <div className='absolute left-0 top-0 h-full w-full object-cover'>
      <div className='relative h-full w-full'>
        <Image
          src={src}
          alt='Uploaded'
          className='h-full w-full object-contain'
          width='100'
          height='100'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
          <label className='cursor-pointer rounded border px-1 py-1 text-xs text-white hover:bg-gray-500'>
            Upload
            <input
              type='file'
              className='hidden'
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
