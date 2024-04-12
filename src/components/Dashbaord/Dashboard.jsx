import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDashboardData } from './api';
import BookCard from '../BookCard/BookCard';
import './Dashboard.css';
import { checkToken } from '../../utils/auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoggedIn(checkToken());
    const fetchData = async () => {
      try {
        const userId = getUserId();
        const dataObject = await fetchDashboardData(userId);
        const processedData = processBooksData(dataObject);
        setBooksData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserId = () => {
    return localStorage.getItem('userId') || 0;
  };

  const processBooksData = (dataObject) => {
    const books = [];

    if (dataObject.lastViewdBooks && dataObject.lastViewdBooks.length > 0) {
      books.push({ category: 'Checkout from where you have left', books: dataObject.lastViewdBooks });
    }

    if (dataObject.recommendations && dataObject.recommendations.length > 0) {
      books.push({ category: 'Recommended Books for you', books: dataObject.recommendations });
    }

    if (dataObject.categorizedBooks) {
      dataObject.categorizedBooks.forEach((category) => {
        Object.keys(category).forEach((categoryName) => {
          books.push({ category: categoryName, books: category[categoryName] });
        });
      });
    }

    console.log(booksData)

    return books;
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <CircularProgress />
      ) : booksData.length === 0 ? (
        <p>No books available</p>
      ) : (
        booksData.map((categoryData) => (
          <div className="section" key={categoryData.category}>
            <h2>{categoryData.category}</h2>
            <div className="books-container">
              {categoryData.books.length > 0 ? (
                categoryData.books.map((book) => (
                  <Link key={book.bookId} to={`/book/${book.bookId}`} className="book-link">
                    <BookCard book={book} />
                  </Link>
                ))
              ) : (
                <p>No books available in this category</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
