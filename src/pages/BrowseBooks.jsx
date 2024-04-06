import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import '../styles/BrowseBooks.css';

const BrowseBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    minPrice: '',
    maxPrice: ''
  });
  const booksPerPage =16;

  useEffect(() => {
    // Fetch all books when the component mounts
    axios.get('https://bookbazaar-book-service.onrender.com/books/all')
      .then(response => setBooks(response.data.dataObject.allBooks))
      .catch(error => console.error(error));
  }, []);

  const handleFilterChange = () => {
    // Implement filtering logic based on the selected filters
    axios.get('https://bookbazaar-book-service.onrender.com/books/showFilteredBook', { params: filters })
      .then(response => setBooks(response.data.dataObject.Books))
      .catch(error => console.error(error));
  };

  // Logic for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="browse-books-container">
      <div className="browse-books-filter">
        <h4>Category</h4>
        <FormControl className="filter-input">
          <Select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
          >
            <MenuItem value="Mystery">Mystery</MenuItem>
            <MenuItem value="Biography">Biography</MenuItem>
            <MenuItem value="Philosophy">Philosophy</MenuItem>
            <MenuItem value="Productivity">Productivity</MenuItem>
            <MenuItem value="Classic">Classic</MenuItem>
          </Select>
        </FormControl>

        <h4>Customer Review</h4>
        <FormControl className="filter-input">
          <Select
            name="rating"
            value={filters.rating}
            onChange={handleInputChange}
          >
            <MenuItem value=""><StarIcon style={{ color: 'transparent' }} /></MenuItem>
            <MenuItem value="4"><StarIcon /><StarIcon /><StarIcon /><StarIcon /></MenuItem>
            <MenuItem value="3"><StarIcon /><StarIcon /><StarIcon /></MenuItem>
            <MenuItem value="2"><StarIcon /><StarIcon /></MenuItem>
            <MenuItem value="1"><StarIcon /></MenuItem>
          </Select>
        </FormControl>

        <div className="price-inputs">
          <h4>Price</h4>
          <TextField
            className="filter-input"
            label="Min Price"
            type="number"
            name="minPrice"
            value={filters.minPrice}
            style={{ marginBottom: '15px' }}
            onChange={handleInputChange}
          />
          <TextField
            className="filter-input"
            label="Max Price"
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>

        <Button className='apply-button' variant="contained" color="primary" onClick={handleFilterChange}>
          Apply Filters
        </Button>
      </div>

      <div className="books-list">
        {currentBooks.map(book => (
          <Link key={book.bookId} to={`/book/${book.bookId}`} className="book-link">
          {/* Updated layout for BookCard */}
          <div className="book-card">
            <div className="book-image">
              <img src={book.imgUrl} alt={book.bookName} />
            </div>
            <div className="book-details">
              <h3>{book.bookName}</h3>
              <p className="author">by {book.bookAuthorName}</p>
              <div className="ratings">
                {[...Array(book.bookRatingStar)].map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </div>
              <p className="price">Price: {book.price}</p>
            </div>
          </div>
        </Link>
        ))}
      </div>

      {/* Clear floats */}
      <div style={{ clear: 'both' }}></div>

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>


    </div>
  );
};

export default BrowseBooks;
