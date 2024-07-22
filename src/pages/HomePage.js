import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Chat App</h1>
      <div className="link-container">
        <Link to="/signup" className="home-link">Sign Up</Link>
        <Link to="/login" className="home-link">Sign In</Link>
      </div>
    </div>
  );
};

export default HomePage;
