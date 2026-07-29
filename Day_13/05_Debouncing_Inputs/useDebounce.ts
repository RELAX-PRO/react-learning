// =========================================================================
// File: src/hooks/useDebounce.ts
// Description: Generic hook to delay value updates (Debouncing)
// =========================================================================
import { useState, useEffect } from 'react';

// We use <T> (Generics) so the hook works with strings, numbers, or any data type!
export function useDebounce<T>(value: T, delay: number): T {
  // This is the value that will be delayed and sent to the server later
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 1. When a character is typed, we set an alarm to ring after (delay) milliseconds
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. Cleanup: If the user types a new character before the alarm rings, we cancel the old alarm!
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Restart the plan with every new character

  return debouncedValue;
}