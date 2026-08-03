// =========================================================================
// File: src/services/apiClient.ts
// Description: Generic Fetch Engine for React App
// =========================================================================
import { ApiResponse, LensStockItem, Patient } from '../02_Interface_Declaration/api';

/*
 * MECHANIC: Generic Functions
 * By using the generic type `<T>`, this function can dynamically return different payload shapes.
 * `Promise<ApiResponse<T>>` guarantees that whoever calls this function will receive a properly typed response,
 * maintaining type safety from the network layer down to the React components.
 */
// A single generic fetch engine capable of returning any strict type!
export async function fetchFromClinicApi<T>(endpoint: string): Promise<ApiResponse<T>> { // Inline: <T> makes this function reusable for any payload
  const response = await fetch(`https://api.optometry-clinic.com${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  // We cast the parsed JSON cleanly into our expected ApiResponse<T>
  const result: ApiResponse<T> = await response.json(); // Inline: Assigning the JSON payload to our generic interface
  return result;
}

// =========================================================================
// 🎯 How cleanly we consume it in our components:
// =========================================================================

async function loadClinicDashboard() {
  // 1. Fetching patients (TS knows automatically that data is Patient[])
  const patientsData = await fetchFromClinicApi<Patient[]>("/v1/patients");
  console.log("First patient name:", patientsData.data[0].fullName);

  // 2. Fetching a single lens item (TS knows automatically that data is LensStockItem)
  const lensData = await fetchFromClinicApi<LensStockItem>("/v1/lenses/RAY-001");
  console.log("Lens price:", lensData.data.priceUSD);
}
