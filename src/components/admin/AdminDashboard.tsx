
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { AdminCharts } from './AdminCharts';
import { UserManagement } from './UserManagement';
import { SurveyPermissions } from './SurveyPermissions';
import { SuggestionsView } from './SuggestionsView';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data - replace with actual API calls
  const stats = {
    totalDepartments: 17,
    submissionsToday: 12,
    submissionsWeek: 89,
    alertDepartments: ['IT Department', 'Legal Department'],
  };

  const handleDepartmentClick = (departmentName: string) => {
    navigate(`/department-details/${encodeURIComponent(departmentName)}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDepartments}</div>
            <p className="text-xs text-muted-foreground">Active departments in survey</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submissionsToday}</div>
            <p className="text-xs text-muted-foreground">New survey responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submissionsWeek}</div>
            <p className="text-xs text-muted-foreground">Total submissions this week</p>
          </CardContent>
        </Card>
      </div>

      {stats.alertDepartments.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTitle className="text-red-800">Performance Alert</AlertTitle>
          <AlertDescription className="text-red-700">
            The following departments have ratings below 80%:
            <div className="mt-2 space-x-2">
              {stats.alertDepartments.map((dept) => (
                <Badge 
                  key={dept} 
                  variant="destructive" 
                  className="text-xs cursor-pointer hover:bg-red-700 transition-colors"
                  onClick={() => handleDepartmentClick(dept)}
                >
                  {dept}
                </Badge>
              ))}
            </div>
            <p className="text-xs mt-2 text-red-600">Click on department names to view detailed performance analysis</p>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="permissions">Survey Permissions</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions & Remarks</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AdminCharts />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="permissions">
          <SurveyPermissions />
        </TabsContent>

        <TabsContent value="suggestions">
          <SuggestionsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};
