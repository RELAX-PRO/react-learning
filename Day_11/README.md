# Context API

In Day 4, you learned about "Prop Drilling"—passing props down through dozens of intermediary components just to get data to the bottom.

**Context API** is React's native solution to Prop Drilling. It acts as a global "wormhole" that allows you to teleport data directly from a top-level component down to ANY nested component, entirely bypassing the components in the middle.

### The 3 Steps to Context:
1. **Create the Context:** Build the wormhole (`createContext`).
2. **Provide the Context:** Wrap your top-level components in a `Provider`, and give it the data.
3. **Consume the Context:** Inside a deeply nested child, use the `useContext` hook to pull the data out of the wormhole.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React, { createContext, useContext, useState } from 'react';

/*
  BASIC PATTERN: Creating and Consuming Context
*/

// 1. CREATE the Context
const ThemeContext = createContext();

// A deeply nested child component that needs the theme.
const DeepChild = () => {
  // 3. CONSUME the Context. We bypassed MiddleChild completely!
  const theme = useContext(ThemeContext);
  return <h1>The current theme is: {theme}</h1>;
};

// An intermediary component that doesn't care about theme.
const MiddleChild = () => <DeepChild />;

const App = () => {
  const [theme, setTheme] = useState("dark");

  return (
    // 2. PROVIDE the Context. Everything inside this provider can access 'value'.
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Global Theme
      </button>
      <MiddleChild />
    </ThemeContext.Provider>
  );
};

export default App;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

/*
  YOUR TURN!
  
  TODO:
  1. Create a `UserContext`.
  2. Create an `App` component that provides a user object `{ name: "Alice" }` to its children.
  3. Create a `Profile` component that consumes the context and displays the name.
*/
```

# Lesson 1: Type Annotations

## What is a Type Annotation?
In plain JavaScript, variables are "dynamic." This means a variable holding a `string` (text) can suddenly be reassigned to a `number` or an `array`. While this seems flexible, it is a massive source of bugs in large applications.

**Type Annotations** are how we tell TypeScript: *"This variable will only ever hold THIS specific type of data."*

## The Primitive Types
In this lesson, we explore the three most common primitive types in TypeScript:

1. **`string`**: Used for textual data (e.g., patient names, frame models).
2. **`number`**: Used for numerical data, including integers, decimals, and negative values (e.g., age, price, sphere power).
3. **`boolean`**: Used for true/false flags (e.g., is the patient insured? is the frame in stock?).

## Why does this matter?
If you look at the `TypeAnnotations.ts` file in this folder, you will see what happens when we try to break the rules:
- Assigning a string like `"Very Strong"` to `lensSpherePower` (which expects a `number`) will cause VS Code to throw an error **immediately** before you even run the code.
- Trying to call a text-specific function like `.toUpperCase()` on a boolean variable will also be blocked instantly.

## The Takeaway
By explicitly annotating your variables, you transform TypeScript into a strict guardian that refuses to let logical errors slip into your production application.


# Lesson 2: Interface Declaration

## What is an Interface?
If primitive types (`string`, `number`, `boolean`) are the building blocks, **Interfaces** are the blueprints. 
An Interface is a strict contract that dictates the exact shape an Object must have.

## How to use Interfaces

In `Interfaces.ts` and `api.ts`, you will see interfaces being used to define our domain models (like `Patient`, `LensStockItem`, and `Doctor`).

### Key Features to Notice:
1. **Mandatory Properties**: By default, if an interface defines `fullName: string`, any object claiming to be that interface **must** have a `fullName` property.
2. **Optional Properties (`?`)**: Sometimes data might be missing (like `secondaryPhone`). Appending a `?` tells TypeScript that this property is optional.
3. **`readonly` Modifier**: If an ID should never change after an object is created, we mark it as `readonly`. TypeScript will throw an error if any code attempts to overwrite it.
4. **Extension (`extends`)**: Don't repeat yourself! If a `Doctor` and a `Patient` share properties (like ID and name), you can create a `BasePerson` interface, and have both `Doctor` and `Patient` extend it.

## Why use Interfaces?
Without interfaces, a React component receiving an object might not know what properties exist inside it. By binding your objects and API responses to Interfaces, VS Code will provide perfect auto-completion (`patient.` will instantly suggest `fullName`, `phone`, etc.), drastically speeding up your development and eliminating typos.


# Lesson 3: Component Props Typing

## The Problem in Standard React
In standard JavaScript React, components receive `props` as a generic object. If another developer uses your component and forgets to pass a required prop, or passes a string instead of a number, the component will silently fail or render incorrectly.

## The TypeScript Solution
In `PatientProfileCard.tsx` and `OptometryStatsWidget.tsx`, we define an `interface Props` specifically for the component.

```tsx
interface Props {
  patientName: string;
  initialOrder: LensOrder;
  onUpdateOrder: (newOrder: LensOrder) => void;
}

export const PatientProfileCard: React.FC<Props> = ({ patientName, initialOrder, onUpdateOrder }) => { ... }
```

## What we achieve here:
1. **Strict Usage**: If another file tries to render `<PatientProfileCard patientName="Ahmed" />`, TypeScript will scream: *"Hey! You forgot to pass `initialOrder` and `onUpdateOrder`!"*
2. **Function Props**: Notice how `onUpdateOrder` is typed. It's not just `Function`. We explicitly state that it must be a function that receives a `newOrder` (which must match the `LensOrder` interface) and returns nothing (`void`).
3. **React.FC**: Using `React.FC<Props>` (Functional Component) explicitly tells TypeScript that this is a React Component, granting us access to standard React properties (like `children`, though we don't use it here) and enforcing the `Props` contract on the inputs.

Component Props Typing is the absolute foundation of building robust, shareable UI libraries.


# Lesson 4: Event Typing

## The Challenge with Events
Handling events (like typing in a text field, or clicking a submit button) in React involves dealing with the browser's Event objects. These objects contain hundreds of properties (`e.target.value`, `e.preventDefault()`, etc.). 

If you just type the event as `any`, you lose all auto-completion and safety.

## Using Built-in React Event Types
Look at `OptometrySearchForm.tsx`. We explicitly type our event handlers using React's provided types:

1. **`React.ChangeEvent<HTMLInputElement>`**: 
   - We use this for the `onChange` event of a text input.
   - By passing `<HTMLInputElement>`, TypeScript knows that `e.target` refers to an input field, which means it knows that `e.target.value` exists and is a string!
   
2. **`React.FormEvent<HTMLFormElement>`**:
   - We use this for the `<form onSubmit={...}>` event.
   - It grants safe access to `e.preventDefault()`, ensuring we don't accidentally reload the page.
   
3. **`React.MouseEvent<HTMLButtonElement>`**:
   - We use this for standard button clicks.

## Pro Tip
If you ever struggle to remember the exact name of a React Event type, simply hover over the `onChange` or `onSubmit` prop directly on the JSX element in VS Code, and TypeScript will reveal the exact event type it expects!


# Lesson 5: React Hook Typing

## The Importance of Typing Hooks
React's core Hooks (`useState`, `useRef`, etc.) are heavily reliant on TypeScript Generics. If you don't explicitly type them, TypeScript will try to guess the type based on the initial value. Sometimes, this guess is catastrophically wrong.

### 1. `useState` and the `never[]` Trap
If you initialize an array state as empty:
```tsx
const [lenses, setLenses] = useState([]);
```
TypeScript infers that `lenses` is an array that contains... nothing (`never[]`). If you try to push a `LensItem` into it later, TypeScript will crash.

**The Solution:** Use explicit Generics!
```tsx
const [lenses, setLenses] = useState<LensItem[]>([]);
```
Now TypeScript knows that even though the array is currently empty, it is destined to hold `LensItem` objects.

### 2. Handling `null` States
When loading data from an API, your state might initially be `null` before the data arrives.
```tsx
const [patient, setPatient] = useState<PatientProfile | null>(null);
```
By explicitly combining `PatientProfile | null`, TypeScript will force you to check if the data exists before rendering it (e.g., using `patient?.name`), preventing runtime crashes.

### 3. `useRef` Types
When attaching a ref to a DOM element, you must type it with the specific HTML Element Interface:
```tsx
const inputRef = useRef<HTMLInputElement>(null);
```
This grants you safe access to `inputRef.current.focus()` and `inputRef.current.value`.


# Lesson 6: Generics (<T>)

## The Ultimate Superpower
Generics are often considered the most intimidating part of TypeScript, but they are incredibly simple: **Generics are just variables for types.**

Instead of locking a function or component into accepting only a `string` or only a `Patient`, you allow the developer to pass the type as a parameter (`<T>`) at the exact moment they use the function.

## Why not just use `any`?
If you use `any`, you completely disable TypeScript. The compiler goes blind, auto-completion dies, and runtime errors slip through. 
With Generics (`<T>`), you retain **100% type safety**.

## Real World Examples in this Folder

1. **`GenericDataList.tsx`**:
   We built a list component that can render *anything*. 
   Notice how it is defined: `export const GenericDataList = <T,>({ items, ... }) => { ... }`
   When we use it in `DashboardView.tsx`, we explicitly pass the type we want:
   `<GenericDataList<Patient> items={patientsList} />`
   Instantly, the `renderItem` callback knows that it is dealing with a `Patient` object!

2. **`apiClient.ts`**:
   Fetching data from an API usually returns an unknown JSON object. We built an `ApiResponse<T>` interface and a generic fetch function.
   `fetchFromClinicApi<LensStockItem>("/lenses/1")` guarantees that the returned data exactly matches the `LensStockItem` interface.


# Lesson 7: Automatic Type Inference

## You don't have to type everything!
One of the biggest misconceptions about TypeScript is that you must meticulously annotate every single variable, function, and array. This is false.

TypeScript has an incredibly intelligent engine capable of **Type Inference**.

## How Inference Works
If you assign a value to a variable at the moment of creation, TypeScript automatically locks the type without you writing a single `: string`.

```typescript
let clinicName = "Al-Yusr Optics"; // Inferred as string
let totalRevenue = 1500; // Inferred as number
let hasDiscount = true; // Inferred as boolean
```

## Contextual Inference
TypeScript is smart enough to infer types based on context. 
If you have an array of numbers and you call `.filter()`, TypeScript knows that the callback argument is a number:

```typescript
const invoices = [100, 200, 300];
// TypeScript knows 'val' is a number, so val.toUpperCase() would throw an error!
const bigInvoices = invoices.filter(val => val > 150); 
```

## Rule of Thumb
- **Let TypeScript infer whenever possible.** It keeps your code clean and readable.
- **Intervene with explicit types ONLY when:**
  1. Defining Component Props (`interface Props`).
  2. Initializing empty arrays in `useState`.
  3. A variable starts as `null` or `undefined` but will become an object later.
  4. Defining the shape of API responses.


