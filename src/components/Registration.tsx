
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface RegistrationProps {
  onBackToLogin: () => void;
  onRegistrationSuccess: () => void;
}

const departments = [
  'Human Resources', 'Information Technology', 'Finance',
  'Marketing', 'Sales', 'Production', 'Quality Control', 'Research & Development',
  'Legal', 'Procurement', 'Logistics', 'Customer Service', 'Maintenance',
  'Security', 'Training', 'Public Relations'
];

export const Registration: React.FC<RegistrationProps> = ({ onBackToLogin, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password || !formData.confirmPassword || !formData.department) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive',
      });
      return;
    }

    // Check if username already exists (including admin)
    const existingUsers = JSON.parse(localStorage.getItem('survey_registered_users') || '[]');
    if (existingUsers.some((user: any) => user.username === formData.username) || formData.username === 'admin') {
      toast({
        title: 'Error',
        description: 'Username already exists. Please choose a different username.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Get next available ID
      const nextId = existingUsers.length > 0 ? Math.max(...existingUsers.map((u: any) => u.id)) + 1 : 2;
      
      // Find department ID
      const deptId = departments.indexOf(formData.department) + 2; // Start from 2 since admin is 1

      const newUser = {
        id: nextId,
        username: formData.username,
        password: formData.password, // In real app, this would be hashed
        dept_id: deptId,
        is_admin: false,
        department: formData.department
      };

      // Save to localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('survey_registered_users', JSON.stringify(updatedUsers));

      toast({
        title: 'Registration Successful',
        description: 'Your account has been created successfully. You can now login.',
      });

      onRegistrationSuccess();
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'An error occurred during registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create Account
          </CardTitle>
          <CardDescription>
            Survey Management System - User Registration
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select onValueChange={(value) => setFormData({...formData, department: value})}>
                <SelectTrigger disabled={isLoading}>
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Enter your password (min 6 characters)"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={onBackToLogin}
              disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Already have an account? Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
