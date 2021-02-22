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
}