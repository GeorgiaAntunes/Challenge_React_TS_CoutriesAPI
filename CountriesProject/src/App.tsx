import { useEffect, useState } from 'react'

const BASE_URL = "https://restcountries.com/v3.1"

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
] as const;
type Capital = (typeof FILTERABLE_CAPITALS) [number]

interface Country {
  name: {
    common: string
  };
  cca2: string;
  ccn3: number;
  capital: string;
}

interface CountryCardProps {
  country : Country
}

const CountriesCard = ( {country}: CountryCardProps) => {
  return <p key={country.ccn3}> 
    Name: {country.name.common}, Capital: {country.capital}</p>    
}


const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [capital, setCapital] = useState<Capital>()


  useEffect(()=>{
    const fetchAPI = async () =>{
      const url = capital 
      ? `${BASE_URL}/capital/${capital}` 
      : `${BASE_URL}/all`;

      const data = await fetch(url)
      const parsedData = await data.json()
      setCountries(parsedData)
    }

    fetchAPI();
    
  },[capital])

  // const handleChange = (value: String) => {
  //   setCapital(value as Capital)
  // } posso colocar essa funcao dentro do onChange, pq é o unico momento q eu uso ela

  return (
    <div>
      <div>
        <select onChange={ event => setCapital(event.target.value as Capital)}>
        {FILTERABLE_CAPITALS.map(capital => {
          return (
            <option key={capital} value={capital}>
              {capital}
            </option>
          )
        })}
        </select>
      </div>
      <div>
      {countries.map(country => { 
        return (
          <CountriesCard key={country.ccn3} country={country}/>
        )
      })}
      </div>
  </div>
  )
}

export default CountriesPage;


// Create a simple React application that displays a list of countries and their capital
// The application should have this features:

// 1- The list of countries and capital should be fetched from an API
// 2- The list should be displayed in the `CountriesPage`
// 3- Each country should be displayed in a separated component
// 4- The user should be able to filter the list by Capital 


