'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? '', {
  transports: ['websocket'],
});

export default function ImageUploader({
  srcUrl,
}: {
  srcUrl: string;
}): JSX.Element {
  const [image, setImage] = useState<string>(srcUrl);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.IO connection opened');
    });
    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });
    socket.on('image', (image) => {
      setImage(image);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('image');
    };
  }, []);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    await fetch('http://localhost:3000/api/images', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className='relative h-24 w-24'>
      <div className='relative h-full w-full'>
        <Image
          src={image}
          alt='Uploaded'
          className='h-full w-full object-cover'
          width='100'
          height='100'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100'>
          <label className='cursor-pointer rounded bg-white px-2 py-1'>
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
