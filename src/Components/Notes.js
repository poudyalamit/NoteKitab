import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext';
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes,getNotes} = context;
    // useEffect(()=>{
    //     getNotes()
    // },[])
    return (
        <>
            <AddNotes />
            <div className="row my-3">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes