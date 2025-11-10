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

import { useCreateUserMutation } from "@/Services/userApi.ts";

  import Logo from "@/components/shared/Logo.tsx";
  import HeadText from "@/components/shared/HeadText.tsx";
  import FormInput from "@/components/shared/FormInput.tsx";
  import ButtonForm from "@/components/shared/ButtonForm.tsx";


// --- ✅ Schéma de validation avec Zod
const registerSchema = z
  .object({
    firstName: z.string().min(2, "Deux caractères minimum requis"),
    lastName: z.string().min(2, "Deux caractères minimum requis"),
    userName: z.string().min(2, "Deux caractères minimum requis"),
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[0-9]/, "Le mot de passe doit contenir un chiffre")
      .regex(/[^a-zA-Z0-9]/, "Le mot de passe doit contenir un symbole"),
  });

// --- ✅ Type dérivé du schéma
type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {

  const navigate = useNavigate();
  const [createUser, { isLoading }] = useCreateUserMutation();

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",     
      email: "",
      password: "",},
  });

  // ✅ Soumission du formulaire → API
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        userName: data.userName,
        email: data.email,
        password: data.password,
      }).unwrap();

      // ✅ Le backend renvoie un token → on le stocke
      localStorage.setItem("token", result.token);

      navigate("/home");

    } catch (err: any) {
      console.error("❌ Erreur:", err);
    }
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

        <HeadText title="Get started" 
        label="Build your collection, track values, and sync across devices." />

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

            <FormInput
              name="firstName"
              label="First name"
              placeholder="Prenom"
              register={register}
              error={errors.firstName}
            />

            <FormInput
              name="lastName"
              label="Last name"
              placeholder="Nom"
              register={register}
              error={errors.lastName}
            />

            <FormInput
              name="userName"
              label="User name"
              placeholder="Username"
              register={register}
              error={errors.lastName}
            />

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

            {/* Bouton principal */}
            <ButtonForm
              label={isLoading ? "Creating..." : "Create account"}
              disabled={isLoading}
            />
            

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
              onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"}
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
