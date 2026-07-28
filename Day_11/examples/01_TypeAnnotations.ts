// =========================================================================
// الدرس الأول: تحديد الأنواع الأساسية (Primitive Type Annotations)
// =========================================================================
// في TypeScript، يمكننا إجبار المتغيرات على قبول نوع واحد فقط من البيانات.
// هذا يحمينا من الأخطاء المفاجئة أثناء تشغيل التطبيق.

// 1. النصوص (string): يقبل حروفاً ونصوصاً فقط.
let patientName: string = "أحمد محمود";
let frameModel: string = "Ray-Ban Aviator";

// 2. الأرقام (number): يقبل أرقاماً صحيحة، عشرية، أو سالبة.
let patientAge: number = 35;
let lensSpherePower: number = -2.50; // قياس النظر بالسالب
let framePriceUSD: number = 150;

// 3. المنطق (boolean): يقبل صح (true) أو خطأ (false) فقط.
let hasHealthInsurance: boolean = true;
let isFirstVisit: boolean = false;

// =========================================================================
// 🚨 ماذا يحدث لو حاولنا كسر القوانين؟ (جرب إزالة التعليق لترى الخطأ)
// =========================================================================

// المبرمج يحاول بالخطأ وضع نص داخل متغير رقمي:
// lensSpherePower = "قوي جداً"; 
// 🛑 صراخ VS Code الفوري: Type 'string' is not assignable to type 'number'.

// المبرمج يحاول استدعاء دالة تخص النصوص على متغير منطقي:
// console.log(hasHealthInsurance.toUpperCase());
// 🛑 صراخ VS Code الفوري: Property 'toUpperCase' does not exist on type 'boolean'.
