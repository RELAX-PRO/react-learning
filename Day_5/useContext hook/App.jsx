// =========================================================================
// File 2: App.jsx (Step 2: The Broadcaster / Provider at the top level)
// =========================================================================
import React, { useState } from 'react';
import { AppContext } from './AppContext.js';
import DeepDashboard from './DeepDashboard.jsx';

const App = () => {
  // Global State sitting at the very top of our application:
  const [userProfile, setUserProfile] = useState({
    name: "Majed_IQ",
    role: "System Architect",
    theme: "dark"
  });

  const toggleTheme = () => {
    setUserProfile(prev => ({
      ...prev,
      theme: prev.theme === "dark" ? "light" : "dark"
    }));
  };

  return (
    // 📡 THE PROVIDER: We broadcast 'userProfile' and 'toggleTheme' to the entire tree below!
    <AppContext.Provider value={{ userProfile, toggleTheme }}>
      <div className={userProfile.theme === "dark" ? "bg-slate-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <h1>Top Level App Container</h1>
        
        {/* Notice: We are NOT passing any props here! No prop drilling! */}
        <DeepDashboard />
      </div>
    </AppContext.Provider>
  );
};

export default App;