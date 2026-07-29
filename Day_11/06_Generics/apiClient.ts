// =========================================================================
// File: src/services/apiClient.ts
// Description: Generic Fetch Engine for React App
// =========================================================================
import { ApiResponse, LensStockItem, Patient } from '../02_Interface_Declaration/api';

// A single generic fetch engine capable of returning any strict type!
export async function fetchFromClinicApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  const response = await fetch(`https://api.optometry-clinic.com${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  // We cast the parsed JSON cleanly into our expected ApiResponse<T>
  const result: ApiResponse<T> = await response.json();
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
