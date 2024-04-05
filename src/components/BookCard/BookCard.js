import React, { useState, useEffect } from 'react';
import StarRating from '../../utils/Starrating';
import { storage } from '../../utils/firebase';
import './BookCard.css';

const BookCard = ({ book }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = storage.refFromURL(book.imgUrl);
        const url = await imageRef.getDownloadURL();
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to fetch image URL:', error);
      }
    };

    fetchImageUrl();

    return () => {
      // Cleanup function
    };
  }, [book.imgUrl]);

  return (
    <div className="book-card">
      <div className="book-image">
        <img src={imageUrl} alt={book.bookName} />
      </div>
      <div className="book-details">
        <h3>{book.bookName}</h3>
        <p className="author">by {book.bookAuthorName}</p>
        <div className="ratings">
          <StarRating rating={book.bookRatingStar} />
        </div>
        <p className="price">Price: {book.price}</p>
      </div>
    </div>
  );
};

export default BookCard;
