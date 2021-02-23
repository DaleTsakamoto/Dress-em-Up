import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'

import Chatroom from '../ChatRoom'
import './Messaging.css';

function Messaging() {
  // const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([])
  const webSocket = useRef(null);

  useEffect(() => {
    if (!username) {
      return;
    }

    const ws = new WebSocket('ws://localhost:5000')

    ws.onopen = (e) => {
      console.log(`Connection open: ${e}`)
    }

    ws.onmessage = (e) => {
      console.log(e)
    }

    ws.onerror = (e) => {
      console.log(e)
    }

    ws.onclose = (e) => {
      console.log(`Connection closed: ${e}`)
    }

    webSocket.current = ws;

    return function cleanup() {
      if (webSocket.current !== null) {
        webSocket.current.close()
      }
    }

  }, [username])

  const updateUsername = (username) => {
    console.log(username)
    setUsername(username);
  }

  const handleSendMessage = (message) => {
    const newMessage = {
      id: uuid(),
      username,
      message,
      created: new Date()
    }

    const jsonNewMessage = JSON.stringify({
      type: 'send-chat-message',
      data: newMessage,
    });

    console.log(`Sending message ${jsonNewMessage}`)

    webSocket.current.send(jsonNewMessage)

    // setMessages([newMessage, ...messages])
  }

  const handleLeave = () => {
    setUsername('');
  }


  return (
    <div className='messaging-container'>
      <h1>Messaging</h1>
      <Chatroom messages={messages} handleSendMessage={handleSendMessage} handleLeave={handleLeave} updateUsername={updateUsername} />
    </div>
  )
}

export default Messaging;