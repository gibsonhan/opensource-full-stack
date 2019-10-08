import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

    const [persons, setPersons] = useState([])
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

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(nameExist() === false){
            const newContact = {
                name: newName,
                number: newNumber
            }

            create(newContact)
        }
        else {
            window.alert(`${newName} already exist in the phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }

    const create = (newObject) => {
        const createUrl = `http://localhost:3001/persons`
        return axios
            .post(createUrl, newObject)
            .then(res => setPersons(persons.concat(res.data)))
    }

    useEffect(() => {
        console.log('Use Effect')
        axios
            .get('http://localhost:3001/persons') 
            .then(res => {
                console.log('promise successful', res)
                setPersons(res.data)
            }).catch(err => {
                console.log('promise rejected', err)
            })
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
            <Persons showFilterNames={showFilterNames}/>
       </div> 
    )
}

export default App