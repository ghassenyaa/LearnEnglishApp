import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const pref = window.localStorage.getItem('theme');

    if (pref) {
      setTheme(pref);
    } else {
      setMode('light');
    }
    setComponentMounted(true);
  }, [setTheme]);
  return [theme, toggleTheme, componentMounted];
};
