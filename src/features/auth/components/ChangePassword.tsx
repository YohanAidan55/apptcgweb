import {
    Box,
    Typography,
    Link,
  } from "@mui/material";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  
  import { useResetPasswordMutation } from "@/Services/userApi.ts";
  
  import Logo from "@/components/shared/Logo.tsx";
  import HeadText from "@/components/shared/HeadText.tsx";
  import FormInput from "@/components/shared/FormInput.tsx";
  import ButtonForm from "@/components/shared/ButtonForm.tsx";
  
  
  // ✅ Schema Zod
  const schema = z.object({
    password: z
      .string()
      .min(8, "Must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  
  type ChangePasswordForm = z.infer<typeof schema>;
  
  
  export default function ChangePassword() {
  
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
  
    // ✅ On récupère le token dans l’URL
    const token =
    searchParams.get("confirmationToken") ||
    searchParams.get("token");  // fallback si tu changes plus tard
  
    const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ChangePasswordForm>({
      resolver: zodResolver(schema),
      mode: "onTouched",
    });
  
    // ✅ Soumission API
    const onSubmit = async (data: ChangePasswordForm) => {
      if (!token) {
        alert("❌ Token missing in URL");
        return;
      }
  
      try {
        await resetPassword({
          token: token,
          newPassword: data.password,
        }).unwrap();
  
        alert("✅ Your password has been updated!");
        navigate("/login");
  
      } catch (err) {
        alert("❌ Error updating password");
      }
    };
  
  
    return (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      bgcolor: "background.default",
      color: "text.primary",
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
          {/* ✅ Logo */}
          <Logo />
  
          {/* ✅ Titre */}
          <HeadText
            title="Change your password"
            label="Please enter your new password below."
          />
  
          {/* ✅ NEW PASSWORD */}
          <FormInput
            name="password"
            label="New password"
            type="password"
            placeholder="Enter new password"
            register={register}
            error={errors.password}
          />
  
          {/* ✅ CONFIRM PASSWORD */}
          <FormInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Confirm password"
            register={register}
            error={errors.confirmPassword}
          />
  
          {/* ✅ BUTTON */}
          <ButtonForm
            label={isLoading ? "Updating..." : "Update password"}
            disabled={isLoading}
          />
  
          {/* ✅ API ERROR MESSAGE */}
          {error && (
            <Typography
              variant="body2"
              color="error"
              textAlign="center"
              sx={{ mt: 1 }}
            >
              Error: Unable to update password.
            </Typography>
          )}
  
          {/* ✅ Return to login */}
          <Typography
            variant="body2"
            align="center"
            color="gray"
            sx={{ mt: 3 }}
          >
            Return to{" "}
            <Link
              onClick={() => navigate("/login")}
              underline="hover"
              color="#d4af37"
              sx={{ cursor: "pointer" }}
            >
              login
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  }
  