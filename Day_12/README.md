# Day 12: Testing in React & TypeScript

Welcome to Day 12! In this module, we move away from building features to focus on **Testing**. We will use **Vitest** (the modern, incredibly fast test runner) and **React Testing Library (RTL)** (the standard for React UI testing).

This repository is organized to give you a deep, structured understanding of testing.

## Why Do We Test?

You might ask: *"If I can see my app working in the browser, why do I need to write code to test it?"*

1. **Confidence in Refactoring:** When your app grows, changing a small piece of code in one place might break something completely unrelated. Tests act as a safety net. If you have tests, you can refactor confidently knowing that if something breaks, the tests will catch it immediately.
2. **Living Documentation:** Good tests explain how a component or function is *supposed* to be used. They serve as documentation that never goes out of date (because if it does, the tests fail!).
3. **Fewer Bugs in Production:** Tests catch edge cases that you might forget to check manually every time you deploy.
4. **Better Architecture:** Code that is easy to test is usually well-structured, modular, and decoupled. If a function is hard to test, it's usually poorly designed.

## The Testing Pyramid

Testing isn't just one thing. It's generally broken down into three main categories (The Testing Pyramid):

1. **Unit Testing:** Testing small, isolated pieces of logic (like a pure function or a math utility). These are extremely fast and you will have a lot of them.
2. **Integration / Component Testing:** Testing how different pieces work together. In React, this usually means testing a specific Component along with its interaction.
3. **End-to-End (E2E) Testing:** Simulating a real user interacting with your actual app running in a browser (usually with tools like Cypress or Playwright). These are slower but test the full flow.

In this module, we focus heavily on **Unit Testing** and **Component Testing**.

## Our Toolkit

- **Vitest:** Our test runner. It finds your test files, runs them, and provides the `describe`, `it`, and `expect` syntax. It's a faster alternative to Jest and integrates perfectly with Vite.
- **React Testing Library (RTL):** Provides virtual DOM rendering (`render`) and querying methods (`screen.getByRole`, etc.) to interact with React components in memory exactly how a user would.

## How to Navigate This Module

The folders in this day are numbered sequentially. Treat each folder as a specific lesson in testing:

### `01_Unit_Testing`
Learn the absolute basics of testing pure JavaScript/TypeScript functions. You'll learn the **Arrange-Act-Assert** pattern and how to test happy paths, edge cases, and errors.

### `02_Test_Runners_Lifecycle`
Understand how a test runner works behind the scenes. Learn how to use lifecycle hooks like `beforeEach` and `afterAll` to set up and tear down your test environments, ensuring every test runs in a clean slate.

### `03_Component_Testing`
Move into React. Learn how to mount a component in a virtual DOM using React Testing Library, query the DOM for elements, and simulate basic clicks.

### `04_User_Interaction`
Deepen your React testing skills by simulating complex user interactions (typing, keyboard events, pressing specific keys like `[Escape]`) using `@testing-library/user-event`.

### `05_Snapshot_Testing`
Learn how to take a "picture" (an HTML snapshot) of your component. If the UI changes unexpectedly in the future, the test will fail and show you exactly what HTML tags changed.

### `06_Mocking_Modules`
Master the art of **Mocking**. When your code relies on external APIs, databases, or slow network requests, you don't want your tests to wait or fail due to internet issues. Learn how to use `vi.mock()` to fake these external dependencies.

### `07_Assertions_Deep_Dive`
A deep dive into the `expect()` function. Learn the difference between testing primitives (`toBe`) vs objects (`toEqual`), testing arrays, numbers, and capturing thrown errors.

## How to Practice

1. Run all tests in the repository using:
   ```bash
   npm test
   ```
2. Read the source code inside each folder. Notice the `Arrange`, `Act`, and `Assert` steps in every test.
3. Try intentionally breaking the code (e.g., change a math formula or a component's text) and see how Vitest immediately catches the error.
4. Add your own tests! Try writing a new function and writing tests for it before you implement it (Test-Driven Development).

Happy testing!
