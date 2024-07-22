import React, { useState, useEffect } from 'react';
import { sendFriendRequest, acceptOrRejectFriendRequest, getFriendList } from '../services/api';

const FriendRequests = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await getFriendList();
        setFriends(response.data.response);
      } catch (error) {
        console.error('Error fetching friends', error);
      }
    };

    fetchFriends();
  }, []);

  const handleSendRequest = async (recipientId) => {
    try {
      await sendFriendRequest({ sender: 1, recipient: recipientId }); // Replace with actual sender id
      alert('Friend request sent');
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  };

  const handleAcceptOrReject = async (action, senderId, recipientId) => {
    try {
      await acceptOrRejectFriendRequest({ action_name: action, sender: senderId, recipient: recipientId });
      alert(`Friend request ${action}`);
    } catch (error) {
      console.error('Error processing friend request', error);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.sender} - {friend.status}
            <button onClick={() => handleAcceptOrReject('accepted', friend.sender, friend.recipient)}>Accept</button>
            <button onClick={() => handleAcceptOrReject('rejected', friend.sender, friend.recipient)}>Reject</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleSendRequest(2)}>Send Friend Request</button> {/* Replace with actual recipient id */}
    </div>
  );
};

export default FriendRequests;
