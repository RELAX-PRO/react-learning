# Lesson 6: Mocking Modules

## The Testing Dilemma
Imagine you have a function `createPatientOrder()` that sends an HTTP request to a database, charges a credit card via Stripe, and sends an SMS to the patient.

If you run a unit test on this function:
1. It will be incredibly slow.
2. It will charge a real credit card.
3. If the internet is down, the test will fail even if your code is perfect.

Tests must be fast, isolated, and deterministic. We cannot rely on external dependencies.

## Enter: Mocking
Mocking is the act of replacing a real external dependency (like an API file, a database client, or a slow module) with a "Fake" version that you control entirely during the test.

## How we use `vi.mock()`
In `orderService.test.ts`, our `createPatientOrder` function imports `checkLensAvailability` from another file (`inventoryApi.ts`). 

To prevent it from actually making an API call, we do this at the very top of our test file:
```typescript
vi.mock("./inventoryApi", () => ({
  checkLensAvailability: vi.fn(),
}));
```
We have just intercepted the import! Now, when `createPatientOrder` tries to call `checkLensAvailability`, it hits our fake function instead.

## Controlling the Fake
Inside our specific test, we can command our fake function to return whatever we want:
```typescript
// Force the fake API to return true (Available)
vi.mocked(checkLensAvailability).mockResolvedValue(true);
```
This allows us to test the "Happy Path" (Lens is available) and the "Error Path" (Lens is out of stock) instantly, without ever touching a real network!
