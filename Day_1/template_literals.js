const userName = "Majed";
const unreadMessages = 5;

// 1. The Old Way (Messy, prone to spacing errors with +):
const oldMessage = "Hello " + userName + ", you have " + unreadMessages + " unread messages.";

// 2. The Modern Way (Template Literals with Backticks ``):
// Super clean, readable, and written exactly as it sounds!
const modernMessage = `Hello ${userName}, you have ${unreadMessages} unread messages.`;

console.log(modernMessage); // Output: "Hello Majed, you have 5 unread messages."

// 💡 Bonus: You can put ANY valid JavaScript expression inside ${} !
const mathExample = `The total of 10 + 20 is ${10 + 20}.`;
console.log(mathExample); // Output: "The total of 10 + 20 is 30."

// 1. Old Way:
const oldEmail = "Hi Majed,\n" +
                 "Welcome to our React team!\n" +
                 "Best regards,";

// 2. Modern Way (Template Literals):
const modernEmail = `Hi Majed,
Welcome to our React team!
Best regards,`;

/*
// 🚀 HOW IT LOOKS IN REACT JSX LATER:
// We use Template Literals to dynamically append CSS classes based on variables!
const Button = ({ isActive }) => (
  <button className={`btn-base ${isActive ? "btn-active-blue" : "btn-disabled-gray"}`}>
    Click Me
  </button>
);
*/

const price = 50;
const quantity = 3;
console.log(`Total cost is: $${price * quantity}`);