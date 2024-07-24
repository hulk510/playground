'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? '', {
  transports: ['websocket'],
});

export default function Page(): JSX.Element {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onMessage(newMessage: string) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessage);
    };
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      socket.emit('message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type='text'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}
