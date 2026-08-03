// =========================================================================
// File: src/types/api.ts
// Description: Enterprise Generic API Response Blueprint
// =========================================================================

// 1. Defining the Master Generic Contract
/*
 * MECHANIC: Generic Interfaces
 * `<T>` is a generic type parameter. It allows the `ApiResponse` interface to be reusable 
 * for any data payload. When utilizing this interface, `T` will be replaced by a concrete type.
 * This ensures strong typing for the `data` property, regardless of what the API returns.
 */
export interface ApiResponse<T> { // Inline: <T> represents a dynamic type variable
  readonly status: number; // Inline: Cannot be modified after instantiation
  readonly success: boolean;
  message?: string; // Inline: Optional property
  data: T; // 👈 The magic payload spot! Adapts dynamically to T
}

// 2. Defining our Domain Entities
export interface Patient {
  id: string;
  fullName: string;
  phone: string;
}

export interface LensStockItem {
  barcode: string;
  brand: string;
  priceUSD: number;
  inStock: boolean;
}

// =========================================================================
// 🚀 How we apply it in Next.js services:
// =========================================================================

// Example A: An API response containing a single Patient
const patientResponse: ApiResponse<Patient> = {
  status: 200,
  success: true,
  data: {
    id: "PAT-101",
    fullName: "Sarah Mahmoud",
    phone: "07901234567"
  }
};

// Example B: An API response containing an Array of Lens Items
const inventoryResponse: ApiResponse<LensStockItem[]> = {
  status: 200,
  success: true,
  data: [
    { barcode: "RAY-001", brand: "Ray-Ban", priceUSD: 150, inStock: true },
    { barcode: "GUC-002", brand: "Gucci", priceUSD: 250, inStock: false }
  ]
};