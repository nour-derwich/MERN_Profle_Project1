import React from "react";
import { useTheme } from "./useTheme";

const ThemeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? "🌞" : "🌙"}
      <span className="ml-2">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
};
export default ThemeToggle;
const ThemedCard = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`p-6 rounded-lg ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {children}
    </div>
  );
};
export { ThemedCard };