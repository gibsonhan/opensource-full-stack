import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.store.getState().notifications}
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