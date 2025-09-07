import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../themes/light";
import { darkTheme } from "../themes/dark";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setTheme(darkTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme.name === "Light" ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.name.toLowerCase());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
