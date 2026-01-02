import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "./SideBar";
import Footer from "./FooterNav";
import { Outlet } from "react-router-dom";
import ToggleTheme from "@/components/shared/ToggleTheme";

export default function ResponsiveLayout() {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            borderRight: "1px solid #222",
          }}
        >
          <Sidebar />
        </Box>
      )}

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflow: "auto",
          width: "100%",
          minWidth: 0,
          display: "flex",
        }}
      >
        <Outlet />
      </Box>

      {isMobile && (
        <Box
          position="fixed"
          bottom={0}
          width="100%"
          sx={{ borderTop: "1px solid #222" }}
        >
          <Footer />
        </Box>
      )}
    </Box>
  );
}
