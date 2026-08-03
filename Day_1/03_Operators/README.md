# Operators: Logical and Nullish Coalescing

In traditional JavaScript, you use `if/else` blocks to control logic. However, in React, you cannot put an `if` statement directly inside JSX (the HTML-like syntax). 

Because of this, React developers rely heavily on inline logical operators to conditionally render UI components and assign fallback values.

### The Core Operators:
1. **Logical AND (`&&`)**: Returns the right side if the left side is "truthy". Used for "If this is true, show this component."
2. **Logical OR (`||`)**: Returns the right side if the left side is "falsy" (like `0`, `""`, `null`, `false`).
3. **Nullish Coalescing (`??`)**: Returns the right side *only* if the left side is strictly `null` or `undefined`. This is much safer than `||` when dealing with numbers like `0`.


### Code Examples

```javascript
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.js

/*
  BASIC PATTERN: Inline Logic
*/

// 1. Logical AND (&&) for conditional execution
const isLoggedIn = true;
// In React, this looks like: isLoggedIn && <Dashboard />
isLoggedIn && console.log("Render Dashboard Component");

// 2. Nullish Coalescing (??) for safe default values
// If the API fails to return a name, fallback to "Guest"
const apiResponseName = null;
const displayName = apiResponseName ?? "Guest";
console.log("Welcome,", displayName); // Prints "Welcome, Guest"

// 3. Ternary Operator (? :) for If/Else
const isPremium = false;
// In React, this looks like: isPremium ? <ProBadge /> : <UpgradeButton />
const badge = isPremium ? "Pro User" : "Free User";
console.log("Badge status:", badge);

// ==========================================
// 02_ADVANCED_PATTERN
// ==========================================

// 02_advanced_pattern.js

/*
  ADVANCED PATTERN: Optional Chaining (?.)
  
  When fetching data from an API, objects are often deeply nested. 
  If you try to read a property deep inside an object that doesn't exist, your entire app crashes!
  
  Optional chaining safely returns `undefined` instead of throwing a TypeError.
*/

const response = {
  data: {
    user: {
      // Notice: the 'profile' object is completely missing from this data!
    }
  }
};

// Instead of this massive, ugly check:
// const oldWay = response && response.data && response.data.user && response.data.user.profile && response.data.user.profile.avatar;

// Use optional chaining combined with nullish coalescing to safely extract deep data:
const avatar = response?.data?.user?.profile?.avatar ?? 'default_avatar.png';

console.log('Safe Avatar Extraction:', avatar); // Prints 'default_avatar.png' without crashing!

// ==========================================
// 03_ANTI_PATTERN
// ==========================================

// 03_anti_pattern.js

/*
  ANTI-PATTERN: Using || instead of ?? for numbers and booleans.
  
  The || operator checks for "falsy" values. In JavaScript, 0, "", and false are all falsy!
  If a user deliberately sets a volume to 0, or a setting to false, the || operator 
  will override their choice with your default value.
*/

const userSettings = {
  volume: 0, // The user deliberately muted the volume
  darkMode: false // The user deliberately chose light mode
};

// BUG: || sees 0 and false as falsy, and overrides the user's settings!
const badVolume = userSettings.volume || 100; 
const badTheme = userSettings.darkMode || true;

console.log("Bad Volume:", badVolume); // Prints 100! We unmuted them!
console.log("Bad Theme:", badTheme); // Prints true! We forced dark mode!

// FIX: Always use ?? when 0 or false are valid data inputs.
const goodVolume = userSettings.volume ?? 100;
console.log("Good Volume:", goodVolume); // Correctly prints 0.

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.js

/*
  YOUR TURN!
  
  TODO:
  1. Create an object called `apiConfig` that has NO `timeout` property.
  2. Create a variable called `activeTimeout`. Safely extract `timeout` from `apiConfig`. 
     If it is missing, use the `??` operator to default it to `5000`.
  3. Create a boolean `isLoading` set to true. 
     Write a single line using `&&` that logs "Spinner..." if `isLoading` is true.
*/

// Write your code below this line:
```
