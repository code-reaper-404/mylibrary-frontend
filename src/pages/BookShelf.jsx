import React, { useEffect, useState } from 'react'
import './CSS/bookShelf.css'
import { bookShelfApi } from '../services/ApiService'
import DataTile from '../components/DataTile/DataTile';
import AddBook from '../components/AddBook/AddBook';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const BookShelf = () => {
  const [bookShelf, setBookShelf] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchBookShelf = async () => {
    try {
      const data = await bookShelfApi();
      setBookShelf(data.data.books);
    } catch (error) {
      console.log("Error fetching bookshelf api: ", error);
    } finally {
      setLoading(false); // always stop loader
    }
  };

  useEffect(() => {
    fetchBookShelf();
  }, []);

  if (loading) return <Loader color={"#4cc9f0"} />;

  return (
    <div className='bookshelf-sec'>
      {/* <span className="head-txt">BookShelf</span> */}
      <button className='add-btn' onClick={() => setPopupVisible(true)}>Add Book</button>
      {popupVisible && (
        <div className="add-book-div">
          <AddBook section="BookShelf">
            <button className='add-btn' onClick={() => setPopupVisible(false)}> X </button>
          </AddBook>
        </div>

      )}

      <div className="bookshelf-grid">
        {
          bookShelf.length > 0 ? (
            bookShelf.map((book, index) => (
              <Link to={`/book/${book._id}`} key={index} >
                <DataTile data={book} />
              </Link>
            ))
          ) : (
            <p>No books found in your shelf.</p>
          )}
      </div>
    </div>
  );
};

export default BookShelf;