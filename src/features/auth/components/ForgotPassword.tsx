import {
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForgotPasswordMutation } from "@/Services/userApi.ts";

import Logo from "@/components/shared/Logo.tsx";
import HeadText from "@/components/shared/HeadText.tsx";
import FormInput from "@/components/shared/FormInput.tsx";
import ButtonForm from "@/components/shared/ButtonForm.tsx";


// ✅ Schéma Zod
const schema = z.object({
  email: z.string().email("Adresse email invalide"),
});

type ForgotPasswordForm = z.infer<typeof schema>;


export default function ForgotPassword() {

  const navigate = useNavigate();

  // ✅ Hook RTK Query
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // ✅ Soumission
  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword({ email: data.email }).unwrap();

      alert("✅ Reset link sent!");
      navigate("/login");

    } catch (err) {
      alert("❌ Error sending reset email");
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
        {/* ✅ Logo centré */}
        <Logo />

        {/* ✅ Titre et sous-texte */}
        <HeadText
          title="Forgot password?"
          label="Enter your email address and we’ll send you instructions to reset your password."
        />

        {/* ✅ Champ email factorisé */}
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="name@email.com"
          register={register}
          error={errors.email}
        />

        {/* ✅ Bouton d’envoi */}
        <ButtonForm
          label={isLoading ? "Sending..." : "Send reset link"}
          disabled={isLoading}
        />

        {/* ✅ Message d’erreur API */}
        {error && (
          <Typography
            variant="body2"
            color="error"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            Failed to send reset email.
          </Typography>
        )}

        {/* ✅ Retour connexion */}
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
