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
