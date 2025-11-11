import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginUserMutation } from "@/Services/userApi.ts";

import Logo from "@/components/shared/Logo.tsx";
import HeadText from "@/components/shared/HeadText.tsx";
import FormInput from "@/components/shared/FormInput.tsx";
import ButtonForm from "@/components/shared/ButtonForm.tsx";


// --- ✅ Schéma de validation Zod
const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
});

// --- ✅ Type dérivé du schéma
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  // --- ✅ React Hook Form + Zod
   const [login, { isLoading, error }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap();   // ✅ APPEL API
      localStorage.setItem("token", result.token);
      navigate("/home");
    } catch (e) {
      console.error("❌ Login failed:", e);
    }
  };

  return (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      bgcolor: "#0d0d0d",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "auto",
      p: 2
    }}
  >
    <Box
      sx={{
        width: "90%",
        maxWidth: 480,   // <= large sur PC, compact sur mobile
      }}
    >
      <Logo />

      <HeadText
        title="Welcome back"
        label="Track values, scan new finds, and keep your TCG in sync."
      />

      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: "#111",
          border: "1px solid #222",
        }}
      >
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

          <ButtonForm
            label={isLoading ? "Signing in..." : "Sign In"}
            disabled={isLoading}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              Invalid email or password
            </Typography>
          )}

          <Typography
            variant="body2"
            align="center"
            color="gray"
            sx={{ my: 2 }}
          >
            Or continue with
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            onClick={() =>
              (window.location.href =
                "http://localhost:8080/oauth2/authorization/google")
            }
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
    </Box>
  </Box>
);
}
