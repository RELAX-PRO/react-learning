# Lesson 1: Unit Testing

## What is Unit Testing?
Unit Testing is the practice of testing the smallest, isolated piece of code in your application (a "Unit"). In JavaScript and TypeScript, this is usually a single, pure function.

We don't test React components here. We don't test the database. We just test if a math function correctly adds two numbers, or if a data parser correctly formats a string.

## The AAA Pattern (Arrange, Act, Assert)
If you look at `optometryMath.test.ts`, you'll notice every test is structured into three clear steps. This is the industry standard for writing clean tests:

1. **Arrange**: Set up the initial state. Define the variables, create the mock data, and prepare everything needed for the test.
2. **Act**: Execute the function you are trying to test.
3. **Assert**: Verify that the result of the function matches your expectations using `expect()`.

## Why write Unit Tests?
- **Speed**: They run in milliseconds. You can have 1,000 unit tests run in less than a second.
- **Safety**: If you accidentally change a core calculation (like the Optometry fee calculation), a unit test will immediately fail and tell you exactly which formula broke.
- **Simplicity**: Because they test functions in isolation, if a unit test fails, you know *exactly* where the bug is. There is no guessing if the bug is in the UI, the network, or the database.
