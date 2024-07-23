import React from 'react'; // Import the React library to use its features.
import { Link } from 'react-router-dom'; // Import 'Link' for navigation between pages.
import './MainPage.css'; // Import the CSS file to style the component.

const MainPage = () => { // Define the MainPage component as a functional component.
  return ( // The component returns the JSX to render on the screen.
    <div className="main-page-container"> {/* A container for the entire page content */}
      <div className="content"> {/* A wrapper for the page content */}
        <h1>Welcome to the Chat Application</h1> {/* A heading to welcome users */}
        
        <div className="main-page-links"> {/* A container for the navigation links */}
          <Link to="/signup" className="main-page-link">Sign Up</Link> {/* Link to the sign-up page */}
          <Link to="/login" className="main-page-link">Log In</Link> {/* Link to the login page */}
        </div>
      </div>
    </div>
  );
};

export default MainPage; // Export the MainPage component so it can be used in other parts of the app.
