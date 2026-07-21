// 1. Direct Update (تمرير قيمة مباشرة):
setCount(10); 

// 2. Functional Update (تمرير دالة اعتمادية):
setCount((previousState) => {
  // Logic can be written here before returning the new state!
  return previousState + 1;
});

// Or in a clean single-line expression:
setCount(prev => prev + 1);


// ❌ Dangerous way (Might fail if multiple events fire quickly):
const toggleSidebar = () => {
  setIsOpen(!isOpen); 
};

// ✅ Immutable & Safe way (Guaranteed to always toggle the real current state):
const toggleSidebarSecure = () => {
  setIsOpen(prev => !prev);
};
