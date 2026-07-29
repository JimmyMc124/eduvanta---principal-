import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NavigationTab, 
  SystemTheme, 
  SchoolInfo, 
  SystemHealth, 
  Student, 
  Teacher, 
  BusRoute, 
  LibraryBook, 
  ActivityLog, 
  FinanceRecord, 
  SchoolEvent, 
  UserAccount, 
  ToastNotification 
} from '../types';
import { 
  INITIAL_SCHOOL, 
  INITIAL_SYSTEM_HEALTH, 
  MOCK_STUDENTS, 
  MOCK_TEACHERS, 
  MOCK_BUS_ROUTES, 
  MOCK_BOOKS, 
  MOCK_ACTIVITIES, 
  MOCK_FINANCE, 
  MOCK_EVENTS, 
  MOCK_ACCOUNTS 
} from '../data/mockData';

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  items: { label: string; action: () => void; icon?: string; danger?: boolean }[];
}

interface OSContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  theme: SystemTheme;
  toggleTheme: () => void;
  isControlCenterOpen: boolean;
  toggleControlCenter: () => void;
  isSpotlightOpen: boolean;
  toggleSpotlight: () => void;
  isAIOpen: boolean;
  toggleAI: (open?: boolean) => void;
  schoolInfo: SchoolInfo;
  setSchoolInfo: React.Dispatch<React.SetStateAction<SchoolInfo>>;
  systemHealth: SystemHealth;
  students: Student[];
  teachers: Teacher[];
  busRoutes: BusRoute[];
  books: LibraryBook[];
  activities: ActivityLog[];
  financeRecords: FinanceRecord[];
  events: SchoolEvent[];
  userAccounts: UserAccount[];
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  contextMenu: ContextMenuState;
  showContextMenu: (e: React.MouseEvent, items: ContextMenuState['items']) => void;
  hideContextMenu: () => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  addFinanceRecord: (record: Omit<FinanceRecord, 'id' | 'date'>) => void;
  addUserAccount: (user: Omit<UserAccount, 'id' | 'lastLogin'>) => void;
  toggleUserStatus: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [theme, setTheme] = useState<SystemTheme>('dark');
  const [isControlCenterOpen, setIsControlCenterOpen] = useState<boolean>(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);

  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(INITIAL_SCHOOL);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>(INITIAL_SYSTEM_HEALTH);
  
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>(MOCK_BUS_ROUTES);
  const [books, setBooks] = useState<LibraryBook[]>(MOCK_BOOKS);
  const [activities, setActivities] = useState<ActivityLog[]>(MOCK_ACTIVITIES);
  const [financeRecords, setFinanceRecords] = useState<FinanceRecord[]>(MOCK_FINANCE);
  const [events, setEvents] = useState<SchoolEvent[]>(MOCK_EVENTS);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(MOCK_ACCOUNTS);

  const [toasts, setToasts] = useState<ToastNotification[]>([
    {
      id: 'toast-1',
      title: 'Eduvanta OS Ready',
      message: 'System running on Apple Cloud Run Node v22. Latency: 12ms',
      type: 'info',
      timestamp: 'Just now'
    }
  ]);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    items: []
  });

  // Dynamic Theme Handler
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard shortcut listener (Cmd+K for Spotlight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Periodic System Health Fluctuation Simulation (Real-time Feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        cpuUsage: Math.floor(15 + Math.random() * 12),
        apiLatency: Math.floor(10 + Math.random() * 8),
        networkBandwidth: Math.floor(820 + Math.random() * 80)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleControlCenter = () => setIsControlCenterOpen(prev => !prev);
  const toggleSpotlight = () => setIsSpotlightOpen(prev => !prev);
  const toggleAI = (open?: boolean) => setIsAIOpen(prev => open !== undefined ? open : !prev);

  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const newToast: ToastNotification = {
      id: `toast-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
  };

  const showContextMenu = (e: React.MouseEvent, items: ContextMenuState['items']) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 200),
      items
    });
  };

  const hideContextMenu = () => {
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  const addStudent = (newStu: Omit<Student, 'id'>) => {
    const created: Student = { ...newStu, id: `STU-${Math.floor(1000 + Math.random() * 9000)}` };
    setStudents(prev => [created, ...prev]);
    addToast('Student Created', `${created.name} enrolled into ${created.grade}`, 'success');
  };

  const addTeacher = (newTch: Omit<Teacher, 'id'>) => {
    const created: Teacher = { ...newTch, id: `TCH-${Math.floor(200 + Math.random() * 800)}` };
    setTeachers(prev => [created, ...prev]);
    addToast('Faculty Added', `${created.name} appointed to ${created.department}`, 'success');
  };

  const addFinanceRecord = (newFin: Omit<FinanceRecord, 'id' | 'date'>) => {
    const created: FinanceRecord = {
      ...newFin,
      id: `FIN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setFinanceRecords(prev => [created, ...prev]);
    addToast('Finance Entry Saved', `$${created.amount.toLocaleString()} logged under ${created.category}`, 'info');
  };

  const addUserAccount = (newUser: Omit<UserAccount, 'id' | 'lastLogin'>) => {
    const created: UserAccount = {
      ...newUser,
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      lastLogin: 'Never'
    };
    setUserAccounts(prev => [created, ...prev]);
    addToast('Account Created', `Created ${created.role} account for ${created.name}`, 'success');
  };

  const toggleUserStatus = (id: string) => {
    setUserAccounts(prev => prev.map(usr => {
      if (usr.id === id) {
        const nextStatus = usr.status === 'Active' ? 'Suspended' : 'Active';
        addToast('Account Updated', `${usr.name} status changed to ${nextStatus}`, 'warning');
        return { ...usr, status: nextStatus };
      }
      return usr;
    }));
  };

  return (
    <OSContext.Provider value={{
      activeTab,
      setActiveTab,
      theme,
      toggleTheme,
      isControlCenterOpen,
      toggleControlCenter,
      isSpotlightOpen,
      toggleSpotlight,
      isAIOpen,
      toggleAI,
      schoolInfo,
      setSchoolInfo,
      systemHealth,
      students,
      teachers,
      busRoutes,
      books,
      activities,
      financeRecords,
      events,
      userAccounts,
      toasts,
      addToast,
      contextMenu,
      showContextMenu,
      hideContextMenu,
      addStudent,
      addTeacher,
      addFinanceRecord,
      addUserAccount,
      toggleUserStatus
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
