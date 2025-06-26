
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export const SurveyPermissions: React.FC = () => {
  const { toast } = useToast();

  const departments = [
    'Admin', 'HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Production',
    'QC', 'R&D', 'Legal', 'Procurement', 'Logistics', 'Customer Service',
    'Maintenance', 'Security', 'Training', 'PR'
  ];

  // Matrix state: [fromDept][toDept] = allowed
  const [permissions, setPermissions] = useState(() => {
    const matrix = Array(17).fill(null).map(() => Array(17).fill(false));
    // Set some default permissions (excluding self-rating)
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 17; j++) {
        if (i !== j) {
          matrix[i][j] = Math.random() > 0.3; // Random initial state
        }
      }
    }
    return matrix;
  });

  const togglePermission = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return; // Cannot toggle self-rating
    
    const newPermissions = [...permissions];
    newPermissions[fromIndex][toIndex] = !newPermissions[fromIndex][toIndex];
    setPermissions(newPermissions);
  };

  const savePermissions = () => {
    // In real implementation, send to backend
    toast({
      title: 'Success',
      description: 'Survey permissions updated successfully',
    });
  };

  const getCellClass = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) {
      return 'bg-gray-800 cursor-not-allowed'; // Self-rating blocked
    }
    return permissions[fromIndex][toIndex] 
      ? 'bg-green-500 hover:bg-green-600 cursor-pointer' 
      : 'bg-gray-100 hover:bg-gray-200 cursor-pointer border';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Survey Permissions Matrix</CardTitle>
        <CardDescription>
          Control which departments can rate which departments. Click cells to toggle permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Allowed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border rounded"></div>
            <span>Not Allowed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-800 rounded"></div>
            <span>Self-rating (Blocked)</span>
          </div>
        </div>

        <div className="overflow-auto">
          <div className="min-w-max">
            {/* Header row */}
            <div className="flex">
              <div className="w-20 h-8 flex items-center justify-center text-xs font-medium bg-gray-100 border">
                FROM / TO
              </div>
              {departments.map((dept, index) => (
                <div key={index} className="w-12 h-8 flex items-center justify-center text-xs font-medium bg-gray-100 border">
                  {dept}
                </div>
              ))}
            </div>

            {/* Matrix rows */}
            {departments.map((fromDept, fromIndex) => (
              <div key={fromIndex} className="flex">
                <div className="w-20 h-8 flex items-center justify-center text-xs font-medium bg-gray-100 border">
                  {fromDept}
                </div>
                {departments.map((toDept, toIndex) => (
                  <div
                    key={toIndex}
                    className={`w-12 h-8 flex items-center justify-center text-xs transition-colors ${getCellClass(fromIndex, toIndex)}`}
                    onClick={() => togglePermission(fromIndex, toIndex)}
                    title={fromIndex === toIndex ? 'Self-rating blocked' : `${fromDept} → ${toDept}`}
                  >
                    {fromIndex === toIndex ? '⬛' : permissions[fromIndex][toIndex] ? '✅' : ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={savePermissions} className="w-full md:w-auto">
            Save Permission Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
