import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle() {
  const [ mounted, setMounted ] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function isDark() {
    return theme === 'dark';
  }

  return (
    <div className="flex justify-end"> 
      <button
        className="focus:outline-none text-blue-500 dark:text-yellow-500 transition-none"
        onClick={() => setTheme(isDark() ? 'light' : 'dark')}
        aria-label="Theme toggle"
      >
        {isDark() ? <i><BiSun size={24} /></i> : <i><BiMoon size={24} /></i>}
      </button>
    </div>
  )
}