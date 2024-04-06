import React, { useState } from 'react';
import Modal from '../utils/Modal';
import { API_URL } from '../utils/ApiList';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import bookImage from '../components/Assets/signup.png';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastname: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    roles: [],
  });
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
      valid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = 'Last Name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    let updatedRoles = [];
    if (value === 'Both') {
      updatedRoles = [{ name: 'Buyer' }, { name: 'Seller' }];
    } else {
      updatedRoles = [{ name: value }];
    }
    setFormData({
      ...formData,
      roles: updatedRoles,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(API_URL + '/user/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastname: formData.lastname,
            dateOfBirth: formData.dateOfBirth,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            roles: formData.roles,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          if (data.dataObject.errorCode === 200) {
            localStorage.setItem('emailId', formData.email);
            navigate('/optvalidation');
          } else {
            setModalMessage(data.dataObject.errorReason);
            setShowModal(true);
          }
        } else {
          setModalMessage(data.errorObject.errorReason);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setModalMessage('An error occurred. Please try again later.');
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="signup-container">
      <Paper elevation={3} className="signup-paper">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="image-container">
              <img src={bookImage} alt="Signup" className="image" />
            </div>
          </Grid>
          <Grid item xs={6}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth className="form-field">
                    <InputLabel>Roles</InputLabel>
                    <Select
                      name="roles"
                      value={formData.roles.map(role => role.name)}
                      onChange={handleRoleChange}
                      error={!!errors.roles}
                      required
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      <MenuItem value="Seller">Seller</MenuItem>
                      <MenuItem value="Buyer">Buyer</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth type="submit">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default Signup;
