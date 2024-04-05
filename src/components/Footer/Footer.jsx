import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* 1st Column */}
      <div className="footer-column">
        <h4>About BookbazaarHub</h4>
        <p>Address: Sangharsh Nagar, Chandivali, Mumbai 400072</p>
        <p>Phone: +91 9594198505</p>
        <p>Email: bookbazaarhub@gmail.com</p>
      </div>

      {/* 2nd Column */}
      <div className="footer-column">
        <h4>Categories</h4>
        <ul>
          <li>Fiction</li>
          <li>Science Fiction</li>
          <li>Mystery</li>
          <li>Romance</li>
          <li>Non-fiction</li>
        </ul>
      </div>

      {/* 3rd Column */}
      <div className="footer-column">
        <h4>Quick Links</h4>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>FAQs</li>
        </ul>
      </div>

      {/* 4th Column */}
      <div className="footer-column">
        <h4>Connect with Us</h4>
        <div className="social-links">
          <a href="https://www.facebook.com">Facebook</a>
          <a href="https://www.instagram.com">Instagram</a>
          <a href="https://www.twitter.com">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
