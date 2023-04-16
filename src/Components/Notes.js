import React, { useContext,useState, useEffect, useRef } from 'react'
import noteContext from '../Context/notes/noteContext';
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        getNotes();
    }, [])
    const [note, setNote] = useState({ id: '',etitle: "", edescription: "", etag: "" })
    const ref = useRef(null);
    const refclose=useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});  
    }
    const handleupdate = () => {
        refclose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        props.showalert("Updated Successfully", "success");
    }
    const onchange = async (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }
    return (
        <>
            <AddNotes showalert={props.showalert}/>
            <button className='d-none btn btn-primary' ref={ref} type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription"  value={note.edescription} onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange}  required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleupdate} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showalert={props.showalert}/>
                })}
            </div>
        </>
    )
}

export default Notes