import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "./SideBar";
import Footer from "./FooterNav";
import { Outlet } from "react-router-dom";
import ToggleTheme from "@/components/shared/ToggleTheme";

export default function ResponsiveLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      
      {!isMobile && (        
        <Box width="220px" sx={{ width: 240, borderRight: "1px solid #222" }}>
          <ToggleTheme />

          <Sidebar />
        </Box>
      )}

      <Box flex={1} p={2} overflow="auto">
        <Outlet />
      </Box>

      {isMobile && (
        <Box position="fixed" bottom={0} width="100%" sx={{ borderTop: "1px solid #222" }}>
          <Footer />
        </Box>
      )}
    </Box>
    
  );
}

