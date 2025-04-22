import React, { use, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const Index = () => {
  const socketRef = useRef(null);
  const [userId,setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      withCredentials: true,
    });

    socketRef.current.on('connect', () => {
      setUserId(socketRef.current.id);
      console.log('✨ Connected:', socketRef.current.id);
    });

    console.log('✨ Socket ID:', userId);

    socketRef.current.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const data = {
      user: userId, // You can replace with dynamic username
      message,
    };

    socketRef.current.emit('sendMessage', data);
    setMessage('');
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-pink-50 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-[#000000]">💌 Chat with Besties</h2>
      
      <div className="h-64 overflow-y-auto bg-white p-3 rounded border mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1 flex">
            <strong className="text-gray-900">{msg.user === userId ? 'You' : msg.user}  :</strong>
            <p className='text-gray-900'>{msg.message}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-grow p-2 text-[#000000] border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your cute message 💬"
        />
        <button
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Index;
