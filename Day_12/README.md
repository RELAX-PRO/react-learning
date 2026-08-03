# Redux Toolkit

While the Context API is great for small amounts of data (like a Theme or User Session), it was not built for high-frequency, complex state updates across massive enterprise applications.

**Redux** is the industry standard for global state management. It places ALL of your application's state into a single global JavaScript object called the **Store**.

### Redux Toolkit (RTK)
Early Redux was infamous for requiring massive amounts of boilerplate code. Redux Toolkit was created by the Redux team to solve this. It drastically simplifies the syntax.

### The Redux Flow:
1. **Store:** The giant global object holding your data.
2. **Slice:** A piece of the Store (e.g., `userSlice`, `cartSlice`).
3. **Dispatch:** A component fires an Action (e.g., "ADD_TO_CART").
4. **Reducer:** The Slice catches the Action, updates the Store, and React instantly updates the UI!


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

/*
  BASIC PATTERN: Redux Toolkit (Pseudo-code structure)
  Requires: npm install @reduxjs/toolkit react-redux
*/

// --- 1. THE SLICE (cartSlice.js) ---
/*
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: 0 },
  reducers: {
    addToCart: (state) => { 
      // RTK allows us to "mutate" state safely using Immer under the hood!
      state.items += 1; 
    }
  }
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
*/

// --- 2. THE STORE (store.js) ---
/*
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: { cart: cartReducer }
});
*/

// --- 3. THE COMPONENT (App.jsx) ---
/*
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';

const App = () => {
  const count = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Cart: {count}</h1>
      <button onClick={() => dispatch(addToCart())}>Buy</button>
    </div>
  );
};
*/

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

/*
  YOUR TURN!
  
  TODO:
  1. Write pseudo-code for a Redux Slice called `userSlice`.
  2. Give it an initial state of `{ loggedIn: false }`.
  3. Create a reducer function called `login` that sets `loggedIn` to true.
*/
```

# Lesson 1: Unit Testing

## What is Unit Testing?
Unit Testing is the practice of testing the smallest, isolated piece of code in your application (a "Unit"). In JavaScript and TypeScript, this is usually a single, pure function.

We don't test React components here. We don't test the database. We just test if a math function correctly adds two numbers, or if a data parser correctly formats a string.

## The AAA Pattern (Arrange, Act, Assert)
If you look at `optometryMath.test.ts`, you'll notice every test is structured into three clear steps. This is the industry standard for writing clean tests:

1. **Arrange**: Set up the initial state. Define the variables, create the mock data, and prepare everything needed for the test.
2. **Act**: Execute the function you are trying to test.
3. **Assert**: Verify that the result of the function matches your expectations using `expect()`.

## Why write Unit Tests?
- **Speed**: They run in milliseconds. You can have 1,000 unit tests run in less than a second.
- **Safety**: If you accidentally change a core calculation (like the Optometry fee calculation), a unit test will immediately fail and tell you exactly which formula broke.
- **Simplicity**: Because they test functions in isolation, if a unit test fails, you know *exactly* where the bug is. There is no guessing if the bug is in the UI, the network, or the database.


# Lesson 2: Test Runners & Lifecycle

## What is a Test Runner?
A Test Runner is the program that actually searches your project for files ending in `.test.ts` or `.spec.ts`, executes the code inside them, and reports back if they passed or failed. 

In this project, we use **Vitest**. (Jest is another very popular option).
The test runner provides the global functions we use: `describe()`, `it()`, and `expect()`.

## The Problem: State Bleed
Imagine you have a test that adds a patient to a database. The test passes.
Then, you have a second test that checks if the database is empty. This test fails! Why? Because the first test added a patient, and the database *remained changed*. 

This is called **State Bleed**. Tests must be completely isolated. Test 1 should not affect Test 2.

## Lifecycle Hooks to the Rescue
To fix state bleed, Test Runners provide lifecycle hooks that run automatically at specific times:

- **`beforeAll`**: Runs once before *any* tests in the file start. Great for booting up a mock server.
- **`beforeEach`**: Runs before *every single test*. This is where you reset your data! In `appointmentService.test.ts`, we clear the appointments array here so every test starts with a clean slate.
- **`afterEach`**: Runs after *every single test*. Used to clean up mock timers or temporary files.
- **`afterAll`**: Runs once after *all* tests are finished. Great for shutting down servers.


# Lesson 3: Component Testing

## Testing the UI
Unit testing pure functions is easy, but how do we test a React component? Components return JSX, rely on DOM nodes, and react to user state.

To test them, we use **React Testing Library (RTL)** alongside our test runner.

## The RTL Philosophy
React Testing Library was built on a very specific philosophy:
> *"The more your tests resemble the way your software is used, the more confidence they can give you."*

This means we DO NOT test internal React state. We don't check if `useState` has the value `true`. Instead, we test what the **User sees**. We check if a button with the text "Apply Discount" is rendered on the screen.

## Core RTL Tools used in `OptometryDiscountCard.test.tsx`

1. **`render(<Component />)`**: This function creates a virtual DOM in memory and mounts your React component into it.
2. **`screen`**: This is your primary tool for querying the virtual DOM. It acts like the user's eyes.
3. **`screen.getByText()`**: Finds an element on the screen that contains specific text.
4. **`screen.getByRole()`**: The most recommended way to find elements. It finds elements by their accessible role (e.g., `getByRole('button', { name: /Apply/i })`). This ensures your app is also accessible to screen readers!


# Lesson 4: User Interaction

## Simulating the User
Rendering a component and checking if text exists is a great start, but modern web apps are highly interactive. Users click buttons, type in fields, and press keyboard shortcuts.

To test these interactions, we use `@testing-library/user-event`.

## `userEvent` vs `fireEvent`
You might see older tutorials using `fireEvent.click()`. 
`fireEvent` is a low-level tool that simply triggers a DOM event.

**`userEvent`** is much more advanced. When you call `userEvent.type()`, it doesn't just change the input value. It triggers a `keyDown`, `keyPress`, `input`, and `keyUp` event—exactly simulating what a real human does when typing on a physical keyboard.

## Key Interactions in `OptometryPatientSearch.test.tsx`

1. **Setup**: We always initialize it first: `const user = userEvent.setup();`
2. **Typing**: `await user.type(inputField, "Ahmed Mahmoud")` simulates a user typing characters one by one.
3. **Keyboard Keys**: You can simulate pressing special keys using bracket notation: 
   - `await user.type(inputField, "{Enter}")` simulates hitting the Return/Enter key.
   - `await user.keyboard("{Escape}")` simulates hitting the Escape key.

Notice that all `userEvent` actions are asynchronous (`await`). This is because React needs time to process the state changes and re-render the virtual DOM between keystrokes!


# Lesson 5: Snapshot Testing

## What is a Snapshot?
Imagine taking a literal photograph of your UI. If a developer accidentally changes a CSS class or removes a required text field tomorrow, you can compare the new UI to the photograph. If they don't match, the test fails.

This is exactly what **Snapshot Testing** does, but instead of a photograph, it takes a "snapshot" of the HTML code (the DOM structure) generated by your component.

## How it works in `OptometryReceiptHeader.test.tsx`
When you run `expect(container).toMatchSnapshot()` for the very first time, the test runner creates a new folder called `__snapshots__` and saves the exact HTML string inside it.

```html
// Example Snapshot Output:
<h2 class="text-lg font-bold text-cyan-400">
  👁️ Al-Noor Advanced Optics Clinic
</h2>
```

If another developer later changes the text to "Al-Noor Standard Clinic", the test runner will compare the new HTML to the saved snapshot, realize they are different, and instantly fail the test.

## Updating Snapshots
If the UI change was intentional (you *wanted* to change the clinic name), you must tell the test runner to update the photograph. 
You do this by passing the `-u` (update) flag to the test runner:
```bash
npm test -- -u
```
This overwrites the old snapshot with the new HTML, and the test will pass again.

## Warning
Do not overuse snapshot tests. If your component changes frequently, your snapshots will fail constantly, leading to "Snapshot Fatigue" where developers blindly run `-u` without actually checking if the UI is correct!


# Lesson 6: Mocking Modules

## The Testing Dilemma
Imagine you have a function `createPatientOrder()` that sends an HTTP request to a database, charges a credit card via Stripe, and sends an SMS to the patient.

If you run a unit test on this function:
1. It will be incredibly slow.
2. It will charge a real credit card.
3. If the internet is down, the test will fail even if your code is perfect.

Tests must be fast, isolated, and deterministic. We cannot rely on external dependencies.

## Enter: Mocking
Mocking is the act of replacing a real external dependency (like an API file, a database client, or a slow module) with a "Fake" version that you control entirely during the test.

## How we use `vi.mock()`
In `orderService.test.ts`, our `createPatientOrder` function imports `checkLensAvailability` from another file (`inventoryApi.ts`). 

To prevent it from actually making an API call, we do this at the very top of our test file:
```typescript
vi.mock("./inventoryApi", () => ({
  checkLensAvailability: vi.fn(),
}));
```
We have just intercepted the import! Now, when `createPatientOrder` tries to call `checkLensAvailability`, it hits our fake function instead.

## Controlling the Fake
Inside our specific test, we can command our fake function to return whatever we want:
```typescript
// Force the fake API to return true (Available)
vi.mocked(checkLensAvailability).mockResolvedValue(true);
```
This allows us to test the "Happy Path" (Lens is available) and the "Error Path" (Lens is out of stock) instantly, without ever touching a real network!


# Lesson 7: Assertions Deep Dive

## The Power of `expect()`
Every test ends with an assertion. This is where you declare what you expect the result to be. The test runner provides the `expect()` function, which chains into dozens of different "matchers" (like `.toBe()`, `.toEqual()`, etc.).

Using the correct matcher is crucial for writing robust tests. 

## Primitives vs Objects
In `insuranceAnalyzer.test.ts`, you will see two very different matchers:

1. **`.toBe()`**: Used for primitive values (numbers, strings, booleans). It checks for *exact, identical* equality in memory.
   ```typescript
   expect(report.isCovered).toBe(true);
   expect(report.copayAmount).toBe(0);
   ```

2. **`.toEqual()`**: Used for Objects and Arrays. If you use `.toBe()` on an object, the test will fail even if the objects look identical, because they occupy different spaces in memory. `.toEqual()` deeply inspects the keys and values to see if the *contents* match.
   ```typescript
   // Deeply compares every property in the object
   expect(report).toEqual({
     isCovered: true,
     copayAmount: 0,
     approvedServices: ["Routine Exam", "VIP Frame Allowance"]
   });
   ```

## Testing Errors
How do you test that a function *correctly crashes* when given bad data?
You wrap the function call in an anonymous arrow function, and use the `.toThrow()` matcher!

```typescript
// We expect the analyzer to throw a specific error if age is -5
expect(() => generateInsuranceReport(-5, true)).toThrow(/Invalid patient age/);
```
Notice how we pass a Regular Expression (`/Invalid patient age/`) to ensure it threw the *exact* error we expected, not just any random crash!


