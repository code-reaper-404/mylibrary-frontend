import React from "react";
import "./DataTile.css";
import DefaultBook from "./../../assets/default-book.svg";
import { Link, useNavigate } from "react-router-dom";

const DataTile = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="data-item-card">

      {/* Book Cover */}
      <div className="book-img-sec">
        <img
          src={data.imageURL || DefaultBook}
          alt={data.title}
        />
      </div>

      {/* Book Info */}
      <div className="book-details-sec">
        <h3 className="book-title" title={data.title}>
          {data.title}
        </h3>

        <p className="author-name">by {data.author}</p>

        <div className="book-meta">
          {data.genre && (
            <span className="genre">
              {data.genre.name || data.genre}
            </span>
          )}
          {data.year && <span className="year">{data.year}</span>}
        </div>

        <div className="book-footer">
          {data.price && <span className="price">₹{data.price}</span>}
          {data.pages && <span className="pages">{data.pages} pages</span>}
        </div>

        <div className="book-actions">
          <button className="view-btn" onClick={() => navigate(`/book/${data._id}`)}>View</button>
          <button className="edit-btn" onClick={() => navigate(`/add-book/${data._id}`)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default DataTile;
