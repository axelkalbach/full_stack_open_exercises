import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ onChange, value}) => (
  <div>
    filter shown with<input onChange={onChange} value={value}/>
  </div>
)

const PersonForm = ({ onSubmit, onNameChange, nameValue, onPhoneChange, phoneValue}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={onNameChange} value={nameValue}/>
    </div>
    <div>
      number: <input onChange={onPhoneChange} value={phoneValue}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ filter, persons }) => {

  console.log('just persons', persons)

  const [ newPersonsList, setNewPersonsList ] = useState(persons)
  console.log('newPersons', newPersonsList)

  const deletePerson = (id) => {
    personService.remove(id).then(
    )
  }
  if(filter !== '') {
    const filteredPersons = newPersonsList.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    return (filteredPersons.map(person =>
      <div key={person.name}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
    ))
  }
  else {
    return (newPersonsList.map(person =>
      <div key={person.name}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
      </div>
    ))
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([{
      name: 'Arto Hellas',
      number: '123'
  }])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(
        personsGotten => {setPersons(personsGotten)}
      )
  }, [])

  console.log(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if(names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newPhone
      }
      personService.create(newPerson).then(
        () => setPersons(persons.concat(newPerson))
      )
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={newFilter} />
      <h2>add new</h2>
      <PersonForm onSubmit={addPerson}
        onNameChange={handleNameChange}
        nameValue={newName}
        onPhoneChange={handlePhoneChange}
        phoneValue={newPhone} />
      <h2>Numbers</h2>
      {console.log('right before return', persons)}
      <Persons filter={newFilter} persons={persons} />
    </div>
  )
}

export default App
