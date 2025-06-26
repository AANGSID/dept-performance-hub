
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../components/Login';
import { Header } from '../components/Header';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { UserDashboard } from '../components/user/UserDashboard';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {user.is_admin ? <AdminDashboard /> : <UserDashboard />}
      </main>
    </div>
  );
};

export default Index;
