import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "@/components/layout/SideBar";
import FooterNav from "@/components/layout/FooterNav";

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {!isMobile && (
        <Sidebar />
      )}



      {isMobile && (
        <FooterNav />
      )}
    </Box>
  );
}
