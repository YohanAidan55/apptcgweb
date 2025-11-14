import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d4af37" },   // Gold
    background: {
      default: "#0d0d0d",
      paper: "#111",
    },
    text: {
      primary: "#fff",
      secondary: "#bfbfbf",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#d4af37" },   // Gold
    background: {
      default: "#ffffff",
      paper: "#f7f7f7",
    },
    text: {
      primary: "#000",
      secondary: "#555",
    },
  },
});
