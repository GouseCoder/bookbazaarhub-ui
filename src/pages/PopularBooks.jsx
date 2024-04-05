import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard/BookCard';

const PopularBooks = () => {

  const [popularBooksData, setPopularBooksData] = useState(null);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://bookbazaar-book-service.onrender.com/books/popularBooks`, { withCredentials: true });
        setPopularBooksData(response.data.dataObject);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h2 className="label-header">Some of the popular books</h2>
        <div className="wishlist-books">
          {renderBooks(popularBooksData?.popularBooks)}
        </div>
      </div>
    </div>
  )
}

const renderBooks = (books) => {
  return (
    books?.map((book) => (
      <Link key={book.bookId} to={`/book/${book.bookId}`} className="book-link">
        <BookCard book={book} />
      </Link>
    ))
  );
};

export default PopularBooks
