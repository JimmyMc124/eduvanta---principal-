import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { MacTopBar } from './components/common/MacTopBar';
import { MacSidebar } from './components/common/MacSidebar';
import { ControlCenter } from './components/common/ControlCenter';
import { SpotlightSearch } from './components/common/SpotlightSearch';
import { ContextMenu } from './components/common/ContextMenu';
import { ToastContainer } from './components/common/ToastContainer';
import { NotificationCenter } from './components/common/NotificationCenter';
import { QuickCreateMenu } from './components/common/QuickCreateMenu';
import { LockScreen } from './components/common/LockScreen';
import { AIAssistantModal } from './components/omni/AIAssistantModal';

import { PrincipalDashboard } from './components/dashboard/PrincipalDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { StudentManager } from './components/academic/StudentManager';
import { TeacherManager } from './components/academic/TeacherManager';
import { OmniToolsCenter } from './components/omni/OmniToolsCenter';
import { TimetableBuilder } from './components/omni/TimetableBuilder';
import { LibraryManager } from './components/omni/LibraryManager';
import { TransportManager } from './components/omni/TransportManager';
import { CertificateGenerator } from './components/omni/CertificateGenerator';
import { AccountAndSecurityManager } from './components/security/AccountAndSecurityManager';
import { CommunicationCenter } from './components/communication/CommunicationCenter';
import { FinanceManager } from './components/finance/FinanceManager';
import { CalendarView } from './components/calendar/CalendarView';
import { SettingsManager } from './components/settings/SettingsManager';

const AppContent: React.FC = () => {
  const { activeTab, userRole, showContextMenu, lockDashboard } = useOS();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'principal-dashboard':
        return <PrincipalDashboard />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'dashboard':
        if (userRole === 'Teacher') return <TeacherDashboard />;
        if (userRole === 'Student') return <StudentDashboard />;
        return <PrincipalDashboard />;
      case 'analytics':
        return <PrincipalDashboard />;
      case 'students':
        return <StudentManager />;
      case 'teachers':
        return <TeacherManager />;
      case 'omni-tools':
        return <OmniToolsCenter />;
      case 'timetable':
        return <TimetableBuilder />;
      case 'library':
        return <LibraryManager />;
      case 'transport':
        return <OmniToolsCenter />;
      case 'certificates':
        return <CertificateGenerator />;
      case 'security':
        return <AccountAndSecurityManager />;
      case 'communication':
        return <CommunicationCenter />;
      case 'finance':
        return <FinanceManager />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <PrincipalDashboard />;
    }
  };

  return (
    <div 
      className="eduvanta-os-container"
      onContextMenu={(e) => showContextMenu(e, [
        { label: 'Lock Terminal', action: lockDashboard },
        { label: 'Refresh OS Context', action: () => window.location.reload() }
      ])}
    >
      {/* Top macOS Bar */}
      <MacTopBar />

      {/* Main OS Layout */}
      <div className="eduvanta-main-layout">
        <MacSidebar />

        <main className="eduvanta-content-area" style={{ paddingBottom: '24px' }}>
          {renderTabContent()}
        </main>
      </div>

      {/* Overlays, Modals, Floating Menu & Lock Screen */}
      <NotificationCenter />
      <QuickCreateMenu />
      <LockScreen />
      <ControlCenter />
      <SpotlightSearch />
      <ContextMenu />
      <ToastContainer />
      <AIAssistantModal />
    </div>
  );
};

export default function App() {
  return (
    <OSProvider>
      <AppContent />
    </OSProvider>
  );
}
