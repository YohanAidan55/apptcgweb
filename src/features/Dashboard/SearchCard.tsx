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
import { useNavigate } from "react-router-dom";


import carte from "@/assets/cartes/minnie.jpg";


export default function SearchCard() {
  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState("Lorcana");

  const games = ["Lorcana", "Pokemon", "One Piece", "Yu-Gi-Oh!"];

const cards = [
  {
    id: 1,
    name: "Simba - Roi en devenir",
    game: "Lorcana",
    rarity: "Enchantée",
    price: 74.2,
    image: carte,
    qty: 1,
  },
  {
    id: 2,
    name: "Mégara - Gardienne du secret",
    game: "Lorcana",
    rarity: "Epic",
    price: 36.9,
    image: carte,
    qty: 0,
  },
  {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },
    {
    id: 3,
    name: "Maléfique - Dragon monstrueux",
    game: "Lorcana",
    rarity: "Légendaire",
    price: 58,
    image: carte,
    qty: 0,
  },

];


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
       <Box mt={3} display="flex" flexDirection="column" gap={2}>
  {cards.map((card) => (
    <Box
      key={card.id}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Image container */}
      <Box
      onClick={() => navigate(`/carteDetail/${card.id}`)}

        sx={{
          width: 80,
          height: 116,
          borderRadius: 3,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={card.image}
          alt={card.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* Infos */}
      <Box flex={1} minWidth={0}>
        <Typography
          fontSize="1rem"
          fontWeight={500}
          noWrap
        >
          {card.name}
        </Typography>

        <Typography
          fontSize="0.8rem"
          color="text.secondary"
          noWrap
        >
          {card.game} • {card.rarity}
        </Typography>
      </Box>

      {/* Zone droite */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 1,
          minWidth: 120,
        }}
      >
        {/* Prix */}
        <Typography fontSize="1.1rem" fontWeight={600}>
          €{card.price.toLocaleString("fr-FR")}
        </Typography>

        {/* Actions */}
        {card.qty === 0 ? (
          /* Bouton ADD */
          <Box
            sx={{
              px: 3,
              py: 0.9,
              borderRadius: 3,
              bgcolor: "primary.main",
              color: "#000",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            Add
          </Box>
        ) : (
          /* Quantité */
          <Box display="flex" alignItems="center" gap={1}>
            {/* Bouton - */}
            <IconButton
              sx={{
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "divider",
                fontSize: "1.3rem",
              }}
            >
              −
            </IconButton>

            {/* Rond vert */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "#4CAF50",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
              }}
            >
              {card.qty}
            </Box>

            {/* Bouton + */}
            <IconButton
              sx={{
                width: 40,
                height: 40,
                border: "1px solid",
                borderColor: "divider",
                fontSize: "1.3rem",
              }}
            >
              +
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  ))}
</Box>


    </Box>
  );
}
