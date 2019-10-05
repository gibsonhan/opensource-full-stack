import React from 'react'

import Number from './Number'

const Persons = ({showFilterNames}) => {

    const numberRow = () => {
         return showFilterNames.map(person => <Number key={person.id} name={person.name} phoneNumber={person.number}/>)
    }
    return (
        <>
            <h2> Phonebook Number</h2>
            {numberRow()}
        </>
    )
}

export default Persons