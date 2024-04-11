// StarRatingModal.js
import React, { useState } from 'react';
import '../styles/StarRatingModal.css';

const StarRatingModal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  const handleSubmitRating = () => {
    onSubmit(selectedRating);
  };

  return (
    <div className={isOpen ? "modal open" : "modal"} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Rate this book</h2>
        <div className="star-container">
          {[1, 2, 3, 4, 5].map((starCount) => (
            <span
              key={starCount}
              className={starCount <= selectedRating ? "star filled" : "star"}
              onClick={() => handleStarClick(starCount)}
            >
              ★
            </span>
          ))}
        </div>
        <button onClick={handleSubmitRating}>Submit Rating</button>
      </div>
    </div>
  );
};

export default StarRatingModal;
