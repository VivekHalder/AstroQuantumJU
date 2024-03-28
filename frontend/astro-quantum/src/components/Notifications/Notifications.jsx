import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Make a GET request to fetch notifications
      const res = await axios.get(import.meta.env.VITE_APP_BACKEND_API_GET_NOTIFICATIONS);
      console.log(res);
      setNotifications(res.data.data); // Assuming notifications are returned in response.data.data
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="bg-black h-full text-white">
      <h1 className="text-5xl font-bold text-center mb-8">Notifications</h1>
      <div className="container mx-auto">
        {notifications && notifications.length === 0 ? (
          <p className="text-center text-xl">No notifications found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {notifications && notifications.map((notification, index) => (
              <div key={index} className="p-4 border border-white rounded-md">
                <h2 className="text-lg font-semibold mb-2">{notification.message}</h2>
                <p className="text-sm text-gray-400">{notification.createdAt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;