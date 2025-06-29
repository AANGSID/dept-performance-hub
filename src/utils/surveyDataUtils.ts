
export interface SurveySubmission {
  id: number;
  user_id: number;
  from_dept_id: number;
  to_dept_id: number;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  remark?: string;
  timestamp: string;
}

export interface DepartmentStats {
  id: number;
  name: string;
  avgRating: number;
  totalResponses: number;
  trend: 'up' | 'down' | 'stable';
}

// Mock departments data for reference
const mockDepartments = [
  { id: 1, name: 'Administration' },
  { id: 2, name: 'Human Resources' },
  { id: 3, name: 'Information Technology' },
  { id: 4, name: 'Finance' },
  { id: 5, name: 'Marketing' },
  { id: 6, name: 'Sales' },
  { id: 7, name: 'Production' },
  { id: 8, name: 'Quality Control' },
  { id: 9, name: 'Research & Development' },
  { id: 10, name: 'Legal' },
  { id: 11, name: 'Procurement' },
  { id: 12, name: 'Logistics' },
  { id: 13, name: 'Customer Service' },
  { id: 14, name: 'Maintenance' },
  { id: 15, name: 'Security' },
  { id: 16, name: 'Training' },
  { id: 17, name: 'Public Relations' },
];

export const getSurveySubmissions = (): SurveySubmission[] => {
  const stored = localStorage.getItem('survey_submissions');
  return stored ? JSON.parse(stored) : [];
};

export const getDepartmentStats = (): DepartmentStats[] => {
  const submissions = getSurveySubmissions();
  
  return mockDepartments.map(dept => {
    const deptSubmissions = submissions.filter(sub => sub.to_dept_id === dept.id);
    
    if (deptSubmissions.length === 0) {
      return {
        id: dept.id,
        name: dept.name,
        avgRating: 0,
        totalResponses: 0,
        trend: 'stable' as const
      };
    }

    const totalRating = deptSubmissions.reduce((sum, sub) => {
      return sum + (sub.q1 + sub.q2 + sub.q3 + sub.q4 + sub.q5) / 5;
    }, 0);
    
    const avgRating = totalRating / deptSubmissions.length;
    
    // Calculate trend based on recent submissions (last 30 days vs previous 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    
    const recentSubmissions = deptSubmissions.filter(sub => 
      new Date(sub.timestamp) >= thirtyDaysAgo
    );
    const previousSubmissions = deptSubmissions.filter(sub => 
      new Date(sub.timestamp) >= sixtyDaysAgo && new Date(sub.timestamp) < thirtyDaysAgo
    );
    
    let trend: 'up' | 'down' | 'stable' = 'stable';
    
    if (recentSubmissions.length > 0 && previousSubmissions.length > 0) {
      const recentAvg = recentSubmissions.reduce((sum, sub) => 
        sum + (sub.q1 + sub.q2 + sub.q3 + sub.q4 + sub.q5) / 5, 0
      ) / recentSubmissions.length;
      
      const previousAvg = previousSubmissions.reduce((sum, sub) => 
        sum + (sub.q1 + sub.q2 + sub.q3 + sub.q4 + sub.q5) / 5, 0
      ) / previousSubmissions.length;
      
      if (recentAvg > previousAvg + 0.2) trend = 'up';
      else if (recentAvg < previousAvg - 0.2) trend = 'down';
    }

    return {
      id: dept.id,
      name: dept.name,
      avgRating: Math.round(avgRating * 10) / 10,
      totalResponses: deptSubmissions.length,
      trend
    };
  }).filter(dept => dept.totalResponses > 0); // Only show departments with responses
};

export const getOverviewStats = () => {
  const submissions = getSurveySubmissions();
  
  if (submissions.length === 0) {
    return {
      totalResponses: 0,
      averageRating: 0,
      completionRate: 0,
      pendingReviews: 0
    };
  }

  const totalRating = submissions.reduce((sum, sub) => {
    return sum + (sub.q1 + sub.q2 + sub.q3 + sub.q4 + sub.q5) / 5;
  }, 0);
  
  const averageRating = Math.round((totalRating / submissions.length) * 10) / 10;
  
  // Calculate completion rate (assuming 300 total possible surveys)
  const completionRate = Math.round((submissions.length / 300) * 100);
  
  return {
    totalResponses: submissions.length,
    averageRating,
    completionRate,
    pendingReviews: Math.max(0, 12 - Math.floor(submissions.length / 10)) // Mock pending reviews
  };
};

export const getRatingDistribution = () => {
  const submissions = getSurveySubmissions();
  
  if (submissions.length === 0) {
    return [
      { rating: '5 Stars', count: 0, percentage: 0 },
      { rating: '4 Stars', count: 0, percentage: 0 },
      { rating: '3 Stars', count: 0, percentage: 0 },
      { rating: '2 Stars', count: 0, percentage: 0 },
      { rating: '1 Star', count: 0, percentage: 0 },
    ];
  }

  const ratingCounts = [0, 0, 0, 0, 0]; // 1-5 stars
  
  submissions.forEach(sub => {
    const avgRating = (sub.q1 + sub.q2 + sub.q3 + sub.q4 + sub.q5) / 5;
    const roundedRating = Math.round(avgRating);
    ratingCounts[roundedRating - 1]++;
  });
  
  return [
    { rating: '5 Stars', count: ratingCounts[4], percentage: Math.round((ratingCounts[4] / submissions.length) * 100) },
    { rating: '4 Stars', count: ratingCounts[3], percentage: Math.round((ratingCounts[3] / submissions.length) * 100) },
    { rating: '3 Stars', count: ratingCounts[2], percentage: Math.round((ratingCounts[2] / submissions.length) * 100) },
    { rating: '2 Stars', count: ratingCounts[1], percentage: Math.round((ratingCounts[1] / submissions.length) * 100) },
    { rating: '1 Star', count: ratingCounts[0], percentage: Math.round((ratingCounts[0] / submissions.length) * 100) },
  ];
};

export const getMonthlyTrends = () => {
  const submissions = getSurveySubmissions();
  
  if (submissions.length === 0) {
    return [
      { month: 'Jan', avgRating: 0, responses: 0 },
      { month: 'Feb', avgRating: 0, responses: 0 },
      { month: 'Mar', avgRating: 0, responses: 0 },
      { month: 'Apr', avgRating: 0, responses: 0 },
      { month: 'May', avgRating: 0, responses: 0 },
      { month: 'Jun', avgRating: 0, responses: 0 },
    ];
  }

  const monthlyData: { [key: string]: { total: number; count: number } } = {};
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  submissions.forEach(sub => {
    const date = new Date(sub.timestamp);
    const monthKey = months[date.getMonth()];
    const avgRating = (sub.q1 + sub.q2 + sub.q3 + sub.q4 + sub.q5) / 5;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { total: 0, count: 0 };
    }
    
    monthlyData[monthKey].total += avgRating;
    monthlyData[monthKey].count += 1;
  });
  
  return months.slice(0, 6).map(month => ({
    month,
    avgRating: monthlyData[month] 
      ? Math.round((monthlyData[month].total / monthlyData[month].count) * 10) / 10
      : 0,
    responses: monthlyData[month] ? monthlyData[month].count : 0
  }));
};
