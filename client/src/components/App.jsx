import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  function addNote(newNote) {
    axios.post("http://localhost:3000/api/notes", newNote)
      .then(res => setNotes(prevNotes => [...prevNotes, res.data]))
      .catch(err => console.error(err));
  }

  function deleteNote(id) {
    axios.delete(`http://localhost:3000/api/notes/${id}`)
      .then(() => setNotes(prevNotes => prevNotes.filter(note => note._id !== id)))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          desc={note.desc}  // using desc consistently
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
