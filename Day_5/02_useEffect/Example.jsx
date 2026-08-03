/**
 * ============================================================================
 * BLOCK COMMENT: Understanding useEffect Cleanup and Debouncing
 * ============================================================================
 * `useEffect` lets you perform side effects in functional components.
 * When performing actions like fetching data based on user input, it's common
 * to use a technique called "debouncing" to avoid making too many requests.
 * 
 * THE CLEANUP FUNCTION:
 * If a `useEffect` returns a function, React considers it a "cleanup" function.
 * Before React runs the effect again (due to dependencies changing) or when the
 * component unmounts, it will execute the cleanup function from the PREVIOUS render.
 * This is crucial for clearing timers, canceling network requests, or removing
 * event listeners to prevent memory leaks and race conditions.
 * ============================================================================
 */

// =========================================================================
// Pro Search Bar with Debounce & Cleanup Function 
// =========================================================================
useEffect(() => {
  // 1. Set an alarm to fetch data AFTER 500ms of silence:
  // setTimeout returns a numeric ID representing the timer, stored in `timerId`.
  const timerId = setTimeout(() => {
    console.log(` Sending request to server for: [${searchQuery}]`);
    fetchResults(searchQuery); // Custom function to fetch data
  }, 500);

  // 2.  Cleanup function:
  // If the user types another letter BEFORE the 500ms ends, React runs this line first!
  // It cancels the previous alarm so the server never gets spammed!
  // This returned function is the cleanup function.
  return () => {
    clearTimeout(timerId); // Cancels the timer associated with `timerId`
    console.log(" Cleaned up old timer! Waiting for user to finish typing...");
  };

}, [searchQuery]); // Dependency array: Re-run the effect and cleanup whenever searchQuery changes