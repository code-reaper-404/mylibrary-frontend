import React from 'react'
import './NoteCard.css';

const NoteCard = ({ data }) => {
    return (
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title">{data.title}</h3>
                <span className="note-date">{new Date(data.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="note-content">
                <p>{data.description}</p>
            </div>
            <span className="note-bookname">From the {data.pageNo}th page of <strong>{data.book}</strong></span>


        </div>
    )
}

export default NoteCard