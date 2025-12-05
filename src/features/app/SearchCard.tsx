import { Box, Typography, TextField, IconButton, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";

import Logo from "@/components/shared/Logo"; // si tu as ton composant logo
import { useState } from "react";

export default function SearchCard() {
  const [selectedGame, setSelectedGame] = useState("Lorcana");

  const games = ["Lorcana", "Pokemon", "One Piece", "Yu-Gi-Oh!"];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
        pb: 10, // espace pour le footer
      }}
    >
      {/* --- TOP BAR --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Logo width={60} />
          <Typography fontSize="0.8rem" fontWeight={300}>
            Search Cards
          </Typography>
        </Box>

        <IconButton
          sx={{
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "black",
            px: 2,
            "&:hover": { opacity: 0.9 },
          }}
        >
          <QrCodeScannerIcon />
          <Typography ml={1} fontWeight={600}>
            Scan
          </Typography>
        </IconButton>
      </Box>

      {/* --- SEARCH BAR --- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: 3,
          px: 1.5,
          py: 1,
          mb: 2,
          border: "1px solid",
          borderColor: "divider",
          gap: 1,
        }}
      >
        <SearchIcon sx={{ color: "text.secondary" }} />
        <input
          type="text"
          placeholder="Search by name, set, rarity..."
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            width: "100%",
            color: "inherit",
            fontSize: "0.9rem",
          }}
        />
      </Box>

      {/* --- GAME FILTERS --- */}
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
        {games.map((game) => {
          const active = selectedGame === game;

          return (
            <Chip
            key={game}
            label={game}
            onClick={() => setSelectedGame(game)}
            sx={{
                bgcolor: active ? "primary.main" : "background.paper",
                color: active ? "background.default" : "text.primary",
                fontWeight: active ? 600 : 400,
                px: 1.2,
                transition: "all 0.2s ease",

                "&:hover": {
                bgcolor: active ? "primary.dark" : "action.hover",
                }
            }}
            />
          );
        })}
      </Box>

      {/* --- LISTE DES CARTES PLUS TARD --- */}
      <Box mt={3}>
        {/* future card list */}
      </Box>
    </Box>
  );
}
