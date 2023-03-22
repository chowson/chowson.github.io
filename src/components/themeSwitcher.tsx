import React, { useEffect, useState } from 'react';

type ThemeNames = 'theme-dark' | 'theme-light';

declare global {
  interface Window {
    __setPreferredTheme: (theme: ThemeNames) => void;
    __theme: ThemeNames;
  }
}

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<ThemeNames>('theme-light');
  useEffect(() => {
    setTheme(window.__theme);
  }, []);

  const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = event => {
    const newTheme = theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    window.__setPreferredTheme(newTheme);

    event.preventDefault();
  };

  return (
    <span className="mr-4 flex items-center">
      <a href="#" className="text-copy-primary hover:text-gray-600" onClick={toggleTheme} aria-label="Switch theme">
        {theme === 'theme-light' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-moon"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-sun"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </a>
    </span>
  );
};
