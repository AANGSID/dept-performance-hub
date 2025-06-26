
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const FeedbackAnalytics: React.FC = () => {
  // Mock analytics data
  const ratingDistribution = [
    { rating: '5 Stars', count: 89, percentage: 38 },
    { rating: '4 Stars', count: 76, percentage: 32 },
    { rating: '3 Stars', count: 45, percentage: 19 },
    { rating: '2 Stars', count: 18, percentage: 8 },
    { rating: '1 Star', count: 6, percentage: 3 },
  ];

  const monthlyTrends = [
    { month: 'Jan', avgRating: 3.8, responses: 45 },
    { month: 'Feb', avgRating: 4.0, responses: 52 },
    { month: 'Mar', avgRating: 4.1, responses: 48 },
    { month: 'Apr', avgRating: 4.3, responses: 58 },
    { month: 'May', avgRating: 4.2, responses: 63 },
    { month: 'Jun', avgRating: 4.4, responses: 67 },
  ];

  const COLORS = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Analytics</CardTitle>
        <CardDescription>Detailed insights and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rating Distribution */}
          <div>
            <h4 className="font-medium mb-4">Rating Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} responses`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trends */}
          <div>
            <h4 className="font-medium mb-4">Monthly Rating Trends</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip formatter={(value) => [`${value}`, 'Average Rating']} />
                <Bar dataKey="avgRating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="mt-6">
          <h4 className="font-medium mb-4">Rating Breakdown</h4>
          <div className="space-y-3">
            {ratingDistribution.map((item, index) => (
              <div key={item.rating} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.rating}</span>
                <div className="flex items-center flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS[index]
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-16 text-right">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
