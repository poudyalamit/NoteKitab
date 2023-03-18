// import React, { useState } from 'react'
import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "640cc15c386ddd2c38b26a6d",
            "user": "640c5ae3925490e68aba933b",
            "title": "New Note",
            "description": "Go for it",
            "tag": "general",
            "date": "2023-03-11T17:58:52.699Z",
            "__v": 0
        },
        {
            "_id": "640cc34286f230f8c78b1553",
            "user": "640c5ae3925490e68aba933b",
            "title": "My Title",
            "description": "Let's goo",
            "tag": "personal",
            "date": "2023-03-11T18:06:58.418Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <noteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;