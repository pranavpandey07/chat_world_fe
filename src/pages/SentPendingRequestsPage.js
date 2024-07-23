import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import './UserListPage.css';

const SentPendingRequestsPage = ({ userId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchSentPendingRequests = async () => {
      try {
        const response = await axiosInstance.get('/chatting/friend_request/get_friend_list/', {
          params: { user_id: userId, action: 'sent_pending_request' }
        });
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error fetching sent pending requests:', error);
      }
    };

    fetchSentPendingRequests();
  }, [userId]);

  return (
    <div className="user-list-page">
      <h1>Sent Pending Requests</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.recipient.first_name} {user.recipient.last_name} - {user.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default SentPendingRequestsPage;
