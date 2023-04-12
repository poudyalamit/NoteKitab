// import React, { useState } from 'react'
import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [ ]
    const [notes, setNotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async() => {
        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYzVhZTM5MjU0OTBlNjhhYmE5MzNiIn0sImlhdCI6MTY3ODUzMTM0MH0.n6GnXg9iYysXu0XzwAbrMWHzLMBls-XxtFDDK5DoQOo"
            }
        });
        const json=await response.json();
        
        setNotes(json)
    } 
    //Add a note
    const addNote = async(title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYzVhZTM5MjU0OTBlNjhhYmE5MzNiIn0sImlhdCI6MTY3ODUzMTM0MH0.n6GnXg9iYysXu0XzwAbrMWHzLMBls-XxtFDDK5DoQOo"
            },
            body: JSON.stringify({title,description,tag}), 
        });
        const note = {
            "_id": "61322f119553781a8ca8d0e08",
            "user": "6131dc5e3e4037cd4734a0664",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
          };
        setNotes(notes.concat(note))
        const json=response.json();
        console.log(json);
    }
    //Delete a note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYzVhZTM5MjU0OTBlNjhhYmE5MzNiIn0sImlhdCI6MTY3ODUzMTM0MH0.n6GnXg9iYysXu0XzwAbrMWHzLMBls-XxtFDDK5DoQOo"
            },
             
        });
        const json =response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }


    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYzVhZTM5MjU0OTBlNjhhYmE5MzNiIn0sImlhdCI6MTY3ODUzMTM0MH0.n6GnXg9iYysXu0XzwAbrMWHzLMBls-XxtFDDK5DoQOo"
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json= await response.json();
        console.log(json);

        let newNotes=JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;

                break;
            }
        }
        setNotes(newNotes); 
    }


        return (
            <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
                {props.children}
            </noteContext.Provider>
        )
    
}


    export default NoteState;