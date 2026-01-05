import { Box, Typography, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import Logo from "@/components/shared/Logo"; // si tu as ton composant logo
import TuneIcon from "@mui/icons-material/Tune";
import { useNavigate } from "react-router-dom";

import carte from "@/assets/cartes/minnie.jpg";


export default function Collection() {

  const navigate = useNavigate();

const cards = [
  {
    id: 1,
    name: "Minnie",
    price: 750,
    qty: 1,
    image: carte,
  },
  {
    id: 2,
    name: "Mickey",
    price: 800,
    qty: 1,
    image: carte,
  },
  {
    id: 3,
    name: "Ariel",
    price: 750.45,
    qty: 1,
    image: carte,
  },
  {
    id: 4,
    name: "Simba",
    price: 120.99,
    qty: 1,
    image: carte,
  },
    {
    id: 4,
    name: "Simba",
    price: 120.99,
    qty: 1,
    image: carte,
  },
    {
    id: 4,
    name: "Simba",
    price: 120.99,
    qty: 1,
    image: carte,
  },
    {
    id: 4,
    name: "Simba",
    price: 120.99,
    qty: 1,
    image: carte,
  },
    {
    id: 4,
    name: "Simba",
    price: 120.99,
    qty: 1,
    image: carte,
  },
    {
    id: 4,
    name: "Simba",
    price: 120.99,
    qty: 1,
    image: carte,
  },
];


  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >

    {/* Logo : visible uniquement sur smartphone */}
    <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Logo width={90} />
    </Box>

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2.5,
      }}
    >
        <Typography
        sx={{
            fontSize: { xs: "1.2rem", md: "1.6rem" },
            fontWeight: 300,
        }}
        >
        Collection :
        </Typography>

        <Typography
        sx={{
            fontSize: { xs: "1.2rem", md: "1.6rem" },
            fontWeight: 500,
        }}
        >
        0 €
        </Typography>
    </Box>

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
  

      {/* --- LISTE DES CARTES --- */}
      <Box mt={3}>
        <Box
          mt={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 2,
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                cursor: "pointer",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
              }}
            >
              {/* Image */}
              <Box
              onClick={() => navigate(`/carteDetail/${card.id}`)}

                component="img"
                src={card.image}
                alt={card.name}
                sx={{
                  width: "100%",
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                }}
              />

              {/* Infos */}
              <Box
                sx={{
                  p: 1.2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontSize="0.85rem" fontWeight={500}>
                  €{card.price.toLocaleString("fr-FR")}
                </Typography>

                <Typography
                  fontSize="0.75rem"
                  color="text.secondary"
                >
                  x{card.qty}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
}
