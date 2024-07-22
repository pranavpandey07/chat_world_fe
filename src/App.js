// src/App.js
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
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users_list" element={<UserListPage />} />
        <Route path="/accepted-users" element={<AcceptedUserPage userId={1} />} />
        <Route path="/received-pending-requests" element={<ReceivedPendingRequestsPage userId={1} />} />
        <Route path="/sent-pending-requests" element={<SentPendingRequestsPage userId={1} />} />
        <Route path="/chat/:senderId/:recipientId" component={ChatWindow} />
        <Route path="/chat/:userId" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
