import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page-container">
      <div className="content">
        <h1>Welcome to the Chat Application</h1>
        <div className="main-page-links">
          <Link to="/signup" className="main-page-link">Sign Up</Link>
          <Link to="/login" className="main-page-link">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
