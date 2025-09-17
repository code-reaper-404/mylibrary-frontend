import React, { useState } from "react";
import { addNote } from "../../services/ApiService";
import "./AddNote.css";
import { toast } from "react-toastify";

const AddNote = ({ children }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    book: "",
    pageNo: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await addNote(form);

      if (res.status !== 201) throw new Error("Failed to add note");

      toast.success("Note added successfully!",
        {
          position: "top-right",
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
      setForm({ title: "", content: "" }); // reset form
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message || "Error adding note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-note-form">
      {children}
      <form onSubmit={handleSubmit} className="note-form">
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
          ></textarea>
        </div>
        <div className="form-group">
          <label>Book:</label>
          <input
            type="text"
            name="book"
            value={form.book}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Page No:</label>
          <input
            type="text"
            name="pageNo"
            value={form.pageNo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Note"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default AddNote;
