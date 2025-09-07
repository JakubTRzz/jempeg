import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../themes/light";
import { darkTheme } from "../themes/dark";
import { arcadeTheme } from "../themes/arcade";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const [fontScale, setFontScale] = useState(1.0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedScale = localStorage.getItem("fontScale");

    if (savedTheme === "dark") setTheme(darkTheme);
    if (savedTheme === "arcade") setTheme(arcadeTheme);

    if (savedScale) setFontScale(parseFloat(savedScale));
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme.name === "Light"
        ? darkTheme
        : theme.name === "Dark"
        ? arcadeTheme
        : lightTheme;

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme.name.toLowerCase());
  };

  const updateFontScale = (scale) => {
    setFontScale(scale);
    localStorage.setItem("fontScale", scale);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, fontScale, updateFontScale }}>
      <ThemeProvider theme={{ ...theme, fontScale }}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
