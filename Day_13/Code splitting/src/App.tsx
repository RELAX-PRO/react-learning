// =========================================================================
// File: src/App.tsx
// Description: Manual Route-Level Code Splitting in Pure React (Vite)
// =========================================================================
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// ❌ الاستيراد الكارثي (يدمج كل الصفحات في ملف واحد عملاق):
// import { OpticsPOSView } from './pages/OpticsPOSView';
// import { AdminReportsView } from './pages/AdminReportsView';

// ✅ الاستيراد المعماري الذكي (Code Splitting):
// نخبر محرك Vite: "اقطع هذه الصفحات في ملفات chunks منفصلة، ولا تحملها الآن!"
const OpticsPOSView = lazy(() => import('./pages/OpticsPOSView'));
const AdminReportsView = lazy(() => import('./pages/AdminReportsView'));

export const App = () => {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-slate-900 text-white flex gap-4">
        <Link to="/pos">نقطة البيع 🛒</Link>
        <Link to="/reports">التقارير المالية 📊</Link>
      </nav>

      {/* 
        Suspense هو الجدار الواقي!
        بما أن صفحة التقارير مقطوعة وغير موجودة في الذاكرة،
        عندما نضغط عليها، سيستغرق جلبها من الإنترنت ميلي ثوانٍ.
        في هذا الوقت، Suspense سيعرض شاشة التحميل (fallback) حتى لا ينفجر التطبيق!
      */}
      <Suspense fallback={<div className="p-10 text-cyan-500 font-bold animate-pulse">⏳ جاري تحميل الشاشة من السيرفر...</div>}>
        <Routes>
          {/* لن يتم تحميل كود صفحة الـ POS إلا عند زيارة الرابط /pos */}
          <Route path="/pos" element={<OpticsPOSView />} />
          
          {/* لن يتم تحميل مكتبات الرسوم البيانية الثقيلة إلا عند زيارة /reports */}
          <Route path="/reports" element={<AdminReportsView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};