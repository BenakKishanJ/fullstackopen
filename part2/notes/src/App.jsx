import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObj)
      .then((returnedNote) => {
        setNotes((prevNotes) => prevNotes.concat(returnedNote));
        setNewNote("");
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);

    if (!note) {
      console.error("Note not found");
      return;
    }

    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === id ? returnedNote : n))
        );
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
