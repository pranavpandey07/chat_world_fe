import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import './UserListPage.css';

const ReceivedPendingRequestsPage = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  userId = userDetails.id

  useEffect(() => {
    const fetchReceivedPendingRequests = async () => {
      try {
        const response = await axiosInstance.get('/chatting/friend_request/get_received_pending_requests/', {
          params: { user_id: userId }
        });
        setUsers(response.data.response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching received pending requests:', error);
        setError('Failed to load pending requests.');
        setLoading(false);
      }
    };

    fetchReceivedPendingRequests();
  }, [userId]);

  const acceptFriendRequest = async (senderId) => {
    try {
     
      console.log("******")
      console.log(userDetails)
      console.log(userId)
      await axiosInstance.post('/chatting/friend_request/accept_fr/', {
        sender: senderId,
        recipient: userId
      });
      // Update the UI after accepting the friend request
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== senderId));
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const rejectFriendRequest = async (senderId) => {
    try {
      await axiosInstance.post('/chatting/friend_request/reject_fr/', {
        sender: senderId,
        recipient: userId
      });
      // Update the UI after rejecting the friend request
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== senderId));
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list-page">
      <h1>Received Pending Requests</h1>
      <ul>
        {users.map((user, index) => (
          user && (
            <li key={index}>
              {user.first_name} {user.last_name} - {user.email}
              <button onClick={() => acceptFriendRequest(user.id)}>Accept Friend Request</button>
              <button onClick={() => rejectFriendRequest(user.id)}>Reject Friend Request</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default ReceivedPendingRequestsPage;
