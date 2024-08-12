import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminControl = () => {
  const [email, setEmail] = useState('');
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all admins when the component mounts
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
        setMessage('Error fetching admins');
      }
    };

    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await axios.post('http://localhost:3000/api/admins', { email });
        setMessage(`Admin added successfully: ${response.data.email}`);
        setAdmins([...admins, response.data]); // Update the admins list
        setEmail(''); // Clear the input
      } catch (error) {
        console.error('Error adding admin:', error);
        setMessage('Error adding admin');
      }
    } else {
      setMessage("Type in your Email");
    }
  };

  const handleDeleteAdmin = async () => {
    if (selectedAdmin) {
      try {
        await axios.delete('http://localhost:3000/api/admins', { data: { email: selectedAdmin } });
        setMessage(`Admin deleted successfully: ${selectedAdmin}`);
        setAdmins(admins.filter((admin) => admin.email !== selectedAdmin)); // Update the admins list
        setSelectedAdmin(''); // Clear the selection
      } catch (error) {
        console.error('Error deleting admin:', error);
        setMessage('Error deleting admin');
      }
    } else {
      setMessage('Please select an admin to delete');
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white max-sm:mb-6 mb-10 text-center">Admin Control</h1>

      <form onSubmit={handleAddAdmin} className="space-y-4">
        <div>
          <label className="text-gray-300 text-sm mb-1 capitalize">Admin Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Admin Email"
            className="w-full hover:scale-105 px-3 py-2 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div>
          <button type="submit" className="w-full hover:scale-105 bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
            Add Admin
          </button>
        </div>
      </form>

      <div className="mt-6">
        <label className="text-gray-300 text-sm mb-1 capitalize">Select Admin to Delete:</label>
        <select
          value={selectedAdmin}
          onChange={(e) => setSelectedAdmin(e.target.value)}
          required
          className="w-full hover:scale-105 px-3 py-2 bg-gray-200 border  border-gray-500 rounded-md shadow-md  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
        >
          <option value="" >Select Admin</option>
          {admins.map((admin) => (
            <option key={admin.email}value={admin.email}>
              {admin.email}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteAdmin}  className="w-full hover:scale-105 bg-gray-500 text-white py-2 px-4 mt-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
            Delete Admin
          </button>
      </div>

      {message && <p className="mt-4 text-center text-sm text-gray-300">{message}</p>}
    </div>
  );
};

export default AdminControl;
