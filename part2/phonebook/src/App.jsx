import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setNewName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the name already exists
    const userExists =
      persons.filter((person) => person.name === newName).length === 0
        ? false
        : true;
    if (userExists) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} type="text" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
