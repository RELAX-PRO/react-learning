// =========================================================================
// File: src/components/OptometryStatsWidget.tsx
// Description: Mastering TypeScript Inference in modern Next.js
// =========================================================================
import React, { useState } from 'react';

// 1. Mandatory Explicit Contract for complex domain data
interface DailyStats {
  totalPatients: number;
  totalRevenueUSD: number;
  topLensBrand: string;
}

export const OptometryStatsWidget = () => {
  // 2. SMART INFERENCE: TS infers string and boolean automatically! (No < > needed)
  const [clinicName, setClinicName] = useState("عيادة يُسر للبصريات");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 3. EXPLICIT INTERVENTION: We must specify the interface here because initial state is null
  const [stats, setStats] = useState<DailyStats | null>({
    totalPatients: 14,
    totalRevenueUSD: 1850,
    topLensBrand: "Crizal Blue"
  });

  // 4. FUNCTION RETURN INFERENCE: TS infers this function returns a string
  const getStatusBadge = (revenue: number) => {
    if (revenue > 1500) return "🔥 يوم ممتاز";
    if (revenue > 800) return "⚡ يوم طبيعي";
    return "😴 يوم هادئ";
  };

  // 5. CONTEXTUAL INFERENCE inside the filter/map callbacks
  const recentInvoices = [120, 300, 85, 450, 210]; // Infers number[]
  const highValueInvoices = recentInvoices.filter((val) => val > 200); // Infers val is number!

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-white font-mono shadow-2xl space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h3 className="text-cyan-400 font-extrabold text-sm">{clinicName}</h3>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded text-amber-300">
          {stats ? getStatusBadge(stats.totalRevenueUSD) : "جاري التحميل..."}
        </span>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <p className="text-slate-500 mb-1">عدد المرضى:</p>
            <p className="text-lg font-bold text-slate-200">{stats.totalPatients} 👤</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <p className="text-slate-500 mb-1">إجمالي الدخل:</p>
            <p className="text-lg font-bold text-emerald-400">${stats.totalRevenueUSD}</p>
          </div>
        </div>
      )}

      <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-lg border border-dashed border-slate-800">
        <span className="text-slate-500">الفواتير المرتفعة (&gt;$200): </span>
        <code className="text-cyan-300 font-bold">{highValueInvoices.join("$, ")}$</code>
      </div>
    </div>
  );
};