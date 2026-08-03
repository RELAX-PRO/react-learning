// =========================================================================
// File: src/components/GenericDataList.tsx
// Description: Highly Reusable Generic List Component in React & TypeScript
// =========================================================================
import React from 'react';

/*
 * MECHANIC: Generic Component Props
 * Here, `T` represents the data model (like Patient or Lens) that the list will render.
 * When the list is instantiated, `T` is specified, meaning `items` will strictly be an array of `T`, 
 * and `renderItem` will know exactly what properties exist on the `item` parameter.
 */
// 1. Defining the Generic Props Contract
// Notice how T is declared on the interface!
interface GenericListProps<T> {
  title: string;
  items: T[]; // Inline: An array of whatever type T is passed
  renderItem: (item: T, index: number) => React.ReactNode; // Inline: item is typed as T, guaranteeing properties match
  onSelectItem?: (item: T) => void; // Inline: callback receives the exact type T
}

// 2. Defining the Generic Component
// Notice the <T,> syntax! (The comma prevents JSX parsing conflicts in .tsx files)
export const GenericDataList = <T,>({
  title,
  items,
  renderItem,
  onSelectItem
}: GenericListProps<T>) => {
  return (
    <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl font-mono text-white max-w-md w-full shadow-2xl">
      <h3 className="text-cyan-400 font-extrabold text-base mb-4 border-b border-slate-800 pb-2">
        📑 {title} <span className="text-xs text-slate-400">({items.length} items)</span>
      </h3>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500 italic text-center py-6">[ No records found ]</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => onSelectItem && onSelectItem(item)}
              className="p-3 bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between text-xs group"
            >
              {renderItem(item, idx)}
              <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">◀</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};