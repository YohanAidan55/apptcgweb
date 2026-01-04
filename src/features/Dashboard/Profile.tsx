import {
  Box,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";

export default function ProfilePage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      sx={{
        px: isDesktop ? 4 : 2,
        pt: 4,
        pb: 10,
        maxWidth: isDesktop ? 1100 : "100%",
        mx: "auto",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: isDesktop ? 5 : 3,
        }}
      >
        <Box>
          <Typography fontSize={isDesktop ? "2rem" : "1.6rem"} fontWeight={600}>
            Your Profile
          </Typography>
          <Typography fontSize="0.9rem" color="text.secondary">
            Manage account & preferences
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: isDesktop ? 56 : 44,
            height: isDesktop ? 56 : 44,
            bgcolor: "transparent",
            border: "2px solid",
            borderColor: "primary.main",
          }}
        >
          <PersonOutlineIcon color="primary" />
        </Avatar>
      </Box>

      {/* ================= STATS ================= */}
      <Box sx={{ display: "flex", gap: 2, mb: isDesktop ? 5 : 3 }}>
        <StatCard
          title="Collection Value"
          value="€2 561,42"
          trend="+2.1% 30d"
          big={isDesktop}
        />
        <StatCard
          title="Cards Owned"
          value="184"
          trend="+2.1% 30d"
          big={isDesktop}
        />
      </Box>

      {/* ================= QUICK ACTIONS ================= */}
      <Box sx={{ display: "flex", gap: 2, mb: isDesktop ? 5 : 4 }}>
        <QuickButton icon={<SearchIcon />} label="Search cards" big={isDesktop} />
        <QuickButton icon={<GridViewIcon />} label="My collection" big={isDesktop} />
      </Box>

      {/* ================= SECTIONS ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
          gap: isDesktop ? 4 : 3,
        }}
      >
        <Section title="Account">
          <Row icon={<PersonOutlineIcon />} title="Profile details" subtitle="Name, email, avatar" />
          <Divider />
          <Row icon={<SecurityIcon />} title="Security" subtitle="Password & 2FA" />
          <Divider />
          <Row
            icon={<NotificationsNoneIcon />}
            title="Notifications"
            subtitle="Price alerts & news"
            badge="3"
          />
        </Section>

        <Section title="Preferences">
          <Row icon={<CurrencyExchangeIcon />} title="Currency" subtitle="Euro (€)" />
          <Divider />
          <Row icon={<ShowChartIcon />} title="Price evolution" subtitle="Default range: 30 days" />
          <Divider />
          <Row icon={<FavoriteBorderIcon />} title="Favorite TCGs" subtitle="MTG, Pokémon" />
        </Section>

        <Section title="Support">
          <Row icon={<HelpOutlineIcon />} title="Help Center" subtitle="FAQs & guides" />
          <Divider />
          <Row icon={<MailOutlineIcon />} title="Contact support" subtitle="We usually reply in 24h" />
        </Section>
      </Box>
    </Box>
  );
}

/* ================================================= */
/* ================= COMPONENTS ==================== */
/* ================================================= */

function StatCard({
  title,
  value,
  trend,
  big,
}: {
  title: string;
  value: string;
  trend: string;
  big?: boolean;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        p: big ? 3 : 2,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography fontSize="0.85rem" color="text.secondary">
        {title}
      </Typography>

      <Typography fontSize={big ? "1.6rem" : "1.3rem"} fontWeight={600} mt={0.5}>
        {value}
      </Typography>

      <Chip
        icon={<TrendingUpIcon />}
        label={trend}
        size="small"
        sx={{
          mt: 1.5,
          bgcolor: "success.main",
          color: "black",
          fontWeight: 600,
        }}
      />
    </Box>
  );
}

function QuickButton({
  icon,
  label,
  big,
}: {
  icon: React.ReactNode;
  label: string;
  big?: boolean;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: big ? 2.2 : 1.5,
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      {icon}
      <Typography fontWeight={500} fontSize={big ? "1rem" : "0.95rem"}>
        {label}
      </Typography>
    </Box>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography
        fontSize="0.9rem"
        color="text.secondary"
        mb={1.5}
        fontWeight={500}
      >
        {title}
      </Typography>

      <Box
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function Row({
  icon,
  title,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {icon}
        <Box>
          <Typography fontWeight={500}>{title}</Typography>
          <Typography fontSize="0.8rem" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {badge && (
          <Chip
            label={badge}
            size="small"
            sx={{ bgcolor: "primary.main", color: "black" }}
          />
        )}
        <ArrowForwardIosIcon fontSize="small" />
      </Box>
    </Box>
  );
}
