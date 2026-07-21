// =========================================================================
// File 2: Dashboard.jsx (The Parent - Owns the logic and passes the callback down)
// =========================================================================
const Dashboard = () => {
  
  // 1. The Parent owns the logic function:
  const handleRemoveItem = (targetItem) => {
    console.log(`PARENT RECEIVED ALARM: Deleting ${targetItem} from database now...`);
    // Logic to remove item from screen happens here!
  };

  return (
    <div className="dashboard-panel">
      <h2>Manage Accounts</h2>
      
      {/* 2. The Parent passes its own function as a Prop named 'onDeleteClick' */}
      <DeleteButton itemName="Majed_Account" onDeleteClick={handleRemoveItem} />
      <DeleteButton itemName="Guest_User" onDeleteClick={handleRemoveItem} />
      
    </div>
  );
};