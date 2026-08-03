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
  /*
   * MECHANICS OF `useIMask`:
   * 
   * The `useIMask` hook provides a way to bind iMask's vanilla JavaScript logic directly to a React DOM element.
   * Unlike standard React controlled components (where you bind `value` and `onChange`), `useIMask` operates 
   * primarily at the DOM level using a standard React ref. 
   *
   * 1. When the component mounts, the `ref` is attached to the underlying <input> element.
   * 2. iMask creates an instance that listens to native DOM events (like 'input', 'keydown', 'paste') on that element.
   * 3. As the user types, iMask intercepts the input, applies the formatting rules (the `mask` pattern and `prepare` function),
   *    and immediately updates the native `input.value` property in the DOM.
   * 4. React's state (the `value` variable returned by the hook) is then updated asynchronously to reflect the formatted value,
   *    causing a re-render. This means the input is actually "uncontrolled" from React's strict perspective,
   *    but its visual state and React state are kept seamlessly in sync by the hook.
   */

  // 1. Setup the hook with your mask rules
  // The hook returns an object from which we destructure `ref` and `value`.
  // `ref`: A mutable ref object to be attached to the target input element.
  // `value`: The current formatted value synced with the input's actual DOM value.
  const { ref, value } = useIMask({
    // Pattern breakdown:
    // 'OPT-' : Literal characters that are fixed and inserted automatically.
    // '0000' : '0' maps to a required digit (0-9). The user must enter 4 digits here.
    // '-'    : Another literal character.
    // 'AAAA' : 'A' maps to a required letter (a-z, A-Z). The user must enter 4 letters here.
    mask: 'OPT-0000-AAAA', // '0' = Digit, 'A' = Letter
    
    // The prepare function allows you to format characters before they are applied.
    // Here, we auto-capitalize any lowercase letters the user types.
    // `str` represents the incoming character(s) being processed during the current keystroke or paste event.
    prepare: (str) => str.toUpperCase() 
  });

  return (
    <div className="p-4 bg-slate-900 rounded-xl text-white font-mono max-w-sm">
      <label className="block text-xs text-slate-400 mb-1">Optometry Frame Code:</label>
      
      {/* 2. Attach the ref to your input element */}
      {/* 
        By passing `ref={ref}`, we hand over a reference of this actual DOM node to the `useIMask` hook. 
        Note that we DO NOT need to pass `value={value}` or `onChange={...}` because iMask directly manipulates the DOM 
        element's value to enforce the mask. 
      */}
      <input
        ref={ref}
        type="text"
        placeholder="OPT-YYYY-CODE"
        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm tracking-widest text-cyan-400 focus:outline-none focus:border-cyan-500"
      />
      
      <p className="text-[10px] text-slate-400 mt-2">
        {/* We can safely use `value` here to display the current formatted state elsewhere in the UI. */}
        Live Formatted Value: <span className="text-amber-400">{value}</span>
      </p>
    </div>
  );
};
