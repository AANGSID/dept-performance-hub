
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminCharts: React.FC = () => {
  // Mock data - replace with actual API data
  const departmentRatings = [
    { name: 'HR', rating: 4.2 },
    { name: 'IT', rating: 3.8 },
    { name: 'Finance', rating: 4.5 },
    { name: 'Marketing', rating: 4.1 },
    { name: 'Sales', rating: 3.9 },
    { name: 'Legal', rating: 3.7 },
    { name: 'R&D', rating: 4.3 },
    { name: 'QC', rating: 4.0 },
  ];

  const scoreDistribution = [
    { name: '5 Stars', value: 35, color: '#22c55e' },
    { name: '4 Stars', value: 28, color: '#84cc16' },
    { name: '3 Stars', value: 20, color: '#eab308' },
    { name: '2 Stars', value: 12, color: '#f97316' },
    { name: '1 Star', value: 5, color: '#ef4444' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Average Rating by Department</CardTitle>
          <CardDescription>Current performance ratings (1-5 scale)</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
          <CardDescription>Distribution of ratings across all surveys</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={scoreDistribution}
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
        </CardContent>
      </Card>
    </div>
  );
};
