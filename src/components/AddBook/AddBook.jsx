import React, { useEffect, useState } from 'react'
import { addBooktoSehlf, getGenre } from '../../services/ApiService';
import './AddBook.css'
import { toast } from 'react-toastify';

const AddBookss = ({ children, section }) => {
    const [form, setForm] = useState({
        imageURL: '',
        genre: '',
        year: '',
        title: '',
        author: '',
        isbn: '',
        published: '',
        bookList: section,
        price: '',
        description: '',
        pages: '',
        status: '',
        source: '',
        language: '',
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [genres, setGenres] = useState([])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        try {
            const fetchGenre = async () => {
                const data = await getGenre();
                setGenres(data.data);
            }
            fetchGenre();
        } catch (error) {
            console.log("Error fetching genre: ", error);
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const res = await addBooktoSehlf(form);

            if (res.status != 201) throw new Error('Failed to add book');
            toast.success("Book added successfully!",
                {
                    position: "top-right",
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                });
            setForm({
                imageURL: '',
                genre: '',
                year: '',
                title: '',
                author: '',
                isbn: '',
                published: '',
                bookList: section,
                price: '',
                description: '',
                pages: '',
                status: '',
                source: '',
                language: '',
            })
            setTimeout(() => { window.location.reload() }, 1500);

        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='add-book-form'>
            {children}
            <form onSubmit={handleSubmit} className="book-form">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" value={form.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Author:</label>
                    <input type="text" name="author" value={form.author} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" name="imageURL" value={form.imageURL} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Genre:</label>
                    <select name="genre" value={form.genre} onChange={handleChange} required>
                        <option value="" disabled>
                            -- Select Genre --
                        </option>
                        {genres && genres.length > 0 ? (
                            genres.map((genre) => (
                                <option key={genre._id} value={genre._id}>
                                    {genre.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No Genre Available
                            </option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label>Language:</label>
                    <select name="language" value={form.language} onChange={handleChange} required >
                        <option value="" disabled>
                            -- Select Language --
                        </option>
                        <option value="Tamil">Tamil</option>
                        <option value="English">English</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Published Year:</label>
                    <input type="text" name="year" value={form.year} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Pages:</label>
                    <input type="number" name="pages" value={form.pages} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} required />
                </div>

                <div className="form-group full-width">
                    <label>Description:</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
                </div>

                <div className="form-group">
                    <label>Source:</label>
                    <input type="text" name="source" value={form.source} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select name="status" value={form.status} onChange={handleChange} required>
                        <option value="" disabled>
                            -- Select Status --
                        </option>
                        <option value="1">To Read</option>
                        <option value="2">Reading</option>
                        <option value="3">Completed</option>
                        <option value="4">Dropped</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Book'}
                </button>

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>

        </div>
    )
}

export default AddBookss