import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { MacTopBar } from './components/common/MacTopBar';
import { MacSidebar } from './components/common/MacSidebar';
import { MacDock } from './components/common/MacDock';
import { ControlCenter } from './components/common/ControlCenter';
import { SpotlightSearch } from './components/common/SpotlightSearch';
import { ContextMenu } from './components/common/ContextMenu';
import { ToastContainer } from './components/common/ToastContainer';
import { AIAssistantModal } from './components/omni/AIAssistantModal';

import { PrincipalDashboard } from './components/dashboard/PrincipalDashboard';
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
  const { activeTab, showContextMenu } = useOS();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
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
        return <TransportManager />;
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
        { label: 'Refresh Telemetry', action: () => window.location.reload() },
        { label: 'Open Control Center', action: () => {} }
      ])}
    >
      {/* Top macOS Bar */}
      <MacTopBar />

      {/* Main OS Layout */}
      <div className="eduvanta-main-layout">
        <MacSidebar />

        <main className="eduvanta-content-area">
          {renderTabContent()}
        </main>
      </div>

      {/* Floating macOS Dock */}
      <MacDock />

      {/* Overlays and Modals */}
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
