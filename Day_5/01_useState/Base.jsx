const UserProfile = () => {
  // Each useState call stores one independent piece of local state.
  const [name, setName] = useState('Majed');
  const [age, setAge] = useState(26);
  const [isOnline, setIsOnline] = useState(true);

  // The component can render UI based on those values.
  return null;
};

const BadComponent = ({ isConnected }) => {
  // Hooks must always stay at the top level and in the same order.
  if (isConnected) {
    // Incorrect: this hook may run sometimes and skip other times.
    const [name, setName] = useState('Majed');
  }

  // If the order changes, React will associate the wrong state with the wrong hook.
  const [age, setAge] = useState(26);
  const [isOnline, setIsOnline] = useState(true);

  // Hooks are only safe when they are unconditional.
  return null;
};

// Takeaway: the hook order must never change between renders.