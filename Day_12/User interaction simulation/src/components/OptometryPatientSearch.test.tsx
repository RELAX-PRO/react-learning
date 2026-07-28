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

  it('يجب أن يكتب اسم المريض، ويضغط زر Enter بالكيبورد، فيتم إرسال البحث بنجاح', async () => {
    // 1. ARRANGE: إيقاظ الروبوت البشري وتجهيز الجاسوس
    const user = userEvent.setup();
    const mockOnSearch = vi.fn(); // دالة جاسوسية لمراقبة الرد

    render(<OptometryPatientSearch onSearch={mockOnSearch} />);

    // إيجاد حقل الإدخال وزر البحث
    const searchInput = screen.getByPlaceholderText(/اكتب اسم المريض/i);
    const searchButton = screen.getByRole('button', { name: /بحث/i });

    // التأكد أن الزر معطل في البداية لأن الحقل فارغ!
    expect(searchButton).toBeDisabled();

    // 2. ACT: الروبوت يكتب الاسم في الحقل، ويضغط Enter مباشرة دون لمس الماوس!
    await user.type(searchInput, "سارة محمود[Enter]");

    // 3. ASSERT: التحقق من النتائج الصارمة
    // التأكد أن دالة البحث استُدعيَت بالاسم الصحيح
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("سارة محمود");

    // التأكد أن شريط تأكيد البحث ظهر على الشاشة
    expect(screen.getByText(/تم إرسال طلب البحث عن/i)).toBeInTheDocument();
    expect(screen.getByText("سارة محمود")).toBeInTheDocument();
  });

  it('يجب أن يمسح الحقل فوراً عندما يضغط الطبيب على زر Escape بالكيبورد', async () => {
    // 1. ARRANGE
    const user = userEvent.setup();
    render(<OptometryPatientSearch onSearch={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/اكتب اسم المريض/i);

    // 2. ACT (الخطوة الأولى): كتابة اسم بالخطأ
    await user.type(searchInput, "اسم خاطئ");
    expect(searchInput).toHaveValue("اسم خاطئ");

    // 2. ACT (الخطوة الثانية): الضغط على زر Escape لإنقاذ الموقف
    await user.keyboard('[Escape]');

    // 3. ASSERT: التأكد أن الحقل أصبح فارغاً تماماً والزر عاد معطلاً!
    expect(searchInput).toHaveValue("");
    expect(screen.getByRole('button', { name: /بحث/i })).toBeDisabled();
  });

});