// =========================================================================
// File: Types.ts
// Description: Primitive Type Annotations in TypeScript
// =========================================================================

// 1. نوع النصوص (string): يقبل حروفاً فقط
let patientName: string = "أحمد محمود";
let frameModel: string = "Ray-Ban Aviator";

// 2. نوع الأرقام (number): يقبل أرقاماً صحيحة أو عشرية أو سالبة
let patientAge: number = 35;
let lensSpherePower: number = -2.50; // قياس النظر
let framePriceUSD: number = 150;

// 3. النوع المنطقي (boolean): يقبل true أو false فقط
let hasHealthInsurance: boolean = true;
let isFirstVisit: boolean = false;

// =========================================================================
// 🚨 ماذا يحدث لو حاولنا كسر القوانين؟ (تجربة حية في VS Code)
// =========================================================================

// المبرمج يحاول عن طريق الخطأ وضع نص داخل متغير رقمي:
lensSpherePower = "قوي جداً"; 
// 🛑 صراخ VS Code الفوري باللون الأحمر:
// Type 'string' is not assignable to type 'number'.

// المبرمج يحاول استدعاء دالة نصية على متغير منطقي:
console.log(hasHealthInsurance.toUpperCase());
// 🛑 صراخ VS Code الفوري:
// Property 'toUpperCase' does not exist on type 'boolean'.