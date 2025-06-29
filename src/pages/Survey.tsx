
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Star, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';

const Survey = () => {
  const { departmentId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock department data - you could enhance this to fetch from a departments list
  const department = {
    id: parseInt(departmentId || '1'),
    name: 'Human Resources', // This should be dynamic based on departmentId
    description: 'Please rate your experience with the HR department'
  };

  const [ratings, setRatings] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0
  });
  
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    'How would you rate the overall service quality?',
    'How responsive is this department to your requests?',
    'How professional is the staff in this department?',
    'How satisfied are you with the communication?',
    'How likely are you to recommend this department to others?'
  ];

  const handleRatingChange = (questionKey: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [questionKey]: rating
    }));
  };

  const handleSubmit = async () => {
    // Check if all ratings are provided
    const allRatingsProvided = Object.values(ratings).every(rating => rating > 0);
    
    if (!allRatingsProvided) {
      toast({
        title: "Incomplete Survey",
        description: "Please provide ratings for all questions.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to submit a survey.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Create submission object
    const submission = {
      id: Date.now(), // Simple ID generation
      user_id: user.id,
      from_dept_id: user.dept_id,
      to_dept_id: parseInt(departmentId || '1'),
      q1: ratings.q1,
      q2: ratings.q2,
      q3: ratings.q3,
      q4: ratings.q4,
      q5: ratings.q5,
      remark: remark || '',
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem('survey_submissions') || '[]');
    existingSubmissions.push(submission);
    localStorage.setItem('survey_submissions', JSON.stringify(existingSubmissions));

    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Survey Submitted!",
        description: `Your feedback for ${department.name} has been recorded.`,
      });
      setIsSubmitting(false);
      
      // Navigate back to dashboard
      navigate('/');
    }, 2000);
  };

  const renderStarRating = (questionKey: string, currentRating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(questionKey, star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= currentRating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const completionPercentage = (Object.values(ratings).filter(r => r > 0).length / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dashboard</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Department Survey</h1>
                <p className="text-gray-600">{department.name}</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {completionPercentage.toFixed(0)}% Complete
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Survey for {department.name}
              <Progress value={completionPercentage} className="w-32" />
            </CardTitle>
            <CardDescription>
              {department.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => {
              const questionKey = `q${index + 1}` as keyof typeof ratings;
              return (
                <div key={questionKey} className="space-y-3">
                  <h3 className="font-medium text-gray-900">
                    {index + 1}. {question}
                  </h3>
                  <div className="flex items-center justify-between">
                    {renderStarRating(questionKey, ratings[questionKey])}
                    {ratings[questionKey] > 0 && (
                      <span className="text-sm text-gray-500">
                        {ratings[questionKey]}/5
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">
                Additional Comments (Optional)
              </h3>
              <Textarea
                placeholder="Share any additional feedback or suggestions..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Link to="/">
                <Button variant="outline">
                  Save Draft
                </Button>
              </Link>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || completionPercentage < 100}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Submit Survey'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Survey;
