# Lesson 7: Assertions Deep Dive

## The Power of `expect()`
Every test ends with an assertion. This is where you declare what you expect the result to be. The test runner provides the `expect()` function, which chains into dozens of different "matchers" (like `.toBe()`, `.toEqual()`, etc.).

Using the correct matcher is crucial for writing robust tests. 

## Primitives vs Objects
In `insuranceAnalyzer.test.ts`, you will see two very different matchers:

1. **`.toBe()`**: Used for primitive values (numbers, strings, booleans). It checks for *exact, identical* equality in memory.
   ```typescript
   expect(report.isCovered).toBe(true);
   expect(report.copayAmount).toBe(0);
   ```

2. **`.toEqual()`**: Used for Objects and Arrays. If you use `.toBe()` on an object, the test will fail even if the objects look identical, because they occupy different spaces in memory. `.toEqual()` deeply inspects the keys and values to see if the *contents* match.
   ```typescript
   // Deeply compares every property in the object
   expect(report).toEqual({
     isCovered: true,
     copayAmount: 0,
     approvedServices: ["Routine Exam", "VIP Frame Allowance"]
   });
   ```

## Testing Errors
How do you test that a function *correctly crashes* when given bad data?
You wrap the function call in an anonymous arrow function, and use the `.toThrow()` matcher!

```typescript
// We expect the analyzer to throw a specific error if age is -5
expect(() => generateInsuranceReport(-5, true)).toThrow(/Invalid patient age/);
```
Notice how we pass a Regular Expression (`/Invalid patient age/`) to ensure it threw the *exact* error we expected, not just any random crash!
