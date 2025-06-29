
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Suggestions = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Human Resources',
    'Information Technology', 
    'Finance',
    'Marketing',
    'Sales',
    'Production',
    'Quality Control',
    'Research & Development'
  ];

  const handleSubmit = async () => {
    if (!selectedDepartment || !suggestion.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please select a department and enter your suggestion.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Suggestion Submitted!",
        description: `Your suggestion for ${selectedDepartment} has been recorded.`,
      });
      setSelectedDepartment('');
      setSuggestion('');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Submit Suggestions</h1>
              <p className="text-gray-600">Share your ideas and feedback</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Department Suggestion</span>
            </CardTitle>
            <CardDescription>
              Help us improve by sharing your suggestions and feedback for any department
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="font-medium text-gray-900">
                Select Department *
              </label>
              <Select onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a department..." />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="font-medium text-gray-900">
                Your Suggestion *
              </label>
              <Textarea
                placeholder="Please share your suggestion, feedback, or ideas for improvement..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <p className="text-sm text-gray-500">
                Be specific and constructive in your feedback to help us improve our services.
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedDepartment('');
                  setSuggestion('');
                }}
              >
                Clear Form
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'Submitting...' : 'Submit Suggestion'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guidelines Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Guidelines for Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Be specific about the issue or improvement you're suggesting</li>
              <li>• Provide constructive feedback that can help the department improve</li>
              <li>• Keep your suggestions professional and respectful</li>
              <li>• Include examples or scenarios where applicable</li>
              <li>• Focus on actionable improvements rather than general complaints</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Suggestions;
