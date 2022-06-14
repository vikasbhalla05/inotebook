import React from 'react'
import Notes from './Notes';
import NoteForm from "./NoteForm";

const Home = () => {

  return (
    <div>
        <NoteForm />
        <h1 className="my-5">Notes</h1>
        <Notes />
    </div>
    
  )
}

export default Home