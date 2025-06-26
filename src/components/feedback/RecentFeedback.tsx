
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, MessageSquare } from 'lucide-react';

export const RecentFeedback: React.FC = () => {
  // Mock recent feedback data
  const recentFeedback = [
    {
      id: 1,
      user: 'John D.',
      department: 'IT',
      rating: 5,
      comment: 'Excellent support and quick response time.',
      timestamp: '2 hours ago',
      type: 'positive'
    },
    {
      id: 2,
      user: 'Sarah M.',
      department: 'HR',
      rating: 4,
      comment: 'Good service, could improve communication.',
      timestamp: '5 hours ago',
      type: 'neutral'
    },
    {
      id: 3,
      user: 'Mike R.',
      department: 'Finance',
      rating: 3,
      comment: 'Average experience, room for improvement.',
      timestamp: '1 day ago',
      type: 'negative'
    },
    {
      id: 4,
      user: 'Lisa K.',
      department: 'Marketing',
      rating: 5,
      comment: 'Outstanding collaboration and creativity.',
      timestamp: '2 days ago',
      type: 'positive'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Recent Feedback
        </CardTitle>
        <CardDescription>Latest survey responses and comments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarFallback className="text-xs">
                      {feedback.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{feedback.user}</p>
                    <p className="text-xs text-gray-500">to {feedback.department}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={getTypeColor(feedback.type)}>
                  {feedback.type}
                </Badge>
              </div>
              
              <div className="flex items-center mb-2">
                {renderStars(feedback.rating)}
                <span className="ml-2 text-sm font-medium">{feedback.rating}/5</span>
              </div>
              
              <p className="text-sm text-gray-700 mb-2">{feedback.comment}</p>
              
              <p className="text-xs text-gray-500">{feedback.timestamp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
