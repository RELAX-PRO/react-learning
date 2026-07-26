# IndexedDB

> **💡 How to Imagine This:**
> Imagine a heavy-duty industrial warehouse. It is slightly more complex to navigate, but it allows you to store massive amounts of heavy, structured cargo (data) directly on the client side.


This folder introduces browser-side structured storage for larger offline data.

## What to learn

- Why IndexedDB is more powerful than key-value storage
- When to use it for larger data sets

## Practice checklist

- Describe one use case for offline storage# 🐘 دليل المراجعة السريع: التعامل مع `IndexedDB` في React (عبر idb-keyval)

> **الهدف:** حفظ البيانات الضخمة جداً (آلاف السجلات، ملفات PDF، صور الأشعة، العمل بدون إنترنت Offline-First) داخل المتصفح بأمان وسرعة، دون تجميد الشاشة أو الاصطدام بحدود المساحة.

---

## 1️⃣ لماذا نحتاج هذه الخزنة العملاقة؟ (مقارنة حاسمة) ⚖️

| وجه المقارنة | `localStorage` | `IndexedDB` (عبر `idb-keyval`) |
| :--- | :--- | :--- |
| **المساحة القصوى** | ~5 ميغابايت فقط (تنفجر بسرعة) | **مئات الميغابايتات (شبه غير محدودة)** |
| **نوع البيانات المقبولة** | نصوص فقط (`Strings`) | **أي شيء! (مصفوفات، كائنات، صور، ملفات)** |
| **تغليف JSON** | إجباري (`stringify` / `parse`) | **غير مطلوب نهائياً!** |
| **تأثيرها على المتصفح** | متزامنة (تجمد الشاشة في البيانات الكبيرة) | **غير متزامنة (Async تعمل بالخلفية بسلاسة)** |

---

## 2️⃣ الأوامر الأساسية (عبر مكتبة `idb-keyval`) 🛠️

بما أن الخزنة تعمل في الخلفية، كل أوامرها تسبقها كلمة **`await`** (أو `.then`):

| الأمر (Method) | الوظيفة | مثال مباشر |
| :--- | :--- | :--- |
| **`set`** | حفظ أي نوع من البيانات مباشرة | `await set('key', myObjectOrFile)` |
| **`get`** | قراءة البيانات كما حُفظت بالضبط | `const data = await get('key')` |
| **`del`** | حذف عنصر محدد من الخزنة | `await del('key')` |
| **`clear`** | تنظيف الخزنة بالكامل | `await clear()` |

---

## 3️⃣ الوصفة القياسية مع React (The Async Recipe) 🍳

لأن `IndexedDB` تعمل في الخلفية (Asynchronous)، لا يمكننا قراءتها مباشرة داخل دالة `useState`. بدلاً من ذلك، نبدأ بقيمة فارغة، ثم نقرأ الخزنة داخل `useEffect`:

### الخطوة الأولى: القراءة بالخلفية عند التحميل
```javascript
const [data, setData] = useState([]); // 1. نبدأ ببيانات فارغة

useEffect(() => {
  const loadData = async () => {
    const saved = await get('my_heavy_data'); // 2. نقرأ من الخزنة
    if (saved) setData(saved); // 3. نحدث الشاشة عند انتهاء الجلب
  };
  loadData();
}, []);
```

### الخطوة الثانية: الحفظ بالخلفية عند التعديل
```javascript
const handleSave = async (newData) => {
  setData(newData); // 1. نحدث الشاشة فوراً لسرعة الاستجابة
  await set('my_heavy_data', newData); // 2. نحفظ في الخزنة بصمت في الخلفية
};
```

## 4️⃣ القاعدة الذهبية للمطور الخبير 🧠
لا تستخدم `IndexedDB` للأشياء البسيطة مثل الوضع الليلي أو اسم المستخدم (استخدم `localStorage` لها). احتفظ بـ `IndexedDB` للبيانات الثقيلة والمصفوفات الضخمة وتطبيقات الـ Offline!