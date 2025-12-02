// src/components/shared/Sidebar.tsx
import { Box, List, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "@/components/shared/Logo.tsx";

import SearchGold from "@/assets/loupeSelect.png";
import SearchWhite from "@/assets/loupeWhite.png";
import SearchBlack from "@/assets/loupe.png";

import CollectionGold from "@/assets/portefeuilleSelect.png";
import CollectionWhite from "@/assets/portefeuilleWhite.png";
import CollectionBlack from "@/assets/portefeuille.png";

import ProfileGold from "@/assets/utilisateurSelect.png";
import ProfileWhite from "@/assets/utilisateurWhite.png";
import ProfileBlack from "@/assets/utilisateur.png";

export default function Sidebar() {

  const theme = useTheme(); // récupère ton thème
  const location = useLocation();
  const navigate = useNavigate();

  const isDark = theme.palette.mode === "dark";

  const menu = [
    { path: "/recherche", label: "Recherche", gold: SearchGold, white: SearchWhite, black: SearchBlack },
    { path: "/collection", label: "Collection", gold: CollectionGold, white: CollectionWhite, black: CollectionBlack },
    { path: "/profile", label: "Profil", gold: ProfileGold, white: ProfileWhite, black: ProfileBlack },
  ];

  return (
    <List>
      <Logo/>
      {menu.map((item) => {
        const isActive = location.pathname === item.path;

        // ---- LOGIQUE DES IMAGES ----
        let icon = item.white;
        if (isActive) icon = item.gold;
        else if (!isDark) icon = item.black;

        return (
          <Box
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              gap: 0.5,
            }}
          >
            <img src={icon} alt="" style={{ width: 30 }} />

            <Typography
              sx={{
                fontSize: "0.75rem",
                color: isActive ? "primary.main" : "text.secondary",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </List>
  );
}
