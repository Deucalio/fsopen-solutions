import { useState } from "react";

const Person = ({ persons, filterText }) => {
  const filteredPeople = persons.map((person, i) => {
    // if filterText is not person's name
    if (person.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    return (
      <p key={i}>
        {person.name} {person.number}
      </p>
    );
  });

  console.log("filteredPeople", filteredPeople);

  return <>{filteredPeople}</>;
};

const SearchBar = ({ filterText, setFilterText }) => {
  return (
    <form>
      <div>
        filter shown with{" "}
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filterText, setFilterText] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the name already exists
    const userExists =
      persons.filter((person) => person.name === newPerson.name).length === 0
        ? false
        : true;
    if (userExists) {
      return alert(`${newPerson.name} is already added to phonebook`);
    }

    setPersons([
      ...persons,
      { name: newPerson.name, number: newPerson.number },
    ]);
    setNewPerson({ name: "", number: "" });
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>

        <SearchBar filterText={filterText} setFilterText={setFilterText} />

        <legend>
          <h2>Add a new</h2>
        </legend>
        <form onSubmit={handleSubmit}>
          <div>
            name:{" "}
            <input
              name="name"
              value={newPerson.name}
              type="text"
              onChange={handleChange}
            />
          </div>
          <div>
            number:{" "}
            <input
              name="number"
              value={newPerson.number}
              type="text"
              onChange={handleChange}
            />
          </div>
          <button type="submit">add</button>
        </form>

        <h2>Numbers</h2>
        <Person persons={persons} filterText={filterText} />
      </div>
    </>
  );
};

export default App;
