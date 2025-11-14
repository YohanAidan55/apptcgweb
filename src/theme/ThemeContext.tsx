// src/theme/ThemeContext.tsx
import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

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
  // ✅ Récupération du thème sauvegardé ou "dark" par défaut
  const [mode, setMode] = useState<"light" | "dark">("dark");
console.log("🎨 Mode actuel:", mode);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // ✅ Création du thème dynamique MUI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#d4af37" },
          background: {
            default: mode === "dark" ? "#0d0d0d" : "#ffffff",
            paper: mode === "dark" ? "#111" : "#f9f9f9",
          },
          text: {
            primary: mode === "dark" ? "#ffffff" : "#000000",
            secondary: mode === "dark" ? "#cccccc" : "#555555",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
