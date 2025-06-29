
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getRatingDistribution, getMonthlyTrends } from '../../utils/surveyDataUtils';

export const FeedbackAnalytics: React.FC = () => {
  // Get real data from survey submissions
  const ratingDistribution = getRatingDistribution();
  const monthlyTrends = getMonthlyTrends();

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
            {ratingDistribution.some(item => item.count > 0) ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={ratingDistribution.filter(item => item.count > 0)}
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
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-500">
                <p className="text-sm">No data available</p>
              </div>
            )}
          </div>

          {/* Monthly Trends */}
          <div>
            <h4 className="font-medium mb-4">Monthly Rating Trends</h4>
            {monthlyTrends.some(item => item.responses > 0) ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip formatter={(value) => [`${value}`, 'Average Rating']} />
                  <Bar dataKey="avgRating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-gray-500">
                <p className="text-sm">No monthly data available</p>
              </div>
            )}
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
