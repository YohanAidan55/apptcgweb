import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/shared/Logo.jsx";

// --- ✅ Schéma de validation avec Zod
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Le nom complet est requis"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre")
      .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir un symbole"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d’utilisation",
    }),
  });

// --- ✅ Type dérivé du schéma
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // --- ✅ React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
  });

  // --- ✅ Soumission du formulaire
  const onSubmit = (data: RegisterFormData) => {
    console.log("✅ Données validées :", data);
    localStorage.setItem("token", "fake-register-token");
    navigate("/home");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: "#0d0d0d", color: "#fff" }}
    >
      <Container maxWidth="xs">
        {/* Logo + Header */}
        <Logo />

        <Box textAlign="left" mb={4}>
          <Typography variant="h6" fontWeight={700}>
            Get started
          </Typography>
          <Typography variant="body2" color="gray">
            Build your collection, track values, and sync across devices.
          </Typography>
        </Box>

        {/* Formulaire */}
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#111",
            border: "1px solid #222",
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full name"
              placeholder="Alex Collector"
              fullWidth
              margin="normal"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              InputProps={{
                sx: {
                  backgroundColor: "#1a1a1a",
                  borderRadius: 2,
                  input: { color: "#fff" },
                },
              }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />

            <TextField
              label="Email"
              placeholder="name@email.com"
              type="email"
              fullWidth
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                sx: {
                  backgroundColor: "#1a1a1a",
                  borderRadius: 2,
                  input: { color: "#fff" },
                },
              }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />

            <TextField
              label="Password"
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                sx: {
                  backgroundColor: "#1a1a1a",
                  borderRadius: 2,
                  input: { color: "#fff" },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((p) => !p)}
                      edge="end"
                      sx={{ color: "#888" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />

            {/* Conditions du mot de passe */}
            <Box textAlign="left" mt={1} mb={1} pl={1}>
              <Typography variant="body2" color="gray">
                • 8+ characters
              </Typography>
              <Typography variant="body2" color="gray">
                • 1 number and 1 symbol
              </Typography>
            </Box>

            {/* Terms & policy */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("agreeTerms")}
                    sx={{
                      color: "#aaa",
                      "&.Mui-checked": { color: "#d4af37" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="gray">
                    I agree to Terms
                  </Typography>
                }
              />
              <Link href="#" underline="hover" color="#d4af37">
                View policy
              </Link>
            </Box>

            {errors.agreeTerms && (
              <Typography
                variant="body2"
                color="error"
                sx={{ ml: 1, mb: 1, fontSize: "0.8rem" }}
              >
                {errors.agreeTerms.message}
              </Typography>
            )}

            {/* Bouton principal */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                mb: 2,
                bgcolor: "#d4af37",
                color: "#000",
                fontWeight: 600,
                "&:hover": { bgcolor: "#c19e35" },
              }}
            >
              Create account
            </Button>

            <Typography
              variant="body2"
              align="center"
              color="gray"
              sx={{ my: 2 }}
            >
              Or sign up with
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Google />}
              sx={{
                borderColor: "#333",
                color: "#fff",
                textTransform: "none",
                backgroundColor: "#1a1a1a",
                "&:hover": { backgroundColor: "#222" },
              }}
            >
              Continue with Google
            </Button>
          </Box>
        </Paper>

        {/* Bas de page */}
        <Typography
          variant="body2"
          align="center"
          color="gray"
          sx={{ mt: 3 }}
        >
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            color="#d4af37"
          >
            Sign in
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
