// =========================================================================
// File: src/components/OptometryPatientSearch.tsx
// Description: Keyboard-accessible search form for optical clinics
// =========================================================================
/**
 * ==========================================
 * UNDERLYING MECHANICS: FORM HANDLING & EVENTS
 * ==========================================
 * React uses synthetic events to wrap native browser events, ensuring cross-browser consistency.
 * Form submission is handled by intercepting the `onSubmit` event and calling `e.preventDefault()`.
 * Controlled inputs are bound to state (`value={query}`) and updated via `onChange`.
 */
import React, { useState } from 'react'; // React hooks for local state

interface Props {
  readonly onSearch: (patientName: string) => void;
}

export const OptometryPatientSearch = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const [lastSearched, setLastSearched] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If the doctor presses Escape, we clear the field immediately
    if (e.key === 'Escape') {
      setQuery("");
      setLastSearched(null);
    }
  };

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    onSearch(query);
    setLastSearched(query);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md font-mono text-white shadow-2xl space-y-4">
      <h3 className="text-cyan-400 font-bold text-sm">🔍 Quick Patient File Search</h3>

      <form onSubmit={handleSumbit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type patient name (or press Esc to clear)..."
          className="flex-1 p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs focus:border-cyan-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          Search 🚀
        </button>
      </form>

      {lastSearched && (
        <div className="p-3 bg-slate-950/80 border border-emerald-500/30 rounded-lg text-xs text-emerald-400">
          ✓ Search request sent for: <strong className="underline">{lastSearched}</strong>
        </div>
      )}
    </div>
  );
};