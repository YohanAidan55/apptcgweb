// src/theme/ThemeContext.tsx
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { lightTheme, darkTheme } from "./Theme";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: "dark",
});

export const useThemeContext = () => useContext(ThemeContext);

export default function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  // Charger le thème sauvegardé
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setMode(saved);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // On sélectionne le thème défini dans Theme.ts
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
