import React, { useState, useEffect } from 'react';
import { sendMessage } from '../services/api';

const Messaging = ({ friendId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    try {
      const response = await sendMessage({ sender: 1, recipient: friendId, text: message }); // Replace with actual sender id
      setMessages([...messages, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h2>Messaging</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{msg.sender}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Messaging;
