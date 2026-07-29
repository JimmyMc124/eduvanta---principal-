// Eduvanta OS TypeScript Interfaces and Enums

export type UserRole = 'Principal' | 'Teacher' | 'Student';

export type NavigationTab = 
  | 'dashboard'
  | 'principal-dashboard'
  | 'teacher-dashboard'
  | 'student-dashboard'
  | 'students'
  | 'teachers'
  | 'analytics'
  | 'omni-tools'
  | 'timetable'
  | 'library'
  | 'transport'
  | 'certificates'
  | 'security'
  | 'communication'
  | 'finance'
  | 'calendar'
  | 'settings'
  | 'ai-studio';

export type SystemTheme = 'dark' | 'light';

export interface SchoolInfo {
  id: string;
  name: string;
  motto: string;
  logo: string;
  principal: string;
  location: string;
  status: 'online' | 'maintenance' | 'offline';
  established: number;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'warning';
  backend: 'Operational' | 'Degraded' | 'Offline';
  database: 'Connected' | 'High Latency' | 'Disconnected';
  apiLatency: number; // in ms
  cpuUsage: number; // percentage
  ramUsage: number; // in GB out of 16
  storageUsage: number; // percentage
  networkBandwidth: number; // in Mbps
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  grade: string;
  section: string;
  gender: 'Male' | 'Female' | 'Other';
  gpa: number;
  attendancePct: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  parentName: string;
  parentContact: string;
  status: 'Active' | 'Suspended' | 'Graduated';
  avatar?: string;
  house?: string;
  dob?: string;
  bloodGroup?: string;
  allergies?: string[];
  emergencyContact?: string;
  medicalNotes?: string;
  disciplineLog?: { id: string; date: string; title: string; type: 'Commendation' | 'Warning' | 'Detention'; remark: string }[];
  feeRecords?: { id: string; term: string; amount: number; date: string; status: 'Paid' | 'Pending' }[];
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  experienceYears: number;
  rating: number;
  status: 'Active' | 'On Leave' | 'Busy';
  contact: string;
  email: string;
  avatar?: string;
  salary?: number;
  classesAssigned?: string[];
  leaveBalance?: number;
  performanceNotes?: string;
}

export interface BusRoute {
  id: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  routeName: string;
  studentsCount: number;
  currentLocationName: string;
  speedKmH: number;
  fuelPct: number;
  status: 'On Route' | 'At Stop' | 'Maintenance' | 'Completed';
  gpsCoordinates: { lat: number; lng: number };
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  borrowedCopies: number;
  availableCopies: number;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  role: 'Principal' | 'Teacher' | 'Student' | 'System' | 'Parent';
  action: string;
  category: 'Login' | 'Attendance' | 'Finance' | 'Security' | 'Academic' | 'Transport';
  status: 'Success' | 'Warning' | 'Error';
}

export interface FinanceRecord {
  id: string;
  date: string;
  type: 'Revenue' | 'Expense';
  category: string;
  amount: number;
  description: string;
  status: 'Completed' | 'Pending';
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Exam' | 'Holiday' | 'Sports' | 'Meeting' | 'Birthday' | 'Notice';
  location: string;
  participants: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Principal' | 'Admin' | 'Teacher' | 'Staff' | 'Parent' | 'Student';
  status: 'Active' | 'Suspended' | 'Locked';
  lastLogin: string;
  twoFactorEnabled: boolean;
  ipAddress: string;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  timestamp: string;
}

export type NotificationCategory = 'Students' | 'Teachers' | 'Finance' | 'Attendance' | 'Exams' | 'System' | 'Security';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  isPinned: boolean;
  actionUrl?: string;
}
