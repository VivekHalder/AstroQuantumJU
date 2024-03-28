import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_APP_BACKEND_API_GET_NOTIFICATIONS, { withCredentials: true });
      console.log(res);
      setNotifications(res.data.data); 
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const unseenNotification = notifications.filter(notification => !notification.read);
  const seenNotification = notifications.filter(notification => notification.read);

  return (
    <div className="bg-black h-full text-white">
      <h1 className="text-5xl font-bold text-center mb-8">Notifications</h1>
      <div className="container mx-auto">
        {!notifications || notifications.length === 0 ? (
          <p className="text-center text-xl">No notifications found.</p>
        ) : (
          <>
            <div>
                {
                    unseenNotification && unseenNotification.length > 0 &&
                    <>
                        <div className='text-3xl font-semibold mb-4'>
                            Unseen Notifications
                        </div>
                        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                            {
                                unseenNotification.map(notification => (
                                    <div key={notification._id} className="p-4 border border-white rounded-md">
                                        <h2 className='text-lg font-semibold mb-2'>
                                            {
                                                notification.message
                                            }
                                        </h2>
                                        <p className='text-sm text-gray-400'>
                                            {
                                                notification.createdAt
                                            }
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
            <div>
                {
                    seenNotification && seenNotification.length > 0 &&
                    (
                        <>
                            <div className='text-3xl font-semibold mb-4'>
                                Seen Notifications
                            </div>
                            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                                {
                                    seenNotification.map(notification => (
                                        <div key={notification._id} className="p-4 border border-white rounded-md">
                                            <h2 className='text-lg font-semibold mb-2'>
                                                {
                                                    notification.message
                                                }
                                            </h2>
                                            <p className='text-sm text-gray-400'>
                                                {
                                                    notification.createdAt
                                                }
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Notifications;