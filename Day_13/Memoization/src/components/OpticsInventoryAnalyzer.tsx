// =========================================================================
// File: src/components/OpticsInventoryAnalyzer.tsx
// Description: Enterprise Memoization Architecture in Next.js
// =========================================================================
import React, { useState, useMemo, useCallback } from 'react';

export interface OpticsItem {
  readonly id: string;
  readonly brand: string;
  readonly category: "LENS" | "FRAME" | "ACCESSORY";
  readonly priceUSD: number;
  readonly inStock: boolean;
}

// =========================================================================
// 1. COMPONENT MEMOIZATION (React.memo)
// مكون ابن يعرض إحصائية سريعة؛ غلفناه بـ React.memo حتى لا يعيد رسم نفسه
// إلا إذا تغيرت الأرقام الفعلية الممررة إليه!
// =========================================================================
interface StatCardProps {
  readonly label: string;
  readonly value: number | string;
  readonly onCardClick: () => void;
}

const StatCard = React.memo(({ label, value, onCardClick }: StatCardProps) => {
  console.log(`🎨 [Render]: تم رسم بطاقة الإحصائية: ${label}`);
  return (
    <div 
      onClick={onCardClick}
      className="p-4 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-cyan-500 transition"
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-bold text-cyan-400 mt-1">{value}</p>
    </div>
  );
});

StatCard.displayName = "StatCard"; // يسهل قراءة المكون في أدوات React DevTools

// =========================================================================
// المكون الأب الرئيسي لشاشة المخزون
// =========================================================================
interface Props {
  readonly initialInventory: OpticsItem[];
}

export const OpticsInventoryAnalyzer = ({ initialInventory }: Props) => {
  // حالة البحث السريع (تتغير مع كل حرف يكتبه المستخدم)
  const [searchTerm, setSearchTerm] = useState("");
  // حالة تبديل العملة للعرض فقط
  const [isEuro, setIsEuro] = useState(false);

  // =========================================================================
  // 2. COMPUTATION MEMOIZATION (useMemo)
  // فلترة آلاف القطع عملية ثقيلة؛ لا نريد إعادة تنفيذها عندما يضغط المستخدم
  // على زر تغيير العملة (isEuro)، بل فقط عندما يتغير searchTerm أو المخزون!
  // =========================================================================
  const filteredInventory = useMemo(() => {
    console.log("🧮 [Heavy Computation]: جاري فلترة قائمة المخزون الضخمة...");
    return initialInventory.filter((item) =>
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialInventory, searchTerm]);

  // حساب مجموع الأسعار للمنتجات المفلترة (عملية تجميعية محمية بـ useMemo)
  const totalInventoryValueUSD = useMemo(() => {
    return filteredInventory.reduce((sum, item) => sum + item.priceUSD, 0);
  }, [filteredInventory]);

  // =========================================================================
  // 3. FUNCTION REFERENCE MEMOIZATION (useCallback)
  // هذه الدالة نمررها للمكون الابن (StatCard) المحمي بـ React.memo؛
  // لو لم نستخدم useCallback، لانكسر الـ memo وأعيد رسم البطاقة في كل حرف نكتبه!
  // =========================================================================
  const handleStatClick = useCallback(() => {
    alert(`إجمالي عدد المنتجات المعروضة حالياً: ${filteredInventory.length}`);
  }, [filteredInventory.length]);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl font-mono text-white space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h2 className="text-cyan-400 font-bold">🏢 إدارة مخزون متجر البصريات</h2>
        <button
          type="button"
          onClick={() => setIsEuro(!isEuro)}
          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-amber-300 transition"
        >
          تبديل العملة: {isEuro ? "EUR €" : "USD $"}
        </button>
      </div>

      {/* حقل البحث السريع */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="ابحث عن ماركة الإطار أو العدسة (مثلاً: Ray-Ban, Zeiss)..."
          className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* المكونات الأبناء المحمية بالـ Memo */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          label="عدد العناصر المتطابقة"
          value={filteredInventory.length}
          onCardClick={handleStatClick}
        />
        <StatCard
          label="إجمالي قيمة المخزون"
          value={isEuro ? `€${(totalInventoryValueUSD * 0.92).toFixed(1)}` : `$${totalInventoryValueUSD}`}
          onCardClick={handleStatClick}
        />
      </div>

      {/* قائمة المنتجات المفلترة */}
      <div className="space-y-2 border-t border-slate-800 pt-4 max-h-48 overflow-y-auto">
        {filteredInventory.map((item) => (
          <div key={item.id} className="p-2.5 bg-slate-950 rounded flex justify-between items-center text-xs border border-slate-800/80">
            <span>{item.brand} <code className="text-slate-500">({item.category})</code></span>
            <span className="text-emerald-400 font-bold">${item.priceUSD}</span>
          </div>
        ))}
      </div>
    </div>
  );
};