// 1. The Generic Component (General Purpose):
const Button = ({ variant, onClick, children }) => (
  <button className={`btn base-btn btn-${variant}`} onClick={onClick}>
    {children}
  </button>
);

// 2. The Specialized Component (Composes the generic Button inside it!):
const DeleteConfirmButton = ({ itemName, onDelete }) => {
  return (
    // We compose the generic Button and hardcode specific behaviors into it:
    <Button variant="danger" onClick={onDelete}>
      🗑️ Confirm Deletion of [{itemName}]
    </Button>
  );
};

// Now anywhere in your app, you just call:
<DeleteConfirmButton itemName="User Account" onDelete={handleDelete} />