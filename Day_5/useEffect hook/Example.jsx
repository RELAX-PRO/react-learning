// =========================================================================
// Pro Search Bar with Debounce & Cleanup Function 🚀
// =========================================================================
useEffect(() => {
  // 1. Set an alarm to fetch data AFTER 500ms of silence:
  const timerId = setTimeout(() => {
    console.log(`🔍 Sending request to server for: [${searchQuery}]`);
    fetchResults(searchQuery);
  }, 500);

  // 2. 🧹 THE CLEANUP FUNCTION:
  // If the user types another letter BEFORE the 500ms ends, React runs this line first!
  // It cancels the previous alarm so the server never gets spammed!
  return () => {
    clearTimeout(timerId);
    console.log("🧹 Cleaned up old timer! Waiting for user to finish typing...");
  };

}, [searchQuery]); // Re-run whenever searchQuery changes