'use client';
import { useEffect, useReducer } from 'react';
import { io } from 'socket.io-client';
import ImageUploader from './image-upload';

export type UploadImage = {
  url: string;
  x: number;
  y: number;
};

type Props = {
  images: UploadImage[];
};

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? '', {
  transports: ['websocket'],
});

export function Grid({ images }: Props) {
  // useReducerで画像を全て管理する
  const reducer = (state: UploadImage[], action: UploadImage) => {
    const newState = [...state];
    newState[action.y * 24 + action.x] = {
      ...action,
      url: action.url,
    };
    return newState;
  };
  const [state, dispatch] = useReducer(reducer, images);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket.IO connection opened');
    });
    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });
    socket.on('image', (image: { x: string; y: string; url: string }) => {
      dispatch({ ...image, x: Number(image.x), y: Number(image.y) });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('image');
    };
  }, [dispatch]);

  return (
    <div className='overflow-auto'>
      <div className='grid-cols-24 grid w-[1200px] lg:w-[2400px]'>
        {state.map((image, index) => (
          <div key={index} className='relative'>
            <div className='relative h-0 w-full pb-[100%]'>
              <ImageUploader
                x={image.x}
                y={image.y}
                src={image.url}
                onImageUpload={(image) => {
                  socket.emit('image', {
                    x: image.x,
                    y: image.y,
                    url: image.url,
                  });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
