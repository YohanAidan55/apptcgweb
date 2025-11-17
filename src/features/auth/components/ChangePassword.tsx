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
  
  import { useTranslation } from "react-i18next";
  
  export default function ChangePassword() {
  
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { t } = useTranslation();

      // ✅ Schema Zod
    const schema = z.object({
      password: z
        .string()
        .min(8, t("ChangePassword.mdpCaractere"))
        .regex(/[0-9]/, t("ChangePassword.mdpChiffre"))
        .regex(/[^a-zA-Z0-9]/, t("ChangePassword.mdpSymbole")),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("ChangePassword.passwordMismatch"),
      path: ["confirmPassword"],
    });
  
  type ChangePasswordForm = z.infer<typeof schema>;
  
  
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
  
        alert(t("ChangePassword.success"));
        navigate("/login");
  
      } catch (err) {
        alert(t("ChangePassword.error"));
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
            title={t("ChangePassword.title")}
            label={t("ChangePassword.subTitle")}
          />
  
          {/* ✅ NEW PASSWORD */}
          <FormInput
            name="password"
            label={t("ChangePassword.newPassword")}
            type="password"
            placeholder={t("ChangePassword.enterPassword")}
            register={register}
            error={errors.password}
          />
  
          {/* ✅ CONFIRM PASSWORD */}
          <FormInput
            name="confirmPassword"
            label={t("ChangePassword.confirmPassword")}
            type="password"
            placeholder={t("ChangePassword.confirmPassword")}
            register={register}
            error={errors.confirmPassword}
          />
  
          {/* ✅ BUTTON */}
          <ButtonForm
            label={isLoading ? t("ChangePassword.loading") : t("ChangePassword.button")}
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
              {t("ChangePassword.error")}
            </Typography>
          )}
  
          {/* ✅ Return to login */}
          <Typography
            variant="body2"
            align="center"
            color="gray"
            sx={{ mt: 3 }}
          >
            {t("ChangePassword.retour")}{" "}
            <Link
              onClick={() => navigate("/login")}
              underline="hover"
              color="#d4af37"
              sx={{ cursor: "pointer" }}
            >
              {t("ChangePassword.login")}
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  }
  