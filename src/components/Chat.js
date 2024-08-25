import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is an AI response.", sender: 'ai' }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chat-section">
      {messages.map((msg, index) => (
        <ChatMessage key={index} text={msg.text} sender={msg.sender} />
      ))}
      <div ref={chatEndRef} />
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
