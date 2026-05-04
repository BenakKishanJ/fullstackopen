import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phone.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phoneService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
    // axios.get("http://localhost:3001/persons")
    //   .then((response) => {
    //   console.log(response.data)
    //   setPersons(response.data)
  }, [])


  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name == newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber }
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons((prevPersons) => [...prevPersons, returnedPerson])
        })
      // axios
      //   .post("http://localhost:3001/persons", newPerson)
      //   .then((response) => {
      //     setPersons((prevPerson) => [...prevPerson, response.data])
      //   })
      // setPersons((persons) => [
      //   ...persons,
      //   newPerson
      // ]);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      );

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h1>Numbers</h1>
      <div>
        {filteredPersons.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} />
        ))}
      </div>
    </div>
  );
};

export default App;
