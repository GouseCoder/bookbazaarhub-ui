import React, { useState } from 'react';
import { TextField, Button, Link, Typography, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail, validatePassword } from './validation';
import '../styles/Login.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false); // Initialized with false
  const [passwordError, setPasswordError] = useState(false); // Initialized with false
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Mark the form as submitted
    setSubmitted(true);

    if (validateEmail(emailId) && validatePassword(password)) {
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const apiUrl = 'https://bookbazaar-user-service.onrender.com/user/v1/login';

        const response = await axios.post(apiUrl, {
          emailId: emailId,
          password: password,
        });

        const { token } = response.data;
        console.log(token);

        // Decode the token to extract user information
        const decodedToken = decodeToken(token);
        console.log(decodedToken);

        // Store the token and userId in local storage or state as needed
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.sub);
        console.log(decodedToken.sub);

        // Redirect to another page (e.g., dashboard)
        navigate('/');

      } catch (error) {
        console.error('Login failed:', error);
      }
    }
    else {
      // If validation fails, update error states to true to display error messages
      setEmailError(!validateEmail(emailId));
      setPasswordError(!validatePassword(password));
    }

  };

  const decodeToken = (token) => {
    // Decoding the token (use your preferred method)
    // This example assumes the token is a JWT and uses a simple decoding approach
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return decoded;
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
      <div className="login-container">
        <Typography variant="h5" gutterBottom>
          Welcome Back!
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              error={(submitted && !validateEmail(emailId)) || emailError}
              helperText={(submitted && !validateEmail(emailId)) || emailError ? 'Enter a valid email address' : ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={(submitted && !validatePassword(password)) || passwordError}
              helperText={(submitted && !validatePassword(password)) || passwordError ? 'Password must be at least 8 characters long and include numbers and one capital letter' : ''}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <div className="options-container">
          <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
            Don't have an account? Create one
          </Link>
          <Link component="button" variant="body2">
            Forgot Password
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
