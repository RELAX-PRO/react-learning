// Ù ÙŠ Ø´Ø§Ø´Ø© Ù…Ù„Ù  Ø§Ù„Ù…Ø±ÙŠØ¶ Ø§Ù„Ø£Ø¨ (PatientProfileLayout):
import { useLocation } from 'react-router-dom';

/**
 * PatientProfileLayout Component
 * Demonstrates how to access hidden state passed during programmatic navigation.
 * Uses the useLocation hook to retrieve state (e.g., success messages)
 * sent from the navigate function in PatientCheckoutWizard.
 */
const PatientProfileLayout = () => {
  // ÙŠØ³Ø­Ø¨ ÙƒØ§Ø¦Ù† Ø§Ù„Ù…ÙˆÙ‚Ø¹ØŒ ÙˆÙ…Ù†Ù‡ Ù†Ù‚Ø±Ø£ Ø§Ù„Ù€ state Ø§Ù„Ù…Ø®Ù ÙŠ:
  const location = useLocation();
  const successMessage = location.state?.message; // "Invoice of $150.00 paid successfully!"

  return (
    <div>
      {/* Ø¥Ø°Ø§ ÙƒØ§Ù† Ù‡Ù†Ø§Ùƒ Ø±Ø³Ø§Ù„Ø© Ù†Ø¬Ø§Ø­ Ù‚Ø§Ø¯Ù…Ø© Ù ÙŠ Ø§Ù„Ø°Ø§ÙƒØ±Ø©ØŒ Ø§Ø¹Ø±Ø¶Ù‡Ø§ ÙƒØ´Ø±ÙŠØ· Ø£Ø®Ø¶Ø± Ø¹Ù„ÙˆÙŠ! */}
      {successMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-4 rounded-xl mb-4 font-mono text-xs">
          ðŸŽ‰ {successMessage}
        </div>
      )}
      {/* ... Ø¨Ø§Ù‚ÙŠ ØªØµÙ…ÙŠÙ… Ø´Ø§Ø´Ø© Ø§Ù„Ù…Ø±ÙŠØ¶ ... */}
    </div>
  );
};

