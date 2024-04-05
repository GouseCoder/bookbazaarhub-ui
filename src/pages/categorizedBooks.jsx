import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard/BookCard';
import '../styles/CategorizedBooks.css'

const CategorizedBooks = () => {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const category = new URLSearchParams(location.search).get('category');

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const response = await fetch(`https://bookbazaar-book-service.onrender.com/books/BookBycategory?category=${category}`);
        const data = await response.json();
        if (response.ok) {
          setBooks(data.dataObject.booksByCategory);
        } else {
          console.error('Failed to fetch books:', data.errorObject);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooksByCategory();
  }, [category]);

  return (
    <div className="categorized-books">
      {books.map(book => (
        <Link key={book.bookId} to={`/book/${book.bookId}`} className="book-link">
            <BookCard key={book.bookId} book={book} />
        </Link>
        
      ))}
    </div>
  );
};

export default CategorizedBooks;
