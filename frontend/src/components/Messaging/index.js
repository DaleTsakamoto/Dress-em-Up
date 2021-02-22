import React, { useState } from 'react';
// import uuid from 'uuid'

import Chatroom from '../ChatRoom'
import './Messaging.css';

function Messaging() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState('hello')

  const updateUsername = (username) => {
    setUsername(username);
  }

  const handleSendMessage = (message) => {
    const newMessages = {
      id: 10,
      message,
      created:new Date()
    }

    setMessages([newMessages, ...messages])
  }

  const handleLeave = () => {
    setUsername('');
  }


  return (
    <div>
      <h1>Messaging</h1>
      <Chatroom messages={messages} handleSendMessage={handleSendMessage} handleLeave={handleLeave} />
    </div>
  )
}

export default Messaging;