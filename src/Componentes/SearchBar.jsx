import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function SearchBar({ value, onChange, onSearch }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-center gap-2 mt-4 p-4">
      <input
        value={value}
        onChange={onChange}
        placeholder="Ingresa una ciudad..."
        className={`w-full max-w-sm p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300
          ${theme === "light" 
            ? "bg-white text-gray-900 " 
            : "bg-gray-700 text-white border-gray-500"}`}
      />
      <button
        onClick={onSearch}
        className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300
          ${theme === "light" 
            ? "bg-blue-500 text-white hover:bg-blue-600" 
            : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        Buscar
      </button>
    </div>
  );
}
