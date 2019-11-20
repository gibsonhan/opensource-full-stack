import React from 'react'
import { connect } from 'react-redux'
import { messageReducer } from '../reducers/notificationReducer'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const message = props.notification
  
  const getMessage = () => {
    if(message) {
      setTimeout(() => {
        props.messageReducer('')
      }, 5000)
      return message
    }
  }
  if(!message) return <> </> 
  return (
    <div style={style}>
      {getMessage()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  messageReducer
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification)

/**
 * Exercise 6.9
 * 1. change application exisiting reducer 
 * 2. Create a seperate reducers for new functionality and refactor applicaiton  -> uses combined reducer as howsn
 * 3. Display inital value set for the message in the notification reducer
 */