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
