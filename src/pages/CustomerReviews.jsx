import React, { useState, useEffect } from 'react';
import '../styles/CustomerReviews.css';

const CustomerReviews = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://bookbazaar-rating-service.onrender.com/reviews/show?bookId=${bookId}`);
        const data = await response.json();
        if (data.statusCode === 200) {
          setReviews(data.dataObject.Reviews);
        } else {
          console.error('Error fetching reviews:', data.errorObject);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <div className="customer-reviews-container">
      <h3>Our top customer reviews on this book</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <div className="user-info">
            <div className="user-icon">F</div>
            <div className="user-name">{review.firstName} {review.lastName}</div>
          </div>
          <div className="rating">
            {Array.from({ length: review.rating }, (_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
          </div>
          <p className="comments">{review.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerReviews;
