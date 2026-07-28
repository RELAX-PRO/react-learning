// =========================================================================
// File: src/services/orderService.test.ts
// Description: Step-by-Step Manual Mocking in Vitest
// =========================================================================
import { describe, it, expect, vi } from 'vitest';
import { createPatientOrder } from './orderService';
import * as supplierApi from './supplierApi'; // 1. نستورد الملف الخارجي

// 2. 🚨 أمر التزوير الأعظم:
// هذا السطر يخبر Vitest: "قم باختطاف هذا الملف بالكامل في الذاكرة،
// واستبدل كل الدوال التي بداخله بدوال جاسوسية وهمية خالية من الإنترنت!"
vi.mock('./supplierApi');

describe('createPatientOrder() - Manual Mocking Deep Dive', () => {

  it('يجب أن يؤكد طلب المريض فوريّاً عندما نأمر المورد المزور بأن يرد بـ متوفر (true)', async () => {
    // 1. ARRANGE (التجهيز والتزوير)
    // بما أننا قمنا بـ vi.mock، فإن الدالة checkLensStockInItaly لم تعد حقيقية!
    // أصبحت أداة في يدنا نتحكم بما ترجعه! سنأمرها الآن أن ترجع true فوراً لأي باركود:
    vi.mocked(supplierApi.checkLensStockInItaly).mockResolvedValue(true);

    // 2. ACT (التنفيذ)
    // الآن نشغل دالة عيادتنا عادية جداً وبأي باركود عشوائي في العالم!
    // الدالة لن تنتظر 3 ثوانٍ ولن تتصل بالإنترنت، لأنها ستسأل "المورد المزور" ويرد بـ true في 1ms!
    const order = await createPatientOrder("أحمد محمود", "ANY-RANDOM-BARCODE");

    // 3. ASSERT (التحقق)
    // نتوقع أن الطلب تم تأكيده بنجاح
    expect(order.status).toBe("CONFIRMED");
    expect(order.patientName).toBe("أحمد محمود");

    // نتوقع أن الدالة المزورة تم استدعاؤها فعلياً مرة واحدة بالباركود الذي مررناه!
    expect(supplierApi.checkLensStockInItaly).toHaveBeenCalledTimes(1);
    expect(supplierApi.checkLensStockInItaly).toHaveBeenCalledWith("ANY-RANDOM-BARCODE");
  });

  it('يجب أن يطلق خطأ ويرفض الطلب عندما نأمر المورد المزور بأن يرد بـ غير متوفر (false)', async () => {
    // 1. ARRANGE (تزوير سيناريو الفشل)
    // الآن نأمر المورد المزور أن يرد بـ false (العدسة غير متوفرة في المصنع)
    vi.mocked(supplierApi.checkLensStockInItaly).mockResolvedValue(false);

    // 2 & 3. ACT & ASSERT
    // نتوقع أن دالة العيادة ستنفجر وتطلق خطأ حماية للمريض
    await expect(
      createPatientOrder("سارة علي", "EXPIRED-BARCODE")
    ).rejects.toThrowError("عذراً، هذه العدسة غير متوفرة في مخازن المصنع حالياً!");
  });

});