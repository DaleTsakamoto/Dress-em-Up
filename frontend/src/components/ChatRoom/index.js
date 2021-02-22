import React, { useState } from 'react';

import styles from './Chatroom.css'

const Chatroom = ({ messages, handleSendMessage, handleLeave }) => {
  const [message, setMessage] = useState('')

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSendOnClick = () => {
    handleSendMessage(message);
    setMessage('')
  }

  const handleLeaveOnClick = () => {
    handleLeave();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat_room}>
        <input type='text' value={message} onChange={handleOnChange} />
        <button type='button' onLick={handleSendOnClick}>Send</button>
        <button type='button' onLick={handleLeaveOnClick}>Leave</button>
        <div className={styles.messages}>
          {messages.map(m => (
            <p key={m.id}>({m.created.toLocaleTimeString()})</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chatroom;