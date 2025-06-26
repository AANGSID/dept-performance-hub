
export interface User {
  id: number;
  username: string;
  dept_id: number;
  is_admin: boolean;
  department?: Department;
}

export interface Department {
  id: number;
  name: string;
}

export interface Submission {
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

export interface Permission {
  id: number;
  from_dept_id: number;
  to_dept_id: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface DepartmentRating {
  dept_id: number;
  dept_name: string;
  avg_rating: number;
  total_submissions: number;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
