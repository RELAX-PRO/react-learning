// =========================================================================
// File: src/services/supplierApi.ts
// Description: External module connecting to the Italian Lens Factory DB
// =========================================================================

export async function checkLensStockInItaly(barcode: string): Promise<boolean> {
  console.log("🌐 Connecting online to Italian warehouses... Please wait...");
  
  // Simulate internet network delay for 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // In reality, only this barcode is currently in stock there
  return barcode === "ITALY-RAY-2026";
}