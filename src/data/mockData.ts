import { SchoolInfo, SystemHealth, Student, Teacher, BusRoute, LibraryBook, ActivityLog, FinanceRecord, SchoolEvent, UserAccount } from '../types';

export const INITIAL_SCHOOL: SchoolInfo = {
  id: 'eduvanta-main',
  name: 'St. Augustine International Academy',
  motto: 'Veritas, Excellentia et Innovatio',
  logo: '🎓',
  principal: 'Dr. Eleanor Vance, Ph.D.',
  location: 'Cupertino Campus, CA',
  status: 'online',
  established: 1988,
};

export const INITIAL_SYSTEM_HEALTH: SystemHealth = {
  status: 'healthy',
  backend: 'Operational',
  database: 'Connected',
  apiLatency: 12,
  cpuUsage: 18,
  ramUsage: 4.8,
  storageUsage: 28,
  networkBandwidth: 850,
};

export const MOCK_STUDENTS: Student[] = [
  { id: 'STU-1001', name: 'Alexander Wright', rollNo: '10-A-01', grade: 'Grade 10', section: 'A', gender: 'Male', gpa: 3.95, attendancePct: 98.2, feeStatus: 'Paid', parentName: 'Marcus Wright', parentContact: '+1 (555) 234-5678', status: 'Active' },
  { id: 'STU-1002', name: 'Sophia Chen', rollNo: '10-A-02', grade: 'Grade 10', section: 'A', gender: 'Female', gpa: 4.00, attendancePct: 99.5, feeStatus: 'Paid', parentName: 'David Chen', parentContact: '+1 (555) 345-6789', status: 'Active' },
  { id: 'STU-1003', name: 'Liam Johnson', rollNo: '11-B-05', grade: 'Grade 11', section: 'B', gender: 'Male', gpa: 3.78, attendancePct: 94.1, feeStatus: 'Pending', parentName: 'Sarah Johnson', parentContact: '+1 (555) 456-7890', status: 'Active' },
  { id: 'STU-1004', name: 'Emma Watson', rollNo: '12-A-12', grade: 'Grade 12', section: 'A', gender: 'Female', gpa: 3.92, attendancePct: 97.8, feeStatus: 'Paid', parentName: 'Robert Watson', parentContact: '+1 (555) 567-8901', status: 'Active' },
  { id: 'STU-1005', name: 'Ethan Miller', rollNo: '09-C-18', grade: 'Grade 9', section: 'C', gender: 'Male', gpa: 3.45, attendancePct: 91.0, feeStatus: 'Overdue', parentName: 'Amanda Miller', parentContact: '+1 (555) 678-9012', status: 'Active' },
  { id: 'STU-1006', name: 'Olivia Garcia', rollNo: '11-A-09', grade: 'Grade 11', section: 'A', gender: 'Female', gpa: 3.88, attendancePct: 96.5, feeStatus: 'Paid', parentName: 'Carlos Garcia', parentContact: '+1 (555) 789-0123', status: 'Active' },
  { id: 'STU-1007', name: 'Noah Patel', rollNo: '10-B-14', grade: 'Grade 10', section: 'B', gender: 'Male', gpa: 3.82, attendancePct: 95.4, feeStatus: 'Paid', parentName: 'Anand Patel', parentContact: '+1 (555) 890-1234', status: 'Active' },
  { id: 'STU-1008', name: 'Ava Robinson', rollNo: '12-B-03', grade: 'Grade 12', section: 'B', gender: 'Female', gpa: 3.97, attendancePct: 98.9, feeStatus: 'Paid', parentName: 'James Robinson', parentContact: '+1 (555) 901-2345', status: 'Active' },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'TCH-201', name: 'Prof. Marcus Vance', department: 'STEM', subject: 'Advanced Physics', experienceYears: 14, rating: 4.9, status: 'Active', contact: '+1 (555) 111-2233', email: 'm.vance@eduvanta.org' },
  { id: 'TCH-202', name: 'Dr. Clara Thorne', department: 'Mathematics', subject: 'Calculus & Statistics', experienceYears: 18, rating: 5.0, status: 'Active', contact: '+1 (555) 222-3344', email: 'c.thorne@eduvanta.org' },
  { id: 'TCH-203', name: 'Sarah Jenkins', department: 'Humanities', subject: 'World History', experienceYears: 9, rating: 4.7, status: 'Active', contact: '+1 (555) 333-4455', email: 's.jenkins@eduvanta.org' },
  { id: 'TCH-204', name: 'David Kim', department: 'Computer Science', subject: 'AI & Data Structures', experienceYears: 11, rating: 4.9, status: 'Active', contact: '+1 (555) 444-5566', email: 'd.kim@eduvanta.org' },
  { id: 'TCH-205', name: 'Elena Rostova', department: 'Arts & Music', subject: 'Symphonic Music', experienceYears: 7, rating: 4.8, status: 'On Leave', contact: '+1 (555) 555-6677', email: 'e.rostova@eduvanta.org' },
];

export const MOCK_BUS_ROUTES: BusRoute[] = [
  { id: 'BUS-01', busNumber: 'Route 01 - North Express', driverName: 'Robert Davis', driverPhone: '+1 (555) 888-0011', routeName: 'North Hills -> Silicon Campus', studentsCount: 42, currentLocationName: 'Milpitas Junction', speedKmH: 48, fuelPct: 82, status: 'On Route', gpsCoordinates: { lat: 37.4323, lng: -121.8996 } },
  { id: 'BUS-02', busNumber: 'Route 02 - West Metro', driverName: 'Michael Chang', driverPhone: '+1 (555) 888-0022', routeName: 'West Valley -> Campus Gate B', studentsCount: 38, currentLocationName: 'Saratoga Blvd', speedKmH: 35, fuelPct: 68, status: 'On Route', gpsCoordinates: { lat: 37.3188, lng: -122.0298 } },
  { id: 'BUS-03', busNumber: 'Route 03 - South Commute', driverName: 'Gabriel Lopez', driverPhone: '+1 (555) 888-0033', routeName: 'San Jose South -> Main Gate', studentsCount: 45, currentLocationName: 'At School Campus', speedKmH: 0, fuelPct: 95, status: 'Completed', gpsCoordinates: { lat: 37.3382, lng: -121.8863 } },
  { id: 'BUS-04', busNumber: 'Route 04 - East Connector', driverName: 'Arthur Pendelton', driverPhone: '+1 (555) 888-0044', routeName: 'Fremont Central -> Gate A', studentsCount: 30, currentLocationName: 'Central Depot Service', speedKmH: 0, fuelPct: 100, status: 'Maintenance', gpsCoordinates: { lat: 37.5483, lng: -121.9886 } },
];

export const MOCK_BOOKS: LibraryBook[] = [
  { id: 'BK-101', title: 'Principles of Quantum Physics', author: 'Richard Feynman', isbn: '978-0201360707', category: 'Science', totalCopies: 25, borrowedCopies: 18, availableCopies: 7 },
  { id: 'BK-102', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', isbn: '978-0134610993', category: 'Technology', totalCopies: 30, borrowedCopies: 26, availableCopies: 4 },
  { id: 'BK-103', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', category: 'Literature', totalCopies: 50, borrowedCopies: 35, availableCopies: 15 },
  { id: 'BK-104', title: 'Advanced Multivariable Calculus', author: 'James Stewart', isbn: '978-1285741550', category: 'Mathematics', totalCopies: 40, borrowedCopies: 22, availableCopies: 18 },
  { id: 'BK-105', title: 'World History: Patterns of Civilization', author: 'William J. Duiker', isbn: '978-1305952386', category: 'History', totalCopies: 35, borrowedCopies: 19, availableCopies: 16 },
];

export const MOCK_ACTIVITIES: ActivityLog[] = [
  { id: 'LOG-801', timestamp: '10:08 AM', user: 'Dr. Clara Thorne', role: 'Teacher', action: 'Uploaded Midterm Calculus Exam Results for Grade 12-A', category: 'Academic', status: 'Success' },
  { id: 'LOG-802', timestamp: '09:55 AM', user: 'Marcus Wright (Parent)', role: 'Parent', action: 'Paid Q3 Tuition Fee ($2,450.00 via Stripe)', category: 'Finance', status: 'Success' },
  { id: 'LOG-803', timestamp: '09:42 AM', user: 'Bus 01 GPS System', role: 'System', action: 'Vehicle Route 01 passed Geofence Marker: Milpitas', category: 'Transport', status: 'Success' },
  { id: 'LOG-804', timestamp: '09:30 AM', user: 'Gate Scanner AI', role: 'System', action: 'Recorded 3,240 Student RFID Attendance check-ins (96.4%)', category: 'Attendance', status: 'Success' },
  { id: 'LOG-805', timestamp: '08:15 AM', user: 'Firewall Daemon', role: 'System', action: 'Blocked 3 unauthorized IP connection requests from 185.220.101.4', category: 'Security', status: 'Warning' },
  { id: 'LOG-806', timestamp: '07:45 AM', user: 'Dr. Eleanor Vance', role: 'Principal', action: 'Logged into Eduvanta OS Terminal v4.2 from Apple macOS', category: 'Login', status: 'Success' },
];

export const MOCK_FINANCE: FinanceRecord[] = [
  { id: 'FIN-101', date: '2026-07-28', type: 'Revenue', category: 'Tuition Fees', amount: 48500, description: 'Batch tuition fee collections Q3 Grade 10 & 11', status: 'Completed' },
  { id: 'FIN-102', date: '2026-07-27', type: 'Expense', category: 'Faculty Payroll', amount: 125000, description: 'Monthly faculty & staff salary disbursement', status: 'Completed' },
  { id: 'FIN-103', date: '2026-07-26', type: 'Revenue', category: 'Transport Fees', amount: 8200, description: 'Quarterly school bus pass subscriptions', status: 'Completed' },
  { id: 'FIN-104', date: '2026-07-25', type: 'Expense', category: 'IT Infrastructure', amount: 6400, description: 'Cloud server upgrades & AI API quotas', status: 'Completed' },
  { id: 'FIN-105', date: '2026-07-24', type: 'Expense', category: 'Laboratory Supplies', amount: 3800, description: 'Advanced chemistry & robotics kits', status: 'Completed' },
];

export const MOCK_EVENTS: SchoolEvent[] = [
  { id: 'EVT-01', title: 'Annual Science & AI Symposium 2026', date: '2026-08-05', time: '09:00 AM', type: 'Exam', location: 'Main Auditorium', participants: 'All Grades & Faculty' },
  { id: 'EVT-02', title: 'Parent-Teacher Conference Q3', date: '2026-08-12', time: '01:00 PM', type: 'Meeting', location: 'Virtual & Campus Classrooms', participants: 'Parents & Teachers' },
  { id: 'EVT-03', title: 'Independence Day Holiday', date: '2026-08-15', time: 'All Day', type: 'Holiday', location: 'Campus Closed', participants: 'Entire School' },
  { id: 'EVT-04', title: 'Inter-School Football Championship', date: '2026-08-20', time: '03:30 PM', type: 'Sports', location: 'Eduvanta Athletic Stadium', participants: 'Sports Teams & Students' },
];

export const MOCK_ACCOUNTS: UserAccount[] = [
  { id: 'USR-001', name: 'Dr. Eleanor Vance', email: 'principal.vance@eduvanta.org', role: 'Principal', status: 'Active', lastLogin: '2026-07-28 10:05 AM', twoFactorEnabled: true, ipAddress: '192.168.1.104' },
  { id: 'USR-002', name: 'Marcus Vance', email: 'm.vance@eduvanta.org', role: 'Teacher', status: 'Active', lastLogin: '2026-07-28 09:40 AM', twoFactorEnabled: true, ipAddress: '192.168.1.112' },
  { id: 'USR-003', name: 'Sarah Johnson', email: 's.johnson@eduvanta.org', role: 'Admin', status: 'Active', lastLogin: '2026-07-28 08:12 AM', twoFactorEnabled: true, ipAddress: '192.168.1.101' },
  { id: 'USR-004', name: 'Alexander Wright', email: 'a.wright@student.eduvanta.org', role: 'Student', status: 'Active', lastLogin: '2026-07-27 04:15 PM', twoFactorEnabled: false, ipAddress: '10.0.4.22' },
  { id: 'USR-005', name: 'David Chen', email: 'd.chen@parents.eduvanta.org', role: 'Parent', status: 'Active', lastLogin: '2026-07-28 09:55 AM', twoFactorEnabled: true, ipAddress: '72.14.201.88' },
];

export const ATTENDANCE_CHART_DATA = [
  { month: 'Jan', attendancePct: 96.8, targetPct: 95.0 },
  { month: 'Feb', attendancePct: 95.4, targetPct: 95.0 },
  { month: 'Mar', attendancePct: 97.2, targetPct: 95.0 },
  { month: 'Apr', attendancePct: 96.1, targetPct: 95.0 },
  { month: 'May', attendancePct: 94.8, targetPct: 95.0 },
  { month: 'Jun', attendancePct: 98.0, targetPct: 95.0 },
  { month: 'Jul', attendancePct: 96.4, targetPct: 95.0 },
];

export const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 180000, expenses: 110000, profit: 70000 },
  { month: 'Feb', revenue: 210000, expenses: 115000, profit: 95000 },
  { month: 'Mar', revenue: 195000, expenses: 120000, profit: 75000 },
  { month: 'Apr', revenue: 240000, expenses: 125000, profit: 115000 },
  { month: 'May', revenue: 220000, expenses: 118000, profit: 102000 },
  { month: 'Jun', revenue: 280000, expenses: 130000, profit: 150000 },
  { month: 'Jul', revenue: 310000, expenses: 135000, profit: 175000 },
];

export const PERFORMANCE_RADAR_DATA = [
  { subject: 'Physics', currentScore: 88, aiPrediction: 92, maxMark: 100 },
  { subject: 'Mathematics', currentScore: 94, aiPrediction: 96, maxMark: 100 },
  { subject: 'Computer Sci', currentScore: 96, aiPrediction: 98, maxMark: 100 },
  { subject: 'Literature', currentScore: 82, aiPrediction: 86, maxMark: 100 },
  { subject: 'Chemistry', currentScore: 85, aiPrediction: 90, maxMark: 100 },
  { subject: 'History', currentScore: 89, aiPrediction: 91, maxMark: 100 },
];
