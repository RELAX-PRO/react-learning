import React, { useState } from 'react';

const ThemeToggler = () => {
  // We use the pro trick: an arrow function inside useState
  const [isDarkMode, setIsDarkMode] = useState(() => {
    console.log("⚙️ Checking browser memory... This prints ONLY ONCE!");
    
    // Reading from the browser's disk (Heavy/Slow Operation)
    const savedTheme = localStorage.getItem("user_theme");
    
    // Return true if saved theme was 'dark', otherwise false
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "bg-black text-white p-8" : "bg-white text-black p-8"}>
      <h3>Current Theme: {isDarkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}</h3>
      <button onClick={toggleTheme} className="p-2 border rounded mt-4">
        Change Theme
      </button>
    </div>
  );
};

export default ThemeToggler;