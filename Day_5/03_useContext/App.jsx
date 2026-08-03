/**
 * ============================================================================
 * BLOCK COMMENT: Understanding React Context (Provider)
 * ============================================================================
 * Context provides a way to pass data through the component tree without having
 * to pass props down manually at every level (avoiding "prop drilling").
 * 
 * 1. THE PROVIDER: The `<Context.Provider>` component is used to wrap the part
 *    of your tree that needs access to the context values.
 * 2. THE VALUE: The `value` prop of the Provider accepts the data you want to
 *    broadcast. In this case, we broadcast an object containing state and a
 *    function to update that state.
 * 3. RE-RENDERING: Any component consuming this context will re-render whenever
 *    the `value` prop changes.
 * ============================================================================
 */

// =========================================================================
// File 2: App.jsx (Step 2: The Broadcaster / Provider at the top level)
// =========================================================================
import React, { useState } from 'react';
import { AppContext } from './AppContext.js';
import DeepDashboard from './DeepDashboard.jsx';

const App = () => {
  // Global State sitting at the very top of our application:
  // This state will be accessible by any component inside the Provider.
  const [userProfile, setUserProfile] = useState({
    name: "Majed_IQ",
    role: "System Architect",
    theme: "dark"
  });

  // A function to update the global state. 
  // We pass this function down via Context so children can trigger state updates.
  const toggleTheme = () => {
    // using the functional update form of setState to safely base the new state on the old state
    setUserProfile(prev => ({
      ...prev, // Spread the previous properties to keep name and role intact
      theme: prev.theme === "dark" ? "light" : "dark" // Toggle the theme property
    }));
  };

  return (
    //  Provider: We broadcast 'userProfile' and 'toggleTheme' to the entire tree below!
    // The `value` prop receives an object { userProfile, toggleTheme }.
    <AppContext.Provider value={{ userProfile, toggleTheme }}>
      <div className={userProfile.theme === "dark" ? "bg-slate-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
        <h1>Top Level App Container</h1>
        
        {/* Notice: We are NOT passing any props here! No prop drilling! */}
        {/* DeepDashboard doesn't need to know about userProfile or toggleTheme */}
        <DeepDashboard />
      </div>
    </AppContext.Provider>
  );
};

export default App;