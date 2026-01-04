import { Box, Typography, IconButton } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import Logo from "@/components/shared/Logo"; // si tu as ton composant logo
import TuneIcon from "@mui/icons-material/Tune";


export default function Collection() {

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
        {/* future card list */}
      </Box>
    </Box>
  );
}
