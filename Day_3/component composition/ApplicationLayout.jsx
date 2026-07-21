// =========================================================================
// File: ApplicationLayout.jsx (Multi-Slot Composition)
// =========================================================================

// Notice: We don't use 'children' here! We accept 3 named JSX slots as props!
const ApplicationLayout = ({ topNavbarSlot, leftSidebarSlot, mainContentSlot }) => {
  return (
    <div className="app-layout-wrapper flex flex-col h-screen">
      
      {/* Slot 1: The Top Bar */}
      <header className="top-navbar h-16 bg-gray-900 text-white">
        {topNavbarSlot}
      </header>

      <div className="body-section flex flex-1">
        
        {/* Slot 2: The Left Sidebar */}
        <aside className="left-sidebar w-64 bg-gray-800 text-gray-300">
          {leftSidebarSlot}
        </aside>

        {/* Slot 3: The Main Dashboard View */}
        <main className="main-content flex-1 p-8 bg-gray-100">
          {mainContentSlot}
        </main>

      </div>

    </div>
  );
};

export default ApplicationLayout;