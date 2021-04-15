import { ThemeContext, themes } from "providers/context/ThemeContext";
import { useState, useContext, useMemo, useEffect } from "react";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  const themeAPI = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);
  const body = (
    <ThemeContext.Provider value={themeAPI}>{children}</ThemeContext.Provider>
  );
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}> {body}</div>;
  }

  return body;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
