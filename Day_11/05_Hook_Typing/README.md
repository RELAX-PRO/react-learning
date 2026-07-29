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
