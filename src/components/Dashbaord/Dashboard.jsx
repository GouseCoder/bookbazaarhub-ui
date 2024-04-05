import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchDashboardData } from './api';
import BookCard from '../BookCard/BookCard';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    let books = [];

    // Process last viewed books and recommendations
    if (dataObject.lastViewdBooks.length > 0) {
      books.push({ category: 'Pick up from where you left', books: dataObject.lastViewdBooks });
    }
    if (dataObject.recommendations.length > 0) {
      books.push({ category: 'You might also like', books: dataObject.recommendations });
    }
    // if (dataObject.trendingBooks.length > 0) {
    //   books.push({ category: 'Pick up from where you left', books: dataObject.lastViewdBooks });
    // }

    // Process categorized books
    if (dataObject.categorizedBooks) {
      Object.keys(dataObject.categorizedBooks).forEach((category) => {
        books.push({ category, books: dataObject.categorizedBooks[category] });
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
            {categoryData.books.length === 0 ? (
              <p>No books available in this category</p>
            ) : (
              <div className="books-container">
                {Object.entries(categoryData.books).map(([subCategory, books]) => (
                  <div key={subCategory}>
                    <h3>{subCategory}</h3>
                    <div className="books-subcontainer">
                      {books.map((book) => (
                        <Link key={book.bookId} to={`/book/${book.bookId}`} className="book-link">
                          <BookCard book={book} />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
