// src/pages/ChatWindow.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ChatPage.css';

const ChatWindow = () => {
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('userDetails'));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chatting/message/get_messages/', {
          params: { sender: loggedInUser.id, recipient: parseInt(recipientId) }
        });
        setMessages(response.data.response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [loggedInUser.id, recipientId]);

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/chatting/message/send_message/', {
        sender: loggedInUser.id,
        recipient: parseInt(recipientId),
        text: newMessage
      });
      setMessages([...messages, response.data.details]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window">
      <h2>Chat with User {recipientId}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === loggedInUser.id ? 'sent' : 'received'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
