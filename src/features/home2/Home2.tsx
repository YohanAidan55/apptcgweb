import { Box, Typography } from '@mui/material';

export default function Home2() {
  return (
    <Box p={3} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" component="h1">
        Bienvenue sur Ortho Web 2
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Ceci est la page d'accueil. Utilisez la barre latérale pour naviguer.
      </Typography>
    </Box>
  );
}
