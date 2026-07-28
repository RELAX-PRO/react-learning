// =========================================================================
// الدرس الثالث: الاستنتاج التلقائي للأنواع (Type Inference)
// =========================================================================
// TypeScript ذكي جداً، لا تحتاج دائماً لكتابة النوع يدوياً. إذا أعطيته القيمة الابتدائية، سيعرف النوع فوراً.

// 1. المحرك ينظر إلى القيمة ويستنتج آلياً أن النوع هو string:
let inferredString = "أحمد محمود"; 

// 2. المحرك ينظر إلى رقم 35 ويستنتج أن النوع هو number:
let inferredNumber = 35;

// =========================================================================
// 🚨 ماذا يحدث لو حاولنا خداعه لاحقاً؟
// =========================================================================
// inferredString = 100; 
// 🛑 صراخ VS Code الفوري: Type 'number' is not assignable to type 'string'!
// (رغم أننا لم نكتب `: string` أبداً! المحرك حفظ النوع من أول لحظة!)


// 3. استنتاج المصفوفات (Arrays):
// المحرك يرى أرقاماً ونصوصاً داخل المصفوفة، فيستنتج أن النوع هو خليط: (string | number)[]
let clinicScores = [10, 20, "ممتاز", 30, "جيد جداً"];

clinicScores.push(50);       // ✅ مقبول (رقم)
clinicScores.push("ضعيف");    // ✅ مقبول (نص)
// clinicScores.push(true);  // 🛑 مرفوض! لأن boolean ليس من ضمن الأنواع التي تم استنتاجها مسبقاً!


// 4. استنتاج إرجاع الدوال (Function Return Inference):
// المحرك يقرأ دالة الطرح ويعرف فوراً أن النتيجة ستكون رقماً، فيستنتج أن الدالة ترجع: number
function calculateLensDiscount(price: number, discount: number) {
  return price - discount; 
}

const finalPrice = calculateLensDiscount(200, 50);
// finalPrice الآن مختوم برمجياً بأنه number بدون أي تدخل منك! 🪄


// 5. استنتاج في React (أحداث - Events):
// المحرك يعرف أن onChange تابعة لـ input، فيستنتج نوع الحدث (e) مباشرة بدون كتابتك لـ React.ChangeEvent!
export function ExampleComponent() {
  return <input onChange={(e) => console.log(e.target.value)} placeholder="اكتب هنا..." />;
}
