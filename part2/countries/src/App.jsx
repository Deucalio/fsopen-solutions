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

const DisplayWeatherData = ({ weatherData }) => {
  console.log("weather", weatherData);
  return (
    <div style={{fontSize: "1.2rem"}}>
      <p>Temperature {weatherData.main.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

const CountryData = ({
  country: {
    name,
    capital,
    area,
    languages,
    flags: { png },
  },
}) => {
  const languagesList = Object.values(languages);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    let ignore = false;
    const callWeatherApi = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          name.common
        }&appid=${import.meta.env.VITE_API_KEY}&units=metric`
      );
      if (!ignore) {
        setWeatherData(res.data);
      }
    };
    callWeatherApi();

    return () => (ignore = true);
  }, []);

  return (
    <>
      <h2>{name.common}</h2>
      <span style={{ display: "block" }}>capital {capital[0]}</span>
      <span style={{ display: "block" }}>area {area}</span>

      <h4>Languages</h4>
      <ul>
        {languagesList.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <br />
      <img style={{ height: "9rem" }} src={png} alt="" />

      <h2>Weather in {capital[0]}</h2>
      {weatherData !== null && <DisplayWeatherData weatherData={weatherData} />}
    </>
  );
};
const Country = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div style={{ display: "block", fontFamily: "cursive" }}>
        <span>{country.name.common}</span>{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide" : "Show"}
        </button>
      </div>
      {showDetails && <CountryData country={country} />}
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
  console.log("k");

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
