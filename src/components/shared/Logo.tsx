import logo from "@/assets/LogoApp.png";
import { Box } from "@mui/material";

type LogoProps = {
  width?: number;   // largeur personnalisable
};

const Logo = ({ width = 120 }: LogoProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <Box
        component="img"
        src={logo}
        alt="TCG Project Logo"
        sx={{
          width,
          height: "auto",         // garde les proportions automatiquement
        }}
      />
    </Box>
  );
};

export default Logo;
