/*
  =============================================================================
  BLOCK COMMENT: LocalStorage Persistence
  =============================================================================
  `localStorage` allows you to save string-based key-value pairs in the browser 
  with no expiration date. The data will remain even after the user closes the 
  browser or restarts the computer. We combine it with `useState` and `useEffect` 
  to automatically read the saved note on the initial load and write it back 
  whenever it changes.
  =============================================================================
*/
import React, { useState, useEffect } from 'react';

const DoctorQuickNote = () => {
  // Lazy initialization reads from localStorage only on the first render.
  const [note, setNote] = useState(() => {
    // Inline Comment: Fetch existing value synchronously from localStorage
    const savedNote = localStorage.getItem('doctor_quick_note');
    // If a note already exists, restore it; otherwise start empty.
    return savedNote !== null ? JSON.parse(savedNote) : "";
  });

  // Save the note again whenever its value changes.
  useEffect(() => {
    // Inline Comment: Synchronize React state to LocalStorage (must be a string!)
    localStorage.setItem('doctor_quick_note', JSON.stringify(note));
  }, [note]); // The dependency array keeps this effect tied to note changes only.

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono max-w-md mx-auto">
      <h3 className="text-cyan-400 font-bold mb-3">📌 مفكرة الطبيب (حفظ تلقائي)</h3>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="اكتب ملاحظة سريعة هنا... ستُحفظ تلقائياً في حاسوبك!"
        className="w-full h-32 p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
      />

      <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
        <span>💾 محمي وحي في localStorage</span>
        {/* Clear the stored note from React state and localStorage on the next render. */}
        <button
          onClick={() => setNote("")}
          className="text-red-400 hover:underline cursor-pointer"
        >
          🗑️ مسح الملاحظة
        </button>
      </div>
    </div>
  );
};

export default DoctorQuickNote;