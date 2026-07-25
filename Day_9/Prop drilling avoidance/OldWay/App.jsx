// في الطابق الأول: App.jsx
const App = () => {
  const doctor = { name: "Dr. Ahmed", role: "ADMIN" };
  // نمرر المتغير كحزمة مزعجة عبر الطابق الثاني:
  return <MainLayout doctorData={doctor} />;
};

// في الطابق الثاني: MainLayout.jsx (مكون وسيط لا يحتاج البيانات!)
const MainLayout = ({ doctorData }) => {
  // يمررها مجدداً للطابق الثالث... يا للعناء!
  return <Sidebar doctorData={doctorData} />;
};