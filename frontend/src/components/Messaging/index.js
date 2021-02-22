import React, { useState } from 'react';
import uuid from 'uuid'

import './Messaging.css';

function Messaging() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState('hello')

  const updateUsername = (username) => {
    setUsername(username);
  }

  const handleSendMessage = (message) => {
    const newMessage = {
      id: uuid(),
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
    </div>
  )
}

export default Messaging;