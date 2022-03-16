import React from 'react'
import "./message.scss";

const Message = ({ type, children }) => {
  return (
    <div className={`${type}`}>{children}</div>
  )
}

export default Message