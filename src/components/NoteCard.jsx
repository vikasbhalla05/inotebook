import NoteContext from "../Contexts/Notes/noteContext";
import React, { useContext} from 'react'

const NoteCard = (props) => {

  const context = useContext(NoteContext);
  const {deleteNote} = context;

    const {note, updateNote} = props;

  return (

    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen mx-2" onClick={() => updateNote(note)}></i>
        </div>
      </div>
    </div>

    
  );
};

export default NoteCard;
