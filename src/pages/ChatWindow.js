import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './AxiosInstance'; // Import your Axios instance
import './ChatPage.css';

const ChatWindow = () => {
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('userDetails'));
  const messagesEndRef = useRef(null);
  const recipientIdNumber = localStorage.getItem('recipientId');

  useEffect(() => {
    console.log('Recipient ID from URL:', recipientId);
    console.log('Parsed Recipient ID:', recipientIdNumber);

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get('/chatting/message/get_messages_new/', {
          params: { sender: loggedInUser.id, recipient: recipientIdNumber }
        });

        // Flatten the messages structure
        const fetchedMessages = response.data.response.flatMap(item => item.messages.map(message => ({
          ...message,
          date: item.date
        })));

        // Sort messages by timestamp
        fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [loggedInUser.id, recipientIdNumber]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      await axiosInstance.post('/chatting/message/send_message_new/', {
        sender: loggedInUser.id,
        recipient: recipientIdNumber,
        text: newMessage
      });
      setNewMessage('');

      // Refresh messages 1 second after sending a message
      setTimeout(async () => {
        try {
          const response = await axiosInstance.get('/chatting/message/get_messages_new/', {
            params: { sender: loggedInUser.id, recipient: recipientIdNumber }
          });

          // Flatten the messages structure
          const fetchedMessages = response.data.response.flatMap(item => item.messages.map(message => ({
            ...message,
            date: item.date
          })));

          // Sort messages by timestamp
          fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          setMessages(fetchedMessages);
        } catch (error) {
          console.error('Error fetching messages after sending:', error);
        }
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window">
      <h2>Chat with User {recipientId}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === loggedInUser.id ? 'sent' : 'received'}`}
          >
            <div className="text">{message.text}</div>
            <div className="timestamp">{new Date(message.timestamp).toLocaleString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Scroll to bottom */}
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
