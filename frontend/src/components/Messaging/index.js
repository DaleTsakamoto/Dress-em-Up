import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'


import Chatroom from '../ChatRoom'
import './Messaging.css';

function Messaging() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([])

  const updateUsername = (username) => {
    setUsername(username);
  }

  const handleSendMessage = (message) => {
    const newMessage = {
      id: uuid(),
      message,
      created:new Date()
    }

    setMessages([newMessage, ...messages])
  }

  const handleLeave = () => {
    setUsername('');
  }


  return (
    <div className='messaging-container'>
      <h1>Messaging</h1>
      <Chatroom messages={messages} handleSendMessage={handleSendMessage} handleLeave={handleLeave} />
    </div>
  )
}

export default Messaging;