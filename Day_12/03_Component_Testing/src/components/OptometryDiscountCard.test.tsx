// =========================================================================
// File: src/components/OptometryDiscountCard.test.tsx
// Description: Component Testing using React Testing Library & Vitest
// =========================================================================
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { OptometryDiscountCard } from './OptometryDiscountCard';

describe('OptometryDiscountCard UI Component Tests', () => {

  // 🟢 Test 1: Ensure the component is rendered with the correct initial data
  it('should render the frame model and initial price correctly', () => {
    // 1. ARRANGE & ACT: Render the component in the in-memory virtual DOM
    render(<OptometryDiscountCard frameModel="Ray-Ban Aviator" initialPriceUSD={100} />);

    // 2. ASSERT: Verify that the text is visible on the screen
    // We look for the text on the screen (ignoring case using the /i flag)
    expect(screen.getByText(/Ray-Ban Aviator/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    
    // Ensure that the button is active and not disabled initially
    const discountButton = screen.getByRole('button', { name: /Apply 20% discount/i });
    expect(discountButton).not.toBeDisabled();
  });

  // 🟡 Test 2: Simulate a user click and UI state change
  it('should apply a 20% discount and disable the button when clicked', async () => {
    // 1. ARRANGE: Setup
    const user = userEvent.setup(); // Setup the simulation robot (keyboard and mouse)
    render(<OptometryDiscountCard frameModel="Gucci Titanium" initialPriceUSD={200} />);

    // Find the button on the screen before clicking
    const discountButton = screen.getByRole('button', { name: /Apply 20% discount/i });

    // 2. ACT: The robot physically clicks the button!
    await user.click(discountButton);

    // 3. ASSERT: Verify the visual changes after the click
    // The price should change from $200 to $160 (20% discount)
    const priceDisplay = screen.getByTestId('price-display');
    expect(priceDisplay).toHaveTextContent('$160');

    // The button text should change and it should become disabled so the patient doesn't click twice!
    expect(discountButton).toBeDisabled();
    expect(discountButton).toHaveTextContent(/Discount applied/i);
  });

});