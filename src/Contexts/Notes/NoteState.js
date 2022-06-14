// import { useState } from "react"
import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {

  let notes = [];
  let host = "http://localhost:5000";
  const [note, setNote] = useState(notes);

      // sample notes data
      let getNotes = async () => {
        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/fetchnotes`, {

          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        let json = await response.json(); // parses JSON response into native JavaScript objects
        notes = json;
        setNote(notes);
      }


      // function to add the notes
      let addNotes = async (title, description, tag) => {

        // TODO : API Call
        // creating new note from the parameters
        const response = await fetch(`${host}/api/notes/createnote`, {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({title, description, tag})
        });
        let json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);


        let newNote = json;
        // concating the newNote into the prev notes array using state hook
        setNote((prev) => prev.concat(newNote));
      }

      // function to delete note
      let deleteNote = async (id) => {
        // TODO : API Call
        let response = await fetch(`${host}/api/notes/deletenote/${id}`, {

          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
        console.table(await response.json()); 
               
        // using filter to remove the note from the notes with same id as deleteNote
        const AfterDeleteNotes = note.filter((note) => { return note._id !== id} );
        setNote(AfterDeleteNotes);
      }

      // function to edit Notes
      let editNote = async (id, title, description, tag) => {
        // TODO : API Call
        let response = await fetch(`${host}/api/notes/updatenote/${id}`, {

          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({title,description,tag})
        });
        let json = await response.json();
        console.log(json);

        //We have to create a new array to change in it as well as change a state using it
        let newNote = JSON.parse(JSON.stringify(note));

        for(let i=0;i<newNote.length;i++){
          // let element = notes[i];
          if(newNote[i]._id === id){
            newNote[i].title = title;
            newNote[i].description = description;
            newNote[i].tag = tag;
            break;
          }
        }
        setNote(newNote);

      }

    return (
        <NoteContext.Provider value={{note, getNotes, addNotes, deleteNote, editNote}}> {/* sending the state and the update function to the children*/}
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;