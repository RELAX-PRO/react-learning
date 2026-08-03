/**
 * Route Configuration Snippet
 * This snippet demonstrates how to define static and dynamic routes.
 * Static routes match a specific path exactly.
 * Dynamic routes use a colon (:) to define parameters that can be extracted later.
 */
// Ù ÙŠ Ù…Ù„Ù  Ø´Ø¬Ø±Ø© Ø§Ù„ØªÙˆØ¬ÙŠÙ‡:
<Routes>
  {/* Ù…Ø³Ø§Ø± Ø«Ø§Ø¨Øª Ø¹Ø§Ø¯ÙŠ Ù„Ø¬Ù„Ø¨ ÙƒÙ„ Ø§Ù„Ù…Ø±Ø¶Ù‰ */}
  <Route path="/patients" element={<PatientsVault />} />

  {/* Ù…Ø³Ø§Ø± Ø¯ÙŠÙ†Ø§Ù…ÙŠÙƒÙŠ ÙŠØ­ØªÙˆÙŠ Ø¹Ù„Ù‰ Ù…ØªØºÙŠØ±ÙŠÙ†: Ø±Ù‚Ù… Ø§Ù„Ù…Ø±ÙŠØ¶ ÙˆØ±Ù‚Ù… Ø²ÙŠØ§Ø±Ø© Ø§Ù„Ù Ø­Øµ! */}
  <Route path="/patients/:patientId/visits/:visitId" element={<DynamicVisitViewer />} />
</Routes>

