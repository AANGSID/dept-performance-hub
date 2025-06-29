
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, AlertTriangle, TrendingDown, Users, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DepartmentDetails = () => {
  const { departmentName } = useParams();
  
  // Mock department performance data
  const departmentData = {
    name: departmentName || 'IT Department',
    averageRating: 2.8,
    totalResponses: 24,
    trend: 'down',
    lastMonthRating: 3.2,
    issuesReported: 8,
    positiveRemarks: 3,
    neutralRemarks: 6,
    negativeRemarks: 15
  };

  const monthlyData = [
    { month: 'Jan', rating: 3.8, responses: 18 },
    { month: 'Feb', rating: 3.5, responses: 22 },
    { month: 'Mar', rating: 3.2, responses: 20 },
    { month: 'Apr', rating: 2.9, responses: 19 },
    { month: 'May', rating: 2.8, responses: 24 },
  ];

  const recentFeedback = [
    {
      id: 1,
      rating: 2,
      comment: "Response time for IT support requests is very slow. Took 3 days to resolve a simple password reset.",
      date: "2024-01-20"
    },
    {
      id: 2,
      rating: 1,
      comment: "System downtime is too frequent. This affects our daily operations significantly.",
      date: "2024-01-18"
    },
    {
      id: 3,
      rating: 3,
      comment: "Staff is knowledgeable but could improve communication skills.",
      date: "2024-01-15"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {departmentData.name} - Performance Alert
                </h1>
                <p className="text-gray-600">Department performance is below acceptable threshold</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-800">Performance Alert</h3>
              <p className="text-red-700 text-sm">
                This department's average rating ({departmentData.averageRating}) is below the 80% threshold (4.0/5.0).
                Immediate attention and improvement measures are recommended.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Current Rating</p>
                  <div className="flex items-center space-x-2">
                    <p className={`text-2xl font-bold ${getRatingColor(departmentData.averageRating)}`}>
                      {departmentData.averageRating}
                    </p>
                    <div className="flex">
                      {renderStars(Math.round(departmentData.averageRating))}
                    </div>
                  </div>
                </div>
                <TrendingDown className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Responses</p>
                  <p className="text-2xl font-bold">{departmentData.totalResponses}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Rating Decline</p>
                <p className="text-xl font-bold text-red-600">
                  -{(departmentData.lastMonthRating - departmentData.averageRating).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">from last month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Issues Reported</p>
                <p className="text-2xl font-bold text-orange-600">{departmentData.issuesReported}</p>
                <p className="text-xs text-gray-500">this month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Monthly rating progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip formatter={(value) => [`${value}`, 'Average Rating']} />
                  <Bar dataKey="rating" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Feedback Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Analysis</CardTitle>
              <CardDescription>Sentiment breakdown of recent feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Positive Remarks</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {departmentData.positiveRemarks}
                  </Badge>
                </div>
                <Progress value={(departmentData.positiveRemarks / departmentData.totalResponses) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Neutral Remarks</span>
                  <Badge variant="secondary">
                    {departmentData.neutralRemarks}
                  </Badge>
                </div>
                <Progress value={(departmentData.neutralRemarks / departmentData.totalResponses) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Negative Remarks</span>
                  <Badge variant="destructive">
                    {departmentData.negativeRemarks}
                  </Badge>
                </div>
                <Progress value={(departmentData.negativeRemarks / departmentData.totalResponses) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedback */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Critical Feedback</CardTitle>
            <CardDescription>Latest comments that require attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex">
                      {renderStars(feedback.rating)}
                    </div>
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recommended Action Items</CardTitle>
            <CardDescription>Steps to improve department performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Schedule immediate meeting with department head to discuss performance issues</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Implement training programs to address service quality concerns</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Review and optimize current processes to improve response times</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Set up monthly follow-up meetings to monitor improvement progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentDetails;
