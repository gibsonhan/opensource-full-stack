import React from 'react'
import { connect } from 'react-redux'

const Message = (props) => {
  const messageStyle = {
    color: props.message.color || 'red',
    borderStyle: 'solid',
    borderRadius: '5px',
    font:'16',
    padding: 10,
  }
  if(!props.message.message) {
    return <></>
  } 
  return(
    <div style={messageStyle}>
      {props.message.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { message: state.message }
}

export default connect(
  mapStateToProps,
  null,
)(Message)