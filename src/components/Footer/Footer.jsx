import React from 'react';
import { Link } from 'react-router-dom';
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
          <li><Link to="/categorizedBooks?category=Fiction">Fiction</Link></li>
          <li><Link to="/categorizedBooks?category=Science%20Fiction">Science Fiction</Link></li>
          <li><Link to="/categorizedBooks?category=Mystery">Mystery</Link></li>
          <li><Link to="/categorizedBooks?category=Philosophy">Philosophy</Link></li>
          <li><Link to="/categorizedBooks?category=Classic%20Literature">Classic Literature</Link></li>
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
