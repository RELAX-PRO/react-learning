// =========================================================================
// File: src/services/orderService.ts
// Description: Our internal clinic logic that relies on the external API
// =========================================================================
/**
 * ==========================================
 * UNDERLYING MECHANICS: ASYNCHRONOUS SERVICES
 * ==========================================
 * Services often contain business logic and interact with external APIs or Databases.
 * We use `async/await` to handle asynchronous operations.
 * When testing this module, we usually mock the external dependencies (`supplierApi`)
 * to test the internal logic (`createPatientOrder`) in isolation.
 */
import { checkLensStockInItaly } from './supplierApi';

export interface PatientOrder {
  readonly orderId: string;
  readonly patientName: string;
  readonly status: "CONFIRMED" | "REJECTED";
}


export async function createPatientOrder(patientName: string, lensBarcode: string): Promise<PatientOrder> {
  // Call the external module here
  const isAvailable = await checkLensStockInItaly(lensBarcode);

  if (!isAvailable) {
    throw new Error("Sorry, this lens is currently out of stock in the factory!");
  }

  return {
    orderId: `ORD-${Date.now()}`,
    patientName,
    status: "CONFIRMED"
  };
}