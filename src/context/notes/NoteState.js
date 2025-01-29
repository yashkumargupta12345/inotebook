import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:6000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial)

  const getNotes = async() => {
    // Api call
    try{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "auth-token": "localStorage.getItem('token')"
      }});
    const json = await response.json();
    setNotes(json)
    console.log(json)
    }
    catch(error){
      console.log("error occured while fetching notes", error);
    }
  }

  // add a new note
  const addNote = async(title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTEwZDI5Yjc0MzM0YjEzNWExNmQ5In0sImlhdCI6MTczNzgyMjQxOH0.6Bw_KbIwhoce5V5SnyZGUNsW4PKUgqcEv9kgTxlTjik"
      }, body: JSON.stringify(title, description, tag)});

      const note = await response.json();
      setNotes(notes.concat(note))
  }

  // delete a new note
  const deleteNote = async(id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTEwZDI5Yjc0MzM0YjEzNWExNmQ5In0sImlhdCI6MTczNzg0MDM5OH0.w0OhFkfOpHuBVVy7aMvOs_NOppDJqoX_G0C0eBo16e8"
      }})
          // const resp =  response.json();

  // logic to delete a note
    console.log("deleting the note with id: "+  id);
    const newNotes = notes.filter((note)=> {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  // edit a new note
  const editNote = async(id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTEwZDI5Yjc0MzM0YjEzNWExNmQ5In0sImlhdCI6MTczNzg0MDM5OH0.w0OhFkfOpHuBVVy7aMvOs_NOppDJqoX_G0C0eBo16e8"
      }, body: JSON.stringify(title, description, tag)})
          // const resp =  await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic to edit in Note
    for(let index=0; index<newNotes.length; index++){
      let element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description= description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;