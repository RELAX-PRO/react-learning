// =========================================================================
// File 1: DeleteButton.jsx (The Child - It doesn't know how to delete, it just calls the boss!)
// =========================================================================
const DeleteButton = ({ itemName, onDeleteClick }) => {
  return (
    <button 
      className="bg-red-500 text-white px-4 py-2 rounded"
      // When clicked, the Child calls the function passed down from the Parent!
      onClick={() => onDeleteClick(itemName)}
    >
      🗑️ Delete [{itemName}]
    </button>
  );
};
export default DeleteButton;