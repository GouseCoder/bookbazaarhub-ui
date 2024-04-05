import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import Modal from '../utils/Modal';
import { validateEmail, validatePassword } from './validation';
import '../styles/AddUser.css'

const AddUser = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.email) {
            errors.email = 'Email is required';
            valid = false;
        }
        else if (!validateEmail(formData.email)) { // Use validateEmail function
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        // Regular expression for email validation


        if (!formData.password) {
            errors.password = 'Password is required';
            valid = false;
        }
        else if (!validatePassword(formData.password)) { // Use validatePassword function
            newErrors.password = 'Password must be at least 8 characters long and contain at least one digit and one uppercase letter';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`https://bookbazaar-user-service.onrender.com/user/v1/addUserDetails?email=${formData.email}&password=${formData.password}`, {
                    method: 'POST',
                });
                const data = await response.json();
                if (response.ok && data.dataObject.errorCode === 200) {
                    setRegistrationSuccess(true);
                } else {
                    console.error('Error:', data.errorReason);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleCloseSuccessMessage = () => {
        setRegistrationSuccess(false);
        navigate('/login');
    };

    return (
        <div className="add-user-container">
            <div className="form-wrapper">
                <Typography variant="h4" gutterBottom>
                    Create Account
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        style={{marginBottom: '15px'}}
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        className="form-field"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        style={{marginBottom: '15px'}}
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                        className="form-field"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        name="confirmPassword"
                        style={{marginBottom: '15px'}}
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        className="form-field"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" className="submit-button">
                        Create Account
                    </Button>
                </form>
            </div>
            {registrationSuccess && (
                <Modal
                    message="Registration successful!"
                    onClose={handleCloseSuccessMessage}
                />
            )}
        </div>
    );
};

export default AddUser;
