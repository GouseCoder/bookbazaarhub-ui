import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Book.css';
import MessageModal from '../utils/Modal';
import { checkToken } from '../utils/auth';
import StarRatingModal from '../utils/StarRatingModal';
import CustomerReviews from '../pages/CustomerReviews';
import Favorite from '@mui/icons-material/Favorite';

const Book = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [showStarRatingModal, setShowStarRatingModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
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
      setShowMessageModal(true);
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
        setShowMessageModal(true);
      })
      .catch(error => console.error('Error adding to wishlist:', error));
  };

  const handleAddToCart = () => {
    if (!token) {
      setModalMessage('Please log in to add to cart.');
      setShowMessageModal(true);
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
        setShowMessageModal(true);
      })
      .catch(error => console.error('Error adding to cart:', error));
  };

  const handleAddReview = () => {
    setShowStarRatingModal(true);
  };

  const handleStarRatingSubmit = (selectedRating) => {
    setRating(selectedRating);
    setShowStarRatingModal(false);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  const handleReviewSubmit = () => {
    fetch('https://bookbazaar-rating-service.onrender.com/reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        rating,
        bookId,
        comments: review
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 200 && data.dataObject.errorCode === 207) {
          setModalMessage(data.dataObject.errorReason);
          setShowMessageModal(true);
        } else {
          setModalMessage('An error occurred');
          setShowMessageModal(true);
        }
      })
      .catch(error => console.error('Error submitting review:', error));
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-container">
      {showMessageModal && <MessageModal message={modalMessage} onClose={handleCloseMessageModal} />}
      {showStarRatingModal && <StarRatingModal onClose={() => setShowStarRatingModal(false)} onSubmit={handleStarRatingSubmit} />}
      <div className="book-details-container">
        <div className="book-image-container">
          <img className="book-image" src={bookDetails.imgUrl} alt={bookDetails.name} />
          <button className="wishlist-btn" onClick={handleAddToWishlist}>
            <Favorite color="error" />
          </button>
        </div>
        <div className="book-details">
          <h2>{bookDetails.bookName}</h2>
          <p>By: {bookDetails.bookAuthorName}</p>
          <p>Price: {bookDetails.price}</p>
          <p className="description">Description: {bookDetails.bookDesc}</p>
          <div className="rating">
            {Array.from({ length: bookDetails.bookRatingStar }, (_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
          </div>
          <div className="buttons">
            <button onClick={handleAddReview}>Add Review</button>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
          {rating > 0 && (
            <div>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write your review here..." />
              <button onClick={handleReviewSubmit}>Submit Review</button>
            </div>
          )}
        </div>
      </div>

      <CustomerReviews bookId={bookId} />

    </div>
  );
};

export default Book;
