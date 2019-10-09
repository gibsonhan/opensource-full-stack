import React from 'react'

const EventMessage = ({ message, color }) => {
    const eventStyle = {
        color: color,
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