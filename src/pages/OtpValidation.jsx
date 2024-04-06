import React, { useState } from 'react';
import Modal from '../utils/Modal';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/otpValidation.css';

const OtpValidation = () => {
  const [otp, setOtp] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleValidation = async () => {
    const emailId = localStorage.getItem('emailId');
    if (!emailId) {
      return;
    }
    
    try {
      const response = await fetch(`https://bookbazaar-user-service.onrender.com/user/validateotp?emailId=${emailId}&OTP=${otp}`);
      const data = await response.json();
      if (response.ok && data.dataObject.errorCode === 200) {
        navigate('/addUser');
      } else if (data.dataObject.errorCode === 502) {
        setModalMessage('OTP Invalid! Please try again');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="otp-validation-container">
      <Typography variant="h4" gutterBottom>
        OTP Verification
      </Typography>
      <Typography variant="body1" gutterBottom>
        We have sent an OTP to your email address. Please enter the OTP below to verify your account.
      </Typography>
      <TextField
        label="Enter OTP"
        variant="outlined"
        value={otp}
        onChange={handleOtpChange}
        fullWidth
        className="otp-input"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleValidation}
        className="validate-button"
      >
        Validate
      </Button>
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default OtpValidation;
