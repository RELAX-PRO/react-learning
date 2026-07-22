// في شاشة ملف المريض الأب (PatientProfileLayout):
import { useLocation } from 'react-router-dom';

const PatientProfileLayout = () => {
  // يسحب كائن الموقع، ومنه نقرأ الـ state المخفي:
  const location = useLocation();
  const successMessage = location.state?.message; // "Invoice of $150.00 paid successfully!"

  return (
    <div>
      {/* إذا كان هناك رسالة نجاح قادمة في الذاكرة، اعرضها كشريط أخضر علوي! */}
      {successMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-4 rounded-xl mb-4 font-mono text-xs">
          🎉 {successMessage}
        </div>
      )}
      {/* ... باقي تصميم شاشة المريض ... */}
    </div>
  );
};