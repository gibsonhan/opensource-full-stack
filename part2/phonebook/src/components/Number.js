import React from 'react'

const Number = (props) => {
    const {name, phoneNumber, handleDelete} = props
    return(
        <p>{name} {phoneNumber} <button onClick={handleDelete}>delete</button></p>
    )
}

export default Number