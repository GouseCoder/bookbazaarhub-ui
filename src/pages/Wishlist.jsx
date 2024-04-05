// Wishlist.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'; // Import Redirect
import { checkToken } from '../utils/auth';
import BookCard from '../components/BookCard/BookCard';
import '../styles/Wishlist.css';

const Wishlist = () => {
  
  const token = checkToken();
  const userId = localStorage.getItem('userId');

  const [wishlistData, setWishlistData] = useState(null);
  const [authenticated, setAuthenticated] = useState(true); // State to manage authentication status

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://bookbazaar-book-service.onrender.com/books/wishlist/show?userId=${userId}`, { withCredentials: true });
          setWishlistData(response.data.dataObject);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    } else {
      setAuthenticated(false); // If token doesn't exist, set authentication status to false
    }
  }, [token, userId]);
  

  return (
    <div>
      {token && ( // Render the message only if the user is authenticated
        <div>
          <div>
            <h2 className="label-header">Checkout the items you like</h2>
            <div className="wishlist-books">
              {renderBooks(wishlistData?.wishList)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const renderBooks = (books) => {
  return (
    books?.map((wishlistItem) => (
      <Link key={wishlistItem.Book.bookId} to={`/book/${wishlistItem.Book.bookId}`} className="book-link">
        <BookCard book={wishlistItem.Book} />
      </Link>
    ))
  );
};

export default Wishlist;
