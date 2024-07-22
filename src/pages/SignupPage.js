import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

function SignupPage() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/chatting/user/', // Replace with your backend API endpoint
        { first_name, last_name, email, password },
        { withCredentials: true } // Send credentials (cookies)
      );
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>First Name</label>
            <input 
              type="text" 
              value={first_name} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input 
              type="text" 
              value={last_name} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
