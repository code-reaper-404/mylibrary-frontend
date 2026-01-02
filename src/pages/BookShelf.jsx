import React, { useEffect, useState } from 'react';
import './CSS/bookShelf.css';
import { bookShelfApi } from '../services/ApiService';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import DataTile from '../components/DataTile/DataTile';

const BookShelf = () => {
  const [bookShelf, setBookShelf] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBookShelf = async () => {
    try {
      const data = await bookShelfApi();
      setBookShelf(data.data.books);
    } catch (error) {
      console.log('Error fetching bookshelf api: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookShelf();
  }, []);

  if (loading) return <Loader color="#4cc9f0" />;

  return (
    <div className="bookshelf-sec">

      {/* Header */}
      <div className="bookshelf-header">
        <button className="add-btn" onClick={() => navigate('/add-book')}>
          + Add Book
        </button>
      </div>

      {/* Grid */}
      <div className="bookshelf-grid">
        {bookShelf.length > 0 ? (
          bookShelf.map((book) => (
              <DataTile data={book} />
          ))
        ) : (
          <p>No books found in your shelf.</p>
        )}
      </div>

    </div>
  );
};

export default BookShelf;
