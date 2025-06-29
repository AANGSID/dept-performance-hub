
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Star, MessageSquare, TrendingUp, Award, Users, BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeedbackOverview } from '../components/feedback/FeedbackOverview';
import { DepartmentRatings } from '../components/feedback/DepartmentRatings';
import { RecentFeedback } from '../components/feedback/RecentFeedback';
import { FeedbackAnalytics } from '../components/feedback/FeedbackAnalytics';
import { getOverviewStats } from '../utils/surveyDataUtils';

const ReviewFeedback = () => {
  // Get real data from survey submissions
  const overviewStats = getOverviewStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Review & Feedback</h1>
                <p className="text-gray-600 mt-1">Comprehensive departmental performance insights</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics Dashboard
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Responses</p>
                  <p className="text-3xl font-bold">{overviewStats.totalResponses}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Average Rating</p>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold">{overviewStats.averageRating}</p>
                    <Star className="w-6 h-6 ml-1 fill-current" />
                  </div>
                </div>
                <Award className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Completion Rate</p>
                  <p className="text-3xl font-bold">{overviewStats.completionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Pending Reviews</p>
                  <p className="text-3xl font-bold">{overviewStats.pendingReviews}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Department Ratings */}
          <div className="lg:col-span-2 space-y-6">
            <DepartmentRatings />
            <FeedbackAnalytics />
          </div>

          {/* Right Column - Overview and Recent Feedback */}
          <div className="space-y-6">
            <FeedbackOverview />
            <RecentFeedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewFeedback;
