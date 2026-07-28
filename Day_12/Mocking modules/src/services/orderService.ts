// =========================================================================
// File: src/services/orderService.ts
// Description: Our internal clinic logic that relies on the external API
// =========================================================================
import { checkLensStockInItaly } from './supplierApi';

export interface PatientOrder {
  readonly orderId: string;
  readonly patientName: string;
  readonly status: "CONFIRMED" | "REJECTED";
}

export async function createPatientOrder(patientName: string, lensBarcode: string): Promise<PatientOrder> {
  // هنا يستدعي الملف الخارجي
  const isAvailable = await checkLensStockInItaly(lensBarcode);

  if (!isAvailable) {
    throw new Error("عذراً، هذه العدسة غير متوفرة في مخازن المصنع حالياً!");
  }

  return {
    orderId: `ORD-${Date.now()}`,
    patientName,
    status: "CONFIRMED"
  };
}