import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Grid } from '@mui/material';
import '../styles/ProfilePage.css';
import { checkToken } from '../utils/auth';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  let userId = '';
  if (checkToken) {
    userId = localStorage.getItem('userId');
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/UserDetails?userId=${userId}`);
        setUserDetails(response.data.dataObject);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Container maxWidth="md" className="container">
      <Typography variant="h4" className="title">My Profile</Typography>
      {userDetails && (
        <Paper className="paper">
          <Grid container spacing={3} className="details">
            <Grid item xs={12}>
              <Typography variant="subtitle1"><strong>First Name:</strong> {userDetails.firstname}</Typography>
              <Typography variant="subtitle1"><strong>Last Name:</strong> {userDetails.lastname}</Typography>
              <Typography variant="subtitle1"><strong>Date of Birth:</strong> {userDetails.dateOfBirth}</Typography>
              <Typography variant="subtitle1"><strong>Email:</strong> {userDetails.email}</Typography>
              <Typography variant="subtitle1"><strong>Phone:</strong> {userDetails.phone}</Typography>
              <Typography variant="subtitle1"><strong>Address:</strong> {userDetails.address}</Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default ProfilePage;
