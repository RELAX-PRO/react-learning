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
