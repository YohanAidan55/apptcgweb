import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import Logo from "@/components/shared/Logo.jsx";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  
  // ✅ Schéma Zod
  const schema = z.object({
    email: z
      .string()
      .email("Please enter a valid email address"),
  });
  
  type ForgotPasswordForm = z.infer<typeof schema>;
  
  export default function ForgotPassword() {
    const navigate = useNavigate();
  
    // ✅ React Hook Form + Zod
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ForgotPasswordForm>({
      resolver: zodResolver(schema),
      mode: "onTouched",
    });
  
    // ✅ Soumission du formulaire
    const onSubmit = (data: ForgotPasswordForm) => {
      alert(`A password reset link has been sent to ${data.email}`);
      navigate("/login");
    };
  
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="#0d0d0d"
        color="white"
        px={2}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 400,
          }}
        >
          {/* Logo centré */}
          <Logo />
  
          {/* Texte à gauche */}
          <Box textAlign="left" mb={4}>
            <Typography variant="h6" fontWeight={700}>
              Forgot password?
            </Typography>
            <Typography variant="body2" color="gray">
              Enter your email address and we’ll send you instructions to reset your password.
            </Typography>
          </Box>
  
          {/* Champ email */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              sx: {
                bgcolor: "#1c1c1c",
                color: "white",
                borderRadius: 2,
              },
            }}
            InputLabelProps={{
              sx: { color: "gray" },
            }}
            sx={{ mb: 3 }}
          />
  
          {/* Bouton */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#d4af37",
              color: "black",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              "&:hover": {
                bgcolor: "#c19b2e",
              },
            }}
          >
            Send reset link
          </Button>
  
          {/* Retour connexion */}
          <Typography
            variant="body2"
            align="center"
            color="gray"
            sx={{ mt: 3 }}
          >
            Remember your password?{" "}
            <Link
              onClick={() => navigate("/login")}
              underline="hover"
              color="#d4af37"
              sx={{ cursor: "pointer" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  }
  