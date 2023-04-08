// import React, { useState } from 'react'
import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [
    ]
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
        console.log(json)
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
            body: JSON.stringify(title,description,tag), 
        });
        console.log("Adding notes")
        const note = {
            "_id": "640cc34286f230f822c78b1553",
            "user": "640c5ae3925490e68aba933b",
            "title": "My Title",
            "description": "Let's goo",
            "tag": "personal",
            "date": "2023-03-11T18:06:58.418Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    //Delete a note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }


    //Wdit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYzVhZTM5MjU0OTBlNjhhYmE5MzNiIn0sImlhdCI6MTY3ODUzMTM0MH0.n6GnXg9iYysXu0XzwAbrMWHzLMBls-XxtFDDK5DoQOo"
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json = response.json();


        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }
        }



        return (
            <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
                {props.children}
            </noteContext.Provider>
        )
    }
}


    export default NoteState;