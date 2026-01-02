import { Box } from "@mui/material";

import SidebarNavItem from "./SideBarNavItem";

import Logo from "@/components/shared/Logo.tsx";

import SearchGold from "@/assets/loupeSelect.png";
import SearchWhite from "@/assets/loupeWhite.png";
import SearchBlack from "@/assets/loupe.png";

import CollectionGold from "@/assets/portefeuilleSelect.png";
import CollectionWhite from "@/assets/portefeuilleWhite.png";
import CollectionBlack from "@/assets/portefeuille.png";

import ProfileGold from "@/assets/utilisateurSelect.png";
import ProfileWhite from "@/assets/utilisateurWhite.png";
import ProfileBlack from "@/assets/utilisateur.png";

export default function Sidebar() {
  return (
    <Box sx={{ width: 240, p: 2 }}>
      <Logo />
      <SidebarNavItem
        path="/recherche"
        label="Recherche"
        iconGold={SearchGold}
        iconWhite={SearchWhite}
        iconBlack={SearchBlack}
      />

      <SidebarNavItem
        path="/collection"
        label="Collection"
        iconGold={CollectionGold}
        iconWhite={CollectionWhite}
        iconBlack={CollectionBlack}
      />

      <SidebarNavItem
        path="/profile"
        label="Profil"
        iconGold={ProfileGold}
        iconWhite={ProfileWhite}
        iconBlack={ProfileBlack}
      />
    </Box>
  );
}
