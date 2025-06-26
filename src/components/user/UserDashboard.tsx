
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with actual API calls
  const surveyData = {
    totalDepartments: 16, // Excluding own department
    completed: 8,
    pending: 8,
    myDepartmentRating: 4.2,
  };

  // Mock departments that user can rate
  const availableDepartments = [
    { id: 1, name: 'Human Resources', status: 'completed', rating: 4 },
    { id: 2, name: 'Information Technology', status: 'completed', rating: 5 },
    { id: 3, name: 'Finance', status: 'pending', rating: null },
    { id: 4, name: 'Marketing', status: 'pending', rating: null },
    { id: 5, name: 'Sales', status: 'completed', rating: 3 },
    { id: 6, name: 'Production', status: 'pending', rating: null },
    { id: 7, name: 'Quality Control', status: 'completed', rating: 4 },
    { id: 8, name: 'Research & Development', status: 'pending', rating: null },
  ];

  const progressPercentage = (surveyData.completed / surveyData.totalDepartments) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string, rating: number | null) => {
    if (status === 'completed') {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Completed ({rating}/5)
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-yellow-600 border-yellow-300">
        Pending
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.department?.name}</div>
            <p className="text-xs text-muted-foreground">Current Rating: {surveyData.myDepartmentRating}/5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Survey Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveyData.completed}/{surveyData.totalDepartments}</div>
            <Progress value={progressPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{progressPercentage.toFixed(0)}% Complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveyData.pending}</div>
            <p className="text-xs text-muted-foreground">Departments to evaluate</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments to Survey */}
      <Card>
        <CardHeader>
          <CardTitle>Departments to Survey</CardTitle>
          <CardDescription>
            Rate the performance of other departments based on your interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableDepartments.map((dept) => (
              <Card key={dept.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-sm">{dept.name}</h3>
                    {getStatusIcon(dept.status)}
                  </div>
                  
                  <div className="space-y-3">
                    {getStatusBadge(dept.status, dept.rating)}
                    
                    {dept.status === 'pending' ? (
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          // Navigate to survey page
                          console.log(`Starting survey for ${dept.name}`);
                        }}
                      >
                        Start Survey
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          // View/edit existing survey
                          console.log(`Viewing survey for ${dept.name}`);
                        }}
                      >
                        View Survey
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
