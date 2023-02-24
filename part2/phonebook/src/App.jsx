import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

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
    <div>
      <h2>Phonebook</h2>

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

      <form onSubmit={handleSubmit}></form>

      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
