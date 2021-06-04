import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ filter, countries }) => {

  const [ showedCountry, setShowedCountry ] = useState('')

  const handleClick = country => {
    setShowedCountry(country)
  }

  if(filter !== '') {
    const newCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    if (newCountries.length === 1) {
      return <Country data={newCountries[0]} />
    }
    else if(newCountries.length <= 10) {
      return (
        <div>
          {newCountries.map(country => (
            <div key={country.name}>
              {country.name}<button type="button" onClick={() => handleClick(country)}>show</button>
            </div>
          ))}
          {console.log(showedCountry)}
          {//<Country data={showedCountry}/>
          }
        </div>
      )
    }
  }
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const Country = ({ data }) => {
  console.log('in country component', data)

  const [ weather, setWeather ] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      // .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${data['capital']}`)
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=Helsinki`)
      .then(response => {
        console.log('call results in', response.data)
        setWeather(response.data)
      })
  }, [data])
  console.log('weather value', weather)
  if(data !== '') {
    return (
      <div>
        <h1>{data.name}</h1>
        <div>
          capital {data.capital} <br/>
          population {data.population}
        </div>
        <h2>languages</h2>
        <ul>
          {data.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={data.flag} alt='flag' />
        <h2>Weather in {data.capital}</h2>
        <div>
          {weather.current['temperature']}
        </div>
      </div>
    )
  }
  else {
    return null
  }
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        debug
      </div>
      <div className="App">
        find countries <input onChange={handleFilterChange} value={filter} />
      </div>
      <Countries filter={filter} countries={countries} />
    </div>
  );
}

export default App;
