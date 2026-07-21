// =========================================================================
// File 1: EmployeeCard.jsx (The Child Component - RECEIVER)
// =========================================================================
import React from 'react';

// Notice: We destructure all the complex data types coming from the Parent!
const EmployeeCard = ({ employeeInfo, assignedProjects, isAvailable = false }) => {
  return (
    <div className="card-box p-4 border rounded-lg shadow-md bg-white">
      
      {/* 1. Extracting data from the passed Object (employeeInfo) */}
      <h3 className="text-xl font-bold">{employeeInfo.fullName}</h3>
      <p className="text-gray-500">Department: {employeeInfo.department}</p>

      {/* 2. Using Conditional Rendering with the boolean prop */}
      <div className="mt-2">
        Status: {isAvailable ? "🟢 Ready for Work" : "🔴 Busy / In Meeting"}
      </div>

      {/* 3. Using .map() to display the passed Array (assignedProjects) */}
      <div className="mt-4">
        <h4 className="font-semibold">Current Projects:</h4>
        <ul className="list-disc pl-5">
          {assignedProjects.map((project, index) => (
            <li key={index} className="text-sm">{project}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default EmployeeCard;