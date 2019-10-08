import React from 'react'

import Number from './Number'

const Persons = ({showFilterNames, handleDelete}) => {

    const numberRow = () => {
         return showFilterNames.map(person => 
            <Number 
                key={person.id} 
                name={person.name} 
                phoneNumber={person.number} 
                handleDelete={()=>{handleDelete(person.id, person.name)}}/>)
    }
    return (
        <>
            <h2> Phonebook Number</h2>
            {numberRow()}
        </>
    )
}

export default Persons