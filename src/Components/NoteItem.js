import React, { useContext } from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import noteContext from '../Context/notes/noteContext';

const NoteItem = (props) => {
    const { note ,updateNote} = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className='mx-2' onClick={() => { deleteNote(note._id);
                        props.showalert("Deleted Successfully", "success"); }}><FaTrashAlt /></i>
                        <i className='mx-2' onClick={()=>{updateNote(note)}}><FaEdit /></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default NoteItem
