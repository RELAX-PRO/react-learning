const App = () => {
  const doctor = { name: "Dr. Ahmed", role: "ADMIN" };
  return <MainLayout doctorData={doctor} />;
};

const MainLayout = ({ doctorData }) => {
  return <Sidebar doctorData={doctorData} />;
};