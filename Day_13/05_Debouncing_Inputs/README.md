# Lesson 5: Debouncing Inputs

## What is Debouncing?
In electronics, when you press a physical button, it might physically "bounce" and send 5 signals in a single millisecond instead of 1. Debouncing is the process of ignoring the extra signals until the bouncing stops.

In React, we use Debouncing to protect our servers. If a doctor is searching for a patient and types "A-h-m-e-d", that is 5 keystrokes. Without debouncing, React would send 5 separate database queries!

## How it works in `useDebounce.ts`
Debouncing works by setting a timer (`setTimeout`). 
When the user types 'A', we start a 600ms timer.
If they type 'h' before the 600ms is up, we **cancel** the first timer (`clearTimeout`) and start a new 600ms timer.

The API call is only made when the user finally *stops typing* for 600ms.

## Real World Application
Look at `PatientSearchBox.tsx`. We maintain two separate states:
1. **`instantSearch`**: This updates immediately on every keystroke. It is bound to the `<input>` so the UI feels perfectly fast and responsive to the user.
2. **`debouncedSearch`**: This is the delayed value. We use a `useEffect` to watch *this* value and trigger our API calls.

This pattern is an absolute requirement for any modern search bar or autocomplete feature!
