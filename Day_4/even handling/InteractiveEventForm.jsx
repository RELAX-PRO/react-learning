// =========================================================================
// File: InteractiveEventForm.jsx (Mastering Event Handling & State)
// =========================================================================
import React, { useState } from 'react';

const InteractiveEventForm = () => {
  // 1. Initializing state for our form inputs:
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "User"
  });

  const [submittedUsers, setSubmittedUsers] = useState([]);

  // 2. Universal Change Handler using event target and Computed Property Names:
  const handleInputChange = (event) => {
    const { name, value } = event.target; // Destructuring synthetic event!
    
    // Using immutable functional update pattern:
    setFormData(prev => ({
      ...prev,          // Keep existing form fields intact
      [name]: value     // Dynamically update the field that triggered the event
    }));
  };

  // 3. Form Submit Handler:
  const handleFormSubmit = (event) => {
    // 🚨 CRITICAL STEP: Prevent the browser's default behavior of reloading the page!
    event.preventDefault();

    if (!formData.username || !formData.email) {
      alert("Please fill in all required fields!");
      return;
    }

    // Creating a new user record immutably:
    const newUserRecord = {
      id: Date.now(),
      ...formData
    };

    // Updating the list of users safely:
    setSubmittedUsers(prevList => [newUserRecord, ...prevList]);

    // Resetting the form inputs back to initial empty state:
    setFormData({ username: "", email: "", role: "User" });
    console.log("✅ New user registered via SyntheticEvent!");
  };

  // 4. Item Deletion Handler:
  const handleRemoveUser = (userId) => {
    setSubmittedUsers(prevList => prevList.filter(u => u.id !== userId));
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-slate-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">System Registration Portal 🛡️</h2>
      
      {/* Binding our submit handler to the form tag: */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-mono mb-1">Username:</label>
          <input
            type="text"
            name="username"          // Must match the state property name!
            value={formData.username} // Controlled Input!
            onChange={handleInputChange} // Listening to typing events
            placeholder="Enter username..."
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-mono mb-1">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="majed@example.com"
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-mono mb-1">System Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded text-white"
          >
            <option value="User">Regular User</option>
            <option value="Admin">System Administrator</option>
            <option value="Architect">UI/UX Architect</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-blue-600 hover:bg-blue-500 font-bold py-2 rounded transition"
        >
          Register User 🚀
        </button>
      </form>

      <hr className="my-6 border-slate-700" />

      {/* Rendering the dynamic list of submitted items: */}
      <div>
        <h3 className="text-lg font-mono mb-3">Registered Users Count: [{submittedUsers.length}]</h3>
        <ul className="flex flex-col gap-2">
          {submittedUsers.map(user => (
            <li key={user.id} className="flex justify-between items-center bg-slate-800 p-3 rounded">
              <div>
                <span className="font-bold text-blue-400">{user.username}</span> 
                <span className="text-xs text-slate-400 ml-2">({user.role})</span>
                <p className="text-xs font-mono text-slate-300">{user.email}</p>
              </div>
              
              {/* Notice the arrow function used to pass userId safely! */}
              <button 
                onClick={() => handleRemoveUser(user.id)}
                className="text-red-400 hover:text-red-300 font-bold p-1"
              >
                ✕

                
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InteractiveEventForm;