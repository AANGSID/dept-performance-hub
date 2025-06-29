
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getDepartmentStats, getRatingDistribution } from '../../utils/surveyDataUtils';

export const AdminCharts: React.FC = () => {
  // Get real data from survey submissions
  const departmentStats = getDepartmentStats();
  const ratingDistribution = getRatingDistribution();

  // Transform department stats for the chart
  const departmentRatings = departmentStats.map(dept => ({
    name: dept.name.length > 8 ? dept.name.substring(0, 8) + '...' : dept.name,
    rating: dept.avgRating
  }));

  // Transform rating distribution for pie chart
  const scoreDistribution = ratingDistribution.map((item, index) => ({
    name: item.rating,
    value: item.count,
    color: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'][index]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Average Rating by Department</CardTitle>
          <CardDescription>Current performance ratings (1-5 scale)</CardDescription>
        </CardHeader>
        <CardContent>
          {departmentRatings.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentRatings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar 
                  dataKey="rating" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <div className="text-center">
                <p>No survey data available</p>
                <p className="text-sm">Charts will update when surveys are submitted</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
          <CardDescription>Distribution of ratings across all surveys</CardDescription>
        </CardHeader>
        <CardContent>
          {scoreDistribution.some(item => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution.filter(item => item.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <div className="text-center">
                <p>No rating data available</p>
                <p className="text-sm">Charts will update when surveys are submitted</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
