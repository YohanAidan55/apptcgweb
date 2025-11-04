import {
    Box,
    Typography,
    Link,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
    import Logo from "@/components/shared/Logo.tsx";
  import HeadText from "@/components/shared/HeadText.tsx";
  import FormInput from "@/components/shared/FormInput.tsx";
  import ButtonForm from "@/components/shared/ButtonForm.tsx";

  
  // ✅ Schéma Zod
  const schema = z.object({
    email: z
      .string()
      .email("Adresse email invalide"),
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

        <Logo />
  
        <HeadText title=" Forgot password?" 
        label="Enter your email address and we’ll send you instructions to reset your password." />
          
            <FormInput
               name="email"
               label="Email"
               type="email"
               placeholder="name@email.com"
               register={register}
               error={errors.email}
            />

  
          {/* Bouton */}
          <ButtonForm label="Send reset link" />
  
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
  