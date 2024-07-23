import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import UserListPage from './pages/UserListPage';
import AcceptedUserPage from './pages/AcceptedUserPage';
import ReceivedPendingRequestsPage from './pages/ReceivedPendingRequestsPage';
import SentPendingRequestsPage from './pages/SentPendingRequestsPage';
import ChatWindow from './pages/ChatWindow';
import { AuthProvider } from './pages/AuthContext'; // Import AuthProvider
import './App.css';

function App() {
  return (
    <AuthProvider> {/* Wrap the Router with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users_list" element={<UserListPage />} />
          <Route path="/accepted-users" element={<AcceptedUserPage />} />
          <Route path="/received-pending-requests" element={<ReceivedPendingRequestsPage />} />
          <Route path="/sent-pending-requests" element={<SentPendingRequestsPage />} />
          <Route path="/chat" element={<ChatWindow />} />
          {/* Remove or handle separately if needed */}
          {/* <Route path="/chat/:userId" element={<ChatWindow />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
