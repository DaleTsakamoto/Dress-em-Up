import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import styles from './Chatroom.css'

const Chatroom = ({ messages, handleSendMessage, handleLeave, updateUsername }) => {
  const [message, setMessage] = useState('')
  const sessionUser = useSelector(state => state.session.user);

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
        <button type='button' onClick={handleSendOnClick}>Send</button>
        <button type='button' onClick={handleLeaveOnClick}>Leave</button>
        <button type='button' onClick={() => updateUsername(sessionUser.username)}>start</button>
        <div className={styles.messages}>
          {messages.map(m => (
            <div className='message-info-ind-container'>
              <p key={m.id}>({m.created.toLocaleTimeString()})</p>
              <p>{m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chatroom;