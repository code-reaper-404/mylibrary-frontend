import React, { useState, useEffect } from "react";
import { addNote, updateNote, deleteNote } from "../../services/ApiService";
import "./AddNote.css";
import { toast } from "react-toastify";

const AddNote = ({ children, note, onClose, onSaved }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    book: "",
    pageNo: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (note) {
      setForm({
        title: note.title || "",
        description: note.description || "",
        book: note.book || "",
        pageNo: note.pageNo || ""
      });
    } else {
      // reset for add mode
      setForm({ title: "", description: "", book: "", pageNo: "" });
    }
  }, [note]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (note && note._id) {
        // Update flow
        const res = await updateNote(form,note._id);
        if (res.status !== 200) throw new Error(res.data?.message || "Failed to update note");

        toast.success("Note updated successfully!", { autoClose: 1500 });
      } else {
        // Add flow
        const res = await addNote(form);
        if (res.status !== 201) throw new Error(res.data?.message || "Failed to add note");

        toast.success("Note added successfully!", { autoClose: 1500 });
      }

      // notify parent to refresh list
      if (typeof onSaved === "function") {
        await onSaved();
      }

      // close modal if provided
      if (typeof onClose === "function") onClose();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!note || !note._id) return;
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setLoading(true);
    setError("");

    try {
      const res = await deleteNote(note._id);
      if (res.status !== 200) throw new Error(res.data?.message || "Failed to delete note");

      toast.success("Note deleted successfully!", { autoClose: 1500 });

      if (typeof onSaved === "function") await onSaved();
      if (typeof onClose === "function") onClose();
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-note-form">
      {children}
      <form onSubmit={handleSubmit} className="note-form">
        <h3>{note ? "Edit Note" : "Add Note"}</h3>

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Book:</label>
          <input
            type="text"
            name="book"
            value={form.book}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Page No:</label>
          <input
            type="text"
            name="pageNo"
            value={form.pageNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? (note ? "Updating..." : "Adding...") : (note ? "Update Note" : "Add Note")}
          </button>
          {onClose && (
            <button type="button" className="cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
          )}
          {note && (
            <button type="button" className="delete" onClick={handleDelete} disabled={loading}>
              Delete
            </button>
          )}
        </div>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddNote;
