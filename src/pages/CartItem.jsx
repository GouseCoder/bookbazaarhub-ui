import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StarRating from '../utils/Starrating';
import '../styles/CartItem.css';

const CartItem = ({ cartItem, onDecrease, onIncrease, onDelete }) => {
  return (
    <Card className="cart-item">
      <div className="cart-item-details">
        <div className="cart-item-image">
          <img src={cartItem.Book.imgUrl} alt={cartItem.Book.bookName} />
        </div>
        <div className="book-details">
          <Link to={`/book/${cartItem.Book.bookId}`}>
            <Typography variant="h6" className="book-name">{cartItem.Book.bookName}</Typography>
          </Link>
          <Typography variant="subtitle1">By {cartItem.Book.bookAuthorName}</Typography>
          <Typography variant="body2">{cartItem.Book.bookDesc}</Typography>
          <Typography variant="body2">Category: {cartItem.Book.bookCategory}</Typography>
          <StarRating rating={cartItem.Book.bookRatingStar} />
          <Typography variant="body2">Price: {cartItem.totalPrice}</Typography>
          <div className="quantity-control">
            <Button variant="outlined" onClick={onDecrease}>-</Button>
            <Typography variant="body2" style={{marginRight: '10px'}}>Quantity: {cartItem.quantity}</Typography>
            <Button variant="outlined" onClick={onIncrease}>+</Button>
          </div>
          <Button className='remove-btn' variant="outlined" onClick={onDelete}>Remove</Button>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
