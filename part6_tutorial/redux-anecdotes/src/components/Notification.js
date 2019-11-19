import React from 'react'
import { messageReducer } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const getMessage = () => {
    const message = props.store.getState().notifications
    if(message) {
      setTimeout(() => {
        props.store.dispatch(messageReducer(''))
      }, 7000)
      return message
    }
  }
  return (
    <div style={style}>
      {getMessage()}
    </div>
  )
}

export default Notification

/**
 * Exercise 6.9
 * 1. change application exisiting reducer 
 * 2. Create a seperate reducers for new functionality and refactor applicaiton  -> uses combined reducer as howsn
 * 3. Display inital value set for the message in the notification reducer
 */