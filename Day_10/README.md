# Controlled Components

> **💡 How to Imagine This:**
> Imagine a marionette puppet. Every movement it makes is directly controlled by the puppeteer (React state). The puppet can't move on its own; it only reflects the exact poses the puppeteer dictates.

Controlled components are form elements whose value is controlled by React state. The state becomes the "single source of truth" for the input, ensuring predictability.

## Pros & Cons

**Pros:**
- Complete control over input data and instant validation.
- Easy to enforce formats or limit characters during typing.
- State always represents the latest input, making it easy to pass data to other components.

**Cons:**
- Requires writing more boilerplate code (state hooks and onChange handlers).
- Can cause performance issues on very large forms if every keystroke triggers a complex re-render.

# React Hook Form

In Day 4, you learned about "Controlled Components". You tied every single `<input>` to a `useState` hook and an `onChange` handler. 

While this is the pure React way, building a massive form with 20 inputs, validation rules, and error messages becomes an absolute nightmare of boilerplate code. Furthermore, typing in a controlled input forces the *entire component to re-render* on every single keystroke, causing performance lag.

**React Hook Form** solves this. It is a library that allows you to use *uncontrolled* inputs, but still gives you validation and easy submission handling, drastically improving performance and reducing code.


### Code Examples

```jsx
// ==========================================
// 01_BASIC_PATTERN
// ==========================================

// 01_basic_pattern.jsx

import React from 'react';
// import { useForm } from 'react-hook-form'; (Requires npm install react-hook-form)

/*
  BASIC PATTERN: The useForm Hook
*/

const SimpleForm = () => {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log("Form submitted automatically formatted as an object!", data);
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register('firstName', { required: true })} />
    //   {errors.firstName && <span>This field is required!</span>}
    //   <button>Submit</button>
    // </form>
    <div>Check comments for the React Hook Form implementation!</div>
  );
};

export default SimpleForm;

// ==========================================
// 04_EXERCISE
// ==========================================

// 04_exercise.jsx

/*
  YOUR TURN!
  
  TODO:
  1. Write pseudo-code to register an input named 'email'.
  2. Add a validation rule that makes it required.
*/
```

# Uncontrolled Components

> **💡 How to Imagine This:**
> Imagine a self-driving car. You don't control the steering wheel at every second. Instead, the car drives itself (internal state), and you just ask it for its current location when you need it (using a Ref).

Uncontrolled components manage their own internal state, similar to traditional HTML form inputs. React accesses their values primarily through Refs rather than state.

## Pros & Cons

**Pros:**
- Less boilerplate code, as onChange handlers and state are not strictly required.
- Easier to integrate with non-React libraries or legacy code.
- Better performance on massive forms since typing doesn't trigger component re-renders.

**Cons:**
- More difficult to implement real-time validation or conditional UI changes based on input.
- Values are pulled on demand (e.g., on submit) rather than being constantly synchronized with React state.

# Form Validation

> **💡 How to Imagine This:**
> Imagine a bouncer at a club. Before anyone is allowed inside (form submission), the bouncer checks their ID to ensure they meet the rules (data criteria). If they don't, they are turned away with an explanation (error message).

Form validation ensures the data provided by users meets necessary criteria before submission. This can be done natively via HTML5 attributes or dynamically through React state and validation libraries.

## Pros & Cons

**Pros:**
- Prevents invalid data submission, ensuring data integrity.
- Improves user experience by providing immediate feedback on errors.
- Can be customized extensively using React state and third-party libraries (e.g., Yup, Zod).

**Cons:**
- Requires careful planning and can increase code complexity.
- Handling complex asynchronous validations (e.g., checking if a username exists) requires additional state management.


# Input Masking with react-imask

> **💡 How to Imagine This:**
> Imagine a stencil for drawing shapes. No matter how wildly you scribble with your pen, the stencil forces the ink to only create the exact shape (format) allowed, like forcing your typed numbers to look exactly like a phone number.

Input masking enforces a specific format for user input as it is typed, such as formatting phone numbers, credit cards, or dates. It prevents the user from typing invalid characters, providing a seamless user experience without relying on complex, post-submit validation.

## The `react-imask` Library

In the React ecosystem, `react-imask` is an incredibly powerful and lightweight library for masking inputs. It provides two main ways to use it:

### 1. The `<IMaskInput />` Component (The Easy Way)
This is a pre-built React component that handles everything for you. You use it just like a standard `<input />`, but you provide a `mask` string. 
- Example: `mask="0700-000-0000"` (where `0` represents a required digit).
- *See `01_IMaskInput_Example.jsx` for usage.*

### 2. The `useIMask` Hook (The Pro Way)
If you are using a UI Component Library (like Shadcn UI, MUI, or Chakra UI), you cannot use the `<IMaskInput />` component because you need to use the library's custom input component instead. 
This is where the `useIMask` hook shines. The hook gives you a `ref` that you can attach to *any* input element, magically transforming it into a masked input.
- *See `02_useIMask_Example.jsx` for usage.*

## Pros & Cons

**Pros:**
- Greatly enhances user experience by guiding the user and preventing formatting errors.
- Reduces the need for complex validation logic (like tricky Regex) by restricting invalid characters upfront.
- `react-imask` provides a hook (`useIMask`) making it compatible with any UI library.

**Cons:**
- Can be frustrating for users if the mask is too restrictive or handles copy-pasting poorly.
- Adds an external third-party library to your bundle size.
- Sometimes tricky to align cursor positions on mobile keyboards.


# Submission Handling

> **💡 How to Imagine This:**
> Imagine a mailroom clerk intercepting an outgoing package. Before the package goes on the delivery truck (browser default submission), the clerk stops it, checks if the postage is correct, and then hands it over to a specialized courier (API request).

Submission handling involves capturing form data, preventing default browser behavior, performing final validations, and communicating with an API.

## Pros & Cons

**Pros:**
- Centralized place to process form data before sending it to the server.
- Allows for handling loading states and asynchronous operations cleanly.
- Enables intercepting native form submissions to implement custom logic.

**Cons:**
- Requires manual prevention of default behavior (`e.preventDefault()`), which is easily forgotten.
- Managing complex submission states (loading, success, error) requires additional boilerplate unless using specialized form libraries.


# Select Elements

> **💡 How to Imagine This:**
> Imagine a vending machine with a glass front. You can see all the snack options available inside, but you can only push a button to select one specific snack at a time to drop into your hands.

Select elements allow users to choose one or multiple options from a dropdown list. In React, their value is managed similarly to other input elements, typically as controlled components.

## Pros & Cons

**Pros:**
- Efficient use of screen space compared to long lists of radio buttons.
- Easy to manage state with controlled components by binding the `value` attribute to state.
- Supports both single and multiple selections natively.

**Cons:**
- Native styling is limited and varies across operating systems and browsers.
- Building custom styled select dropdowns can be complex and requires careful accessibility (a11y) considerations.


# Checkbox Handling

> **💡 How to Imagine This:**
> Imagine a set of light switches in a room. You can walk around and flip any combination of them on or off. Each switch manages its own independent on/off (true/false) state, allowing you to light up exactly the parts of the room you want.

Checkboxes allow users to select boolean values or multiple items from a set. In React, their state is controlled using the `checked` attribute rather than the `value` attribute.

## Pros & Cons

**Pros:**
- Simple and intuitive for boolean states (e.g., agreeing to terms).
- Excellent for scenarios where multiple independent options can be selected simultaneously.

**Cons:**
- Handling groups of checkboxes requires more complex state management (e.g., maintaining an array of selected values).
- Requires binding to the `checked` property, which differs slightly from text inputs (`value`), which can trip up beginners.


