// =========================================================================
// File: src/services/supplierApi.ts
// Description: External module connecting to the Italian Lens Factory DB
// =========================================================================

/**
 * ==========================================
 * UNDERLYING MECHANICS: EXTERNAL API SIMULATION
 * ==========================================
 * This file simulates an external, third-party system. 
 * In a real application, this would use `fetch` or `axios` to make HTTP requests.
 * During unit testing, this entire module should be mocked so we don't actually 
 * wait for network delays or hit real third-party servers.
 */
export async function checkLensStockInItaly(barcode: string): Promise<boolean> {
  console.log("🌐 Connecting online to Italian warehouses... Please wait...");
  
  // Simulate internet network delay for 3 seconds using a Promise and setTimeout
  await new Promise((resolve) => setTimeout(resolve, 3000));


  // In reality, only this barcode is currently in stock there
  return barcode === "ITALY-RAY-2026";
}