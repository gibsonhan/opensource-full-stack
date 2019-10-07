import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
const [findCountry, setFindCountry] = useState('')
const [countries, setCountries] = useState([])
const [showFilter, setShowFilter] = useState(true)
const [filterCountries, setFilterCountries] = useState([])

useEffect(()=> { 
    axios.get('http://localhost:3001/data')
    .then(res => {
        console.log('promise successful', res)
        setCountries(res.data)
    }).catch(err => {
        console.log('promise rejected', err)
    })
}, [])

const handleFindCountry = (e) => {
    const search = e.target.value.toLowerCase()
    setFindCountry(search)
    filterRow()
}

const showCountries = showFilter
    ? filterCountries
    : [{name: 'Too many matches, specify another filter'}]

const filterRow = () => {
    let _filter = countries.filter(country => country.name.toLowerCase().includes(findCountry))
    let len = _filter.length
    console.log(_filter) 
    if(len > 0 && len < 11) {
        setShowFilter(true)
        setFilterCountries(_filter)
    }else {
        setShowFilter(false)
    }
}

const OneCountry = () => {
    return <Display key={0} country={filterCountries[0]} />
}

const row = () => {
    return showCountries.map(country => <p key={country.name}>{country.name}</p>)
 }

    return (
        <div>
            <h1>App</h1>
            <label>find countries </label>
            <input 
                value={findCountry}
                onChange={handleFindCountry}
            />
            {filterCountries.length === 1 ? OneCountry(): row()}
            {}
        </div>
        
    )
}
const Display = (props) => {
    const {name, capital, population, languages, flag} = props.country
    const languageRow = () => {

        return languages.map(language => <p key={language.name}>{language.name}</p>)
    }
        return(
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>Languages</h2>
            {languageRow()}
            <img src={flag} alt={`${name} flag`} width="200" height="125"></img>

        </div>
    )
}
export default App