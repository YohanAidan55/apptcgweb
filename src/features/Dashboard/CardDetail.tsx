import {
  Box,
  Typography,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import carte from "@/assets/cartes/minnie.jpg";


export default function CardDetail() {
  const qty = 1;

  return (
    <Box sx={{ px: 2, pb: 10 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <IconButton>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Typography fontSize="0.9rem" color="text.secondary">
          Card Details
        </Typography>

        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      {/* Image + infos principales */}
      <Box display="flex" gap={2} mb={2}>
        {/* Image */}
        <Box
          sx={{
            width: 140,
            height: 200,
            borderRadius: 3,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src = {carte}

            alt="Minnie"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Infos */}
        <Box flex={1}>
          <Typography fontSize="1.1rem" fontWeight={600}>
            Minnie - Adorable princesse
          </Typography>

          <Box display="flex" gap={1} mt={0.5}>
            <Chip label="Lorcana" size="small" />
            <Chip label="Iconique" size="small" />
            <Chip label="Fabuleux" size="small" />
          </Box>

          <Typography fontSize="1.4rem" fontWeight={700} mt={1}>
            €750,00
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 0.8,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#000",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              + Add to collection
            </Box>

            <Chip
              label="+4.3% 7d"
              size="small"
              color="success"
            />
          </Box>
        </Box>
      </Box>

      {/* Card information */}
      <Typography fontWeight={600} mb={1}>
        Card Information
      </Typography>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 2,
          mb: 2,
        }}
      >
        {[
          ["Set", "Core Set 2019 (M19)"],
          ["Rarity", "Iconique"],
          ["Number", "241/204"],
          ["Condition", "Near Mint"],
          ["Language", "FR"],
        ].map(([label, value]) => (
          <Box key={label}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 0.8,
              }}
            >
              <Typography color="text.secondary">
                {label}
              </Typography>
              <Typography>{value}</Typography>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>

      {/* Price evolution */}
      <Typography fontWeight={600} mb={1}>
        Price Evolution
      </Typography>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            height: 120,
            borderRadius: 2,
            bgcolor: "background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            fontSize: "0.8rem",
          }}
        >
          Price chart (30d)
        </Box>

        <Typography
          fontSize="0.75rem"
          color="text.secondary"
          mt={1}
        >
          Low • Avg • High
        </Typography>

        <Typography fontSize="0.85rem">
          €65 • €74 • €89
        </Typography>
      </Box>

      {/* Holdings */}
      <Typography fontWeight={600} mb={1}>
        Your Holdings
      </Typography>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 2,
          mb: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton>
            <RemoveIcon />
          </IconButton>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#4CAF50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {qty}
          </Box>

          <IconButton>
            <AddIcon />
          </IconButton>

          <Box
            sx={{
              ml: "auto",
              px: 2,
              py: 0.8,
              borderRadius: 3,
              bgcolor: "#7C4DFF",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.8rem",
            }}
          >
            Est. Value €750,00
          </Box>
        </Box>

        <Typography
          fontSize="0.75rem"
          color="text.secondary"
          mt={1}
        >
          Purchase Price €68,00
        </Typography>

        <Typography
          fontSize="0.75rem"
          color="text.secondary"
        >
          Last updated 2 days ago
        </Typography>
      </Box>

      {/* Gallery */}
      <Typography fontWeight={600} mb={1}>
        Gallery
      </Typography>

      <Box display="flex" gap={1}>
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              width: 72,
              height: 100,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            <Box
              component="img"
              src={`/images/gallery/${i}.png`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
