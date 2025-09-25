import React, { useState, useEffect } from 'react';
import { getMessages, createMessage } from '../services/messageService';
import './style.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMessage, setNewMessage] = useState({ from: '', subject: '', date: new Date().toISOString().slice(0, 10) });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  const handleInputChange = (e) => {
    setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMessage(newMessage);
    fetchMessages();
    setNewMessage({ from: '', subject: '', date: new Date().toISOString().slice(0, 10) });
    setShowForm(false);
  };

  return (
    <div className="message-container">
      <h2>Messages</h2>
      <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add Message'}</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="from" placeholder="From" value={newMessage.from} onChange={handleInputChange} required />
          <input type="text" name="subject" placeholder="Subject" value={newMessage.subject} onChange={handleInputChange} required />
          <button type="submit">Add</button>
        </form>
      )}
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className="message-item">
            <div className="message-from">{message.from}</div>
            <div className="message-subject">{message.subject}</div>
            <div className="message-date">{message.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
