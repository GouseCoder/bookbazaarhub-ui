import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import Modal from '../utils/Modal';
import '../styles/SellBook.css'
import { checkToken } from '../utils/auth';
import { ERROR_CODE_CREATED } from '../utils/constants';
import { storage } from '../utils/firebase';

const SellBook = () => {

  const token = checkToken();
  const userId = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [bookData, setBookData] = useState({
    name: '',
    imgUrl: '',
    description: '',
    authorName: '',
    category: '',
    price: '',
    bookCondition: '',
    sellerId: userId,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setBookData({
      name: '',
      imgUrl: '',
      description: '',
      authorName: '',
      category: '',
      price: '',
      bookCondition: '',
      sellerId: userId,
    });
    setSelectedFile(null);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    if (token) {
      headers['token'] = token;
    }

    try {

      const storageRef = storage.ref();
      const imageRef = storageRef.child(selectedFile.name);
      await imageRef.put(selectedFile);

      // Get the URL of the uploaded image from Firebase Storage
      const imageUrl = await imageRef.getDownloadURL();

      // Update bookData with the correct imgUrl
      const updatedBookData = { ...bookData, imgUrl: imageUrl };

      const response = await axios.post(
        'https://bookbazaar-book-service.onrender.com/books/AddBook',
        updatedBookData, // Use updatedBookData which includes the correct imgUrl
        { headers: { token: token } } // Automatically sets Content-Type header for JSON
      );
      console.log('Response:', response.data);

      if (response.data.dataObject.errorCode === ERROR_CODE_CREATED) {
        // Show modal with error message
        setModalMessage(response.data.dataObject.errorReason);
        setShowModal(true);
      } else {
        console.log('Book added successfully');
        // Redirect or show success message
      }

    } catch (error) {
      console.error('Failed to add book:', error);
      // Handle error, show error message
    }
  };

  return (
    <div>
      {token && (
        <div>
          {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
          <div className="outer-container">
            <div className="form-container">
              <h2>Add Your Book details to sell on BookbazaarHub</h2>
              <form>
                <div className="form-grid">
                  <TextField
                    className="form-field"
                    name="name"
                    label="Book Name"
                    variant="outlined"
                    value={bookData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form-field"
                    name="authorName"
                    label="Author Name"
                    variant="outlined"
                    value={bookData.authorName}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form-field"
                    name="category"
                    label="Category"
                    variant="outlined"
                    value={bookData.category}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form-field"
                    name="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={bookData.price}
                    onChange={handleChange}
                  />
                  <TextField
                    className="form-field description-field"
                    name="description"
                    label="Description of Book"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={bookData.description}
                    onChange={handleChange}
                  />
                  <Select
                    className="form-field book-conditn-field"
                    name="bookCondition"
                    label="Book Condition"
                    value={bookData.bookCondition}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Book Condition</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Like New">Like New</MenuItem>
                    <MenuItem value="Very Good">Very Good</MenuItem>
                    <MenuItem value="Good">Good</MenuItem>
                    <MenuItem value="Fair">Fair</MenuItem>
                    <MenuItem value="Poor">Poor</MenuItem>
                    <MenuItem value="Used - Acceptable">Used - Acceptable</MenuItem>
                  </Select>
                  <div className="file-input-container">
                    <input
                      className="file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="sell-btn-container">
                    <Button className="submit-btn" type="submit" variant="contained" color="primary" onClick={handleAddBook}>
                      Sell Book
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellBook;
