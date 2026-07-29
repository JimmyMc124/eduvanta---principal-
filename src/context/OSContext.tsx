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
  ToastNotification,
  NotificationItem
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
  MOCK_ACCOUNTS,
  MOCK_NOTIFICATIONS 
} from '../data/mockData';
import { playSoundEffect, SoundEffectType } from '../utils/soundEffects';

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
  soundEnabled: boolean;
  toggleSound: () => void;
  playSound: (type: SoundEffectType) => void;
  isControlCenterOpen: boolean;
  toggleControlCenter: () => void;
  isSpotlightOpen: boolean;
  toggleSpotlight: () => void;
  isAIOpen: boolean;
  toggleAI: (open?: boolean) => void;
  isNotificationCenterOpen: boolean;
  toggleNotificationCenter: () => void;
  isQuickCreateOpen: boolean;
  toggleQuickCreate: () => void;
  quickCreateModalType: string | null;
  openQuickCreateModal: (type: string) => void;
  closeQuickCreateModal: () => void;
  isLocked: boolean;
  lockDashboard: () => void;
  unlockDashboard: (pin: string) => boolean;
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
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  togglePinNotification: (id: string) => void;
  addNotification: (title: string, message: string, category: NotificationItem['category']) => void;
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  contextMenu: ContextMenuState;
  showContextMenu: (e: React.MouseEvent, items: ContextMenuState['items']) => void;
  hideContextMenu: () => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;
  addFinanceRecord: (record: Omit<FinanceRecord, 'id' | 'date'>) => void;
  addUserAccount: (user: Omit<UserAccount, 'id' | 'lastLogin'>) => void;
  deleteUserAccount: (id: string) => void;
  toggleUserStatus: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [theme, setTheme] = useState<SystemTheme>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState<boolean>(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState<boolean>(false);
  const [quickCreateModalType, setQuickCreateModalType] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);

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
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const [toasts, setToasts] = useState<ToastNotification[]>([
    {
      id: 'toast-1',
      title: 'Eduvanta OS Ready',
      message: 'Apple OS Terminal active. All systems functional.',
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

  const playSound = (type: SoundEffectType) => {
    playSoundEffect(type, soundEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Dynamic Theme Handler
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Keyboard shortcut listener (Cmd+K for Spotlight, Cmd+N for Quick Create)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsQuickCreateOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSpotlightOpen(false);
        setIsControlCenterOpen(false);
        setIsNotificationCenterOpen(false);
        setIsQuickCreateOpen(false);
        setQuickCreateModalType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Periodic System Health Fluctuation Simulation
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

  const toggleTheme = () => {
    playSound('click');
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleControlCenter = () => {
    playSound('click');
    setIsControlCenterOpen(prev => !prev);
  };

  const toggleSpotlight = () => {
    playSound('click');
    setIsSpotlightOpen(prev => !prev);
  };

  const toggleAI = (open?: boolean) => {
    playSound('click');
    setIsAIOpen(prev => open !== undefined ? open : !prev);
  };

  const toggleNotificationCenter = () => {
    playSound('click');
    setIsNotificationCenterOpen(prev => !prev);
  };

  const toggleQuickCreate = () => {
    playSound('click');
    setIsQuickCreateOpen(prev => !prev);
  };

  const openQuickCreateModal = (type: string) => {
    playSound('click');
    setQuickCreateModalType(type);
    setIsQuickCreateOpen(false);
  };

  const closeQuickCreateModal = () => {
    setQuickCreateModalType(null);
  };

  const lockDashboard = () => {
    playSound('logout');
    setIsLocked(true);
  };

  const unlockDashboard = (pin: string) => {
    if (pin === '1234' || pin === 'eduvanta' || pin.length >= 4) {
      playSound('loginSuccess');
      setIsLocked(false);
      addToast('Dashboard Unlocked', 'Welcome back, Dr. Eleanor Vance', 'success');
      return true;
    }
    playSound('loginFailure');
    addToast('Access Denied', 'Invalid security PIN code', 'danger');
    return false;
  };

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

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    playSound('click');
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    addToast('Notifications Cleared', 'All notifications marked as read', 'info');
  };

  const deleteNotification = (id: string) => {
    playSound('click');
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const togglePinNotification = (id: string) => {
    playSound('click');
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const addNotification = (title: string, message: string, category: NotificationItem['category']) => {
    playSound('notification');
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      category,
      timestamp: 'Just now',
      isRead: false,
      isPinned: false
    };
    setNotifications(prev => [newNotif, ...prev]);
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
    const created: Student = { 
      ...newStu, 
      id: `STU-${Math.floor(1000 + Math.random() * 9000)}`,
      house: newStu.house || 'Gryphon',
      bloodGroup: newStu.bloodGroup || 'O+',
      emergencyContact: newStu.emergencyContact || newStu.parentContact,
      allergies: newStu.allergies || ['None'],
      disciplineLog: [],
      feeRecords: [{ id: `FR-${Date.now()}`, term: 'Term 3 Dues', amount: 2450, date: new Date().toISOString().split('T')[0], status: newStu.feeStatus === 'Paid' ? 'Paid' : 'Pending' }]
    };
    setStudents(prev => [created, ...prev]);
    playSound('studentCreated');
    addToast('Student Created', `${created.name} enrolled in ${created.grade}-${created.section}`, 'success');
    addNotification('New Student Enrolled', `${created.name} officially added to ${created.grade}`, 'Students');
  };

  const updateStudent = (updatedStu: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStu.id ? updatedStu : s));
    playSound('saveCompleted');
    addToast('Student Updated', `${updatedStu.name} profile updated successfully`, 'info');
  };

  const deleteStudent = (id: string) => {
    const stu = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    playSound('accountDeleted');
    if (stu) addToast('Student Removed', `${stu.name} deleted from records`, 'warning');
  };

  const addTeacher = (newTch: Omit<Teacher, 'id'>) => {
    const created: Teacher = { 
      ...newTch, 
      id: `TCH-${Math.floor(200 + Math.random() * 800)}`,
      salary: newTch.salary || 85000,
      classesAssigned: newTch.classesAssigned || ['Grade 10-A', 'Grade 11-B'],
      leaveBalance: 12
    };
    setTeachers(prev => [created, ...prev]);
    playSound('teacherCreated');
    addToast('Faculty Added', `${created.name} appointed to ${created.department}`, 'success');
    addNotification('New Faculty Appointed', `${created.name} joined ${created.department} department`, 'Teachers');
  };

  const updateTeacher = (updatedTch: Teacher) => {
    setTeachers(prev => prev.map(t => t.id === updatedTch.id ? updatedTch : t));
    playSound('saveCompleted');
    addToast('Teacher Updated', `${updatedTch.name} record updated`, 'info');
  };

  const deleteTeacher = (id: string) => {
    const tch = teachers.find(t => t.id === id);
    setTeachers(prev => prev.filter(t => t.id !== id));
    playSound('accountDeleted');
    if (tch) addToast('Teacher Removed', `${tch.name} deleted from faculty list`, 'warning');
  };

  const addFinanceRecord = (newFin: Omit<FinanceRecord, 'id' | 'date'>) => {
    const created: FinanceRecord = {
      ...newFin,
      id: `FIN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setFinanceRecords(prev => [created, ...prev]);
    playSound('saveCompleted');
    addToast('Finance Entry Saved', `$${created.amount.toLocaleString()} logged under ${created.category}`, 'info');
    addNotification('Finance Record Created', `$${created.amount.toLocaleString()} logged for ${created.category}`, 'Finance');
  };

  const addUserAccount = (newUser: Omit<UserAccount, 'id' | 'lastLogin'>) => {
    const created: UserAccount = {
      ...newUser,
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      lastLogin: 'Never'
    };
    setUserAccounts(prev => [created, ...prev]);
    playSound('saveCompleted');
    addToast('Account Created', `Created ${created.role} account for ${created.name}`, 'success');
    addNotification('Account Created', `Role: ${created.role} (${created.email})`, 'Security');
  };

  const deleteUserAccount = (id: string) => {
    const acc = userAccounts.find(u => u.id === id);
    setUserAccounts(prev => prev.filter(u => u.id !== id));
    playSound('accountDeleted');
    if (acc) addToast('Account Removed', `${acc.name} access revoked`, 'warning');
  };

  const toggleUserStatus = (id: string) => {
    setUserAccounts(prev => prev.map(usr => {
      if (usr.id === id) {
        const nextStatus = usr.status === 'Active' ? 'Suspended' : 'Active';
        playSound('click');
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
      soundEnabled,
      toggleSound,
      playSound,
      isControlCenterOpen,
      toggleControlCenter,
      isSpotlightOpen,
      toggleSpotlight,
      isAIOpen,
      toggleAI,
      isNotificationCenterOpen,
      toggleNotificationCenter,
      isQuickCreateOpen,
      toggleQuickCreate,
      quickCreateModalType,
      openQuickCreateModal,
      closeQuickCreateModal,
      isLocked,
      lockDashboard,
      unlockDashboard,
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
      notifications,
      unreadNotificationCount,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      togglePinNotification,
      addNotification,
      toasts,
      addToast,
      contextMenu,
      showContextMenu,
      hideContextMenu,
      addStudent,
      updateStudent,
      deleteStudent,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      addFinanceRecord,
      addUserAccount,
      deleteUserAccount,
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
