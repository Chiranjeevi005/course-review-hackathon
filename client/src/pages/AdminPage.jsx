import React from 'react';
import { Link } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const AdminPage = ({ socket }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminDashboard socket={socket} />
    </div>
  );
};

export default AdminPage;