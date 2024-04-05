import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import axios from 'axios';
import { checkToken } from '../utils/auth';
import CartItem from './CartItem';
import '../styles/MyCart.css'

const MyCart = () => {
  const token = checkToken();
  const userId = localStorage.getItem('userId');
  const [cartData, setCartData] = useState({ statusCode: null, errorObject: {}, dataObject: {} });

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`https://bookbazaar-cart-service.onrender.com/cart/show?userId=${userId}`);
        setCartData(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [userId]);

  const { cartItems } = cartData.dataObject;
  const totalPrice = cartItems ? cartItems.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0) : 0;

  const handleDecrease = async (bookId) => {
    try {
      await axios.put(`https://bookbazaar-cart-service.onrender.com/cart/decrease?userId=${userId}&bookId=${bookId}`);
      // Refresh cart data after decreasing quantity
      const response = await axios.get(`https://bookbazaar-cart-service.onrender.com/cart/show?userId=${userId}`);
      setCartData(response.data);
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const handleIncrease = async (bookId) => {
    try {
      await axios.put(`https://bookbazaar-cart-service.onrender.com/cart/increase?userId=${userId}&bookId=${bookId}`);
      // Refresh cart data after increasing quantity
      const response = await axios.get(`https://bookbazaar-cart-service.onrender.com/cart/show?userId=${userId}`);
      setCartData(response.data);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://bookbazaar-cart-service.onrender.com/cart/delete?userId=${userId}&bookId=${bookId}`);
      // Refresh cart data after deleting item
      const response = await axios.get(`https://bookbazaar-cart-service.onrender.com/cart/show?userId=${userId}`);
      setCartData(response.data);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      {token && (
        <div className="my-cart-container">
          <Typography className='MyCartLabel' variant="h5" gutterBottom style={{ marginLeft: '60px', marginTop : '20px' }}>
            My Cart
          </Typography>

          {cartItems && cartItems.map((cartItem, index) => (
            <CartItem
              key={index}
              cartItem={cartItem}
              onDecrease={() => handleDecrease(cartItem.Book.bookId)}
              onIncrease={() => handleIncrease(cartItem.Book.bookId)}
              onDelete={() => handleDelete(cartItem.Book.bookId)}
            />
          ))}

          <div className="total-price" style={{ marginLeft: '60px'}}>
            <Typography variant="h6">Total Price: {totalPrice}</Typography>
          </div>

          <Button variant="contained" color="primary" className="checkout-button" style={{ marginLeft: '60px', marginBottom: '30px'}}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCart;
