// src/components/shared/ToggleTheme.tsx
import { IconButton, useTheme } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeContext } from "@/theme/ThemeContext";

export default function ToggleTheme() {
  const { toggleTheme, mode } = useThemeContext();
  const theme = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        color: theme.palette.text.primary,
      }}
    >
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
