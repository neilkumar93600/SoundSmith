import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import { sendMessage } from './api/geminiService';
import './App.css';
import sendIcon from './img/send.png';
import userIcon from './img/user.png';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');

      // Get AI response
      const aiResponseText = await sendMessage(input);
      const aiMessage = { text: aiResponseText, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="chat-container">
        <div className="header">
          <img src={userIcon} alt="User" className="user-icon" />
        </div>
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
            <button onClick={handleSendMessage} className="send-button">
              <img src={sendIcon} alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
