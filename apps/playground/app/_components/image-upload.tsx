'use client';
import { useToast } from '@repo/ui/shadcn/hooks/use-toast';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? '', {
  transports: ['websocket'],
});

export default function ImageUploader({
  src,
  x,
  y,
}: {
  src: string;
  x: number;
  y: number;
}): JSX.Element {
  const [image, setImage] = useState<string>(src);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.IO connection opened');
    });
    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });
    socket.on('image', (image) => {
      if (Number(image.x) !== x || Number(image.y) !== y) {
        return;
      }
      setImage(`/assets/${image.url}`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('image');
    };
  }, [x, y]);

  // server actionにできないかなー？
  // そのままformData保存する方が楽な気がする。知らんけど
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('x', String(x));
    formData.append('y', String(y));
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      socket.emit('image', data); // MEMO: 先にもうwebsocketで送ってから、保存したらいいのでは？保存はあくまでも次見る時にできてたらいいだけだし。
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
          src={image}
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
