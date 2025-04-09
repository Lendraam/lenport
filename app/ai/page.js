'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat, loading]);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const userMsg = { role: 'user', text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    const botMsg = { role: 'bot', text: data.response };
    setChat((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto rounded-2xl shadow-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-center">💬 AI Chat Assistant</h2>

      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 h-[300px] overflow-y-auto mb-4 scroll-smooth bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            } transition-all duration-300`}
          >
            <p
              className={`text-sm px-4 py-2 rounded-xl max-w-[80%] shadow ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
        {loading && <p className="text-sm italic text-center">Loading...</p>}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-2 flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tulis pertanyaan..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg font-medium transition-all shadow bg-blue-600 text-white hover:brightness-110"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
