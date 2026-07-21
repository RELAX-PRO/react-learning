// =========================================================================
// File 2: Dashboard.jsx (Using Composition to build complex UI)
// =========================================================================
import React from 'react';
import Card from './Card.jsx';

const Dashboard = () => {
  return (
    <main className="dashboard-container">
      
      {/* Composition 1: A Card enclosing plain text and simple HTML */}
      <Card title="System Notice" borderColor="red">
        <p>⚠️ The servers will go down for scheduled maintenance at midnight.</p>
        <button className="btn-danger mt-2">Acknowledge</button>
      </Card>


      {/* Composition 2: The EXACT SAME Card enclosing a complex user list table! */}
      <Card title="Active Team Members" borderColor="green">
        <table className="user-table">
          <thead>
            <tr><th>Name</th><th>Role</th></tr>
          </thead>
          <tbody>
            <tr><td>Majed</td><td>Architect</td></tr>
            <tr><td>Sara</td><td>Designer</td></tr>
          </tbody>
        </table>
      </Card>

    </main>
  );
};

export default Dashboard;