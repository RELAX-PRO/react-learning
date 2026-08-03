// =========================================================================
// Lesson 2: Interface Declaration
// =========================================================================
// Interfaces are contracts or blueprints that enforce a specific shape on data (Objects).

// 1. Base Contract:
/*
 * MECHANIC: Interface Declarations
 * Interfaces in TypeScript act as blueprints for object structures. 
 * They define the shape (properties and their types) an object must have.
 * By typing an object with an interface, TS ensures that required properties exist
 * and enforces correct types for each property.
 */
interface Patient {
  readonly id: string;           // 👈 Strict readonly lock: Cannot be modified after creation!
  fullName: string;              // 👈 Required
  phone: string;                 // 👈 Required
  secondaryPhone?: string;       // 👈 Optional (Using the question mark means it can be omitted)
  medicalNotes?: string;         // 👈 Optional
}

// 2. Applying the contract with absolute confidence:
let firstPatient: Patient = { // Inline: 'firstPatient' explicitly implements the 'Patient' interface
  id: "PAT-8842", // Inline: this satisfies the 'readonly id' requirement during initialization
  fullName: "Sarah Ali",
  phone: "+201234567890",
  // Note that secondaryPhone or medicalNotes were not provided, and this is acceptable because they are optional
};

// =========================================================================
// 🚨 Readonly Protection
// =========================================================================
firstPatient.fullName = "Sarah Ali Mahmoud"; // ✅ Acceptable: Changing the name is allowed
// firstPatient.id = "PAT-9999";         // 🛑 Rejected! VS Code will complain because the id is readonly and cannot be modified!

// =========================================================================
// 3. Extending Interfaces:
// =========================================================================
// An interface can inherit (take) all properties of another interface and add to them to avoid repeating code.

interface BasePerson {
  readonly id: string;
  fullName: string;
  phoneNumber: string;
}

// An optometry patient contract inherits from BasePerson and adds vision exam information
interface OptometryPatient extends BasePerson {
  lastEyeExamDate: string;
  sphereRightEye: number;
}

// A doctor contract also inherits and adds professional properties
interface Doctor extends BasePerson {
  // Using Literal Types: means the value must literally be one of these words
  specialty: "Retina" | "Pediatric" | "General Optometry"; 
  licenseNumber: string;
}
