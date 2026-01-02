import React, { useEffect, useState } from 'react';
import { addBooktoSehlf, getGenre, getBookById, updateBook } from '../../services/ApiService';
import './AddBook.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const AddBooks = ({ section }) => {
    const { id } = useParams(); // id exists => edit mode
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

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
    });

    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    /* ---------------- FETCH GENRES ---------------- */
    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const data = await getGenre();
                setGenres(data.data);
            } catch (err) {
                console.log('Error fetching genre:', err);
            }
        };
        fetchGenre();
    }, []);

    /* ---------------- FETCH BOOK (EDIT MODE) ---------------- */
    useEffect(() => {
        if (!isEditMode) return;

        const fetchBook = async () => {
            try {
                setLoading(true);
                const res = await getBookById(id);
                const book = res.data.Book;

                setForm({
                    imageURL: book.imageURL || '',
                    genre: book.genre?._id || book.genre || '',
                    year: book.year || '',
                    title: book.title || '',
                    author: book.author || '',
                    isbn: book.isbn || '',
                    published: book.published || '',
                    bookList: section,
                    price: book.price || '',
                    description: book.description || '',
                    pages: book.pages || '',
                    status: book.status || '',
                    source: book.source || '',
                    language: book.language || '',
                });
            } catch (err) {
                setError('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, isEditMode, section]);

    /* ---------------- INPUT HANDLER ---------------- */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let res;

            if (isEditMode) {
                console.log(id);
                res = await updateBook(form,id);

                toast.success('Book updated successfully!');
            } else {
                res = await addBooktoSehlf(form);
                toast.success('Book added successfully!');
            }

            if (!res) throw new Error('Request failed');

            setTimeout(() => navigate(-1), 1200);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-book-form">
            <form onSubmit={handleSubmit} className="book-form">

                <div className="form-group">
                    <label>Title</label>
                    <input name="title" value={form.title} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input name="author" value={form.author} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input name="imageURL" value={form.imageURL} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <select name="genre" value={form.genre} onChange={handleChange} required>
                        <option value="" disabled>-- Select Genre --</option>
                        {genres.map((g) => (
                            <option key={g._id} value={g._id}>{g.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Language</label>
                    <select name="language" value={form.language} onChange={handleChange} required>
                        <option value="" disabled>-- Select Language --</option>
                        <option value="Tamil">Tamil</option>
                        <option value="English">English</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Year</label>
                    <input name="year" value={form.year} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Pages</label>
                    <input name="pages" value={form.pages} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input name="price" value={form.price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="" disabled>-- Select Status --</option>
                        <option value="1">To Read</option>
                        <option value="2">Reading</option>
                        <option value="3">Completed</option>
                        <option value="4">Dropped</option>
                    </select>
                </div>

                <div className="form-group full-width">
                    <label>Description:</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required></textarea>
                </div>

                <div className="form-actions">
                    <button className='form-btns cancel' type="button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className='form-btns save' type="submit" disabled={loading}>
                        {loading
                            ? isEditMode ? 'Updating...' : 'Adding...'
                            : isEditMode ? 'Update Book' : 'Add Book'}
                    </button>
                </div>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default AddBooks;
