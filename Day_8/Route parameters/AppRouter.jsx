// في ملف شجرة التوجيه:
<Routes>
  {/* مسار ثابت عادي لجلب كل المرضى */}
  <Route path="/patients" element={<PatientsVault />} />

  {/* مسار ديناميكي يحتوي على متغيرين: رقم المريض ورقم زيارة الفحص! */}
  <Route path="/patients/:patientId/visits/:visitId" element={<DynamicVisitViewer />} />
</Routes>