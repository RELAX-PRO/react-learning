/**
 * ============================================================================
 * BLOCK COMMENT: Understanding useState and Rules of Hooks
 * ============================================================================
 * `useState` is a React Hook that lets you add state variables to functional
 * components. Calling `useState` tells React to store some data between renders.
 * It returns an array with two values: the current state and a function to update it.
 * 
 * CRITICAL RULE: Hooks must be called at the top level of a component.
 * They cannot be called inside loops, conditions, or nested functions.
 * This is because React relies on the exact order in which Hooks are called
 * to associate the correct state with the correct `useState` call.
 * ============================================================================
 */

const UserProfile = () => {
  // Each useState call stores one independent piece of local state.
  // [name, setName] uses array destructuring to extract the state value and its setter.
  const [name, setName] = useState('Majed');
  
  // Here, the initial state is a number (26).
  const [age, setAge] = useState(26);
  
  // Here, the initial state is a boolean (true).
  const [isOnline, setIsOnline] = useState(true);

  // The component can render UI based on those values.
  return null;
};

const BadComponent = ({ isConnected }) => {
  // Hooks must always stay at the top level and in the same order.
  if (isConnected) {
    // Incorrect: this hook may run sometimes and skip other times.
    // React will throw an error or behave unpredictably because the hook call order changes.
    const [name, setName] = useState('Majed');
  }

  // If the order changes, React will associate the wrong state with the wrong hook.
  // For instance, if the above hook is skipped, React might assign `age` to the first hook's state.
  const [age, setAge] = useState(26);
  const [isOnline, setIsOnline] = useState(true);

  // Hooks are only safe when they are unconditional.
  return null;
};

// Takeaway: the hook order must never change between renders.