import NoteContext from "../Contexts/Notes/noteContext";
import React, { useContext, useState } from 'react'

const NoteForm = () => {

  // creating context and taking teh addNotes function from it
  const context = useContext(NoteContext);
  const {addNotes} = context;

  const [note, setNote] = useState({title: "", description:"", tag:""}); // Set state for the new note content

  // handle submission of the newNote data
  const handleNoteSave = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    setNote({title: "", description:"", tag:""});
  }

  // changing the state of the newNote Data as the input changes
  const Inputs = (e) => {
    
    // using spread and assignment operator
    setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
        <h1 className="my-5">Create A Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={Inputs}
            minLength={5}
            required
            value={note.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Note Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="description"
            onChange={Inputs}
            minLength={5}
            required
            value={note.description}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            className="form-control"
            id="tag"
            onChange={Inputs}
            value={note.tag}
          />
        </div>

        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleNoteSave}>
          Add Note
        </button>
      </form>

    </>
  );
};

export default NoteForm;
