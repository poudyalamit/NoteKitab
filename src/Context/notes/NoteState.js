import React, { useState } from 'react'
import noteContext from './noteContext';

const NoteState=(props)=>{
    const s1= {
        "name":'jodds',
        "roll":"43"
    }
    const [state, setState]=useState(s1);
    const update =()=>{
        setTimeout(()=>{
            setState(
            {"name":'godds',
            "roll":"49"})
        },1000);
    }
    return (
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;