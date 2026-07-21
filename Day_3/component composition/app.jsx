// File: App.jsx
import ApplicationLayout from './ApplicationLayout.jsx';
import NavigationMenu from './NavigationMenu.jsx';
import UserProfileSidebar from './UserProfileSidebar.jsx';
import AnalyticsDashboard from './AnalyticsDashboard.jsx';

const App = () => {
  return (
    <ApplicationLayout 
      topNavbarSlot={<NavigationMenu title="Admin Portal" />}
      leftSidebarSlot={<UserProfileSidebar username="Majed" role="Admin" />}
      mainContentSlot={<AnalyticsDashboard />}
    />
  );
};