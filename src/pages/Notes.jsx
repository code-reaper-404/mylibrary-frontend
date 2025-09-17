import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard/NoteCard';
import { getNotes } from '../services/ApiService';
import './CSS/Notes.css';
import AddNote from '../components/AddNote/AddNote';
import Loader from '../components/Loader/Loader';

const Notes = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNoteData(res.data);
    } catch (error) {
      console.log('error during fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <Loader color={"#ffbe0b"} />;

  return (
    <div className='notes-sec'>
      <button
        className='add-btn'
        onClick={() => {
          setEditingNote(null);   // ensure Add mode
          setPopupVisible(true);
        }}
      >
        Add Note
      </button>

      {popupVisible && (
        <div className="add-note-div">
          <AddNote
            note={editingNote}
            onClose={() => setPopupVisible(false)}
            onSaved={fetchNotes}
          >
            {/* optional close button passed as children */}
            <button className='close-btn' onClick={() => setPopupVisible(false)}> X </button>
          </AddNote>
        </div>
      )}

      <div className="notes-grid">
        {noteData.length > 0 ? (
          noteData.map((note) => (
            // wrap the NoteCard so clicking opens edit modal and sets the note
            <div
              key={note._id}
              onClick={() => {
                setEditingNote(note);
                setPopupVisible(true);
              }}
            >
              <NoteCard data={note} />
            </div>
          ))
        ) : (
          <span>No notes found</span>
        )}
      </div>
    </div>
  );
};

export default Notes;
