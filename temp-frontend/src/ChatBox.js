import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';
import FilmDirectorImage from './images/director.jpg'

function ChatBox() {
  const [messages, setMessages] = useState([]); // { role: 'user' | 'ai', text: '...' }
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedMessages = [...messages, { role: 'user', text: userInput }];
    const context = updatedMessages
      .map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.text}`)
      .join('\n');

    fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userInput, context }),
    })
      .then(res => res.json())
      .then(data => {
        setMessages([...updatedMessages, { role: 'ai', text: data.response }]);
        setUserInput('');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      
      
      <div className="chat-box">
        <div className="chat-header">
            <img src={FilmDirectorImage} alt="Film Director" className="director-header-img" />
            <h1>Chat with Derek the Director</h1>
        </div>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-bubble ${msg.role === 'user' ? 'user-msg' : 'ai-msg'}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
  
        <form onSubmit={handleSubmit} className="chat-input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ex. Tell me about movies discussing sustainability..."
            className="chat-input"
            required
          />
          <button type="submit" className="chat-button" disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
    
  );
  
}

export default ChatBox;
