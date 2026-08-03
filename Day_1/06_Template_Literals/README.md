# Template Literals

Before ES6, combining variables and text in JavaScript meant using the `+` operator to endlessly concatenate strings. This was incredibly messy, highly prone to spacing errors, and made writing multi-line strings (like HTML templates) a nightmare involving `\n`.

**Template Literals** revolutionized string manipulation. 
By wrapping your string in backticks (` `), you unlock two massive superpowers:
1. **String Interpolation:** You can inject variables or execute JavaScript expressions directly inside the string using the `${}` syntax.
2. **Multi-line Strings:** You can simply press 'Enter' in your code, and the line break is perfectly preserved in the final string.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Interpolation and Line Breaks
*/

const user = "Alice";
const unreadCount = 5;

// Clean, readable string interpolation using ${}
const notification = `Hello ${user}, you have ${unreadCount} new messages!`;
console.log(notification);

// Multi-line strings are effortless. 
// This is exactly how we write HTML templates in raw JavaScript!
const emailTemplate = `
  Hi ${user},
  
  We noticed you haven't logged in recently.
  You have ${unreadCount} notifications waiting for you.
  
  Thanks,
  The Team
`;

console.log(emailTemplate);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Executing logic inside ${}
  
  The ${} syntax doesn't just hold variables. It can execute ANY valid JavaScript 
  expression, including math, ternary operators, and function calls!
*/

const user = { name: "Bob", isPro: true };

function getDiscount() {
  return "20% Off";
}

// Executing complex logic directly inside the string
const checkoutMessage = `
  Checkout for: ${user.name.toUpperCase()}
  Account Type: ${user.isPro ? "Premium Member" : "Free Tier"}
  Active Promo: ${user.isPro ? getDiscount() : "None"}
`;

console.log(checkoutMessage);

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Old school string concatenation (+)
  
  Relying on the + operator for strings is extremely prone to spacing errors,
  looks messy, and is very difficult for other developers to quickly read.
*/

const user = "Alice";
const role = "Admin";

// Awful to read, easy to forget spaces before or after the quotes.
const str = "User " + user + " has logged in as " + role + ".";

// An absolute nightmare for multi-line HTML strings.
const html = "<div>\n" +
"  <h1>" + user + "</h1>\n" +
"  <p>Role: " + role + "</p>\n" +
"</div>";

console.log(html);

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create variables for `firstName`, `lastName`, and `age`.
  2. Use a template literal to create a multi-line string containing a short bio.
  3. Inside the template literal, use a JavaScript expression to calculate 
     what year they were born (e.g., 2024 - age) and display it!
*/

// Write your code below this line:
```
