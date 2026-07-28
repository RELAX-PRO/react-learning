// =========================================================================
// File: src/components/OptometryReceiptHeader.test.tsx
// Description: Snapshot Testing using Vitest
// =========================================================================
import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OptometryReceiptHeader } from './OptometryReceiptHeader';

describe('OptometryReceiptHeader - Snapshot Tests', () => {

  it('should match the saved HTML snapshot perfectly', () => {
    // 1. ARRANGE & ACT: رسم المكون داخل المتصفح الوهمي
    const { container } = render(
      <OptometryReceiptHeader
        receiptId="9988"
        patientName="أحمد محمود"
        doctorName="خالد العبيدي"
        examDate="2026-07-28"
      />
    );

    // 2. ASSERT: السحر هنا! مقارنة الهيكل بالكامل مع البصمة المحفوظة
    // في أول مرة يشغل فيها الاختبار، سيقوم بإنشاء البصمة تلقائياً!
    expect(container).toMatchSnapshot();
  });

});