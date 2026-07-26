// Ø¯Ø§Ø®Ù„ Ø´Ø±ÙŠØ· Ø§Ù„Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø¬Ø§Ù†Ø¨ÙŠØ© (Sidebar):
const user = JSON.parse(localStorage.getItem('optical_vault_user') || '{}');

return (
  <nav className="space-y-2">
    {/* Ø±ÙˆØ§Ø¨Ø· Ø¹Ø§Ù…Ø© ØªØ¸Ù‡Ø± Ù„Ù„Ø¬Ù…ÙŠØ¹ */}
    <NavLink to="/" className="...">ðŸ“Š Ø§Ù„Ù„ÙˆØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©</NavLink>
    <NavLink to="/patients" className="...">ðŸ—‚ï¸ Ø³Ø¬Ù„Ø§Øª Ø§Ù„Ù…Ø±Ø¶Ù‰</NavLink>

    {/* ðŸ›¡ï¸ Ø¥Ø®ÙØ§Ø¡ Ø°ÙƒÙŠ: Ù‡Ø°Ø§ Ø§Ù„Ø±Ø§Ø¨Ø· Ù„Ø§ ÙŠÙØ±Ø³Ù… ÙÙŠ Ø§Ù„Ù€ HTML Ø£ØµÙ„Ø§Ù‹ Ø¥Ù„Ø§ Ø¥Ø°Ø§ ÙƒØ§Ù† Ø§Ù„Ù…Ø¯ÙŠØ± Ù‡Ùˆ Ø§Ù„Ø¯Ø§Ø®Ù„! */}
    {(user.role === 'ADMIN' || user.role === 'DOCTOR') && (
      <NavLink to="/settings" className="border-t border-slate-800 pt-2 text-amber-400">
        âš™ï¸ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø¹ÙŠØ§Ø¯Ø© ÙˆØ§Ù„Ø­Ø³Ø§Ø¨Ø§Øª
      </NavLink>
    )}
  </nav>
);

