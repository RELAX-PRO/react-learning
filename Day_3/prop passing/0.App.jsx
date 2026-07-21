// =========================================================================
// File 2: App.jsx (The Parent Component - SENDER)
// =========================================================================
import React from 'react';
import EmployeeCard from './0.EmployeeCard.jsx';

const App = () => {
  // We can define complex variables inside the parent:
  const majedData = {
    fullName: "Majed",
    department: "Frontend Architecture",
    id: 101
  };

  const majedProjects = ["E-Commerce Dashboard", "Design System Migration", "API Integration"];

  return (
    <main className="app-container p-8 bg-gray-50 min-h-screen">
      <h1>Company Portal</h1>

      {/* Here is the PROP PASSING in action! Notice the {} for arrays, objects, and booleans: */}
      <EmployeeCard 
        employeeInfo={majedData} 
        assignedProjects={majedProjects} 
        isAvailable={true} 
      />
      
    </main>
  );
};

export default App;