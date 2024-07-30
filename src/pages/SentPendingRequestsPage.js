import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import './UserListPage.css';

const SentPendingRequestsPage = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentPendingRequests = async () => {
      try {
        const response = await axiosInstance.get('/chatting/friend_request/get_sent_pending_requests/', {
          params: { user_id: userId }
        });
        setUsers(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sent pending requests:', error);
        setError('Failed to load sent pending requests.');
        setLoading(false);
      }
    };

    fetchSentPendingRequests();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list-page">
      <h1>Sent Pending Requests</h1>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.first_name} {user.last_name} - {user.email}
            </li>
          ))
        ) : (
          <li>No sent pending requests</li>
        )}
      </ul>
    </div>
  );
};

export default SentPendingRequestsPage;
