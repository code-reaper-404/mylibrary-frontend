import React from "react";
import "./DataTile.css";
import DefaultBook from './../../assets/default-book.svg'

const DataTile = ({ data }) => {
  return (
    <div className="data-item-card">
      <div className="book-img-sec">
        <img
          src={data.imageURL || DefaultBook}
          alt={data.title}
        />
      </div>

      <div className="book-details-sec">
        <h3 className="book-title">{data.title}</h3>
        <p className="author-name">by {data.author}</p>

        <div className="book-meta">
          {data.genre && <span className="genre">{data.genre.name || data.genre}</span>}
          {data.year && <span className="year">{data.year}</span>}
        </div>

        <p className="description">
          {data.description ? data.description.slice(0, 80) + "..." : "No description"}
        </p>

        <div className="book-footer">
          {data.price && <span className="price">₹{data.price}</span>}
          {data.pages && <span className="pages">{data.pages} pages</span>}
        </div>
      </div>
    </div>
  );
};

export default DataTile;
