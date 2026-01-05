import { Box, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "./SideBar";
import Footer from "./FooterNav";
import { Outlet } from "react-router-dom";

const MOBILE_FOOTER_HEIGHT = 72;

export default function ResponsiveLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",          // ✅ IMPORTANT
        bgcolor: "background.default",
      }}
    >
      {/* ===== SIDEBAR DESKTOP ===== */}
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

      {/* ===== CONTENU SCROLLABLE ===== */}
      <Box
        sx={{
          flex: 1,
          p: 2,
          width: "100%",
          minWidth: 0,

          // ✅ LE SCROLL DOIT ÊTRE ICI
          overflowY: "auto",

          // ✅ espace pour le footer mobile
          pb: isMobile ? `${MOBILE_FOOTER_HEIGHT}px` : 0,
        }}
      >
        <Outlet />
      </Box>

      {/* ===== FOOTER MOBILE FIXED ===== */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: MOBILE_FOOTER_HEIGHT,
            borderTop: "1px solid #222",
            zIndex: 1300,
            bgcolor: "background.paper",
          }}
        >
          <Footer />
        </Box>
      )}
    </Box>
  );
}
