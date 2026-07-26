const userName = "Majed";
const unreadMessages = 5;

// 1. String concatenation
const oldMessage = "Hello " + userName + ", you have " + unreadMessages + " unread messages.";

// 2. Template Literals (Backticks ``)
const modernMessage = `Hello ${userName}, you have ${unreadMessages} unread messages.`;

console.log(modernMessage); // Output: "Hello Majed, you have 5 unread messages."

// Embedded expressions
const mathExample = `The total of 10 + 20 is ${10 + 20}.`;
console.log(mathExample); // Output: "The total of 10 + 20 is 30."

// Multi-line strings using concatenation
const oldEmail = "Hi Majed,\n" +
                 "Welcome to our React team!\n" +
                 "Best regards,";

// Multi-line strings using Template Literals
const modernEmail = `Hi Majed,
Welcome to our React team!
Best regards,`;

/*
// Example in React JSX:
// Template literals are useful for dynamic class names.
const Button = ({ isActive }) => (
  <button className={`btn-base ${isActive ? "btn-active-blue" : "btn-disabled-gray"}`}>
    Click Me
  </button>
);
*/

const price = 50;
const quantity = 3;
console.log(`Total cost is: $${price * quantity}`);
