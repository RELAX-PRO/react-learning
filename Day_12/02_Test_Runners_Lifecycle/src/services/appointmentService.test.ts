// =========================================================================
// File: src/services/appointmentService.test.ts
// Description: Mastering Test Runner Lifecycle Hooks in Vitest
// =========================================================================
/**
 * ==========================================
 * UNDERLYING MECHANICS: TEST LIFECYCLE HOOKS
 * ==========================================
 * Test runners (like Vitest or Jest) provide lifecycle hooks to manage 
 * setup and teardown of the test environment.
 * - beforeAll/afterAll: Run once per suite. Good for heavy setups (e.g., DB connections).
 * - beforeEach/afterEach: Run before/after EVERY test. Ensures test isolation.
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest'; // 'vi' is the Vitest utility object for mocking

// Simulating an in-memory clinic appointments database
let clinicAppointmentsDatabase: string[] = [];

describe('Clinic Appointments System - Lifecycle Hooks Suite', () => {

  // 🟢 1. Runs once before all tests: Setup the server
  beforeAll(() => {
    console.log("🌐 [beforeAll]: Cloud appointment engine started...");
  });

  // 🟡 2. Runs before each test: Clean the slate and set up a default appointment
  beforeEach(() => {
    // Clear any old appointments from the previous test to start fresh!
    clinicAppointmentsDatabase = ["Dr. Smith Appointment - 10:00 AM"];
    
    // Clear all spy counters in Vitest
    vi.clearAllMocks();
  });

  // 🟣 3. Runs after each test: Clean up any traces
  afterEach(() => {
    // Remove any mock timers created
    vi.useRealTimers();
  });

  // 🔴 4. Runs once after all tests have finished: Shut down the system
  afterAll(() => {
    console.log("🛑 [afterAll]: Appointment engine shut down and memory cleared.");
  });

  // =========================================================================
  // Actual Tests (You will find that the memory is always clean and ready for them!)
  // =========================================================================

  it('should successfully add a new appointment to the clean list', () => {
    clinicAppointmentsDatabase.push("Dr. Sarah Appointment - 11:00 AM");
    
    // We expect to have two appointments now (the original from beforeEach + the new one)
    expect(clinicAppointmentsDatabase).toHaveLength(2);
  });

  it('should start with a clean memory here as well and not be affected by the addition in the previous test!', () => {
    // 🪄 Magic: Even though we added Dr. Sarah's appointment above, beforeEach cleared it and reset the list to only one appointment!
    expect(clinicAppointmentsDatabase).toHaveLength(1);
    expect(clinicAppointmentsDatabase[0]).toBe("Dr. Smith Appointment - 10:00 AM");
  });

});