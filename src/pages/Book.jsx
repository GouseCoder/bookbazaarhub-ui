import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Book.css';
import Modal from '../utils/Modal';
import { checkToken } from '../utils/auth';

const Book = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const token = checkToken();
  let userId = '';

  if (token) {
    userId = localStorage.getItem('userId');
  }

  const url = userId ? `https://bookbazaar-book-service.onrender.com/books/view?bookId=${bookId}&userId=${userId}` : `http://localhost:8082/books/view?bookId=${bookId}`;

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setBookDetails(data.dataObject.bookDetails))
      .catch(error => console.error('Error fetching book details:', error));
  }, [bookId, userId, url]);

  const handleAddToWishlist = () => {
    if (!token) {
      setModalMessage('Please log in to add to wishlist.');
      setShowModal(true);
      return;
    }
    
    fetch('https://bookbazaar-book-service.onrender.com/books/wishlist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, bookId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.statusCode === 200 && data.dataObject.errorCode === 203) {
        setModalMessage('Added to Wishlist');
      } else if (data.statusCode === 200 && data.errorObject.errorCode === 202) {
        setModalMessage('Product Already in Wishlist');
      } else {
        setModalMessage('An error occurred');
      }
      setShowModal(true);
    })
    .catch(error => console.error('Error adding to wishlist:', error));
  };

  const handleAddToCart = () => {
    if (!token) {
      setModalMessage('Please log in to add to cart.');
      setShowModal(true);
      return;
    }
    
    fetch('https://bookbazaar-cart-service.onrender.com/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId, bookId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.statusCode === 200 && data.dataObject.errorCode === 203) {
        setModalMessage('Added to Cart');
      } else if (data.statusCode === 200 && data.errorObject.errorCode === 202) {
        setModalMessage('Product Already in Cart');
      } else {
        setModalMessage('An error occurred');
      }
      setShowModal(true);
    })
    .catch(error => console.error('Error adding to cart:', error));
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRateBook = () => {
    // Handle rating the book
  };

  const handleAddReview = () => {
    // Handle adding review
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-container">
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
      <div className="book-image-container">
        <img className="book-image" src={bookDetails.imgUrl} alt={bookDetails.name} />
      </div>

      <div className="book-details">
        <h2>{bookDetails.bookName}</h2>
        <p>By: {bookDetails.bookAuthorName}</p>
        <p>Price: {bookDetails.price}</p>
        <p className="description">Description: {bookDetails.bookDesc}</p>
        <div className="ratings">
          <label htmlFor="rating">Rate this book:</label>
          <select id="rating" value={rating} onChange={handleRatingChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="review">
          <label htmlFor="review">Add a review:</label>
          <textarea id="review" value={review} onChange={handleReviewChange}></textarea>
        </div>
        <div className="buttons">
          <button onClick={handleRateBook}>Rate Book</button>
          <button onClick={handleAddReview}>Add Review</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleAddToWishlist}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default Book;
