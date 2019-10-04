import React, { useState } from 'react'

import Number from './components/Number'

const App = () => {

    const [persons, setPersons] = useState([
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
        { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
        { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
        { id: 5, name: 'test', number: '911' }
    ])
    
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ newFilter, setNewFilter] = useState('')
    const [ showFilter, setShowFilter] = useState(false)

    const handleNewFilter = (e) => {
        if(newFilter !== '') setShowFilter(true)
        setNewFilter(e.target.value.toLowerCase())
    }
    const handleNewName = (e) => {
        setNewName(e.target.value)
    }

    const handleNewNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleNameSubmit = (e) => {
        e.preventDefault()
        
        if(nameExist() === false){
            setPersons(persons.concat(newObj()))
        }
        else {
            window.alert(`${newName} already exist in the phonebook`)
        }
        setNewName('')
    }

    const newObj = () => {
        return {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        }
    }

    const nameExist = () => {
        let arrNames = persons.map(person => person.name);
        return arrNames.includes(newName)
    }
   
    const showFilterNames = showFilter
        ? persons.filter(person => person.name.toLowerCase().includes(newFilter))
        : persons

    const numberRow = () => {
         return showFilterNames.map(person => <Number key={person.id} name={person.name} phoneNumber={person.number}/>)
    }
    return (
       <div>
          <div>
                Filter show with: <input 
                    value={newFilter}
                    onChange={handleNewFilter}
                />
            </div>
            <h2>Add Contacts</h2>
            <form onSubmit={handleNameSubmit}>
                <div>
                    name: <input
                            value={newName}
                            onChange={handleNewName}
                                />
                </div>
                <div>
                    phone:<input
                            value={newNumber}
                            onChange={handleNewNumber}
                            />
                </div>
                <div>
                    <button type="submit"> add </button>
                </div>
            </form>
            <h2> Phonebook Number </h2>
           {numberRow()}
       </div> 
    )
}

export default App