import React from 'react'
import { FaEdit, FaTrashAlt } from "react-icons/fa";
const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className='col md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                    <h5 className="card-title">{note.title}</h5>
                <i className='mx-2'><FaTrashAlt/></i>
                <i className='mx-2'><FaEdit/></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default NoteItem
