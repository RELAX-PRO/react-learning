# Session Storage

> **💡 How to Imagine This:**
> Think of SessionStorage like a whiteboard in a meeting room. You can write all the temporary notes you want during the meeting, but the moment the meeting is over and everyone leaves (the tab is closed), the whiteboard gets wiped clean.


This folder explains temporary browser storage that survives refresh but not tab closure.

## What to learn

- Session-scoped persistence
- When it is better than localStorage

## Practice checklist

- Save one temporary value# 📑 دليل المراجعة السريع: التعامل مع sessionStorage في React

> **الهدف:** حفظ البيانات المؤقتة والحساسة (مثل: مسودة نموذج يتم تعبئته الآن، خطوات دفع إلكتروني) خلال **جلسة التبويب الحالي فقط** لضمان الأمان وعزل التبويبات عن بعضها.

---

## 1️⃣ الفرق الحاسم بين الخزنتين في المتصفح ⚖️

| وجه المقارنة | `localStorage` | `sessionStorage` |
| :--- | :--- | :--- |
| **عند عمل تحديث (`F5`)** | 🟢 تبقى البيانات | 🟢 تبقى البيانات |
| **عند إغلاق التبويب (Tab)** | 🟢 تبقى للأبد | 🔴 **تُمسح فوراً وتتبخر** |
| **فتح نفس الموقع في تبويبين** | 🟢 التبويبان يتشاركان نفس البيانات | 🔴 **كل تبويب له غرفة معزولة تماماً** |

---

## 2️⃣ الأوامر الأربعة القياسية 🛠️

نفس الدوال بالضبط، فقط نغير اسم الكائن إلى `sessionStorage`:

| الأمر (Method) | الوظيفة | مثال مباشر |
| :--- | :--- | :--- |
| **`setItem`** | حفظ أو تحديث بيانات في التبويب | `sessionStorage.setItem('key', JSON.stringify(val))` |
| **`getItem`** | قراءة البيانات من التبويب | `JSON.parse(sessionStorage.getItem('key'))` |
| **`removeItem`** | حذف عنصر محدد من التبويب | `sessionStorage.removeItem('key')` |
| **`clear`** | مسح كل ذاكرة التبويب الحالي | `sessionStorage.clear()` |

---

## 3️⃣ الوصفة القياسية (The 2-Step Recipe) 🍳

### الخطوة الأولى: القراءة عند التحميل (Lazy Initialization)
```javascript
const [data, setData] = useState(() => {
  const saved = sessionStorage.getItem('my_session_key');
  return saved !== null ? JSON.parse(saved) : initialValue;
});
```

### الخطوة الثانية: الحفظ الآمن في الخلفية (`useEffect`)

لماذا `useEffect؟` لمنع شلل المتصفح وبطء الواجهة، ولضمان الحفظ فقط عند تغير القيمة فعلياً:
```javascript
useEffect(() => {
  sessionStorage.setItem('my_session_key', JSON.stringify(data));
}, [data]); // 👈 مصفوفة المراقبة (الحارس الذكي)
```

