"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg hover:bg-gray-700 transition"
    >
      Toggle Theme
    </button>
  );
}
