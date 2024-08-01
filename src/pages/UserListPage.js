import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from './AxiosInstance'; // Import your Axios instance
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the logged-in user details from local storage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    // If userDetails is null, redirect to login page
    if (!userDetails) {
      navigate('/login');
      return;
    }

    setLoggedInUser(userDetails);

    // Fetch the list of users from the API using axiosInstance
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/chatting/user/get_users', {
          params: { self_id: userDetails.id }
        });
        setUsers(response.data.response);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error if needed (e.g., show a message to the user or log out)
      }
    };

    fetchUsers();
  }, [navigate]);

  const sendFriendRequest = async (recipientId) => {
    try {
      const response = await axiosInstance.post('/chatting/friend_request/send_fr/', {
        sender: loggedInUser.id,
        recipient: recipientId
      });

      if (response.data.message === 'success') {
        alert('Friend request sent!');
      } else {
        alert('Failed to send friend request.');
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Error sending friend request.');
    }
  };

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-list-page">
      <h1>Welcome, {loggedInUser.first_name} {loggedInUser.last_name}</h1>
      <h2>Available Users</h2>
      <ul>
        {users && users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name}
              <button onClick={() => sendFriendRequest(user.id)}>Send Friend Request</button>
            </li>
          ))
        ) : (
          <li>No users available</li>
        )}
      </ul>
      <div className="button-group">
        <Link to="/accepted-users" className="button">Accepted Requests</Link>
        <Link to="/received-pending-requests" className="button">Received Pending Requests</Link>
        <Link to="/sent-pending-requests" className="button">Sent Pending Requests</Link>
      </div>
    </div>
  );
};

export default UserListPage;