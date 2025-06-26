
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export const SuggestionsView: React.FC = () => {
  const [filterDept, setFilterDept] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock suggestions data
  const suggestions = [
    {
      id: 1,
      fromDept: 'IT',
      toDept: 'HR',
      remark: 'Great communication during the recruitment process. Could improve response time for technical queries.',
      date: '2024-01-15',
    },
    {
      id: 2,
      fromDept: 'Finance',
      toDept: 'Marketing',
      remark: 'Excellent campaign planning. Budget utilization could be more efficient.',
      date: '2024-01-14',
    },
    {
      id: 3,
      fromDept: 'Sales',
      toDept: 'Production',
      remark: 'Product quality is outstanding. Delivery timelines need improvement.',
      date: '2024-01-13',
    },
    {
      id: 4,
      fromDept: 'HR',
      toDept: 'IT',
      remark: 'Very responsive to technical issues. Documentation could be clearer.',
      date: '2024-01-12',
    },
  ];

  const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales', 'Production', 'QC', 'R&D'];

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesDept = !filterDept || suggestion.toDept === filterDept;
    const matchesSearch = !searchTerm || suggestion.remark.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggestions & Remarks</CardTitle>
        <CardDescription>
          View feedback and suggestions from department surveys
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search remarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select onValueChange={setFilterDept}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From Department</TableHead>
              <TableHead>To Department</TableHead>
              <TableHead>Remark</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuggestions.map((suggestion) => (
              <TableRow key={suggestion.id}>
                <TableCell>
                  <Badge variant="outline">{suggestion.fromDept}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{suggestion.toDept}</Badge>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate" title={suggestion.remark}>
                    {suggestion.remark}
                  </div>
                </TableCell>
                <TableCell>{suggestion.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No suggestions found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
