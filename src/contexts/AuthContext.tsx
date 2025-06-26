
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration - replace with actual API calls
const mockUsers: User[] = [
  { id: 1, username: 'admin', dept_id: 1, is_admin: true },
  { id: 2, username: 'user1', dept_id: 2, is_admin: false },
  { id: 3, username: 'user2', dept_id: 3, is_admin: false },
];

const mockDepartments = [
  { id: 1, name: 'Administration' },
  { id: 2, name: 'Human Resources' },
  { id: 3, name: 'Information Technology' },
  { id: 4, name: 'Finance' },
  { id: 5, name: 'Marketing' },
  { id: 6, name: 'Sales' },
  { id: 7, name: 'Production' },
  { id: 8, name: 'Quality Control' },
  { id: 9, name: 'Research & Development' },
  { id: 10, name: 'Legal' },
  { id: 11, name: 'Procurement' },
  { id: 12, name: 'Logistics' },
  { id: 13, name: 'Customer Service' },
  { id: 14, name: 'Maintenance' },
  { id: 15, name: 'Security' },
  { id: 16, name: 'Training' },
  { id: 17, name: 'Public Relations' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('survey_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const department = mockDepartments.find(d => d.id === userData.dept_id);
      setUser({ ...userData, department });
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - replace with actual API call
    const foundUser = mockUsers.find(
      u => u.username === credentials.username
    );
    
    if (foundUser) {
      // In real implementation, verify password hash
      const department = mockDepartments.find(d => d.id === foundUser.dept_id);
      const userWithDept = { ...foundUser, department };
      
      setUser(userWithDept);
      localStorage.setItem('survey_user', JSON.stringify(userWithDept));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('survey_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
