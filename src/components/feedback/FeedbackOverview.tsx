
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FeedbackOverviewProps {
  stats: {
    totalResponses: number;
    averageRating: number;
    completionRate: number;
    pendingReviews: number;
  };
}

export const FeedbackOverview: React.FC<FeedbackOverviewProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Overview</CardTitle>
        <CardDescription>Current survey status and metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Response Rate</span>
            <span className="text-sm text-gray-500">{stats.completionRate}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Surveys</span>
            <Badge variant="secondary">300</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Completed</span>
            <Badge variant="default" className="bg-green-100 text-green-800">
              {stats.totalResponses}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Pending</span>
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              {300 - stats.totalResponses}
            </Badge>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Performance Trend</span>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+12% this month</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
