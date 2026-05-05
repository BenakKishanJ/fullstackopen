import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phone.js"
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({})

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
      const updateConfirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (updateConfirm) {
        const updatePerson = persons.find((person) => person.name == newName)
        const updatePersonObj = { ...updatePerson, number: newNumber }
        phoneService
          .update(updatePerson.id, updatePersonObj)
          .then(returnedPerson => {
            setPersons((prevPersons) =>
              prevPersons.map((prevPerson) => prevPerson.id === updatePerson.id ? returnedPerson : prevPerson))
          })
        setNotification({ message: `${newName}'s phone number updated to ${newNumber}`, type: "noti" })
        setTimeout(() => setNotification(null), 5000)
        setNewName("");
        setNewNumber("");
      }
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
      setNotification({ message: `Added ${newName} with phone number ${newNumber}`, type: "noti" })
      setTimeout(() => setNotification(null), 5000)
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

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}`)

    if (!confirmDelete) return

    phoneService
      .remove(id)
      .then(deletedPerson => {
        setPersons((prevPerson) => prevPerson.filter((person) => person.id !== deletedPerson.id))
        setNotification({ message: ` Deleted ${name}`, type: "noti" })
        setTimeout(() => setNotification(null), 5000)
      }).catch((error) => {
        setNotification({ message: `Information of ${name} has already been removed from the server`, type: "error" })
        setTimeout(() => setNotification(null), 5000)
        console.log(error)
      })

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification?.message} type={notification?.type} />
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
          <Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id, person.name)} />
        ))}
      </div>
    </div>
  );
};

export default App;
