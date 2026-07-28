// =========================================================================
// File: src/services/appointmentService.test.ts
// Description: Mastering Test Runner Lifecycle Hooks in Vitest
// =========================================================================
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';

// محاكاة لذاكرة حجوزات العيادة في المتصفح
let clinicAppointmentsDatabase: string[] = [];

describe('Clinic Appointments System - Lifecycle Hooks Suite', () => {

  // 🟢 1. يعمل مرة واحدة عند فتح الملف: تجهيز السيرفر
  beforeAll(() => {
    console.log("🌐 [beforeAll]: تم تشغيل محرك حجز المواعيد السحابي...");
  });

  // 🟡 2. يعمل قبل كل فحص: تنظيف الطاولة وتجهيز موعد افتراضي
  beforeEach(() => {
    // مسح أي مواعيد قديمة من الفحص السابق حتى نبدأ على نظافة!
    clinicAppointmentsDatabase = ["موعد د. خالد - 10:00 صباحاً"];
    
    // تنظيف كل عدادات الجواسيس في Vitest
    vi.clearAllMocks();
  });

  // 🟣 3. يعمل بعد كل فحص: مسح الآثار
  afterEach(() => {
    // إزالة أي توقيتات مؤقتة تم إنشاؤها
    vi.useRealTimers();
  });

  // 🔴 4. يعمل في النهاية خالص: إغلاق النظام
  afterAll(() => {
    console.log("🛑 [afterAll]: تم إغلاق محرك المواعيد وتفريغ الذاكرة.");
  });

  // =========================================================================
  // الاختبارات الفعلية (ستجد أن الذاكرة دائماً نظيفة ومجهزة لها!)
  // =========================================================================

  it('يجب أن يضيف موعداً جديداً بنجاح إلى القائمة النظيفة', () => {
    clinicAppointmentsDatabase.push("موعد د. سارة - 11:00 صباحاً");
    
    // نتوقع وجود موعدين الآن (الأصلي من الـ beforeEach + الجديد)
    expect(clinicAppointmentsDatabase).toHaveLength(2);
  });

  it('يجب أن تبدأ الذاكرة نظيفة هنا أيضاً ولا تتأثر بالإضافة التي حصلت في الفحص السابق!', () => {
    // 🪄 السحر: رغم أننا أدفنا موعد د. سارة فوق، إلا أن beforeEach مسحته وأعاد القائمة لموعد واحد فقط!
    expect(clinicAppointmentsDatabase).toHaveLength(1);
    expect(clinicAppointmentsDatabase[0]).toBe("موعد د. خالد - 10:00 صباحاً");
  });

});