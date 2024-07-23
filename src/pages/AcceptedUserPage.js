import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance'; // Import your Axios instance
import { useNavigate } from 'react-router-dom';
import './UserListPage.css';

const AcceptedUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    const fetchAcceptedUsers = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/api/chatting/friend_request/get_friend_list/', {
          params: { user_id: userDetails.id, action: 'accepted' }
        });
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error fetching accepted users:', error);
        // Optionally handle errors like token expiration, e.g., redirect to login
      }
    };

    fetchAcceptedUsers();
  }, []);

  const handleUserClick = (user) => {
    // Store the recipient ID in localStorage
    localStorage.setItem('recipientId', user.id);
    // Navigate to chat window with selected user
    navigate(`/chat`, { state: { user } });
  };

  return (
    <div className="user-list-page">
      <h1>Accepted Friend Requests</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedUsersPage;
