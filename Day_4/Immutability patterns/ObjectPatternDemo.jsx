// =========================================================================
// File: ObjectPatternsDemo.jsx (Mastering Object Immutability)
// =========================================================================
import React, { useState } from 'react';

const ObjectPatternsDemo = () => {
  // Complex initial state:
  const [userProfile, setUserProfile] = useState({
    id: 101,
    username: "Majed_IQ",
    status: "Offline",
    preferences: {
      theme: "dark",
      notifications: true,
      fontSize: 16
    },
    tempToken: "secret_token_889"
  });

  // PATTERN 1.1: Updating simple top-level properties
  const handleGoOnline = () => {
    setUserProfile(prev => ({
      ...prev,           // Copy id, username, preferences, tempToken as they are
      status: "Online"   // Overwrite only the status property!
    }));
  };

  // PATTERN 1.2: Updating a deeply nested property (e.g., changing fontSize inside preferences)
  const handleIncreaseFontSize = () => {
    setUserProfile(prev => ({
      ...prev,                     // 1. Copy top-level properties
      preferences: {
        ...prev.preferences,       // 2. Copy nested properties inside preferences
        fontSize: prev.preferences.fontSize + 2 // 3. Overwrite the specific target!
      }
    }));
  };

  // PATTERN 1.3: Deleting a property immutably (Removing tempToken)
  const handleRemoveToken = () => {
    setUserProfile(prev => {
      // We destructure out the 'tempToken' and collect everything else into 'remainingProps'
      const { tempToken, ...remainingProps } = prev;
      
      // Return a brand new object that lacks the tempToken!
      return remainingProps;
    });
  };

  return (
    <div className="p-6 border rounded bg-slate-900 text-white font-mono">
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
      <div className="flex gap-4 mt-4">
        <button onClick={handleGoOnline} className="bg-green-600 p-2 rounded">Go Online</button>
        <button onClick={handleIncreaseFontSize} className="bg-blue-600 p-2 rounded">Font +2</button>
        <button onClick={handleRemoveToken} className="bg-red-600 p-2 rounded">Delete Token</button>
      </div>
    </div>
  );
};

export default ObjectPatternsDemo;