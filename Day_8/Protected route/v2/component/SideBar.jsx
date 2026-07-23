// داخل شريط القائمة الجانبية (Sidebar):
const user = JSON.parse(localStorage.getItem('optical_vault_user') || '{}');

return (
  <nav className="space-y-2">
    {/* روابط عامة تظهر للجميع */}
    <NavLink to="/" className="...">📊 اللوحة الرئيسية</NavLink>
    <NavLink to="/patients" className="...">🗂️ سجلات المرضى</NavLink>

    {/* 🛡️ إخفاء ذكي: هذا الرابط لا يُرسم في الـ HTML أصلاً إلا إذا كان المدير هو الداخل! */}
    {(user.role === 'ADMIN' || user.role === 'DOCTOR') && (
      <NavLink to="/settings" className="border-t border-slate-800 pt-2 text-amber-400">
        ⚙️ إعدادات العيادة والحسابات
      </NavLink>
    )}
  </nav>
);