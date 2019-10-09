import React from 'react'

const EventMessage = ({ message }) => {
    const eventStyle = {
        color: 'green',
        background: 'lightgrey',
        border: 'bold',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontStyle: 'solid',
        fontSize: 20
    }
    
    if(message === null) return <></>
    
    return (
        <div style={eventStyle}>
            {message}
        </div>
    )
}

export default EventMessage