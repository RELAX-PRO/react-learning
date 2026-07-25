# 📝 دليل المراجعة السريع: التعامل مع localStorage في React

> **الهدف:** حفظ بيانات التطبيق (مثل: الوضع الليلي، سلة المشتريات، الملاحظات) داخل متصفح المستخدم لكي لا تضيع عند عمل تحديث للصفحة (Refresh) أو إغلاق المتصفح.

---

## 1️⃣ القاعدة الذهبية الوحيدة (The String Rule) ⚠️
خزنة `localStorage` **لا تفهم إلا النصوص (Strings)**! 
* لا يمكنك حفظ كائن `{}` أو مصفوفة `[]` أو رقم مباشرة.
* **الحل:** 
  * عند **الحفظ (Write)** 👈 نغلف البيانات بـ `JSON.stringify(data)`
  * عند **القراءة (Read)** 👈 نفك التغليف بـ `JSON.parse(data)`

---

## 2️⃣ الأوامر الأربعة الأساسية في الذاكرة 🛠️

| الأمر (Method) | الوظيفة | مثال مباشر |
| :--- | :--- | :--- |
| **`setItem`** | إنشاء أو تحديث عنصر في الخزنة | `localStorage.setItem('key', JSON.stringify(val))` |
| **`getItem`** | قراءة عنصر من الخزنة | `JSON.parse(localStorage.getItem('key'))` |
| **`removeItem`** | حذف عنصر واحد محدد | `localStorage.removeItem('key')` |
| **`clear`** | تدمير ومسح كل شيء في الخزنة | `localStorage.clear()` |

---

## 3️⃣ الوصفة القياسية لربطها مع `useState` (The 2-Step Recipe) 🍳

لكي نربط أي State بالخزنة بدون كود زائد أو مشاكل أداء، نستخدم هذه الوصفة المكونة من خطوتين دائماً:

### الخطوة الأولى: القراءة عند التحميل (Lazy Initial State)
مرر **دالة `() =>`** داخل `useState` لكي يقرأ من المتصفح **مرة واحدة فقط** عند فتح الصفحة:

```javascript
const [data, setData] = useState(() => {
  const saved = localStorage.getItem('my_saved_data');
  return saved !== null ? JSON.parse(saved) : defaultValue;
});
```

### الخطوة الثانية: الحفظ عند التغيير (`useEffect` Syncing)
استخدم `useEffect` يراقب المتغير، ليعيد كتابة الخزنة تلقائياً في كل مرة تتغير فيها البيانات:
```javascript
useEffect(() => {
  localStorage.setItem('my_saved_data', JSON.stringify(data));
}, [data]); // 👈 المراقبة
 ```