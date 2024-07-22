import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserListPage.css';

const AcceptedUsersPage = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chatting/friend_request/get_friend_list/', {
          params: { user_id: userId, action: 'accepted' }
        });
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error fetching accepted users:', error);
      }
    };

    fetchAcceptedUsers();
  }, [userId]);

  const handleUserClick = (user) => {
    // Navigate to chat window with selected user
    navigate(`/chat/${user.id}`, { state: { user } });
  };

  return (
    <div className="user-list-page">
      <h1>Accepted Friend Requests</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user.recipient)}>
            {user.recipient.first_name} {user.recipient.last_name} - {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedUsersPage;
