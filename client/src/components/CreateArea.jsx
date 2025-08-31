import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    desc: ""
  });

  const [show, setShow] = useState(false);

  function handleExtend() {
    setShow(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      desc: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note" onClick={handleExtend}>
        {show && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="desc"
          onChange={handleChange}
          value={note.desc}
          placeholder="Take a note..."
          rows={show ? "3" : "1"}
        />
        {show && (
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
