import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard/NoteCard';
import { getNotes } from '../services/ApiService';
import './CSS/Notes.css'
import AddNote from '../components/AddNote/AddNote';

const Notes = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [noteData, setNoteData] = useState([]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNoteData(data.data)
    } catch (error) {
      console.log("error during fetching notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className='notes-sec'>
      <button className='add-btn' onClick={() => setPopupVisible(true)}>Add Note</button>
      {popupVisible && (
        <div className="add-note-div">
          <AddNote>
            <button className='close-btn' onClick={() => setPopupVisible(false)}> X </button>
          </AddNote>
        </div>
      )}

      <div className="notes-grid">
        {
          noteData.length > 0 ? (
            noteData.map((note, index) => (
              <NoteCard key={index} data={note} />
            ))
          ) : (
            <span>"no notes found"</span>
          )
        }

      </div>

    </div>
  )
}

export default Notes