// =========================================================================
// File 3: DeepDashboard.jsx & UserCard (Step 3: The Consumer Hook)
// =========================================================================
import React, { useContext } from 'react';
import { AppContext } from './AppContext.js';

// An intermediate component that DOES NOT care about user data at all:
const DeepDashboard = () => {
  return (
    <div className="border border-slate-600 p-6 my-4 rounded">
      <h2>Intermediate Dashboard Layout (No Props Received Here!)</h2>
      <UserCard /> {/* Still no props passed down! */}
    </div>
  );
};

// The deepest component that actually needs the data:
const UserCard = () => {
  // 📻 THE HOOK IN ACTION: We tune into the AppContext instantly!
  const { userProfile, toggleTheme } = useContext(AppContext);

  return (
    <div className="p-4 bg-blue-600 text-white rounded-lg shadow-lg mt-4 font-mono">
      <h3>👤 Authenticated: {userProfile.name}</h3>
      <p>🛡️ Role: [{userProfile.role}]</p>
      <p>🎨 Current Theme: {userProfile.theme}</p>

      <button 
        onClick={toggleTheme}
        className="mt-3 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 transition font-bold"
      >
        Toggle Theme 🌓
      </button>
    </div>
  );
};

export default DeepDashboard;