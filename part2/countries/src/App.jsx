import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SearchBar = ({ filterText, setFilterText }) => {
  return (
    <div>
      find countries{" "}
      <input
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <span style={{ display: "block", fontFamily: "cursive" }}>
      {country.name.common}
    </span>
  );
};

const CountryData = ({ country: { name, capital, area, languages, flags: {png} } }) => {
  const languagesList = Object.values(languages);
  return (
    <>
      <h2>{name.common}</h2>
      <span style={{ display: "block" }}>capital {capital[0]}</span>
      <span style={{ display: "block" }}>area {area}</span>


      <h4>Languages</h4>
      <ul>
        {languagesList.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <br/>
      <img style={{height: "9rem"}} src={png} alt="" />
    </>
  );
};

const Countries = ({ countries, filterText }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterText.toLowerCase())
  );
  if (filteredCountries.length === 1) {
    return <CountryData country={filteredCountries[0]} />;
  }
  // if the filtered countries are ten or fewer then print them
  if (filteredCountries.length <= 10) {
    return filteredCountries.map((c) => <Country key={c.cca3} country={c} />);
  }

  return <p>Too many matches, specify another filter</p>;
};

const App = () => {
  const [filterText, setFilterText] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let ignore = false;
    const fetchCountries = async () => {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      if (!ignore) {
        setCountries(res.data);
      }
    };

    fetchCountries();
    return () => (ignore = true);
  }, []);

  return (
    <>
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      {countries.length === 0 ? (
        <p>Loading data</p>
      ) : (
        <>
          <Countries countries={countries} filterText={filterText} />
          <p>countries fetched successfully</p>
        </>
      )}
    </>
  );
};

export default App;
