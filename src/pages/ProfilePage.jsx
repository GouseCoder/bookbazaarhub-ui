// ProfilePage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import General from '../components/Profile/General';
import ChangePass from '../components/Profile/ChangePass';
import ChangeEmail from '../components/Profile/ChangeEmail';
import ChangePhone from '../components/Profile/ChangePhone';
import '../styles/ProfilePage.css'

const ProfilePage = () => {
  const [selectedOption, setSelectedOption] = useState('general');
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleLogout = () => {
    // Call logout API or perform logout actions
    console.log('Logged out successfully!');
    // Redirect to desired page after logout
    navigate('/'); // Example redirection to login page
  };

  // Render the selected component based on the option clicked
  const renderComponent = () => {
    switch (selectedOption) {
      case 'general':
        return <General />;
      case 'changePass':
        return <ChangePass />;
      case 'changeEmail':
        return <ChangeEmail />;
      case 'changePhone':
        return <ChangePhone />;
      default:
        return null; // Return null or any default component
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <ul>
          <li className={selectedOption === 'general' ? 'active' : ''} onClick={() => handleOptionClick('general')}>General</li>
          <li className={selectedOption === 'changePass' ? 'active' : ''} onClick={() => handleOptionClick('changePass')}>Change Password</li>
          <li className={selectedOption === 'changeEmail' ? 'active' : ''} onClick={() => handleOptionClick('changeEmail')}>Update Email</li>
          <li className={selectedOption === 'changePhone' ? 'active' : ''} onClick={() => handleOptionClick('changePhone')}>Update Phone</li>
          <li onClick={handleLogout}>Sign Out</li>
        </ul>
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProfilePage;
