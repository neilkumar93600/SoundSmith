import React, { useState, useEffect } from 'react';
import { getAudio } from '../api/textToSpeech';


const ChatMessage = ({ text, sender }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (sender === 'ai') {
      const fetchAudio = async () => {
        const url = await getAudio(text);
        setAudioUrl(url);
      };

      fetchAudio();
    }
  }, [text, sender]);

  const playAudio = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className={`chat-message ${sender}`}>
      <p>{text}</p>
      {sender === 'ai' && audioUrl && (
        <button onClick={playAudio} aria-label="Play audio">
          🔊
        </button>
      )}
    </div>
  );
};

export default ChatMessage;
