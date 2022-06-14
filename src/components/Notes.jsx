import NoteContext from "../Contexts/Notes/noteContext";
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteCard from "./NoteCard";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    let redirect = useNavigate();
    let noteData = useContext(NoteContext);
    let {note, getNotes, editNote} = noteData; // taking functions and notes from the context
    const [enote, setNote] = useState({id:"", etitle: "", edescription:"", etag:""}); // using state of the editting note

    useEffect(() => {
        // using getNotes at componentDidMount
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            redirect("/login");
        }
        // eslint-disable-next-line
    }, [])

    // using references of the modal button and close button
    const ref = useRef(null);
    const refClose = useRef(null);

    // when clicking the pen note button
    let updateNote = (currNote) => {
        ref.current.click(); // opening the modal
        setNote({id: currNote._id, etitle:currNote.title, edescription:currNote.description, etag:currNote.tag});
        // setting the prev set note data
    }

    // handle submission of the updated note data
    const handleNoteSave = async (e) => {
        e.preventDefault();
        editNote(enote.id, enote.etitle, enote.edescription, enote.etag);// sending the data to the context and to API

        refClose.current.click();// closing after submit
    }

    // changing the state of the newNote Data as the input changes
    const Inputs = (e) => {
        // using spread and assignment operator
        setNote({...enote, [e.target.name]: e.target.value});
    }
    

    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                        <label htmlFor="etitle" className="form-label">
                            Note Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="etitle"
                            name="etitle"
                            value={enote.etitle}
                            aria-describedby="emailHelp"
                            onChange={Inputs}
                            minLength={5}
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="edescription" className="form-label">
                            Note Description
                        </label>
                        <input
                            type="text"
                            name="edescription"
                            className="form-control"
                            id="edescription"
                            value={enote.edescription}
                            onChange={Inputs}
                            minLength={5}
                        />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="etag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            name="etag"
                            className="form-control"
                            value={enote.etag}
                            id="etag"
                            onChange={Inputs}
                        />
                        </div>
                        
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                    <button type="button" disabled={enote.etitle.length<5 || enote.edescription.length<5} className="btn btn-primary" onClick={handleNoteSave}>Update Note</button>
                </div>
                </div>
            </div>
            </div>

            <div className="container">
                {note.length === 0 && "No Notes Found"}
            </div>
            <div className="row">
                {note.map((singleNote) => {
                    return <NoteCard note={singleNote} updateNote={updateNote} className="col-md-4"/>;
                })}
            </div>   
        </div>
    )
}

export default Notes