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

  // 🟢 الاختبار الأول: التأكد من رسم المكون بالبيانات الابتدائية الصحيحة
  it('should render the frame model and initial price correctly', () => {
    // 1. ARRANGE & ACT: رسم المكون داخل المتصفح الوهمي في الذاكرة
    render(<OptometryDiscountCard frameModel="Ray-Ban Aviator" initialPriceUSD={100} />);

    // 2. ASSERT: التحقق من أن النصوص ظاهرة على الشاشة
    // نبحث عن النص في الشاشة (تجاهل حالة الأحرف بمساعدة الكود i)
    expect(screen.getByText(/Ray-Ban Aviator/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/i)).toBeInTheDocument();
    
    // التأكد من أن الزر فعال وغير معطل في البداية
    const discountButton = screen.getByRole('button', { name: /تطبيق خصم 20%/i });
    expect(discountButton).not.toBeDisabled();
  });

  // 🟡 الاختبار الثاني: محاكاة نقرة مستخدم وتغير الحالة على الشاشة
  it('should apply a 20% discount and disable the button when clicked', async () => {
    // 1. ARRANGE: التجهيز
    const user = userEvent.setup(); // تجهيز روبوت المحاكاة (الكيبورد والماوس)
    render(<OptometryDiscountCard frameModel="Gucci Titanium" initialPriceUSD={200} />);

    // إيجاد الزر على الشاشة قبل النقر
    const discountButton = screen.getByRole('button', { name: /تطبيق خصم 20%/i });

    // 2. ACT: الروبوت يقوم بالنقر فعلياً على الزر!
    await user.click(discountButton);

    // 3. ASSERT: التحقق من التغيرات البصرية بعد النقر
    // السعر يجب أن يتغير من $200 إلى $160 (خصم 20%)
    const priceDisplay = screen.getByTestId('price-display');
    expect(priceDisplay).toHaveTextContent('$160');

    // الزر يجب أن يتغير نصه ويصبح معطلاً (Disabled) حتى لا يضغط عليه المريض مرتين!
    expect(discountButton).toBeDisabled();
    expect(discountButton).toHaveTextContent(/تم تطبيق الخصم/i);
  });

});