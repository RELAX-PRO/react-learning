// =========================================================================
// File: src/components/OptometryReceiptHeader.test.tsx
// Description: Snapshot Testing using Vitest
// =========================================================================
/**
 * ==========================================
 * UNDERLYING MECHANICS: SNAPSHOT TESTING
 * ==========================================
 * Snapshot testing captures the rendered HTML of a component and saves it to a file.
 * On subsequent runs, it compares the current output against the saved snapshot.
 * This is incredibly useful for detecting unintended UI regressions in stateless components.
 */
import React from 'react';
import { render } from '@testing-library/react'; // Used to render the component for snapshotting
import { describe, it, expect } from 'vitest';
import { OptometryReceiptHeader } from './OptometryReceiptHeader';

describe('OptometryReceiptHeader - Snapshot Tests', () => {

  it('should match the saved HTML snapshot perfectly', () => {
    // 1. ARRANGE & ACT: Render the component in the virtual DOM
    const { container } = render(
      <OptometryReceiptHeader
        receiptId="9988"
        patientName="Ahmed Mahmoud"
        doctorName="Khalid Al-Obaidi"
        examDate="2026-07-28"
      />
    );

    // 2. ASSERT: The magic is here! Compare the entire structure with the saved snapshot
    // The first time this test runs, it will create the snapshot automatically!
    expect(container).toMatchSnapshot();
  });

});