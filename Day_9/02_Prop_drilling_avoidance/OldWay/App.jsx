/*
  =============================================================================
  BLOCK COMMENT: Anti-Pattern - Prop Drilling (The "Old Way")
  =============================================================================
  This file demonstrates the problem known as "Prop Drilling". 
  `App` has `doctorData`, but it needs to go all the way down to a component 
  inside `Sidebar`. Because we aren't using Slots or Context here, we must 
  pass `doctorData` through `MainLayout`, even though `MainLayout` doesn't 
  use this data for anything other than passing it down further.
  =============================================================================
*/

const App = () => {
  const doctor = { name: "Dr. Ahmed", role: "ADMIN" };
  // Inline Comment: Passing data to an intermediate component (MainLayout)
  return <MainLayout doctorData={doctor} />;
};

const MainLayout = ({ doctorData }) => {
  // Inline Comment: MainLayout passes it down again to Sidebar (Prop Drilling)
  return <Sidebar doctorData={doctorData} />;
};