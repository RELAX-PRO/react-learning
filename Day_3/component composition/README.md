# React Core Concepts: Component Architecture

This folder teaches how React apps are structured. The goal is to understand components as building blocks before moving deeper into hooks and state.

## Learning order

1. Functional components
2. Component composition
3. Props passing
4. Prop validation
5. Component lifecycle
6. Virtual DOM
7. Rendering elements

## What each topic should teach

- Functional components: how React renders UI from functions
- Component composition: how small parts fit together into a larger screen
- Props passing: how data flows from parent to child
- Prop validation: how to protect component contracts
- Component lifecycle: when components mount, update, and unmount
- Virtual DOM: how React compares UI changes efficiently
- Rendering elements: how React turns elements into visible UI

## Common mistakes

- Building one giant component instead of composing smaller ones
- Passing props too deeply when the structure can be simplified
- Treating the virtual DOM like a separate real DOM tree
- Confusing elements, components, and rendered output

## Practice checklist

- Split one UI screen into at least three components
- Pass a value from parent to child using props
- Add simple prop validation to one component
- Explain the difference between a React element and a component