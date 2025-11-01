
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Faux login - accepte n'importe quel email/password
        // Stocke un token fake dans le localStorage
        localStorage.setItem('token', 'fake-token-123456');

        // Redirige vers la page home
        navigate('/home');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    maxWidth: 400,
                    width: '100%',
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" component="h1" textAlign="center">
                    Connexion
                </Typography>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                    Entrez n'importe quel email et mot de passe pour tester
                </Typography>

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    autoComplete="email"
                />

                <TextField
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    Se connecter
                </Button>
            </Box>
        </Box>
    );
}