import React from 'react'

const Message = ({message, color}) => {
  
    const messageStyle = {
      color: color,
      borderStyle: 'solid', 
      borderRadius: '5px',
      font:'16',
      padding: 10,
    }
    return(
      <div style={messageStyle}>
            {message}
      </div>
    )
  }

export default Message