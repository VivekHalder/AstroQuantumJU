import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MakeAdmin() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  async function getUsers() {
    const resu = await axios.get(import.meta.env.VITE_APP_BACKEND_API_GET_NORMAL_USERS);
    setUsers(resu.data.data);

    const resa = await axios.get(import.meta.env.VITE_APP_BACKEND_API_GET_ADMINS);
    setAdmins(resa.data.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function makeAdmin(userId) {
    setSelectedUserId(userId);
    setShowOverlay(true);
  }

  function confirmMakeAdmin() {
    setShowOverlay(false);
  }

  function cancelMakeAdmin() {
    setShowOverlay(false);
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdmins = admins.filter((admin) => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg p-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <h1 className="text-center text-white font-bold text-3xl">Users</h1>
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 border-b border-gray-300">
              <div className="text-lg text-black">{user.name}</div>
              <div className="text-sm text-gray-600">Email: {user.email}</div>
              <div className="text-sm text-gray-600">Faculty: {user.faculty}</div>
              <div className="text-sm text-gray-600">Department: {user.department}</div>
              <div className="text-sm text-gray-600">Year: {user.year}</div>
              <button onClick={() => makeAdmin(user.id)} className="bg-orange-700 text-white px-4 py-2 rounded mt-2">Make Admin</button>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h1 className="text-center text-white font-bold text-3xl">Admins</h1>
          {filteredAdmins.map((admin) => (
            <div key={admin.id} className="p-4 border-b border-gray-300">
              <div className="text-lg text-black">{admin.name}</div>
              <div className="text-sm text-gray-600">Email: {admin.email}</div>
              <div className="text-sm text-gray-600">Faculty: {admin.faculty}</div>
              <div className="text-sm text-gray-600">Department: {admin.department}</div>
              <div className="text-sm text-gray-600">Year: {admin.year}</div>
              <div className="text-orange-700 font-bold mt-2">Admin</div>
            </div>
          ))}
        </div>
      </div>
      {showOverlay && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-lg text-gray-800 mb-4">Are you sure you want to make this user an admin?</p>
            <p className="text-sm text-gray-600 mb-4">Once a user is made admin, the process can't be reversed.</p>
            <div>
              <button onClick={confirmMakeAdmin} className="bg-orange-700 text-white px-4 py-2 rounded mr-4">Confirm</button>
              <button onClick={cancelMakeAdmin} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MakeAdmin;
