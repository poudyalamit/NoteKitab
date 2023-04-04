import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import NoteItem from './NoteItem';
const AddNote = () => {
    const context = useContext(noteContext);
    const {Addnote,notes} = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleadd = () => {
        Addnote(note.title,note.description,note.tag('default'));
    }
    const onchange = (e) => {
        e.preventDefault();
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onchange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleadd}>Submit</button>
                </form>

            </div>
            <div className="row my-3">
            <h2>Your Notes</h2> 
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note}/>  
            })}
        </div>
        </div>
    )
}
export default AddNote
