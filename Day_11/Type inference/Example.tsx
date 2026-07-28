// 1. المحرك ينظر إلى القيمة "أحمد" ويستنتج آلياً أن النوع هو string:
let Example1 = "أحمد محمود"; 

// 2. المحرك ينظر إلى رقم 35 ويستنتج أن النوع هو number:
let Example2 = 35;

// =========================================================================
// 🚨 ماذا يحدث لو حاولنا خداعه لاحقاً؟
// =========================================================================
// @ts-ignore delete this line to see the error
Example1 = 100; 
// 🛑 صراخ VS Code الفوري: Type 'number' is not assignable to type 'string'!
// (رغم أننا لم نكتب : string أبداً! المحرك حفظ النوع من أول لمسة!)



// المحرك يرى أرقاماً ونصوصاً، فيستنتج أن النوع هو: (string | number)[]
let clinicScores = [10, 20, "ممتاز", 30, "جيد جداً"];

clinicScores.push(50);       // ✅ مقبول
clinicScores.push("ضعيف");    // ✅ مقبول
// @ts-ignore delete this line to see the error
clinicScores.push(true);     // 🛑 مرفوض! لأن boolean ليس من ضمن الأنواع المستنتجة!



// المحرك قرأ دالة الضرب وعرف فوراً أن النتيجة رقم، فاستنتج أن الدالة ترجع : number
function calculateLensDiscount(price: number, discount: number) {
  return price - discount; 
}

const finalPrice = calculateLensDiscount(200, 50);
// finalPrice الآن مختوم برمجياً بأنه number بدون أي تدخل منك! 🪄



// المحرك يعرف أن onChange تابعة لـ input، فيستنتج نوع e مباشرة بدون كتابة!
<input onChange={(e) => console.log(e.target.value)} />
