import { Box, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItemProps {
  path: string;
  label: string;

  iconGold: string;
  iconWhite: string;
  iconBlack: string;
}

export default function SidebarNavItem({
  path,
  label,
  iconGold,
  iconWhite,
  iconBlack,
}: NavItemProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isActive = location.pathname === path;
  const isDark = theme.palette.mode === "dark";

  // Sélection de l’icône
  const icon = isActive
    ? iconGold                       // actif = OR
    : isDark
    ? iconWhite                      // sombre = blanc
    : iconBlack;                     // clair = noir

  return (
    <Box
      onClick={() => navigate(path)}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        cursor: "pointer",
        borderRadius: 2,
        transition: "0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(196, 195, 135, 0.23)",
        },
      }}
    >
      <img
        src={icon}
        alt={label}
        style={{ width: 22, height: 22 }}
      />

      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: isActive ? 600 : 400,
          color: isActive ? "primary.main" : "text.secondary",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
