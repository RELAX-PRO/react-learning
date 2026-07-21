# 🎣 الدليل المرجعي الشامل لخطافات React (React Hooks Cheat Sheet)

هذا الدليل هو مرجعك السريع لاتخاذ القرار الهندسي الصحيح عند بناء مكونات React. لا تستخدم أي خطاف بدون سبب؛ ابدأ بالبسيط وانتقل للمعقد فقط عند وجود احتياج معماري حقيقي.

---

## 🧭 خوارزمية اتخاذ القرار السريع (أي خطاف أستخدم الآن؟)

1. **هل تريد تخزين بيانات تتغير وتجبر الشاشة على التحديث فوراً؟** 👈 `useState`
2. **هل لديك حالة معقدة مترابطة بـ 5 شروط وقوانين تحديث صارمة؟** 👈 `useReducer`
3. **هل تريد التحدث مع سيرفر، تشغيل مؤقت، أو الاستماع لحدث متصفح؟** 👈 `useEffect`
4. **هل تريد حفظ قيمة صامتة بالخلفية بدون Re-render، أو التحكم بوسم HTML مباشرة؟** 👈 `useRef`
5. **هل لديك بيانات عامة (Theme, Auth, Language) تريد بثها لأعمق مكون بدون Props؟** 👈 `useContext`
6. **هل لديك معادلة رياضية ثقيلة جداً (آلاف السجلات) تجعل الموقع يبطئ؟** 👈 `useMemo`
7. **هل تمرر دالة كمُدخل (Prop) لمكون ابن مغلف بـ `React.memo` وتريد حمايته من إعادة الرسم؟** 👈 `useCallback`

---

## 1. `useState` — الذاكرة التفاعلية (Reactive UI Memory)

### 💡 لماذا نستخدمه؟
لتخزين المتغيرات البسيطة التي يراها المستخدم على الشاشة. أي تعديل على هذه الذاكرة يُطلق إنذاراً يجبر المكون على **إعادة الرسم (Re-render)** لعرض القيمة الجديدة.

### 🛠️ كيف نستخدمه؟
```javascript
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // Use functional update when the new value depends on the previous one
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return <button onClick={handleIncrement}>Count: {count}</button>;
};
```

### 🛑 متى نتجنبه؟
* لا تستخدمه لحفظ بيانات سرية أو مؤقتات في الخلفية لا يحتاج المستخدم لرؤيتها (استخدم `useRef` بدلاً منه).
* لا تستخدمه للحسابات البسيطة المشتقة من الـ Props (مثلاً: `const fullName = firstName + lastName` لا يحتاج لخطاف).

---

## 2. `useEffect` — إدارة التأثيرات الجانبية (Side Effects & Lifecycle)

### 💡 لماذا نستخدمه؟
لتنفيذ مهام تقع **خارج حدود المكون** (مثل جلب بيانات من API، تشغيل مؤقتات، أو إضافة Listeners للمتصفح). يعمل هذا الخطاف **بعد** أن يستقر رسم الشاشة تماماً لكي لا يسبب بطئاً للمستخدم.

### 🛠️ كيف نستخدمه؟
```javascript
import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. The Setup (Action)
    const controller = new AbortController();
    
    fetch(`[https://api.example.com/users/$](https://api.example.com/users/$){userId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(userData => setData(userData));

    // 2. The Cleanup Function (Runs before component unmounts or before re-running the effect)
    return () => {
      controller.abort();
    };
  }, [userId]); // 3. Dependency Array: Re-run ONLY when userId changes

  return <div>{data ? data.name : "Loading..."}</div>;
};
```

### 🛑 متى نتجنبه؟
* لا تستخدمه لمعالجة وتعديل بيانات موجودة أصلاً في الشاشة (تجنب الـ State التابعة التي تسبب Re-render متكرر).

---

## 3. `useContext` — البث اللاسلكي للبيانات (Global State Broadcasting)

### 💡 لماذا نستخدمه؟
للتخلص من كابوس **Prop Drilling** (تمرير الخصائص عبر 5 أسطح من المكونات الوسيطة التي لا تحتاجها). يعمل كمحطة راديو تبث البيانات من قمة التطبيق لأي مكون يلتقطها في العمق.

### 🛠️ كيف نستخدمه؟
```javascript
import React, { createContext, useContext, useState } from 'react';

// 1. Create Channel
export const AuthContext = createContext();

// 2. Broadcaster (Provider at the top level)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Majed", role: "Admin" });
  return <AuthContext.Provider setUser user, value="{{" }}>{children}</AuthContext.Provider>;
};

// 3. Receiver (Consumer Hook at the deepest level)
const DeepUserBadge = () => {
  const { user } = useContext(AuthContext);
  return <span>Logged in as: {user.name}</span>;
};
```

### 🛑 متى نتجنبه؟
* لا تضع فيه بيانات سريعة التغير (مثل حركة الماوس أو عداد ثوانٍ)؛ لأن أي تغير في القناة يجبر **كل المكونات المتصلة بها** على إعادة الرسم فوراً!

---

## 4. `useRef` — الخزنة الصامتة والسيطرة على الـ DOM (Silent Vault & DOM Access)

### 💡 لماذا نستخدمه؟
له قوتان خارقتان:
1. **الذاكرة الصامتة:** تخزين أرقام المؤقتات (Timer IDs) أو المتغيرات دون إطلاق إنذار إعادة الرسم (No Re-render).
2. **السيطرة على الـ DOM:** الوصول المباشر لعناصر HTML (مثل وضع التركيز Focus على حقل كتابة أو التمرير البرمجّي Scroll).

### 🛠️ كيف نستخدمه؟
```javascript
import React, { useRef, useEffect } from 'react';

const SilentTimerAndFocus = () => {
  const inputRef = useRef(null);    // For DOM element
  const timerIdRef = useRef(null);  // For silent background storage

  useEffect(() => {
    // Direct DOM manipulation
    inputRef.current.focus();

    // Storing timer ID silently without triggering Re-renders
    timerIdRef.current = setInterval(() => {
      console.log("Background tick...");
    }, 1000);

    return () => clearInterval(timerIdRef.current);
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused input!" />;
};
```

### 🛑 متى نتجنبه؟
* لا تستخدم قيمة `myRef.current` أبداً لعرض نص أو رقم على الشاشة؛ لأن التعديل عليها صامت ولا يحدّث واجهة المستخدم!

---

## 5. `useMemo` — ثلاجة نتائج الحسابات (Calculation Result Caching)

### 💡 لماذا نستخدمه؟
لتحسين الأداء عبر **حفظ نتيجة (Cache the Result)** عملية رياضية أو برمجية معقدة جداً ومجهدة للمعالج (CPU). يمنع إعادة حساب المعادلة عند كل Re-render للمكون ما لم تتغير المدخلات الفعلية.

### 🛠️ كيف نستخدمه؟
```javascript
import React, { useState, useMemo } from 'react';

const HeavyAnalytics = ({ patientsList, filterQuery }) => {
  const [theme, setTheme] = useState("dark");

  // React caches this RESULT and skips calculation if theme changes
  const complexStats = useMemo(() => {
    console.log("🐌 Heavy CPU processing...");
    return patientsList.filter(p => p.diagnosis.includes(filterQuery)).length;
  }, [patientsList, filterQuery]); // Only recalculate if these change

  return (
    <div className={theme}>
      <button onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}>Toggle Theme</button>
      <p>Filtered Patients Count: {complexStats}</p>
    </div>
  );
};
```

### 🛑 متى نتجنبه؟
* **ممنوع استخدامه للعمليات البسيطة** (مثل `a + b` أو `.map` لقائمة قصيرة). عملية حفظ النتيجة في الكاش ومقارنة المصفوفة تستهلك من المتصفح ذاكرة ووقت أكبر من حساب المعادلة البسيطة نفسها!

---

## 6. `useCallback` — تجميد مراجع الدوال (Function Reference Caching)

### 💡 لماذا نستخدمه؟
في JavaScript، الدوال تُخلق من الصفر بعناوين ذاكرة جديدة (New References) مع كل Re-render. هذا الخطاف **يجمد عنوان الدالة في الذاكرة (Cache the Function Definition)** لكي لا يتغير المرجع ويربك المكونات الأبناء.

### 🛠️ كيف نستخدمه؟
```javascript
import React, { useState, useCallback } from 'react';

// Child must be wrapped in React.memo for useCallback to be effective!
const PureChildButton = React.memo(({ onClick, label }) => {
  console.log(`Rendering child: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Freezing the function reference in RAM
  const memoizedHandler = useCallback(() => {
    console.log("Action triggered!");
  }, []); // Empty array = reference NEVER changes across re-renders

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Parent Re-render ({count})</button>
      
      {/* Child will NOT re-render because memoizedHandler reference is identical */}
      <PureChildButton label="Optimized Child" onClick="{memoizedHandler}"/>
    </div>
  );
};
```

### 🛑 متى نتجنبه؟
* لا تستخدمه أبداً إذا كنت تمرر الدالة لوسم HTML عادي مثل `<button>` أو لمكون ابن **غير مغلف بـ `React.memo`**؛ لأنه سيكون تعباً فارغاً واستهلاكاً مجانياً للذاكرة بدون أي فائدة!

---

## 7. `useReducer` — المحاسب المركزي للحالات المعقدة (Complex State Architecture)

### 💡 لماذا نستخدمه؟
الفرع المتقدم من `useState`. يُستخدم عندما تكون لديك **حالة معقدة تحتوي على خصائص مترابطة** (مثل نموذج فحص طبي فيه حالات تحميل، أخطاء، وبيانات متداخلة)، وتعتمد القيمة الجديدة على القيمة السابقة وفق قوانين صارمة.

### 🛠️ كيف نستخدمه؟
```javascript
import React, { useReducer } from 'react';

// 1. Initial State
const initialState = { isRunning: false, time: 0, error: null };

// 2. The Reducer (Pure function enforcing business logic)
const timerReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { isRunning: true, time: 0, error: null };
    case 'TICK':
      return state.isRunning ? { ...state, time: state.time + 1 } : state;
    case 'STOP':
      return { ...state, isRunning: false };
    default:
      return state;
  }
};

// 3. The Component
const ExamTimer = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  return (
    <div>
      <p>Time: {state.time}s | Status: {state.isRunning ? "Running" : "Stopped"}</p>
      <button onClick={() => dispatch({ type: 'START' })}>Start</button>
      <button onClick={() => dispatch({ type: 'TICK' })}>Tick</button>
      <button onClick={() => dispatch({ type: 'STOP' })}>Stop</button>
    </div>
  );
};
```

### 🛑 متى نتجنبه؟
* لا تستخدمه للمتغيرات الفردية البسيطة (مثل زر فتح وإغلاق قائمة `true/false`)؛ سيكون الكود طويلاً ومعقداً بدون مبرر (Boilerplate).

---

## 📊 جدول المقارنة السريعة (Cheat Sheet Table)

| اسم الخطاف | الوظيفة الأساسية | يسبب Re-render؟ | الاستخدام الأمثل |
| :--- | :--- | :--- | :--- |
| **`useState`** | حفظ البيانات المرئية | نعم (عند التعديل) | أي بيانات تريد عرضها على الشاشة وتحديثها بحرية. |
| **`useEffect`** | التأثيرات الخارجية | لا (هو نتيجة للرسم) | التحدث مع السيرفر (API)، المؤقتات، أحداث المتصفح. |
| **`useContext`** | البث العام للبيانات | نعم (لكل المستمعين) | الثيم (Theme)، حساب المستخدم (Auth)، لغة واجهة التطبيق. |
| **`useRef`** | الذاكرة الصامتة والـ DOM | **لا نهائياً** | التركيز على حقل (Focus)، حفظ معرف مؤقت (Timer ID). |
| **`useMemo`** | كاش لـ **نتيجة حسابية** | لا | فرز أو فلترة آلاف السجلات التي تبطئ أزرار المكون. |
| **`useCallback`** | كاش لـ **مرجع دالة** | لا | تمرير دالة لمكون ابن مغلف بـ `React.memo`. |
| **`useReducer`** | إدارة حالة معقدة بشروط | نعم (عند الـ Dispatch) | نماذج البيانات الكبيرة، شاشات التحكم ذات الحالات المترابطة. |