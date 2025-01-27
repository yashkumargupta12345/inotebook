import React, { useState } from 'react';
import  NoteContext from './noteContext';

const NoteState = (props) => {
    const notesInitial = [
            {
              "_id": "679662e6e7fb0eae85a0fb80",
              "user": "679510d29b74334b135a16d9",
              "title": "This is title",
              "description": "Wake up too Early",
              "tag": "Personal",
              "date": "2025-01-26T16:29:26.285Z",
              "__v": 0
            },
            {
              "_id": "679662f2e7fb0eae85a0fb82",
              "user": "679510d29b74334b135a16d9",
              "title": "This is another title",
              "description": "Wake up too Early",
              "tag": "Personal",
              "date": "2025-01-26T16:29:38.992Z",
              "__v": 0
            }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;