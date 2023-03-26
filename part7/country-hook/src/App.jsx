import React, { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setCountry(res.data);
    };
    callApi();
  }, []);

  return country;
};

const Country = ({ filteredCountry }) => {
  const country = filteredCountry;
  if (!country) {
    return null;
  }

  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital[0]} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags["png"]}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
};

const App = () => {
  const [name, setName] = useState("");
  const [filteredCountry, setFilteredCountry] = useState("");
  const country = useCountry();

  useEffect(() => {
    if (country) {
      const c = country.filter((c) =>
        c.name.common.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredCountry(c[0]);
    }
  }, [name]);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>find</button>
      {name !== "" && <Country filteredCountry={filteredCountry} />}
    </>
  );
};

export default App;
