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
import { Visibility, VisibilityOff, Apple, Google } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/shared/Logo.jsx";
import HeadText from "@/components/shared/HeadText.jsx";
import FormInput from "@/components/shared/FormInput.jsx";
import ButtonForm from "@/components/shared/ButtonForm.jsx";


// --- ✅ Schéma de validation Zod
const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
});

// --- ✅ Type dérivé du schéma
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // --- ✅ React Hook Form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("✅ Données validées :", data);
    localStorage.setItem("token", "fake-token-123456");
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
        <Logo />

        <HeadText title="Welcome back" label="Track values, scan new finds, and keep your TCG in sync." />

        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 3,
            backgroundColor: "#111",
            border: "1px solid #222",
          }}
        >
          {/* ✅ Formulaire React Hook Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="name@email.com"
              register={register}
              error={errors.email}
            />

            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Create a password"
              register={register}
              error={errors.password}
            />


            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
              mb={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#aaa",
                      "&.Mui-checked": { color: "#d4af37" },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" color="gray">
                    Remember me
                  </Typography>
                }
              />
              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="hover"
                color="#d4af37"
                sx={{ fontSize: "0.9rem" }}
              >
                Forgot password?
              </Link>
            </Box>

            <ButtonForm label="Sign In" />

            <Typography
              variant="body2"
              align="center"
              color="gray"
              sx={{ my: 2 }}
            >
              Or continue with
            </Typography>

            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Apple />}
                sx={{
                  borderColor: "#333",
                  color: "#fff",
                  textTransform: "none",
                  backgroundColor: "#1a1a1a",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                Apple
              </Button>
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
                Google
              </Button>
            </Box>
          </Box>
        </Paper>

        <Typography
          variant="body2"
          align="center"
          color="gray"
          sx={{ mt: 3 }}
        >
          Don’t have an account?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            color="#d4af37"
          >
            Sign up
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
