import React, { useEffect, useState } from 'react'
import './CSS/bookShelf.css'
import { wishlistApi } from '../services/ApiService'
import DataTile from '../components/DataTile/DataTile';
import AddBook from '../components/AddBook/AddBook';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const fetchWishlist = async () => {
    try {
      const data = await wishlistApi();
      setWishlist(data.data.books);
    } catch (error) {
      console.log("Error fetching wishlist api: ", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className='bookshelf-sec'>
      {/* <span className="head-txt">BookShelf</span> */}
      <button className='add-btn' onClick={() => setPopupVisible(true)}>Add Book</button>
      {popupVisible && (
        <div className="add-book-div">
          <AddBook section={"Wishlist"}>
            <button className='add-btn' onClick={() => setPopupVisible(false)}> X </button>
          </AddBook>
        </div>

      )}

      <div className="bookshelf-grid">
        {
          wishlist.length > 0 ? (
            wishlist.map((book, index) => (
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

export default Wishlist;