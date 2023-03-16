import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
function About() {
    const a= useContext(noteContext)
    useEffect(()=>{
       a.update() 
    },[])
    return (
        <div>
         this is about {a.state.name} and his rollno is {a.state.roll}
        </div>
    )
}

export default About
