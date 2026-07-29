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
