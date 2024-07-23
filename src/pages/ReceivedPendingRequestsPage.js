import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import './UserListPage.css';

const ReceivedPendingRequestsPage = ({ userId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchReceivedPendingRequests = async () => {
      try {
        const response = await axiosInstance.get('/chatting/friend_request/get_friend_list/', {
          params: { user_id: userId, action: 'received_pending_request' }
        });
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error fetching received pending requests:', error);
      }
    };

    fetchReceivedPendingRequests();
  }, [userId]);

  return (
    <div className="user-list-page">
      <h1>Received Pending Requests</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.sender.first_name} {user.sender.last_name} - {user.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedPendingRequestsPage;
