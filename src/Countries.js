import React, {useEffect,useState } from 'react';
import "./Countries.css";
import Country from "./Country";

function Countries() {
  //"https://restcountries.eu/rest/v2/name/india"
  //"https://restcountries.eu/rest/v2/all"
    const [countryList, setcountryList] = useState([]);

    useEffect(() => {
        getAllCountries();
    }, []);

    const getAllCountries = async() => {
        const response = await fetch("https://restcountries.eu/rest/v2/name/ia");
        const data =  await response.json();
        console.log("Data",data);
        setcountryList(data);
    }

    return (
        <div className="countries">
            {/* <ul>{countryList.map(x => <li>{x.name} - {x.capital} - {x.currencies[0].name}</li>)}</ul> */}
            {countryList.map(x => 
             <Country name={x.name} flag={x.flag} capital={x.capital}/>
            )}
           
        </div>
    )   
}

export default Countries
