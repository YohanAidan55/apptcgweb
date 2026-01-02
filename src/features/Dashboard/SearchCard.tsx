import {
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import TuneIcon from "@mui/icons-material/Tune";

import Logo from "@/components/shared/Logo";
import { useState } from "react";

export default function SearchCard() {
  const [selectedGame, setSelectedGame] = useState("Lorcana");

  const games = ["Lorcana", "Pokemon", "One Piece", "Yu-Gi-Oh!"];

  return (
    <Box sx={{ width: "100%", maxWidth: "100%" }}>
      {/* ================= TOP BAR ================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5, // espace avec la search bar
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Logo mobile */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Logo width={60} />
          </Box>

          <Typography fontSize="1.5rem" fontWeight={300}>
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

      {/* ================= SEARCH BAR + FILTER ================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        {/* Search bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            bgcolor: "background.paper",
            borderRadius: 3,
            px: 1.5,
            py: 1,
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

        {/* Filter button */}
        <IconButton
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            height: 44,
            width: 44,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <TuneIcon />
        </IconButton>
      </Box>

      {/* ================= GAME FILTERS ================= */}
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
                },
              }}
            />
          );
        })}
      </Box>

      {/* ================= LISTE DES CARTES ================= */}
      <Box mt={3}>
        {/* future card list */}
      </Box>
    </Box>
  );
}
