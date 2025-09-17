import React, { useState } from "react";
import { addGenre } from "../../services/ApiService";
import "./AddGenre.css";

const AddGenre = ({ children }) => {
  const [form, setForm] = useState({
    name: "",
    color: "#000000", // default black
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setForm({ ...form, color: e.target.value });
  };

  const handleTextChange = (e) => {
    let value = e.target.value;
    if (/^#([0-9A-Fa-f]{0,6})$/.test(value)) {
      setForm({ ...form, color: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await addGenre(form);
      if (res.status !== 201) throw new Error("Failed to add genre");

      setSuccess("Genre added successfully!");
      setForm({ name: "", color: "#000000" });
      setTimeout(()=>{
        window.location.reload();
      },1500)
    } catch (err) {
      setError(err.message || "Error adding genre");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-genre-form">
      {children}
      <form onSubmit={handleSubmit} className="genre-form">
        <div className="form-group">
          <label>Genre Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group color-picker">
          <label>Color:</label>
          <div className="color-input-wrapper">
            {/* Color Picker */}
            <input
              type="color"
              value={form.color}
              onChange={handleColorChange}
            />

            {/* Hex Input */}
            <input
              type="text"
              className="color-code"
              value={form.color}
              onChange={handleTextChange}
              maxLength={7}
              placeholder="#000000"
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Genre"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default AddGenre;