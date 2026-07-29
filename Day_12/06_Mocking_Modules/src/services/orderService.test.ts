// =========================================================================
// File: src/services/orderService.test.ts
// Description: Step-by-Step Manual Mocking in Vitest
// =========================================================================
import { describe, it, expect, vi } from 'vitest';
import { createPatientOrder } from './orderService';
import * as supplierApi from './supplierApi'; // 1. We import the external module

// 2. 🚨 The Great Mock Command:
// This line tells Vitest: "Hijack this entire file in memory,
// and replace all its functions with fake spy functions entirely offline!"
vi.mock('./supplierApi');

describe('createPatientOrder() - Manual Mocking Deep Dive', () => {

  it('should immediately confirm the patient order when we instruct the mock supplier to respond with available (true)', async () => {
    // 1. ARRANGE (Setup and Mocking)
    // Since we called vi.mock, the function checkLensStockInItaly is no longer real!
    // It became a tool in our hands that we control! We will instruct it now to return true immediately for any barcode:
    vi.mocked(supplierApi.checkLensStockInItaly).mockResolvedValue(true);

    // 2. ACT (Execution)
    // Now we run our clinic function normally, with any random barcode in the world!
    // The function won't wait 3 seconds and won't connect to the internet, because it will ask the "mock supplier" and get true in 1ms!
    const order = await createPatientOrder("Ahmed Mahmoud", "ANY-RANDOM-BARCODE");

    // 3. ASSERT (Verification)
    // We expect the order to be successfully confirmed
    expect(order.status).toBe("CONFIRMED");
    expect(order.patientName).toBe("Ahmed Mahmoud");

    // We expect the mocked function to have actually been called once with the barcode we passed!
    expect(supplierApi.checkLensStockInItaly).toHaveBeenCalledTimes(1);
    expect(supplierApi.checkLensStockInItaly).toHaveBeenCalledWith("ANY-RANDOM-BARCODE");
  });

  it('should throw an error and reject the order when we instruct the mock supplier to respond with unavailable (false)', async () => {
    // 1. ARRANGE (Mocking failure scenario)
    // Now we instruct the mock supplier to return false (Lens is out of stock in the factory)
    vi.mocked(supplierApi.checkLensStockInItaly).mockResolvedValue(false);

    // 2 & 3. ACT & ASSERT
    // We expect the clinic function to explode and throw an error to protect the patient
    await expect(
      createPatientOrder("Sarah Ali", "EXPIRED-BARCODE")
    ).rejects.toThrowError("Sorry, this lens is currently out of stock in the factory!");
  });

});