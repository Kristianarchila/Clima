import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 px-4 py-2 rounded shadow-md 
                 bg-gray-200 text-black dark:bg-gray-800 dark:text-white"
    >
      {theme === "light" ? "🌙 Modo Oscuro" : "☀️ Modo Claro"}
    </button>
  );
}


