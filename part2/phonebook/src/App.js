import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import contactService from './services/contact'

const App = () => {

    const [ persons, setPersons] = useState([])
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

    const handleDelete = (id, name) => {
        const remove = window.confirm(`Do you want to delete ${name}`)
        if(remove === true) {
            contactService
                .remove(id)
                .then(()=> {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(err => console.log('failed to delete object', err))
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newContact = {
            name: newName,
            number: newNumber
        }
        if(nameExist() === false){
            contactService
                .create(newContact)
                .then(object => setPersons(persons.concat(object)))
                .catch(err => console.log('create promise failed', err))
        }
        else {
            const update = window.confirm(`${newName} already exist in the phone book, would you like to replace the old number?`)
            if(update === true) {
                const updatePerson = persons.filter(person => person.name === newName)
                contactService
                    .update(updatePerson[0].id, newContact)
                    .then(returnedObject => {
                        //setPersons(persons.filter(person => person.name !== newName).concat(returnedObject))
                        setPersons(persons.map(person => person.name !== newName ? person : returnedObject ))
                    })
                    .catch(err => console.log('update failed', err))
            }
            console.log('end')
            
        }
        setNewName('')
        setNewNumber('')
    }

    useEffect(() => {
        contactService
            .getAll()
                .then(returnedContacts => {
                    console.log('getAll promise successful')
                    setPersons(returnedContacts)
                })
                .catch(err => console.log('getAll promise rejected', err))
    }, [])

    const nameExist = () => {
        let arrNames = persons.map(person => person.name);
        return arrNames.includes(newName)
    }
   
    const showFilterNames = showFilter
        ? persons.filter(person => person.name.toLowerCase().includes(newFilter))
        : persons

    return (
       <div>
            <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
            <PersonForm 
                submit={handleSubmit}
                nameValue={newName}
                nameChange={handleNewName}
                phoneValue={newNumber}
                phoneChange={handleNewNumber}
            />
            <Persons 
                showFilterNames={showFilterNames} 
                handleDelete={handleDelete}/>
       </div> 
    )
}

export default App