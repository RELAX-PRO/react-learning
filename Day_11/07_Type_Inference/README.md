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
