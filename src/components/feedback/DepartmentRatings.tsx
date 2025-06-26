
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Department {
  id: number;
  name: string;
  avgRating: number;
  totalResponses: number;
  trend: 'up' | 'down' | 'stable';
}

interface DepartmentRatingsProps {
  departments: Department[];
}

export const DepartmentRatings: React.FC<DepartmentRatingsProps> = ({ departments }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-green-100 text-green-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Average ratings and response counts by department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.id} className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">{dept.name}</h3>
                <Badge variant="secondary" className={getTrendColor(dept.trend)}>
                  {getTrendIcon(dept.trend)}
                  <span className="ml-1 capitalize">{dept.trend}</span>
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className={`font-semibold ${getRatingColor(dept.avgRating)}`}>
                    {dept.avgRating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 ml-1">/ 5.0</span>
                </div>
                <span className="text-sm text-gray-500">{dept.totalResponses} responses</span>
              </div>
              
              <Progress value={(dept.avgRating / 5) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
