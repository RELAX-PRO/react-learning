import React from "react";
// ❌ الطريقة الأولى: استخدام any (كارثة سيبرانية وهندسية!)
function getFirstElement1(array: any[]): any {
  return array[0];
}

// عندما نستدعيها ونمرر قائمة نصوص، المحرك يصبح أعمى تماماً:
const firstPatient1 = getFirstElement1(["أحمد", "سارة"]);
// المحرك يظن أن firstPatient هو any! بالتالي لو كتبت firstPatient. وكتبت بعدها اسم دالة غير موجودة，
// لن يمنعك VS Code، وسينفجر التطبيق في وجه المستخدم! 💥

// =========================================================================

// ✅ الطريقة الثانية: استخدام Generics <T> (الذكاء الخارق!)
function getFirstElement<T>(array: T[]): T {
  return array[0];
}

// 🪄 انظر السحر الآن:
const firstPatient = getFirstElement(["أحمد", "سارة"]); 
// المحرك استنتج آلياً أن T هي string! بالتالي عرف أن المتغير firstPatient هو نص (string) 100%!
// وسيمنحك كل دوال النصوص في VS Code ويمسح أي احتمال للخطأ! 🛡️