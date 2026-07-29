// =========================================================================
// File: src/components/OptometryPatientSearch.test.tsx
// Description: Advanced User Interaction Testing with Vitest & RTL
// =========================================================================
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { OptometryPatientSearch } from './OptometryPatientSearch';

describe('OptometryPatientSearch - Advanced User Simulation', () => {

  it('should type patient name, press Enter key, and successfully submit the search', async () => {
    // 1. ARRANGE: Wake up the human robot and set up the spy
    const user = userEvent.setup();
    const mockOnSearch = vi.fn(); // Spy function to monitor the response

    render(<OptometryPatientSearch onSearch={mockOnSearch} />);

    // Find the input field and search button
    const searchInput = screen.getByPlaceholderText(/Type patient name/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    // Ensure the button is disabled initially because the field is empty!
    expect(searchButton).toBeDisabled();

    // 2. ACT: Robot types the name in the field, and presses Enter directly without touching the mouse!
    await user.type(searchInput, "Sarah Smith[Enter]");

    // 3. ASSERT: Strict result verification
    // Ensure the search function was called with the correct name
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Sarah Smith");

    // Ensure the search confirmation banner appeared on the screen
    expect(screen.getByText(/Search request sent for/i)).toBeInTheDocument();
    expect(screen.getByText("Sarah Smith")).toBeInTheDocument();
  });

  it('should clear the field immediately when the doctor presses the Escape key', async () => {
    // 1. ARRANGE
    const user = userEvent.setup();
    render(<OptometryPatientSearch onSearch={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/Type patient name/i);

    // 2. ACT (Step 1): Type a wrong name
    await user.type(searchInput, "Wrong name");
    expect(searchInput).toHaveValue("Wrong name");

    // 2. ACT (Step 2): Press the Escape key to save the situation
    await user.keyboard('[Escape]');

    // 3. ASSERT: Ensure the field has become completely empty and the button is disabled again!
    expect(searchInput).toHaveValue("");
    expect(screen.getByRole('button', { name: /Search/i })).toBeDisabled();
  });

});