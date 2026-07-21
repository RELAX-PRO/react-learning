const UserProfile = () => {
  const [name, setName] = useState("Majed");     // الخطاف رقم 1
  const [age, setAge] = useState(26);            // الخطاف رقم 2
  const [isOnline, setIsOnline] = useState(true); // الخطاف رقم 3
  // ...
};

const BadComponent = ({ isConnected }) => {
  // ⚠️ CRITICAL BUG: Hook inside a conditional statement!
  if (isConnected) {
    const [name, setName] = useState("Majed");     // الفهرس [0] في الذاكرة
  }

  const [age, setAge] = useState(26);              // الفهرس [1] في الذاكرة
  const [isOnline, setIsOnline] = useState(true);  // الفهرس [2] في الذاكرة
  // ...
};