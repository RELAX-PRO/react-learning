import React from 'react';
import { useIMask } from 'react-imask';

/**
 * Example 2: Using the useIMask Hook
 * 
 * Instead of using the pre-built <IMaskInput /> component, you can use the useIMask hook.
 * This is incredibly useful when you are using a UI component library (like shadcn/ui or Material UI)
 * and you need to apply a mask to THEIR custom input component.
 * 
 * How it works:
 * - The hook provides a `ref`. 
 * - You attach this `ref` to your standard <input /> element.
 * - The hook takes over and enforces the mask directly on that DOM element.
 */
export const CustomInputMaskExample = () => {
  // 1. Setup the hook with your mask rules
  const { ref, value } = useIMask({
    mask: 'OPT-0000-AAAA', // '0' = Digit, 'A' = Letter
    
    // The prepare function allows you to format characters before they are applied.
    // Here, we auto-capitalize any lowercase letters the user types.
    prepare: (str) => str.toUpperCase() 
  });

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-white font-mono max-w-sm">
      <label className="block text-xs text-slate-400 mb-1">Optometry Frame Code:</label>
      
      {/* 2. Attach the ref to your input element */}
      <input
        ref={ref}
        type="text"
        placeholder="OPT-YYYY-CODE"
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm tracking-widest text-cyan-400 focus:outline-none focus:border-cyan-500"
      />
      
      <p className="text-[10px] text-slate-400 mt-2">
        Live Formatted Value: <span className="text-amber-400">{value}</span>
      </p>
    </div>
  );
};
