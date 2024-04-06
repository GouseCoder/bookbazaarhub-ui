// Wishlist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { checkToken } from '../utils/auth';
import { SHOW_WISHLIST_API_URL } from '../utils/ApiList';
import BookCard from '../components/BookCard/BookCard';
import Modal from '../utils/Modal';
import '../styles/Wishlist.css';

const Wishlist = () => {
  const token = checkToken();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [wishlistData, setWishlistData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) throw new Error('User not authenticated');
        const response = await axios.get(`${SHOW_WISHLIST_API_URL}?userId=${userId}`, { withCredentials: true });
        setWishlistData(response.data.dataObject);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();

    return () => {
      setWishlistData({});
      setError(null);
    };
  }, [token, userId]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleCloseModal = () => {
    setError(null);
  };

  return (
    <div>
      {error && <Modal message={error} onClose={handleCloseModal} />}
      {wishlistData?.wishList && (
        <div>
          <h2 className="label-header">Checkout the items you like</h2>
          <div className="wishlist-books">
            {wishlistData.wishList.map((wishlistItem) => (
              <Link key={wishlistItem.Book.bookId} to={`/book/${wishlistItem.Book.bookId}`} className="book-link">
                <BookCard book={wishlistItem.Book} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
