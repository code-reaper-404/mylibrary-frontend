import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook, deleteBook } from "../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/BookPage.css";
import DefaultBook from './../assets/default-book.svg'

const BookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const res = await getBookById(id);
                setBook(res.data.Book);
            } catch (err) {
                setError("Failed to fetch book details");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) return <p className="loading">Loading book details...</p>;
    if (error) return <p className="error">{error}</p>;

    const handleBookMove = async (bookList) => {
        try {
            setDisableBtn(true);
            const updatedData = { bookList };

            const response = await updateBook(updatedData, id);

            if (response.status !== 201) {
                toast.error("Failed to move book!", { autoClose: 2000 });
                setDisableBtn(false);
            } else {
                toast.success(
                    bookList === "Wishlist"
                        ? "Book moved to Wishlist"
                        : "Book moved to BookShelf",
                    {
                        position: "top-right",
                        autoClose: 1500,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        theme: "light",
                    }
                    ,);

                setTimeout(() => {
                    navigate(
                        bookList === "Wishlist" ? "/wish-list" : "/book-shelf",
                        { replace: true }
                    );
                }, 3000);
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 2000 });
            setDisableBtn(false);
        }
    };

    const handleDelete = async () => {
        // if (!window.confirm("Are you sure you want to delete this book?")) return;

        try {
            setDisableBtn(true);
            const response = await deleteBook(id);

            if (response.status !== 201) {
                toast.error("Failed to delete book!", { autoClose: 2000 });
                setDisableBtn(false);
            } else {
                toast.success("Book deleted successfully!", {
                    position: "top-right",
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate("/book-shelf", { replace: true });
                }, 1500);
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 2000 });
            setDisableBtn(false);
        }
    };

    const statusMap = {
        1: "To Read",
        2: "Reading",
        3: "Completed",
        4: "Dropped"
    };

    return (
        <div className="book-page">
            {showDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Delete Book</h3>
                        <p>Are you sure you want to delete <strong>{book.title}</strong>?</p>
                        <div className="modal-actions">
                            <button
                                className="confirm-btn"
                                onClick={handleDelete}
                                disabled={disableBtn}
                            >
                                {disableBtn ? "Deleting..." : "Yes, Delete"}
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={disableBtn}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {book ? (
                <div className="book-card">
                    <div className="book-image">
                        <img src={book.imageURL || DefaultBook} alt={book.title} />
                    </div>
                    <div className="book-details">
                        <h1>{book.title}</h1>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre?.name}</p>
                        <p><strong>Published:</strong> {book.year}</p>
                        <p><strong>Pages:</strong> {book.pages}</p>
                        <p><strong>Price:</strong> ₹{book.price}</p>
                        <p><strong>Status:</strong> {statusMap[book.status] || "Unknown"}</p>
                        <p className="book-description">{book.description}</p>
                        <div className="book-btn-sec">
                            <button
                                className={`delete-button ${disableBtn ? "diabled-btn" : ""} `}
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={disableBtn}
                            >
                                Delete Book
                            </button>
                            {book.bookList === "BookShelf" ? (
                                <button
                                    className={`buy-button ${disableBtn ? "diabled-btn" : ""} `}
                                    onClick={() => handleBookMove("Wishlist")}
                                    disabled={disableBtn}
                                >
                                    Move to Wishlist
                                </button>
                            ) : (
                                <button
                                    className={`buy-button ${disableBtn ? "diabled-btn" : ""} `}
                                    onClick={() => handleBookMove("BookShelf")}
                                    disabled={disableBtn}
                                >
                                    Move to BookShelf
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            ) : (
                <p>No book found</p>
            )}


        </div>
    );
};

export default BookPage;
